// Cliente del chatbot. La llamada al modelo (Workers AI) ocurre en la Pages Function /api/chat,
// así que no hay credenciales en el navegador.
const CHAT_ENDPOINT = '/api/chat';
export const CONTACT_EMAIL = 'hola@elelier.com';

// ChatModal pinta los mensajes como HTML: escapamos la respuesta del modelo.
const escapeHtml = (text) => text
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&#39;')
  .replace(/\n/g, '<br>');

class GeminiService {
  constructor() {
    this.availability = null;
    this.lastResponseFromAI = false;
  }

  async initialize() {
    if (this.availability) return this.availability;
    this.availability = fetch(CHAT_ENDPOINT, { method: 'GET', headers: { accept: 'application/json' } })
      .then((response) => (response.ok ? response.json() : null))
      .then((data) => data?.available === true)
      .catch(() => false);
    const available = await this.availability;
    if (!available) this.availability = null; // reintentar en la siguiente apertura
    return available;
  }

  async sendMessage(message, language = 'es', conversationHistory = []) {
    this.lastResponseFromAI = false;
    try {
      // Los mensajes del chat son { type: 'user' | 'system', content }; el contenido del bot puede traer HTML.
      const history = conversationHistory
        .filter((msg) => msg && typeof msg.content === 'string')
        .map((msg) => ({ text: msg.content.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim(), isUser: msg.type === 'user' }))
        .filter((msg) => msg.text)
        .slice(-6);
      const response = await fetch(CHAT_ENDPOINT, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ message, language, history })
      });
      const data = response.ok ? await response.json() : null;
      if (data?.ok && typeof data.text === 'string' && data.text.trim()) {
        this.lastResponseFromAI = true;
        // Escapamos y luego enlazamos solo el correo oficial.
        return escapeHtml(data.text.trim()).split(CONTACT_EMAIL).join(`<a href="mailto:${CONTACT_EMAIL}">${CONTACT_EMAIL}</a>`);
      }
    } catch {
      // Sin conexión o función no disponible: usamos respuestas locales.
    }
    return this.getFallbackResponse(message, language, conversationHistory);
  }

  getFallbackResponse(message, language = 'es', conversationHistory = []) {
    let userQuestionCount = 1; // La pregunta actual
    (conversationHistory || []).forEach((msg) => {
      if (msg && msg.type === 'user') userQuestionCount++;
    });
    const mail = `<a href="mailto:${CONTACT_EMAIL}">${CONTACT_EMAIL}</a>`;

    const fallbacks = {
      es: {
        contact: `Puedes escribirle a Elier a ${mail} o usar el formulario de contacto del sitio.`,
        greeting: '¡Hola! Soy el asistente de Elier Loya. ¿En qué te ayudo?',
        services: 'Elier ofrece diagnóstico operativo, diseño de producto e implementación, con automatización e IA aplicada. ¿Qué proceso quieres mejorar?',
        portfolio: 'Mira la sección Casos reales. Algunos proyectos: MiRancho, SeVa, MonterreyRespira y Space People Counter.',
        model: 'Soy el asistente virtual del portafolio de Elier.',
        availability: `Elier está abierto a proyectos y a roles de liderazgo. Escríbele a ${mail}.`,
        name: 'Soy el asistente de Elier Loya.',
        questions: `Has hecho ${userQuestionCount} preguntas.`,
        default: `Puedo contarte sobre los servicios, casos reales o cómo trabaja Elier. Para algo más específico, escríbele a ${mail}.`
      },
      en: {
        contact: `You can email Elier at ${mail} or use the contact form on the site.`,
        greeting: "Hi! I'm Elier Loya's assistant. How can I help?",
        services: 'Elier offers operational diagnosis, product design and implementation, with automation and applied AI. Which process do you want to improve?',
        portfolio: 'Check the Case studies section. Some projects: MiRancho, SeVa, MonterreyRespira and Space People Counter.',
        model: "I'm the virtual assistant for Elier's portfolio.",
        availability: `Elier is open to projects and leadership roles. Email ${mail}.`,
        name: "I'm Elier Loya's assistant.",
        questions: `You have asked ${userQuestionCount} questions.`,
        default: `I can tell you about Elier's services, case studies or how he works. For anything specific, email ${mail}.`
      },
      'pt-br': {
        contact: `Você pode escrever para Elier em ${mail} ou usar o formulário de contato do site.`,
        greeting: 'Olá! Sou o assistente de Elier Loya. Como posso ajudar?',
        services: 'Elier oferece diagnóstico operacional, design de produto e implementação, com automação e IA aplicada. Que processo você quer melhorar?',
        portfolio: 'Veja a seção Casos reais. Alguns projetos: MiRancho, SeVa, MonterreyRespira e Space People Counter.',
        model: 'Sou o assistente virtual do portfólio de Elier.',
        availability: `Elier está aberto a projetos e a cargos de liderança. Escreva para ${mail}.`,
        name: 'Sou o assistente de Elier Loya.',
        questions: `Você fez ${userQuestionCount} perguntas.`,
        default: `Posso contar sobre os serviços, casos reais ou como Elier trabalha. Para algo específico, escreva para ${mail}.`
      }
    };

    const responses = fallbacks[language] || fallbacks.es;
    const text = message.toLowerCase();
    const has = (pattern) => pattern.test(text);

    if (has(/correo|e-?mail|\bmail\b|contact|contat|escribir|escrever|whatsapp|tel[eé]fono|telefone/)) return responses.contact;
    if (has(/cu[aá]ntas|how many|quantas|preguntas|questions|perguntas/)) return responses.questions;
    if (has(/disponib|available|contrat|hire|trabajar con|work with|trabalhar/)) return responses.availability;
    if (has(/servicio|service|servi[cç]o|ofrece|offer|oferece/)) return responses.services;
    if (has(/proyecto|project|projeto|portafolio|portfolio|portf[oó]lio|caso/)) return responses.portfolio;
    if (has(/modelo|model|\bia\b|\bai\b|gemini|gemma/)) return responses.model;
    if (has(/nombre|name|nome|llamas|called|chama/)) return responses.name;
    if (has(/\bhola\b|\bhello\b|\bhi\b|\bol[aá]\b|\boi\b/)) return responses.greeting;
    return responses.default;
  }

  // Método para verificar si Gemini está disponible
  isGeminiAvailable() {
    return this.lastResponseFromAI;
  }
}

const geminiServiceInstance = new GeminiService();
export default geminiServiceInstance;
