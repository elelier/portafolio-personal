// Proxy del chatbot: la API key de Gemini vive solo en el servidor (secret de Cloudflare Pages).
export const DEFAULT_GEMINI_MODEL = 'gemini-3.8-flash';

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
- Si preguntan qué modelo usas: "Uso Google Gemini para darte respuestas".
- Responde en español a menos que te escriban en otro idioma.`,
  en: `You are the virtual assistant for Elier Loya's professional portfolio (elelier.com).

CONTEXT:
- Elier works in operations, digital product, digital transformation, automation and applied AI.
- He builds web products (React, Node.js) and does data analysis.
- Contact: the website contact form or LinkedIn.

INSTRUCTIONS:
- VERY SHORT answers (max 50 words), direct and friendly.
- Do not invent results, clients, availability or personal details. If unsure, suggest the contact form.
- If asked which model you use: "I use Google Gemini to answer you".
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
    if (text) history.push({ role: item.isUser === true ? 'user' : 'model', text });
  }
  return { message, language, history };
}

function toContents(history, message) {
  const contents = [];
  for (const { role, text } of history) {
    const last = contents[contents.length - 1];
    // Gemini prefiere turnos alternados: unimos mensajes consecutivos del mismo rol.
    if (last && last.role === role) last.parts[0].text += `\n${text}`;
    else contents.push({ role, parts: [{ text }] });
  }
  // La conversación debe empezar con un turno del usuario.
  while (contents.length && contents[0].role !== 'user') contents.shift();
  const last = contents[contents.length - 1];
  if (last && last.role === 'user') last.parts[0].text += `\n${message}`;
  else contents.push({ role: 'user', parts: [{ text: message }] });
  return contents;
}

export async function handleChat(request, env, fetchImpl = fetch) {
  const available = Boolean(env?.GEMINI_API_KEY);
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

  const model = env.GEMINI_MODEL || DEFAULT_GEMINI_MODEL;
  try {
    const response = await fetchImpl(
      `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`,
      {
        method: 'POST',
        headers: { 'content-type': 'application/json', 'x-goog-api-key': env.GEMINI_API_KEY },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: SYSTEM_PROMPTS[payload.language] }] },
          contents: toContents(payload.history, payload.message),
          generationConfig: { temperature: 0.7, maxOutputTokens: 300 }
        }),
        signal: AbortSignal.timeout(15000)
      }
    );
    if (!response.ok) return json({ ok: false, error: 'upstream_failure' }, 502);
    const result = await response.json();
    const text = result?.candidates?.[0]?.content?.parts
      ?.map((part) => (typeof part?.text === 'string' ? part.text : ''))
      .join('')
      .trim();
    if (!text) return json({ ok: false, error: 'empty_response' }, 502);
    return json({ ok: true, text }, 200);
  } catch {
    return json({ ok: false, error: 'upstream_failure' }, 502);
  }
}
