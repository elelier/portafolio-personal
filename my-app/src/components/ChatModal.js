import React, { useState, useRef, useEffect, useCallback } from 'react';
import '../styles/components/ChatModal.css';
import { FaComment, FaTimes, FaRobot, FaInfoCircle, FaLightbulb, FaEnvelope, FaUser, FaCode, FaPlayCircle } from 'react-icons/fa';
import { useLanguage } from '../contexts/LanguageContext';

const ChatModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const { language } = useLanguage();
  const messagesEndRef = useRef(null);

  const translations = {
    es: {
      title: "Chatbots con IA",
      subtitle: "Potencia tu Negocio 24/7",
      inputPlaceholder: "Escribe un mensaje...",
      sendButton: "Enviar",
      closeButton: "Cerrar chat",
      openButton: "Abrir chat",
      options: {
        moreInfo: "Más info",
        seeProjects: "Proyectos",
        requestDemo: "Demo",
        contact: "Contacto"
      },
      steps: [
        {
          content: "👋 ¡Hola! Soy un <b>Chatbot de IA</b> desarrollado por <a href='https://elelier.com' target='_blank'>Elier Loya Mata</a>.",
          delay: 1000
        },
        {
          content: "¿Te imaginas tener un asistente virtual como yo para tu negocio? 🤖✨ ¡Sería increíble! 🚀",
          delay: 1500
        },
        {
          content: `<div class="benefits-list"><h4>Potencia tu negocio con:</h4><div class="benefits-grid">${[
            { icon: '✨', text: 'Atención 24/7' },
            { icon: '💡', text: 'Respuestas al instante' },
            { icon: '📈', text: 'Más conversiones' },
            { icon: '⚡', text: 'Equipo optimizado' },
            { icon: '🌐', text: 'Soporte multilingüe' }
          ].map(benefit => 
            `<button class="benefit-item" onclick="window.handleBenefitClick('${benefit.text}')">${benefit.icon} ${benefit.text}</button>`
          ).join('')}</div></div>`,
          delay: 1000,
          showOptions: true
        }
      ],
      responses: {
        moreInfo: `<div class="message-content">
¡Por supuesto! Además de las funciones básicas, puedo:

✨ Integrarme con tus sistemas existentes
🔍 Aprender de las interacciones con usuarios
📊 Proporcionar análisis detallados
🎯 Personalizar respuestas según el perfil del cliente
🤝 Transferir a agentes humanos cuando sea necesario</div>`,
        seeProjects: "Te mostraré algunos proyectos interesantes...",
        requestDemo: "¡Genial! Prepararé una demo personalizada para ti...",
        contact: "Te conectaré con el desarrollador..."
      }
    },
    en: {
      title: "AI Chatbots",
      subtitle: "Empower Your Business 24/7",
      inputPlaceholder: "Type a message...",
      sendButton: "Send",
      closeButton: "Close chat",
      openButton: "Open chat",
      options: {
        moreInfo: "More info",
        seeProjects: "Projects",
        requestDemo: "Demo",
        contact: "Contact"
      },
      steps: [
        {
          content: "👋 Hi! I'm an <b>AI Chatbot</b> developed by <a href='https://elelier.com' target='_blank'>Elier Loya Mata</a>.",
          delay: 1000
        },
        {
          content: "Imagine having a virtual assistant like me for your business! 🤖✨ It would be amazing! 🚀",
          delay: 1500
        },
        {
          content: `<div class="benefits-list"><h4>Boost your business with:</h4><div class="benefits-grid">${[
            { icon: '✨', text: '24/7 Service' },
            { icon: '💡', text: 'Instant Responses' },
            { icon: '📈', text: 'More Conversions' },
            { icon: '⚡', text: 'Optimized Team' },
            { icon: '🌐', text: 'Multilingual Support' }
          ].map(benefit => 
            `<button class="benefit-item" onclick="window.handleBenefitClick('${benefit.text}')">${benefit.icon} ${benefit.text}</button>`
          ).join('')}</div></div>`,
          delay: 1000,
          showOptions: true
        }
      ],
      responses: {
        moreInfo: `<div class="message-content">
Of course! Besides the basic functions, I can:

✨ Integrate with your existing systems
🔍 Learn from user interactions
📊 Provide detailed analytics
🎯 Personalize responses based on customer profiles
🤝 Transfer to human agents when needed</div>`,
        seeProjects: "I'll show you some interesting projects...",
        requestDemo: "Great! I'll prepare a custom demo for you...",
        contact: "I'll connect you with the developer..."
      }
    }
  };

  const options = [
    { icon: FaLightbulb, label: translations[language].options.moreInfo },
    { icon: FaCode, label: translations[language].options.seeProjects },
    { icon: FaPlayCircle, label: translations[language].options.requestDemo },
    { icon: FaEnvelope, label: translations[language].options.contact }
  ];

  useEffect(() => {
    if (isOpen && currentStep < translations[language].steps.length) {
      setIsTyping(true);
      const timer = setTimeout(() => {
        setMessages(prev => [...prev, {
          type: 'system',
          content: translations[language].steps[currentStep].content
        }]);
        setIsTyping(false);
        setCurrentStep(prev => prev + 1);
        if (translations[language].steps[currentStep].showOptions) {
          setShowOptions(true);
        }
      }, translations[language].steps[currentStep].delay);

      return () => clearTimeout(timer);
    }
  }, [isOpen, currentStep, language]);

  useEffect(() => {
    window.handleBenefitClick = (benefitText) => {
      const message = language === 'es' 
        ? `Quiero saber más sobre ${benefitText}`
        : `Tell me more about ${benefitText}`;
      
      setMessages(prev => [
        ...prev,
        { type: 'user', content: message }
      ]);

      // Simular respuesta del chatbot
      setIsTyping(true);
      setTimeout(() => {
        const response = getBenefitResponse(benefitText, language);
        setMessages(prev => [
          ...prev,
          { type: 'system', content: response }
        ]);
        setIsTyping(false);
      }, 1000);
    };

    return () => {
      delete window.handleBenefitClick;
    };
  }, [language]);

  const getBenefitResponse = (benefitText, lang) => {
    const responses = {
      es: {
        'Atención 24/7': `La atención 24/7 significa que tu negocio nunca duerme:
• Respuestas instantáneas a cualquier hora
• Soporte continuo para clientes globales
• Sin tiempos muertos ni esperas
• Mayor satisfacción del cliente
• Ventaja competitiva significativa`,
        'Respuestas al instante': `Con respuestas instantáneas mejoras la experiencia:
• Sin tiempos de espera
• Respuestas precisas y consistentes
• Menor carga para tu equipo
• Mayor retención de clientes
• Eficiencia operativa mejorada`,
        'Más conversiones': `Aumenta tus conversiones significativamente:
• Captura leads 24/7
• Califica prospectos automáticamente
• Reduce el abandono
• Optimiza el embudo de ventas
• Seguimiento automático`,
        'Equipo optimizado': `Optimiza el rendimiento de tu equipo:
• Automatiza tareas repetitivas
• Reduce la carga de trabajo
• Mejora la productividad
• Enfoque en tareas importantes
• Escalabilidad sin límites`,
        'Soporte multilingüe': `Alcance global con soporte multilingüe:
• Comunícate en varios idiomas
• Expande tu mercado
• Personalización por región
• Mejor experiencia local
• Alcance internacional`
      },
      en: {
        '24/7 Service': `24/7 service means your business never sleeps:
• Instant responses anytime
• Continuous support for global customers
• No downtime or waiting
• Increased customer satisfaction
• Significant competitive advantage`,
        'Instant Responses': `With instant responses you improve experience:
• No waiting times
• Accurate and consistent answers
• Reduced team workload
• Better customer retention
• Improved operational efficiency`,
        'More Conversions': `Significantly increase your conversions:
• Capture leads 24/7
• Automatically qualify prospects
• Reduce abandonment
• Optimize sales funnel
• Automatic follow-up`,
        'Optimized Team': `Optimize your team's performance:
• Automate repetitive tasks
• Reduce workload
• Improve productivity
• Focus on important tasks
• Unlimited scalability`,
        'Multilingual Support': `Global reach with multilingual support:
• Communicate in multiple languages
• Expand your market
• Regional customization
• Better local experience
• International reach`
      }
    };

    return responses[lang][benefitText] || (lang === 'es' 
      ? 'Me encantaría contarte más sobre esto. ¿Qué te gustaría saber específicamente?'
      : 'I would love to tell you more about this. What would you like to know specifically?');
  };

  const scrollToBottom = useCallback(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      scrollToBottom();
    }, 100); // pequeño delay para asegurar que el contenido se ha renderizado
    return () => clearTimeout(timer);
  }, [messages, isTyping, scrollToBottom]);

  const handleOptionClick = (option) => {
    setMessages(prev => [
      ...prev,
      { type: 'user', content: option.label },
      { type: 'system', content: translations[language].responses[option.label] }
    ]);
  };

  const toggleChat = () => {
    if (!isOpen) {
      setMessages([]);
      setCurrentStep(0);
      setShowOptions(false);
    }
    setIsOpen(!isOpen);
  };

  const handleInputChange = (e) => {
    setInputMessage(e.target.value);
  };

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      setMessages([...messages, { type: 'user', content: inputMessage }]);
      setInputMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <>
      <button 
        className="chat-button"
        onClick={toggleChat}
        aria-label={translations[language].openButton}
      >
        <FaComment />
      </button>

      {isOpen && (
        <div className="chat-modal">
          <div className="chat-header">
            <div className="chat-header-content">
              <div className="chat-header-title">
                <FaRobot className="header-icon" />
                <span>{translations[language].title}</span>
              </div>
              <p className="chat-subtitle">{translations[language].subtitle}</p>
            </div>
            <button
              onClick={toggleChat}
              className="close-button"
              aria-label={translations[language].closeButton}
            >
              <FaTimes />
            </button>
          </div>
          <div className="chat-content">
            <div className="messages-container">
              {messages.map((message, index) => (
                <div key={index} className={`message ${message.type}`}>
                  <div className="message-content" dangerouslySetInnerHTML={{ __html: message.content }} />
                </div>
              ))}
              {isTyping && (
                <div className="message system typing-animation">
                  {language === 'es' ? "Escribiendo" : "Typing"}
                </div>
              )}
              <div ref={messagesEndRef} style={{ height: '1px', width: '100%' }} />
            </div>
          </div>
          <div className="chat-footer">
            {showOptions && (
              <div className="chat-options-icons">
                {options.map((option, index) => (
                  <button
                    key={index}
                    className="chat-option-icon"
                    onClick={() => handleOptionClick(option)}
                    title={option.label}
                  >
                    {option.icon && <option.icon />}
                    <span className="option-tooltip">{option.label}</span>
                  </button>
                ))}
              </div>
            )}
            <div className="chat-input-container">
              <input
                type="text"
                className="chat-input"
                placeholder={language === 'es' ? "Escribe un mensaje..." : "Type a message..."}
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <button className="send-button" onClick={handleSendMessage}>
                <FaPlayCircle />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatModal;
