// Configuración de seguridad para el chatbot
class SecurityManager {
  constructor() {
    // Rate limiting: máximo 10 mensajes por minuto por usuario
    this.maxMessagesPerMinute = 10;
    this.messageHistory = new Map();
    
    // Lista de palabras/patrones que podrían indicar uso malintencionado
    this.suspiciousPatterns = [
      /api[_\s]*key/i,
      /token/i,
      /password/i,
      /inject/i,
      /script/i,
      /<script/i,
      /eval\(/i,
      /function\(/i
    ];
  }

  // Verificar si el usuario puede enviar un mensaje
  canSendMessage(userId = 'anonymous') {
    const now = Date.now();
    const oneMinute = 60 * 1000;
    
    if (!this.messageHistory.has(userId)) {
      this.messageHistory.set(userId, []);
    }
    
    const userMessages = this.messageHistory.get(userId);
    
    // Limpiar mensajes más antiguos de 1 minuto
    const recentMessages = userMessages.filter(timestamp => now - timestamp < oneMinute);
    this.messageHistory.set(userId, recentMessages);
    
    // Verificar límite
    if (recentMessages.length >= this.maxMessagesPerMinute) {
      return {
        allowed: false,
        reason: 'Demasiados mensajes. Espera un momento antes de enviar otro.',
        remainingTime: Math.ceil((recentMessages[0] + oneMinute - now) / 1000)
      };
    }
    
    return { allowed: true };
  }

  // Registrar un mensaje enviado
  recordMessage(userId = 'anonymous') {
    if (!this.messageHistory.has(userId)) {
      this.messageHistory.set(userId, []);
    }
    
    this.messageHistory.get(userId).push(Date.now());
  }

  // Validar contenido del mensaje
  validateMessage(message) {
    if (!message || typeof message !== 'string') {
      return {
        valid: false,
        reason: 'Mensaje inválido'
      };
    }

    // Verificar longitud
    if (message.length > 500) {
      return {
        valid: false,
        reason: 'Mensaje demasiado largo (máximo 500 caracteres)'
      };
    }

    // Verificar patrones sospechosos
    for (const pattern of this.suspiciousPatterns) {
      if (pattern.test(message)) {
        console.warn('⚠️ Mensaje sospechoso detectado:', message.substring(0, 50));
        return {
          valid: false,
          reason: 'Contenido no permitido'
        };
      }
    }

    return { valid: true };
  }
  // Sanitizar mensaje para prevenir inyecciones
  sanitizeMessage(message) {
    return message
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/javascript:/gi, '')
      .replace(/on\w+\s*=/gi, '')
      .trim();
  }
}

// Singleton para uso global
const securityManager = new SecurityManager();

export default securityManager;
