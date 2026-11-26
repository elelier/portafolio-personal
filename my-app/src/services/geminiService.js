// Cliente del chatbot. La llamada a Gemini ocurre en la Pages Function /api/chat,
// así que la API key nunca llega al navegador.
const CHAT_ENDPOINT = '/api/chat';

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
        return escapeHtml(data.text.trim());
      }
    } catch {
      // Sin conexión o función no disponible: usamos respuestas locales.
    }
    return this.getFallbackResponse(message, language, conversationHistory);
  }

  getFallbackResponse(message, language = 'es', conversationHistory = []) {
    // Contar preguntas del usuario incluyendo la actual
    let userQuestionCount = 1; // La pregunta actual
    if (conversationHistory) {
      conversationHistory.forEach(msg => {
        if (msg && msg.type === 'user') userQuestionCount++;
      });
    }
    
    const fallbacks = {
      es: {
        greeting: "¡Hola! Soy el asistente de Elier Loya. ¿En qué puedo ayudarte?",
        services: "Elier ofrece desarrollo web, e-commerce y análisis de datos. ¿Qué te interesa?",
        portfolio: "Elier tiene proyectos de tiendas online y dashboards. Explora la sección de proyectos.",
        contact: "Contacta a Elier por el formulario del sitio web o LinkedIn.",
        model: "Soy el asistente virtual del portafolio de Elier.",
        availability: "Sí, Elier está disponible para proyectos. ¿Qué tipo necesitas?",
        name: "Soy el asistente de Elier Loya, especialista en transformación digital.",
        questions: `Has hecho ${userQuestionCount} preguntas.`,
        default: "¿En qué más puedo ayudarte sobre Elier y sus servicios?"
      },
      en: {
        greeting: "Hello! I'm Elier Loya's assistant. How can I help you?",
        services: "Elier offers web development, e-commerce and data analysis. What interests you?",
        portfolio: "Elier has online store and dashboard projects. Explore the projects section.",
        contact: "Contact Elier through the website contact form or LinkedIn.",
        model: "I'm the virtual assistant for Elier's portfolio.",
        availability: "Yes, Elier is available for projects. What type do you need?",
        name: "I'm Elier Loya's assistant, specialist in digital transformation.",
        questions: `You have asked ${userQuestionCount} questions.`,
        default: "What else can I help you with about Elier and his services?"
      },
      'pt-br': {
        greeting: "Olá! Sou o assistente de Elier. Como posso ajudar?",
        services: "Elier trabalha com produto digital, operações, automação e IA aplicada.",
        portfolio: "Veja os projetos e resultados reais apresentados neste portfólio.",
        contact: "Entre em contato pelo formulário do site ou pelo LinkedIn.",
        model: "Sou o assistente virtual do portfólio de Elier.",
        availability: "Entre em contato para conversar sobre uma oportunidade ou projeto.",
        name: "Sou o assistente de Elier Loya.",
        questions: `Você fez ${userQuestionCount} perguntas.`,
        default: "Como posso ajudar você a conhecer o trabalho de Elier?"
      }
    };

    const responses = fallbacks[language] || fallbacks.es;
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('cuántas') || lowerMessage.includes('cuantas') || lowerMessage.includes('how many') || lowerMessage.includes('preguntas') || lowerMessage.includes('questions')) {
      return responses.questions;
    } else if (lowerMessage.includes('hola') || lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
      return responses.greeting;
    } else if (lowerMessage.includes('nombre') || lowerMessage.includes('name') || lowerMessage.includes('llama') || lowerMessage.includes('called')) {
      return responses.name;
    } else if (lowerMessage.includes('modelo') || lowerMessage.includes('model') || lowerMessage.includes('ai') || lowerMessage.includes('ia')) {
      return responses.model;
    } else if (lowerMessage.includes('disponible') || lowerMessage.includes('available') || lowerMessage.includes('trabajar') || lowerMessage.includes('work')) {
      return responses.availability;
    } else if (lowerMessage.includes('servicio') || lowerMessage.includes('service')) {
      return responses.services;
    } else if (lowerMessage.includes('proyecto') || lowerMessage.includes('project') || lowerMessage.includes('portafolio') || lowerMessage.includes('portfolio')) {
      return responses.portfolio;
    } else if (lowerMessage.includes('contacto') || lowerMessage.includes('contact')) {
      return responses.contact;
    } else {
      return responses.default;
    }
  }
  // Método para verificar si Gemini está disponible
  isGeminiAvailable() {
    return this.lastResponseFromAI;
  }
}

const geminiServiceInstance = new GeminiService();
export default geminiServiceInstance;
