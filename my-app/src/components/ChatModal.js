import React, { useState, useRef, useEffect, useCallback } from 'react';
import '../styles/components/ChatModal.css';
import { FaComment, FaTimes, FaRobot, FaInfoCircle, FaLightbulb, FaEnvelope, FaUser, FaCode, FaPlayCircle } from 'react-icons/fa';
import { useLanguage } from '../contexts/LanguageContext';
import benefitResponses from '../data/benefitResponses.json';

const ChatModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const messagesEndRef = useRef(null);
  const { language } = useLanguage();

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
          content: "¡Hola! Soy un <b>Chatbot de IA</b> desarrollado por <a href='https://elelier.com' target='_blank'>Elier Loya Mata</a>.",
          delay: 1000
        },
        {
          content: "¿Te imaginas tener un asistente virtual como yo para tu negocio?  ¡Sería increíble! ",
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

 Integrarme con tus sistemas existentes
 Aprender de las interacciones con usuarios
 Proporcionar análisis detallados
 Personalizar respuestas según el perfil del cliente
 Transferir a agentes humanos cuando sea necesario</div>`,
        seeProjects: "Te mostraré algunos proyectos interesantes...",
        requestDemo: "¡Genial! Prepararé una demo personalizada para ti...",
        contact: "Te conectaré con el desarrollador..."
      },
      aboutMe: 'Sobre mí',
      skills: 'Habilidades',
      contact: 'Contacto',
      viewCode: 'Ver código',
      viewDemo: 'Ver demo',
      demoRequest: '¿Me puedes mostrar una demo?',
      demoResponse: `
        <div>
          ¡Claro! Aquí tienes algunos ejemplos de lo que puedo hacer:
          
          <ul>
            <li> Responder preguntas sobre mi experiencia y habilidades</li>
            <li> Navegar a diferentes secciones del portafolio</li>
            <li> Facilitar el contacto directo</li>
            <li> Mostrar proyectos y código</li>
            <li> Proporcionar información detallada sobre servicios</li>
          </ul>

          ¿Qué te gustaría explorar primero?
        </div>
      `,
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
          content: "Hi! I'm an <b>AI Chatbot</b> developed by <a href='https://elelier.com' target='_blank'>Elier Loya Mata</a>.",
          delay: 1000
        },
        {
          content: "Imagine having a virtual assistant like me for your business!  It would be amazing! ",
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

 Integrate with your existing systems
 Learn from user interactions
 Provide detailed analytics
 Personalize responses based on customer profiles
 Transfer to human agents when needed</div>`,
        seeProjects: "I'll show you some interesting projects...",
        requestDemo: "Great! I'll prepare a custom demo for you...",
        contact: "I'll connect you with the developer..."
      },
      aboutMe: 'About me',
      skills: 'Skills',
      contact: 'Contact',
      viewCode: 'View code',
      viewDemo: 'View demo',
      demoRequest: 'Can you show me a demo?',
      demoResponse: `
        <div>
          Sure! Here are some examples of what I can do:
          
          <ul>
            <li> Answer questions about my experience and skills</li>
            <li> Navigate to different portfolio sections</li>
            <li> Facilitate direct contact</li>
            <li> Show projects and code</li>
            <li> Provide detailed information about services</li>
          </ul>

          What would you like to explore first?
        </div>
      `,
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
    const response = benefitResponses[lang][benefitText];
    if (!response) {
      return lang === 'es'
        ? 'Me encantaría contarte más sobre esto. ¿Qué te gustaría saber específicamente?'
        : 'I would love to tell you more about this. What would you like to know specifically?';
    }

    return `<div class="benefits-list">
      <div class="benefit-header">
        <h4 class="benefit-title">${response.title}</h4>
        <p class="benefit-description">${response.description}</p>
      </div>
      <div class="benefits-grid">
        ${response.points.map(point => 
          `<div class="benefit-item">${point.icon} ${point.text}</div>`
        ).join('')}
      </div>
    </div>`;
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

  const handleOptionClick = (optionType) => {
    switch (optionType) {
      case 'info':
        handleScrollToElement('sobre-mi');
        setIsOpen(false);
        break;
      case 'skills':
        handleScrollToElement('habilidades');
        setIsOpen(false);
        break;
      case 'contact':
        handleScrollToElement('contacto');
        setIsOpen(false);
        break;
      case 'code':
        window.open('https://github.com/tu-usuario', '_blank');
        break;
      case 'demo':
        // Aquí puedes agregar la lógica para mostrar una demo o portafolio
        addMessage({ type: 'user', content: translations[language].demoRequest });
        addMessage({ 
          type: 'system', 
          content: translations[language].demoResponse,
          html: true 
        });
        break;
    }
  };

  const handleScrollToElement = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const addMessage = (message) => {
    setMessages(prev => [...prev, message]);
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
                <button 
                  className="chat-option-icon"
                  onClick={() => handleOptionClick('info')}
                  aria-label={translations[language].aboutMe}
                >
                  <FaInfoCircle />
                  <span className="option-tooltip">{translations[language].aboutMe}</span>
                </button>
                <button 
                  className="chat-option-icon"
                  onClick={() => handleOptionClick('skills')}
                  aria-label={translations[language].skills}
                >
                  <FaLightbulb />
                  <span className="option-tooltip">{translations[language].skills}</span>
                </button>
                <button 
                  className="chat-option-icon"
                  onClick={() => handleOptionClick('contact')}
                  aria-label={translations[language].contact}
                >
                  <FaEnvelope />
                  <span className="option-tooltip">{translations[language].contact}</span>
                </button>
                <button 
                  className="chat-option-icon"
                  onClick={() => handleOptionClick('code')}
                  aria-label={translations[language].viewCode}
                >
                  <FaCode />
                  <span className="option-tooltip">{translations[language].viewCode}</span>
                </button>
                <button 
                  className="chat-option-icon"
                  onClick={() => handleOptionClick('demo')}
                  aria-label={translations[language].viewDemo}
                >
                  <FaPlayCircle />
                  <span className="option-tooltip">{translations[language].viewDemo}</span>
                </button>
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
