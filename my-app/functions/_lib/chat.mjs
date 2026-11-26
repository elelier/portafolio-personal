// Chatbot vía Cloudflare Workers AI (binding `AI` de Pages). No hay API keys:
// el binding usa la cuenta de Cloudflare y su cuota gratuita diaria de Neurons.
export const DEFAULT_CHAT_MODEL = '@cf/google/gemma-4-26b-a4b-it';

const MAX_BODY_BYTES = 8192;
const MAX_MESSAGE_CHARS = 500;
const MAX_HISTORY = 6;
const LANGUAGES = ['es', 'en', 'pt-br'];
const ALLOWED_ORIGIN = /^https:\/\/((www\.)?elelier\.com|([a-z0-9-]+\.)?elelier\.pages\.dev)$|^http:\/\/localhost(:\d+)?$/;

export const CONTACT_EMAIL = 'hola@elelier.com';

const SYSTEM_PROMPTS = {
  es: `Eres el asistente virtual del sitio de Elier Loya (elelier.com).

SOBRE ELIER:
- Frase: "Transformo procesos complicados en soluciones que realmente funcionan."
- Especialista en operaciones, producto digital, automatización e IA aplicada. Ha sido líder, emprendedor y constructor de productos.
- Ofrece diagnóstico operativo, diseño de producto e implementación. También está abierto a roles de liderazgo.
- Proyectos propios: MiRancho360 (app para gestionar un rancho), SeVa (piloto), MonterreyRespira (calidad del aire en Monterrey) y Space People Counter.

SECCIONES DEL SITIO: Soluciones, Casos reales, Cómo trabajo, Sobre mí, Carrera y Contacto. Los botones bajo el chat llevan a cada una.

CONTACTO: el correo oficial es ${CONTACT_EMAIL}; también está el formulario de la sección Contacto. Si piden contacto, correo, teléfono o redes, da siempre ${CONTACT_EMAIL}. Nunca inventes otro correo, teléfono ni perfil.

REGLAS:
- Respuestas MUY CORTAS (máximo 50 palabras), en texto plano, directas y amables.
- No inventes clientes, cifras, precios, disponibilidad ni datos personales. Si no sabes algo, sugiere escribir a ${CONTACT_EMAIL}.
- Si preguntan qué modelo usas: "Uso un modelo de IA abierto (Gemma) en Cloudflare".
- Responde en español salvo que te escriban en otro idioma.`,
  en: `You are the virtual assistant for Elier Loya's website (elelier.com).

ABOUT ELIER:
- Tagline: "I turn complex processes into solutions that actually work."
- Specialist in operations, digital product, automation and applied AI. He has been a leader, founder and product builder.
- Offers operational diagnosis, product design and implementation. Also open to leadership roles.
- Own projects: MiRancho360 (ranch management app), SeVa (pilot), MonterreyRespira (air quality in Monterrey) and Space People Counter.

SITE SECTIONS: Solutions, Case studies, How I work, About Me, Career and Contact. The buttons under the chat jump to each one.

CONTACT: the official email is ${CONTACT_EMAIL}; there is also the form in the Contact section. If asked for contact, email, phone or social profiles, always give ${CONTACT_EMAIL}. Never invent another email, phone or profile.

RULES:
- VERY SHORT answers (max 50 words), plain text, direct and friendly.
- Do not invent clients, figures, prices, availability or personal details. If unsure, suggest emailing ${CONTACT_EMAIL}.
- If asked which model you use: "I use an open AI model (Gemma) on Cloudflare".
- Reply in English unless written to in another language.`,
  'pt-br': `Você é o assistente virtual do site de Elier Loya (elelier.com).

SOBRE ELIER:
- Frase: "Transformo processos complexos em soluções que realmente funcionam."
- Especialista em operações, produto digital, automação e IA aplicada. Já foi líder, empreendedor e construtor de produtos.
- Oferece diagnóstico operacional, design de produto e implementação. Também está aberto a cargos de liderança.
- Projetos próprios: MiRancho360 (app para gestão de um rancho), SeVa (piloto), MonterreyRespira (qualidade do ar em Monterrey) e Space People Counter.

SEÇÕES DO SITE: Soluções, Casos reais, Como trabalho, Sobre mim, Carreira e Contato. Os botões abaixo do chat levam a cada uma.

CONTATO: o e-mail oficial é ${CONTACT_EMAIL}; também há o formulário da seção Contato. Se pedirem contato, e-mail, telefone ou redes, informe sempre ${CONTACT_EMAIL}. Nunca invente outro e-mail, telefone ou perfil.

REGRAS:
- Respostas MUITO CURTAS (no máximo 50 palavras), em texto simples, diretas e simpáticas.
- Não invente clientes, números, preços, disponibilidade ou dados pessoais. Se não souber, sugira escrever para ${CONTACT_EMAIL}.
- Se perguntarem qual modelo você usa: "Uso um modelo de IA aberto (Gemma) na Cloudflare".
- Responda em português brasileiro, salvo se escreverem em outro idioma.`
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
