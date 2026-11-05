import { GoogleGenerativeAI } from '@google/generative-ai';

class GeminiService {
  constructor() {
    // Para GitHub Pages, usaremos variables de entorno del build
    this.apiKey = process.env.REACT_APP_GEMINI_API_KEY;
    this.genAI = null;
    this.model = null;
    this.isInitialized = false;
      // Debug logs (solo en desarrollo)
    if (process.env.NODE_ENV === 'development') {
      console.log('🔧 GeminiService constructor - API Key present:', !!this.apiKey);
      // NUNCA loggear la API key real
    }
  }  async initialize() {
    if (this.isInitialized) return true;
    
    if (process.env.NODE_ENV === 'development') {
      console.log('🚀 Initializing GeminiService...');
    }
    
    try {
      if (!this.apiKey) {
        if (process.env.NODE_ENV === 'development') {
          console.warn('❌ Gemini API key not found. Using fallback responses.');
        }
        return false;
      }

      if (process.env.NODE_ENV === 'development') {
        console.log('✅ API Key found, creating GoogleGenerativeAI instance...');
      }
      this.genAI = new GoogleGenerativeAI(this.apiKey);      this.model = this.genAI.getGenerativeModel({ 
        model: "gemini-1.5-flash",
        generationConfig: {
          temperature: 0.7,
          topK: 1,
          topP: 1,
          maxOutputTokens: 150, // Reducido para respuestas más cortas
        },      });
      
      if (process.env.NODE_ENV === 'development') {
        console.log('✅ Gemini model initialized successfully');
      }
      this.isInitialized = true;
      return true;
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('❌ Error initializing Gemini:', error);
      }
      return false;
    }
  }
  getSystemPrompt(language = 'es') {
    const prompts = {      es: `Eres un asistente virtual para el portafolio profesional de Elier Loya.

INFORMACIÓN EXACTA:
- Nombre: Elier Loya (NO Rico Vázquez ni Loya Mata)
- Especialista en transformación digital, e-commerce y optimización de operaciones
- Desarrollador Full Stack con React, Node.js, MongoDB y TypeScript
- Experiencia: +3 años en desarrollo web y análisis de datos
- Proyectos: Tiendas online, dashboards analíticos, sistemas de automatización
- Contacto: Formulario en el sitio web y LinkedIn
- Sitio web: elelier.com

INSTRUCCIONES CRÍTICAS:
- Respuestas MUY CORTAS (máximo 40 palabras)
- Mantén memoria perfecta de la conversación
- Cuenta preguntas SOLO del usuario actual (no mensajes del bot)
- Si preguntan cuántas preguntas han hecho, responde solo el número + "preguntas"
- Si preguntan sobre mi nombre, confirma: "Soy el asistente de Elier Loya"
- Usa información específica y correcta
- Sé directo y preciso

Responde en español a menos que te escriban en inglés.`,
      
      en: `You are a virtual assistant for Elier Loya Mata's professional portfolio.

KEY INFORMATION:
- Elier specializes in digital transformation, e-commerce, and operations optimization
- Experience in web development, React, Node.js, data analysis, and automation
- Offers consulting, web development, and data analysis services
- Portfolio includes e-commerce projects, analytical dashboards, and automation
- You use Google Gemini AI to generate intelligent responses

CRITICAL INSTRUCTIONS:
- VERY SHORT RESPONSES: Maximum 50 words, preferably 30-40 words
- Be direct and concise, don't repeat previously given information
- Maintain context from previous conversation
- If asked about which model you use, respond: "I use Google Gemini AI to give you intelligent responses"
- If asked about availability: "Yes, Elier is available for projects. What type of project do you have in mind?"
- Professional but friendly tone
- Don't introduce yourself in every response

Respond in English unless written to in Spanish.`,
      'pt-br': `Você é o assistente do portfólio profissional de Elier Loya. Ele atua em operações, produto digital, transformação digital, automação e IA aplicada. Responda em português brasileiro, de forma curta, clara e prática. Não invente resultados, disponibilidade, clientes ou informações pessoais. Quando não souber, oriente o visitante a usar o formulário de contato.`
    };
    
    return prompts[language] || prompts.es;
  }  async sendMessage(message, language = 'es', conversationHistory = []) {
    if (process.env.NODE_ENV === 'development') {
      console.log('💬 SendMessage called with:', { message, language, isInitialized: this.isInitialized });
    }
    
    try {
      await this.initialize();      if (!this.isInitialized) {
        if (process.env.NODE_ENV === 'development') {
          console.log('⚠️ Gemini not initialized, using fallback');
        }
        return this.getFallbackResponse(message, language, conversationHistory);
      }

      if (process.env.NODE_ENV === 'development') {
        console.log('🧠 Sending message to Gemini AI...');
      }
      const systemPrompt = this.getSystemPrompt(language);
        // Construir el contexto de conversación más efectivo
      let conversationContext = systemPrompt + "\n\n";
        // Agregar historial reciente (últimos 6 mensajes para mejor contexto)
      const recentHistory = conversationHistory.slice(-6);
      let userQuestionCount = 0;
      
      // Contar preguntas del historial
      recentHistory.forEach(msg => {
        if (msg.isUser) userQuestionCount++;
      });
      
      // Agregar el mensaje actual al conteo
      userQuestionCount++;
      
      if (recentHistory.length > 0) {
        conversationContext += "CONVERSACIÓN ANTERIOR:\n";
        recentHistory.forEach(msg => {
          const role = msg.isUser ? 'Usuario' : 'Asistente';
          conversationContext += `${role}: ${msg.text}\n`;
        });
        conversationContext += `\nNOTA IMPORTANTE: Incluyendo el mensaje actual, el usuario ha hecho ${userQuestionCount} preguntas en total.\n\n`;
      } else {
        conversationContext += `NOTA IMPORTANTE: Esta es la primera pregunta (1) del usuario.\n\n`;
      }
      
      conversationContext += `MENSAJE ACTUAL:\nUsuario: ${message}\nAsistente:`;      const result = await this.model.generateContent(conversationContext);
      const response = await result.response;
      const text = response.text();
      
      if (process.env.NODE_ENV === 'development') {
        console.log('✅ Gemini response received:', text.substring(0, 100) + '...');
      }
      return text;
        } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('❌ Error sending message to Gemini:', error);
      }
      return this.getFallbackResponse(message, language, conversationHistory);
    }
  }  getFallbackResponse(message, language = 'es', conversationHistory = []) {
    // Contar preguntas del usuario incluyendo la actual
    let userQuestionCount = 1; // La pregunta actual
    if (conversationHistory) {
      conversationHistory.forEach(msg => {
        if (msg.isUser) userQuestionCount++;
      });
    }
    
    const fallbacks = {
      es: {
        greeting: "¡Hola! Soy el asistente de Elier Loya. ¿En qué puedo ayudarte?",
        services: "Elier ofrece desarrollo web, e-commerce y análisis de datos. ¿Qué te interesa?",
        portfolio: "Elier tiene proyectos de tiendas online y dashboards. Explora la sección de proyectos.",
        contact: "Contacta a Elier por el formulario del sitio web o LinkedIn.",
        model: "Uso Google Gemini AI para darte respuestas inteligentes.",
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
        model: "I use Google Gemini AI to give you intelligent responses.",
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
    return this.isInitialized && this.apiKey;
  }
}

const geminiServiceInstance = new GeminiService();
export default geminiServiceInstance;
