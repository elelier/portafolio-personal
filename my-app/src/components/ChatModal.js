import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { FaRocket, FaUserAlt, FaCogs, FaCode, FaEnvelope, FaTimes, FaPaperPlane, FaRobot } from 'react-icons/fa';
import { SystemMessage, UserMessage } from '../utils/MessageSystem';
import { getBenefitResponse } from '../utils/benefitResponses';
import TypingIndicator from './TypingIndicator';
import ChatOptionButton from './ChatOptionButton';
import '../styles/components/ChatModal.css';

const translations = {
  es: {
    title: "Chatbots con IA",
    subtitle: "Potencia tu Negocio 24/7",
    inputPlaceholder: "Escribe un mensaje...",
    sendButton: "Enviar",
    closeButton: "Cerrar chat",
    openButton: "Abrir chat",
    benefits: "Beneficios",
    aboutMe: "Sobre mí",
    skills: "Habilidades",
    projects: "Proyectos",
    contact: "Contacto",
    chatWithAI: "Chat con IA",
    typing: {
      writing: "Escribiendo...",
      processing: "Procesando...",
      analyzing: "Analizando...",
      thinking: "Pensando...",
      calculating: "Calculando...",
      redirecting: "Redirigiendo..."
    },
    sections: {
      benefits: "la sección de Beneficios",
      aboutMe: "la sección Sobre Mí",
      skills: "la sección de Habilidades",
      projects: "la sección de Proyectos",
      contact: "la sección de Contacto"
    },
    closeMessage: "Puedes cerrar esta ventana haciendo clic en X, <close_action>aquí</close_action> o en cualquier lugar fuera",
    aboutMeResponse: 'Soy un desarrollador web con experiencia en tecnologías como React, Node.js y MongoDB.',
    skillsResponse: 'Tengo habilidades en desarrollo web, diseño UX/UI y resolución de problemas.',
    projectsResponse: 'He trabajado en proyectos de e-commerce, aplicaciones móviles y sitios web institucionales.',
    contactResponse: 'Puedes contactarme a través de mi sitio web o redes sociales.',
    redirectMessages: {
      nowOn: (section) => `Ahora estás en ${section}.`,
      close: 'Puedes cerrar esta ventana haciendo clic en <span style="color: var(--color-accent)">X</span>, <span style="color: var(--color-accent)">aquí</span> o en cualquier lugar fuera'
    }
  },
  en: {
    title: "AI Chatbots",
    subtitle: "Power Your Business 24/7",
    inputPlaceholder: "Type a message...",
    sendButton: "Send",
    closeButton: "Close chat",
    openButton: "Open chat",
    benefits: "Benefits",
    aboutMe: "About me",
    skills: "Skills",
    projects: "Projects",
    contact: "Contact",
    chatWithAI: "Chat with AI",
    typing: {
      writing: "Writing...",
      processing: "Processing...",
      analyzing: "Analyzing...",
      thinking: "Thinking...",
      calculating: "Calculating...",
      redirecting: "Redirecting..."
    },
    sections: {
      benefits: "Benefits section",
      aboutMe: "About Me section",
      skills: "Skills section",
      projects: "Projects section",
      contact: "Contact section"
    },
    closeMessage: "You can close this window by clicking X, <close_action>here</close_action> or anywhere outside",
    aboutMeResponse: 'I am a web developer with experience in technologies like React, Node.js, and MongoDB.',
    skillsResponse: 'I have skills in web development, UX/UI design, and problem-solving.',
    projectsResponse: 'I have worked on e-commerce projects, mobile applications, and institutional websites.',
    contactResponse: 'You can contact me through my website or social networks.',
    redirectMessages: {
      nowOn: (section) => `You are now on the ${section}.`,
      close: 'You can close this window by clicking <span style="color: var(--color-accent)">X</span>, <span style="color: var(--color-accent)">here</span> or anywhere outside'
    }
  }
};

const ChatModal = () => {
  const { language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [typingIndicator, setTypingIndicator] = useState({ show: false, text: '' });
  const messagesEndRef = useRef(null);

  const showTypingIndicator = (text, duration = 2000) => {
    setTypingIndicator({ show: true, text });
    return new Promise(resolve => {
      setTimeout(() => {
        setTypingIndicator({ show: false, text: '' });
        resolve();
      }, duration);
    });
  };

  const handleUserMessage = async (content) => {
    setMessages(prev => [...prev, new UserMessage(content)]);
    await showTypingIndicator(translations[language].typing.thinking);
    setMessages(prev => [...prev, new SystemMessage(`Echo: ${content}`)]);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && inputMessage.trim()) {
      const message = inputMessage.trim();
      setInputMessage('');
      handleUserMessage(message);
    }
  };

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      const message = inputMessage.trim();
      setInputMessage('');
      handleUserMessage(message);
    }
  };

  const handleModalClick = (e) => {
    // Si el clic fue en un botón de opción o dentro del input, no hacemos nada
    if (e.target.closest('.chat-option') || e.target.closest('.chat-input-container')) {
      return;
    }
  };

  const toggleChat = () => {
    if (!isOpen) {
      // Si hay histórico, hacemos scroll al final después de que se abra
      if (messages.length > 0) {
        setTimeout(() => {
          messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const initializeChat = async () => {
      if (isOpen && messages.length === 0) {
        // Primer mensaje
        await showTypingIndicator(translations[language].typing.writing, 1000);
        const welcomeMessage = language === 'es'
          ? `¡Hola! Soy un <b>🤖 Chatbot de IA</b> desarrollado por <a href='https://elelier.com' target='_blank'>Elier Loya Mata</a>.`
          : `Hi! I'm an <b>🤖 AI Chatbot</b> developed by <a href='https://elelier.com' target='_blank'>Elier Loya Mata</a>.`;
        setMessages([new SystemMessage(welcomeMessage)]);
        
        // Segundo mensaje
        await showTypingIndicator(translations[language].typing.writing, 1500);
        const imagineMessage = language === 'es'
          ? `🌟¿Te imaginas tener un asistente virtual como yo para tu empresa? 💻 ¡Sería increíble!`
          : `🌟Can you imagine having a virtual assistant like me for your business? 💻 It would be amazing!`;
        setMessages(prev => [...prev, new SystemMessage(imagineMessage)]);

        // Tercer mensaje con beneficios
        await showTypingIndicator(translations[language].typing.writing, 1000);
        const benefits = [
          { icon: '✨', text: language === 'es' ? 'Atención 24/7' : '24/7 Service' },
          { icon: '💡', text: language === 'es' ? 'Respuestas al instante' : 'Instant Responses' },
          { icon: '📈', text: language === 'es' ? 'Más conversiones' : 'More Conversions' },
          { icon: '⚡', text: language === 'es' ? 'Equipo optimizado' : 'Optimized Team' },
          { icon: '🌐', text: language === 'es' ? 'Soporte multilingüe' : 'Multilingual Support' }
        ];
        setMessages(prev => [...prev, SystemMessage.createBenefitsMessage(language, benefits)]);
      }
    };

    initializeChat();
  }, [isOpen, language, messages.length]);

  useEffect(() => {
    window.handleBenefitClick = async (benefitText) => {
      const message = language === 'es' 
        ? `Quiero saber más sobre ${benefitText}`
        : `Tell me more about ${benefitText}`;
      
      setMessages(prev => [...prev, new UserMessage(message)]);
      await showTypingIndicator(translations[language].typing.thinking);

      const benefitResponse = getBenefitResponse(benefitText, language);
      let response = '';

      if (benefitResponse) {
        const { title, description, points } = benefitResponse;
        response = `<div class="message-list"><h4>${title}</h4><p>${description}</p><div class="message-grid">${points.map(point => `<button class="message-item">${point.icon}${point.text.trim()}</button>`).join('')}</div></div>`;
      } else {
        response = language === 'es'
          ? `Me encantaría contarte más sobre ${benefitText}. ¿Qué te gustaría saber específicamente?`
          : `I would love to tell you more about ${benefitText}. What would you like to know specifically?`;
      }
      
      setMessages(prev => [...prev, new SystemMessage(response)]);
    };

    return () => {
      delete window.handleBenefitClick;
    };
  }, [language]);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ 
        behavior: 'smooth',
        block: 'end',
        inline: 'nearest'
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, typingIndicator.show]); // Se ejecuta cuando hay nuevos mensajes o cambia el indicador de typing

  useEffect(() => {
    if (isOpen && messages.length > 0) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isOpen, messages]);

  const handleCloseAction = (e) => {
    const target = e.target;
    if (target.tagName === 'CLOSE_ACTION' || target.closest('close_action')) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleCloseAction);
    return () => {
      document.removeEventListener('click', handleCloseAction);
    };
  }, []);

  const handleConstructionMessage = async (section) => {
    const constructionMessage = language === 'es'
      ? `🚧 ¡En construcción! 👷‍♂️\nLa sección de ${section} estará disponible próximamente.`
      : `🚧 Under Construction! 👷‍♂️\nThe ${section} section will be available soon.`;
    
    setMessages(prev => [...prev, new SystemMessage(constructionMessage)]);
  };

  return (
    <>
      <button 
        className="chat-button"
        onClick={toggleChat}
        aria-label={isOpen ? translations[language].closeButton : translations[language].openButton}
      >
        <FaRobot />
      </button>

      {isOpen && (
        <div className="chat-modal" onClick={handleModalClick}>
          <div className="chat-header">
            <div className="chat-title">
              <div className="header-icon-container">
                <FaRobot className="header-icon" />
              </div>
              <div className="header-text">
                <h3>{translations[language].title}</h3>
                <p>{translations[language].subtitle}</p>
              </div>
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
              {typingIndicator.show && (
                <div className="message system">
                  <TypingIndicator text={typingIndicator.text} />
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>

          <div className="chat-bottom-container">
            <div className="chat-options-grid">
              <ChatOptionButton
                icon={FaUserAlt}
                label={translations[language].sections.aboutMe}
                color="blue"
                onClick={() => handleConstructionMessage(translations[language].sections.aboutMe)}
              />
              <ChatOptionButton
                icon={FaRocket}
                label={translations[language].sections.benefits}
                color="cyan"
                onClick={() => handleConstructionMessage(translations[language].sections.benefits)}
              />
              <ChatOptionButton
                icon={FaCogs}
                label={translations[language].sections.skills}
                color="yellow"
                onClick={() => handleConstructionMessage(translations[language].sections.skills)}
              />
              <ChatOptionButton
                icon={FaCode}
                label={translations[language].sections.projects}
                color="orange"
                onClick={() => handleConstructionMessage(translations[language].sections.projects)}
              />
              <ChatOptionButton
                icon={FaEnvelope}
                label={translations[language].sections.contact}
                color="purple"
                onClick={() => handleConstructionMessage(translations[language].sections.contact)}
              />
            </div>

            <div className="chat-input-container">
              <input
                type="text"
                className="chat-input"
                placeholder={translations[language].inputPlaceholder}
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <button 
                className="send-button" 
                onClick={handleSendMessage}
                aria-label={translations[language].sendButton}
              >
                <FaPaperPlane />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatModal;
