import test from 'node:test';
import assert from 'node:assert/strict';
import { handleChat, DEFAULT_GEMINI_MODEL } from './chat.mjs';

const env = { GEMINI_API_KEY: 'server-key' };
const makeRequest = (body, { origin = 'https://elelier.com', type = 'application/json', method = 'POST' } = {}) =>
  new Request('https://elelier.com/api/chat', {
    method,
    headers: { 'content-type': type, ...(origin ? { origin } : {}) },
    body: method === 'POST' ? (typeof body === 'string' ? body : JSON.stringify(body)) : undefined
  });
const geminiOk = (text = 'Hola, soy el asistente.') => ({ candidates: [{ content: { parts: [{ text }] } }] });
const stub = (payload = geminiOk(), status = 200) => {
  const calls = [];
  return { calls, fetch: async (url, options) => { calls.push({ url: String(url), options }); return Response.json(payload, { status }); } };
};

test('relays a message to Gemini with the key only in a server-side header', async () => {
  const f = stub();
  const response = await handleChat(makeRequest({ message: 'Hola', language: 'es', history: [] }), env, f.fetch);
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { ok: true, text: 'Hola, soy el asistente.' });
  assert.equal(f.calls.length, 1);
  assert.ok(f.calls[0].url.endsWith(`/models/${DEFAULT_GEMINI_MODEL}:generateContent`));
  assert.ok(!f.calls[0].url.includes('server-key'));
  assert.equal(f.calls[0].options.headers['x-goog-api-key'], 'server-key');
  const body = JSON.parse(f.calls[0].options.body);
  assert.match(body.systemInstruction.parts[0].text, /Elier Loya/);
  assert.deepEqual(body.contents, [{ role: 'user', parts: [{ text: 'Hola' }] }]);
});

test('allows overriding the model with GEMINI_MODEL', async () => {
  const f = stub();
  await handleChat(makeRequest({ message: 'Hi', language: 'en' }), { ...env, GEMINI_MODEL: 'gemini-3.5-flash-lite' }, f.fetch);
  assert.ok(f.calls[0].url.includes('/models/gemini-3.5-flash-lite:generateContent'));
});

test('builds alternating turns from recent history, starting with the user', async () => {
  const f = stub();
  const history = [
    { text: 'Bienvenida', isUser: false },
    { text: '¿Qué hace Elier?', isUser: true },
    { text: 'Producto digital.', isUser: false },
    { text: 'Interesante', isUser: true }
  ];
  await handleChat(makeRequest({ message: '¿Cómo lo contacto?', language: 'es', history }), env, f.fetch);
  const { contents } = JSON.parse(f.calls[0].options.body);
  assert.deepEqual(contents.map((c) => c.role), ['user', 'model', 'user']);
  assert.equal(contents[2].parts[0].text, 'Interesante\n¿Cómo lo contacto?');
});

test('reports availability on GET without exposing the key', async () => {
  const on = await handleChat(makeRequest(null, { method: 'GET' }), env);
  assert.deepEqual(await on.json(), { ok: true, available: true });
  const off = await handleChat(makeRequest(null, { method: 'GET' }), {});
  assert.deepEqual(await off.json(), { ok: true, available: false });
});

test('rejects foreign or missing origins', async () => {
  for (const origin of ['https://evil.example', 'https://elelier.com.evil.example', null]) {
    const f = stub();
    const response = await handleChat(makeRequest({ message: 'Hola' }, { origin }), env, f.fetch);
    assert.equal(response.status, 403);
    assert.equal(f.calls.length, 0);
  }
});

test('accepts preview and local origins', async () => {
  for (const origin of ['https://abc123.elelier.pages.dev', 'https://www.elelier.com', 'http://localhost:3000']) {
    const response = await handleChat(makeRequest({ message: 'Hola' }, { origin }), env, stub().fetch);
    assert.equal(response.status, 200);
  }
});

test('returns 503 when the server key is not configured', async () => {
  const f = stub();
  const response = await handleChat(makeRequest({ message: 'Hola' }), {}, f.fetch);
  assert.equal(response.status, 503);
  assert.equal(f.calls.length, 0);
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
    const f = stub();
    const response = await handleChat(request, env, f.fetch);
    assert.equal(response.status, status);
    assert.equal(f.calls.length, 0);
  }
});

test('maps upstream failures to 502 without leaking details', async () => {
  for (const f of [stub({ error: { message: 'API key invalid' } }, 400), stub({ candidates: [] })]) {
    const response = await handleChat(makeRequest({ message: 'Hola' }), env, f.fetch);
    assert.equal(response.status, 502);
    assert.ok(!JSON.stringify(await response.json()).includes('API key'));
  }
  const thrown = await handleChat(makeRequest({ message: 'Hola' }), env, async () => { throw new Error('network'); });
  assert.equal(thrown.status, 502);
});
