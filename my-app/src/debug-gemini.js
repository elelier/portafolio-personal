// Debug tool para probar el chatbot y memoria conversacional
import geminiService from './services/geminiService';

// Simulador de conversación para testing
class ChatTester {
  constructor() {
    this.conversationHistory = [];
  }

  async testConversation(messages) {
    console.log('🧪 === INICIANDO TEST DE CONVERSACIÓN ===');
    
    for (let i = 0; i < messages.length; i++) {
      const message = messages[i];
      console.log(`\n👤 Usuario: ${message}`);
      
      try {
        const response = await geminiService.sendMessage(
          message, 
          'es', 
          this.conversationHistory
        );
        
        console.log(`🤖 Bot: ${response}`);
        
        // Agregar al historial
        this.conversationHistory.push(
          { text: message, isUser: true },
          { text: response, isUser: false }
        );
        
        // Pausa entre mensajes para simular conversación real
        await new Promise(resolve => setTimeout(resolve, 1000));
        
      } catch (error) {
        console.error('❌ Error:', error);
      }
    }
    
    console.log('\n📊 === RESUMEN DE CONVERSACIÓN ===');
    console.log(`Total de intercambios: ${this.conversationHistory.length / 2}`);
    console.log('Historial completo:', this.conversationHistory);
  }

  async testMemory() {
    const testMessages = [
      "Hola, ¿cómo estás?",
      "¿Qué servicios ofrece Elier?",
      "¿Está disponible para trabajar?",
      "¿Cuántas preguntas te he hecho hasta ahora?"
    ];
    
    await this.testConversation(testMessages);
  }

  async testShortResponses() {
    const testMessages = [
      "Cuéntame sobre los proyectos de Elier",
      "¿Qué tecnologías usa?",
      "¿Cómo puedo contactarlo?",
      "¿Qué modelo de IA usas?"
    ];
    
    await this.testConversation(testMessages);
  }

  reset() {
    this.conversationHistory = [];
    console.log('🔄 Historial de conversación reseteado');
  }
}

// Función de test simple para usar en consola
async function testGeminiQuick(message = "Hola, ¿qué servicios ofrece Elier?") {
  try {
    console.log('🧪 Testing Gemini con mensaje:', message);
    const response = await geminiService.sendMessage(message, 'es', []);
    console.log('✅ Respuesta:', response);
    console.log('📏 Longitud:', response.length, 'caracteres');
    console.log('📊 Palabras aproximadas:', response.split(' ').length);
    return response;
  } catch (error) {
    console.error('❌ Error:', error);
    return null;
  }
}

// Función para probar memoria conversacional
async function testMemory() {
  const tester = new ChatTester();
  await tester.testMemory();
}

// Función para probar respuestas cortas
async function testShortResponses() {
  const tester = new ChatTester();
  await tester.testShortResponses();
}

// Función específica para probar el escenario que mencionó el usuario
async function testExactScenario() {
  const tester = new ChatTester();
  const testMessages = [
    "Cuéntame sobre Contacto",
    "Cuéntame sobre Proyectos", 
    "¿cuántas cosas te he preguntado?"
  ];
  
  console.log('🎯 === TEST DEL ESCENARIO ESPECÍFICO ===');
  await tester.testConversation(testMessages);
  
  // Verificar si recordó las preguntas
  console.log('\n🔍 === ANÁLISIS DE MEMORIA ===');
  const lastResponse = tester.conversationHistory[tester.conversationHistory.length - 1];
  if (lastResponse && lastResponse.text) {
    const includesCounting = lastResponse.text.toLowerCase().includes('dos') || 
                           lastResponse.text.toLowerCase().includes('2') ||
                           lastResponse.text.toLowerCase().includes('primera') ||
                           lastResponse.text.toLowerCase().includes('segunda');
    console.log('¿Recordó las preguntas anteriores?', includesCounting ? '✅ SÍ' : '❌ NO');
  }
}

// Función para probar la conversación específica que tuvo problemas
async function testProblemConversation() {
  const tester = new ChatTester();
  const testMessages = [
    "hola! como estas?",
    "cual es tu proposito?",
    "cuantas preguntas te he hecho?"
  ];
  
  console.log('🎯 === TEST DE CONVERSACIÓN PROBLEMÁTICA ACTUALIZADA ===');
  await tester.testConversation(testMessages);
  
  // Análisis específico
  console.log('\n🔍 === ANÁLISIS DE PROBLEMAS ===');
  const responses = tester.conversationHistory.filter(msg => !msg.isUser);
  
  // Verificar conteo de preguntas
  const lastResponse = responses[responses.length - 1];
  if (lastResponse) {
    const mentions3 = lastResponse.text.includes('3') || lastResponse.text.includes('tres');
    const mentions0 = lastResponse.text.includes('0') || lastResponse.text.includes('cero');
    console.log('¿Cuenta correctamente 3 preguntas?', mentions3 ? '✅ SÍ' : '❌ NO');
    console.log('¿Dice incorrectamente 0 preguntas?', mentions0 ? '❌ SÍ (ERROR)' : '✅ NO');
    console.log('Respuesta del conteo:', lastResponse.text);
    
    // Mostrar historial que debería estar recibiendo
    console.log('\n📋 === HISTORIAL QUE DEBERÍA VER ===');
    const userQuestions = tester.conversationHistory.filter(msg => msg.isUser);
    userQuestions.forEach((q, i) => {
      console.log(`${i + 1}. ${q.text}`);
    });
  }
}

// Hacer funciones disponibles globalmente para debug en consola (SOLO EN DESARROLLO)
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  window.testGeminiQuick = testGeminiQuick;
  window.testMemory = testMemory;
  window.testShortResponses = testShortResponses;
  window.testExactScenario = testExactScenario;
  window.testProblemConversation = testProblemConversation;
  window.ChatTester = ChatTester;
  window.geminiService = geminiService;
  
  console.log('🔧 Debug tools cargadas (SOLO EN DESARROLLO):');
  console.log('- window.testGeminiQuick("tu mensaje")');
  console.log('- window.testMemory()');
  console.log('- window.testShortResponses()');
  console.log('- window.testExactScenario() // Prueba el escenario específico');
  console.log('- window.testProblemConversation() // Prueba la conversación problemática');
  console.log('- window.geminiService');
}

export { testGeminiQuick, testMemory, testShortResponses, testExactScenario, testProblemConversation, ChatTester };