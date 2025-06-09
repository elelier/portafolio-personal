// Test simple para verificar que Gemini API funciona
import { GoogleGenerativeAI } from '@google/generative-ai';

const testGemini = async () => {
  console.log('🧪 Testing Gemini API...');
  
  const apiKey = process.env.REACT_APP_GEMINI_API_KEY;
  console.log('API Key present:', !!apiKey);
  console.log('API Key length:', apiKey ? apiKey.length : 0);
  
  if (!apiKey) {
    console.error('❌ No API key found');
    return;
  }
  
  try {
    console.log('Creating GoogleGenerativeAI instance...');
    const genAI = new GoogleGenerativeAI(apiKey);
    
    console.log('Getting model...');
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    console.log('Sending test message...');
    const result = await model.generateContent("Say hello in Spanish, in just one sentence");
    
    console.log('Getting response...');
    const response = await result.response;
    const text = response.text();
    
    console.log('✅ Gemini response:', text);
    return text;
  } catch (error) {
    console.error('❌ Gemini test failed:', error);
    if (error.message) {
      console.error('Error message:', error.message);
    }
    if (error.status) {
      console.error('Error status:', error.status);
    }
    return null;
  }
};

// Exportar para usar en console y hacer disponible globalmente
window.testGemini = testGemini;

// Auto-ejecutar al cargar para debugging inicial
console.log('🔧 testGemini.js loaded - window.testGemini() available');

export default testGemini;
