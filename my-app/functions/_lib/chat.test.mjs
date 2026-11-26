import test from 'node:test';
import assert from 'node:assert/strict';
import { handleChat, DEFAULT_CHAT_MODEL } from './chat.mjs';

const makeRequest = (body, { origin = 'https://elelier.com', type = 'application/json', method = 'POST' } = {}) =>
  new Request('https://elelier.com/api/chat', {
    method,
    headers: { 'content-type': type, ...(origin ? { origin } : {}) },
    body: method === 'POST' ? (typeof body === 'string' ? body : JSON.stringify(body)) : undefined
  });
const aiStub = (result = { response: 'Hola, soy el asistente.' }) => {
  const calls = [];
  return {
    calls,
    env: {
      AI: {
        run: async (model, input, options) => {
          calls.push({ model, input, options });
          if (result instanceof Error) throw result;
          return result;
        }
      }
    }
  };
};

test('runs the default Workers AI model with the system prompt and no API key', async () => {
  const ai = aiStub();
  const response = await handleChat(makeRequest({ message: 'Hola', language: 'es', history: [] }), ai.env);
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { ok: true, text: 'Hola, soy el asistente.' });
  assert.equal(ai.calls.length, 1);
  assert.equal(ai.calls[0].model, DEFAULT_CHAT_MODEL);
  const { messages, max_tokens, chat_template_kwargs } = ai.calls[0].input;
  assert.equal(messages[0].role, 'system');
  assert.match(messages[0].content, /Elier Loya/);
  assert.deepEqual(messages.slice(1), [{ role: 'user', content: 'Hola' }]);
  assert.equal(max_tokens, 300);
  assert.deepEqual(chat_template_kwargs, { enable_thinking: false });
  assert.deepEqual(ai.calls[0].options, { rejectIfBusy: true });
});

test('accepts OpenAI-style output from the binding', async () => {
  const ai = aiStub({ choices: [{ message: { content: ' Respuesta ' } }] });
  const response = await handleChat(makeRequest({ message: 'Hola' }), ai.env);
  assert.deepEqual(await response.json(), { ok: true, text: 'Respuesta' });
});

test('allows overriding the model with CHAT_MODEL', async () => {
  const ai = aiStub();
  await handleChat(makeRequest({ message: 'Hi', language: 'en' }), { ...ai.env, CHAT_MODEL: '@cf/zai-org/glm-4.7-flash' });
  assert.equal(ai.calls[0].model, '@cf/zai-org/glm-4.7-flash');
});

test('builds alternating turns from recent history, starting with the user', async () => {
  const ai = aiStub();
  const history = [
    { text: 'Bienvenida', isUser: false },
    { text: '¿Qué hace Elier?', isUser: true },
    { text: 'Producto digital.', isUser: false },
    { text: 'Interesante', isUser: true }
  ];
  await handleChat(makeRequest({ message: '¿Cómo lo contacto?', language: 'es', history }), ai.env);
  const turns = ai.calls[0].input.messages.slice(1);
  assert.deepEqual(turns.map((t) => t.role), ['user', 'assistant', 'user']);
  assert.equal(turns[2].content, 'Interesante\n¿Cómo lo contacto?');
});

test('reports availability on GET depending on the AI binding', async () => {
  const on = await handleChat(makeRequest(null, { method: 'GET' }), aiStub().env);
  assert.deepEqual(await on.json(), { ok: true, available: true });
  const off = await handleChat(makeRequest(null, { method: 'GET' }), {});
  assert.deepEqual(await off.json(), { ok: true, available: false });
});

test('rejects foreign or missing origins', async () => {
  for (const origin of ['https://evil.example', 'https://elelier.com.evil.example', null]) {
    const ai = aiStub();
    const response = await handleChat(makeRequest({ message: 'Hola' }, { origin }), ai.env);
    assert.equal(response.status, 403);
    assert.equal(ai.calls.length, 0);
  }
});

test('accepts preview and local origins', async () => {
  for (const origin of ['https://abc123.elelier.pages.dev', 'https://www.elelier.com', 'http://localhost:3000']) {
    const response = await handleChat(makeRequest({ message: 'Hola' }, { origin }), aiStub().env);
    assert.equal(response.status, 200);
  }
});

test('returns 503 when the AI binding is not configured', async () => {
  const response = await handleChat(makeRequest({ message: 'Hola' }), {});
  assert.equal(response.status, 503);
});

test('validates input', async () => {
  const cases = [
    [makeRequest('{bad'), 400],
    [makeRequest({ message: '' }), 400],
    [makeRequest({ message: 'x'.repeat(501) }), 400],
    [makeRequest({ message: 'Hola', history: [{ text: 5 }] }), 400],
    [makeRequest({ message: 'Hola' }, { type: 'text/plain' }), 415],
    [makeRequest('x'.repeat(9000)), 413]
  ];
  for (const [request, status] of cases) {
    const ai = aiStub();
    const response = await handleChat(request, ai.env);
    assert.equal(response.status, status);
    assert.equal(ai.calls.length, 0);
  }
});

test('maps quota, capacity and empty responses to 502 without leaking details', async () => {
  for (const result of [new Error('4006: daily free allocation exceeded'), { response: '' }, {}]) {
    const response = await handleChat(makeRequest({ message: 'Hola' }), aiStub(result).env);
    assert.equal(response.status, 502);
    assert.ok(!JSON.stringify(await response.json()).includes('allocation'));
  }
});

test('public/_routes.json sends /api/chat to Pages Functions', async () => {
  const { readFile } = await import('node:fs/promises');
  const routes = JSON.parse(await readFile(new URL('../../public/_routes.json', import.meta.url), 'utf8'));
  assert.ok(routes.include.includes('/api/chat'));
  assert.ok(routes.include.includes('/api/contact'));
});

test('system prompts give the official email and current sections in all three languages', async () => {
  for (const [language, sections] of [['es', 'Casos reales'], ['en', 'Case studies'], ['pt-br', 'Casos reais']]) {
    const ai = aiStub();
    await handleChat(makeRequest({ message: 'contacto', language }), ai.env);
    const prompt = ai.calls[0].input.messages[0].content;
    assert.match(prompt, /hola@elelier\.com/);
    assert.match(prompt, new RegExp(sections));
    assert.doesNotMatch(prompt, /MongoDB|Full Stack/);
  }
});
