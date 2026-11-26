// Chatbot vía Cloudflare Workers AI (binding `AI` de Pages). No hay API keys:
// el binding usa la cuenta de Cloudflare y su cuota gratuita diaria de Neurons.
export const DEFAULT_CHAT_MODEL = '@cf/google/gemma-4-26b-a4b-it';

const MAX_BODY_BYTES = 8192;
const MAX_MESSAGE_CHARS = 500;
const MAX_HISTORY = 6;
const LANGUAGES = ['es', 'en', 'pt-br'];
const ALLOWED_ORIGIN = /^https:\/\/((www\.)?elelier\.com|([a-z0-9-]+\.)?elelier\.pages\.dev)$|^http:\/\/localhost(:\d+)?$/;

const SYSTEM_PROMPTS = {
  es: `Eres el asistente virtual del portafolio profesional de Elier Loya (elelier.com).

CONTEXTO:
- Elier trabaja en operaciones, producto digital, transformación digital, automatización e IA aplicada.
- Desarrolla productos web (React, Node.js) y análisis de datos.
- Contacto: formulario del sitio web o LinkedIn.

INSTRUCCIONES:
- Respuestas MUY CORTAS (máximo 40 palabras), directas y amables.
- No inventes resultados, clientes, disponibilidad ni datos personales. Si no sabes algo, sugiere usar el formulario de contacto.
- Si preguntan qué modelo usas: "Uso un modelo de IA abierto (Gemma) en Cloudflare".
- Responde en español a menos que te escriban en otro idioma.`,
  en: `You are the virtual assistant for Elier Loya's professional portfolio (elelier.com).

CONTEXT:
- Elier works in operations, digital product, digital transformation, automation and applied AI.
- He builds web products (React, Node.js) and does data analysis.
- Contact: the website contact form or LinkedIn.

INSTRUCTIONS:
- VERY SHORT answers (max 50 words), direct and friendly.
- Do not invent results, clients, availability or personal details. If unsure, suggest the contact form.
- If asked which model you use: "I use an open AI model (Gemma) on Cloudflare".
- Reply in English unless written to in another language.`,
  'pt-br': `Você é o assistente do portfólio profissional de Elier Loya (elelier.com). Ele atua em operações, produto digital, transformação digital, automação e IA aplicada. Responda em português brasileiro, de forma curta (no máximo 50 palavras), clara e prática. Não invente resultados, disponibilidade, clientes ou informações pessoais. Quando não souber, oriente o visitante a usar o formulário de contato.`
};

function json(payload, status) {
  return Response.json(payload, { status, headers: { 'cache-control': 'no-store' } });
}

function originAllowed(request) {
  const origin = request.headers.get('origin');
  return Boolean(origin) && ALLOWED_ORIGIN.test(origin);
}

function cleanPayload(input) {
  if (!input || typeof input !== 'object' || Array.isArray(input)) return null;
  if (typeof input.message !== 'string') return null;
  const message = input.message.trim();
  if (!message || message.length > MAX_MESSAGE_CHARS) return null;
  const language = LANGUAGES.includes(input.language) ? input.language : 'es';
  const rawHistory = Array.isArray(input.history) ? input.history.slice(-MAX_HISTORY) : [];
  const history = [];
  for (const item of rawHistory) {
    if (!item || typeof item.text !== 'string') return null;
    const text = item.text.trim().slice(0, 1000);
    if (text) history.push({ role: item.isUser === true ? 'user' : 'assistant', text });
  }
  return { message, language, history };
}

function toMessages(language, history, message) {
  const turns = [];
  for (const { role, text } of history) {
    const last = turns[turns.length - 1];
    // Turnos alternados: unimos mensajes consecutivos del mismo rol.
    if (last && last.role === role) last.content += `\n${text}`;
    else turns.push({ role, content: text });
  }
  // La conversación debe empezar con un turno del usuario.
  while (turns.length && turns[0].role !== 'user') turns.shift();
  const last = turns[turns.length - 1];
  if (last && last.role === 'user') last.content += `\n${message}`;
  else turns.push({ role: 'user', content: message });
  return [{ role: 'system', content: SYSTEM_PROMPTS[language] }, ...turns];
}

function extractText(result) {
  if (typeof result?.response === 'string') return result.response.trim();
  const content = result?.choices?.[0]?.message?.content;
  return typeof content === 'string' ? content.trim() : '';
}

export async function handleChat(request, env) {
  const available = typeof env?.AI?.run === 'function';
  if (request.method === 'GET') return json({ ok: true, available }, 200);
  if (request.method !== 'POST') return json({ ok: false, error: 'method_not_allowed' }, 405);
  if (!originAllowed(request)) return json({ ok: false, error: 'forbidden_origin' }, 403);
  if (!request.headers.get('content-type')?.toLowerCase().startsWith('application/json')) {
    return json({ ok: false, error: 'unsupported_media_type' }, 415);
  }
  if (!available) return json({ ok: false, error: 'service_unavailable' }, 503);

  const contentLength = Number(request.headers.get('content-length'));
  if (contentLength > MAX_BODY_BYTES) return json({ ok: false, error: 'payload_too_large' }, 413);
  const raw = await request.text();
  if (raw.length > MAX_BODY_BYTES) return json({ ok: false, error: 'payload_too_large' }, 413);

  let input;
  try {
    input = JSON.parse(raw);
  } catch {
    return json({ ok: false, error: 'invalid_json' }, 400);
  }
  const payload = cleanPayload(input);
  if (!payload) return json({ ok: false, error: 'invalid_message' }, 400);

  const model = env.CHAT_MODEL || DEFAULT_CHAT_MODEL;
  try {
    const result = await env.AI.run(
      model,
      {
        messages: toMessages(payload.language, payload.history, payload.message),
        max_tokens: 300,
        temperature: 0.7,
        chat_template_kwargs: { enable_thinking: false }
      },
      { rejectIfBusy: true }
    );
    const text = extractText(result);
    if (!text) return json({ ok: false, error: 'empty_response' }, 502);
    return json({ ok: true, text }, 200);
  } catch {
    // Incluye cuota diaria agotada o falta de capacidad: el cliente usa respuestas locales.
    return json({ ok: false, error: 'upstream_failure' }, 502);
  }
}
