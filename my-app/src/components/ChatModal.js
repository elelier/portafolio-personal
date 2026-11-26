import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { scrollIntoViewWithMotionPreference } from './utils/generalUtils';
import { FaLightbulb, FaChartLine, FaCogs, FaUserAlt, FaBriefcase, FaEnvelope, FaTimes, FaPaperPlane, FaRobot } from 'react-icons/fa';
import { getNavigationContent } from '../config/navigation';
import { homePathFor, isLocalizedHome } from '../i18n/locales';
import { SystemMessage, UserMessage } from '../utils/MessageSystem';
import { getBenefitResponse } from '../utils/benefitResponses';
import TypingIndicator from './TypingIndicator';
import ChatOptionButton from './ChatOptionButton';
import geminiService, { CONTACT_EMAIL } from '../services/geminiService';
import securityService from '../services/securityService';
import '../styles/components/ChatModal.css';


// Accesos rápidos: mismas secciones (id y nombre) que la navegación del sitio.
const SECTION_SHORTCUTS = [
  { key: 'soluciones', icon: FaLightbulb, color: 'blue' },
  { key: 'casosReales', icon: FaChartLine, color: 'cyan' },
  { key: 'comoTrabajo', icon: FaCogs, color: 'yellow' },
  { key: 'sobreMi', icon: FaUserAlt, color: 'orange' },
  { key: 'carrera', icon: FaBriefcase, color: 'purple' },
  { key: 'contact', icon: FaEnvelope, color: 'green' }
];

export const getSectionShortcuts = (language) => {
  const nav = getNavigationContent(language);
  const items = Object.fromEntries([...nav.primary, ...nav.secondary].map((item) => [item.key, item]));
  items.contact = { key: 'contact', label: nav.footerContact, target: 'contacto' };
  return SECTION_SHORTCUTS.map((shortcut) => ({ ...shortcut, label: items[shortcut.key].label, target: items[shortcut.key].target }));
};

const translations = {
  es: {
    title: 'Asistente con IA',
    subtitle: 'Pregúntame sobre el trabajo de Elier',
    inputPlaceholder: 'Escribe un mensaje...',
    sendButton: 'Enviar',
    closeButton: 'Cerrar chat',
    openButton: 'Abrir chat',
    goTo: (label) => `Ir a ${label}`,
    typing: { writing: 'Escribiendo...', thinking: 'Pensando...' },
    welcome: (ai) => `¡Hola! Soy el asistente virtual de <b>Elier Loya</b> ${ai ? '⚡ con IA' : '🤖'}.`,
    help: 'Elier transforma procesos complicados en soluciones que realmente funcionan: diagnóstico operativo, diseño de producto e implementación. ¿Qué te gustaría saber? 💡',
    quickOptions: 'Usa los botones de abajo para ir a una sección del sitio o escríbeme tu pregunta:',
    navigated: (label) => `✨ Te llevé a <b>${label}</b>.`,
    contactNote: `Escríbele a <a href="mailto:${CONTACT_EMAIL}">${CONTACT_EMAIL}</a> o usa el formulario.`
  },
  en: {
    title: 'AI assistant',
    subtitle: "Ask me about Elier's work",
    inputPlaceholder: 'Type a message...',
    sendButton: 'Send',
    closeButton: 'Close chat',
    openButton: 'Open chat',
    goTo: (label) => `Go to ${label}`,
    typing: { writing: 'Writing...', thinking: 'Thinking...' },
    welcome: (ai) => `Hi! I'm <b>Elier Loya's</b> virtual assistant ${ai ? '⚡ AI-powered' : '🤖'}.`,
    help: 'Elier turns complex processes into solutions that actually work: operational diagnosis, product design and implementation. What would you like to know? 💡',
    quickOptions: 'Use the buttons below to jump to a section of the site, or type your question:',
    navigated: (label) => `✨ I took you to <b>${label}</b>.`,
    contactNote: `Email <a href="mailto:${CONTACT_EMAIL}">${CONTACT_EMAIL}</a> or use the form.`
  },
  'pt-br': {
    title: 'Assistente com IA',
    subtitle: 'Pergunte sobre o trabalho de Elier',
    inputPlaceholder: 'Digite uma mensagem...',
    sendButton: 'Enviar',
    closeButton: 'Fechar chat',
    openButton: 'Abrir chat',
    goTo: (label) => `Ir para ${label}`,
    typing: { writing: 'Escrevendo...', thinking: 'Pensando...' },
    welcome: (ai) => `Olá! Sou o assistente virtual de <b>Elier Loya</b> ${ai ? '⚡ com IA' : '🤖'}.`,
    help: 'Elier transforma processos complexos em soluções que realmente funcionam: diagnóstico operacional, design de produto e implementação. O que você quer saber? 💡',
    quickOptions: 'Use os botões abaixo para ir a uma seção do site ou escreva sua pergunta:',
    navigated: (label) => `✨ Levei você para <b>${label}</b>.`,
    contactNote: `Escreva para <a href="mailto:${CONTACT_EMAIL}">${CONTACT_EMAIL}</a> ou use o formulário.`
  }
};

const getTranslations = (language) => translations[language] || translations.es;

const ChatModal = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const t = getTranslations(language);
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
    // Validaciones de seguridad
    const securityCheck = securityService.canSendMessage();
    if (!securityCheck.allowed) {
      const errorMessage = new SystemMessage(`⚠️ ${securityCheck.reason}`);
      setMessages(prev => [...prev, new UserMessage(content), errorMessage]);
      return;
    }

    const messageValidation = securityService.validateMessage(content);
    if (!messageValidation.valid) {
      const errorMessage = new SystemMessage(`⚠️ ${messageValidation.reason}`);
      setMessages(prev => [...prev, new UserMessage(content), errorMessage]);
      return;
    }

    // Sanitizar el contenido
    const sanitizedContent = securityService.sanitizeMessage(content);
    securityService.recordMessage();

    setMessages(prev => [...prev, new UserMessage(sanitizedContent)]);
    
    // Mostrar indicador de typing
    await showTypingIndicator(t.typing.thinking);
    
    try {
      // Intentar obtener respuesta de Gemini AI
      const response = await geminiService.sendMessage(sanitizedContent, language, messages);
      const systemMessage = new SystemMessage(response);
      // Marcar el mensaje como powered by Gemini si está disponible
      if (geminiService.isGeminiAvailable()) {
        systemMessage.isGeminiPowered = true;
      }
      setMessages(prev => [...prev, systemMessage]);
    } catch {
      setMessages(prev => [...prev, new SystemMessage(geminiService.getFallbackResponse(sanitizedContent, language, messages))]);
    }
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
            scrollIntoViewWithMotionPreference(messagesEndRef.current);
          }, 100);
        }
    }
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const initializeChat = async () => {
      if (isOpen && messages.length === 0) {
        // Primer mensaje
        await showTypingIndicator(getTranslations(language).typing.writing, 1000);
        const geminiStatus = await geminiService.initialize();
        setMessages([new SystemMessage(getTranslations(language).welcome(geminiStatus))]);

        await showTypingIndicator(getTranslations(language).typing.writing, 1500);
        setMessages(prev => [...prev, new SystemMessage(getTranslations(language).help)]);

        await showTypingIndicator(getTranslations(language).typing.writing, 1000);
        const quickOptions = getTranslations(language).quickOptions;
        setMessages(prev => [...prev, new SystemMessage(quickOptions)]);
      }
    };

    initializeChat();
  }, [isOpen, language, messages.length]);

  useEffect(() => {
    window.handleBenefitClick = async (benefitText) => {
      const message = language === 'es' 
        ? `Quiero saber más sobre ${benefitText}`
        : language === 'pt-br' ? `Quero saber mais sobre ${benefitText}` : `Tell me more about ${benefitText}`;
      
      setMessages(prev => [...prev, new UserMessage(message)]);
      await showTypingIndicator(getTranslations(language).typing.thinking);

      const benefitResponse = getBenefitResponse(benefitText, language);
      let response = '';

      if (benefitResponse) {
        const { title, description, points } = benefitResponse;
        response = `<div class="message-list"><h4>${title}</h4><p>${description}</p><div class="message-grid">${points.map(point => `<button class="message-item">${point.icon}${point.text.trim()}</button>`).join('')}</div></div>`;
      } else {
        response = language === 'es'
          ? `Me encantaría contarte más sobre ${benefitText}. ¿Qué te gustaría saber específicamente?`
          : language === 'pt-br' ? `Posso explicar mais sobre ${benefitText}. O que você gostaria de saber?` : `I would love to tell you more about ${benefitText}. What would you like to know specifically?`;
      }
      
      setMessages(prev => [...prev, new SystemMessage(response)]);
    };

    return () => {
      delete window.handleBenefitClick;
    };
  }, [language]);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      scrollIntoViewWithMotionPreference(messagesEndRef.current, {
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
      scrollIntoViewWithMotionPreference(messagesEndRef.current);
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

  // Manejar tecla Esc para cerrar modal
  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscapeKey);
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isOpen]);

  const goToSection = ({ label, target }) => {
    const homePath = homePathFor(language);
    setMessages(prev => [...prev, new UserMessage(t.goTo(label)), new SystemMessage(target === 'contacto' ? `${t.navigated(label)} ${t.contactNote}` : t.navigated(label))]);
    setIsOpen(false);
    const section = isLocalizedHome(location.pathname) ? document.getElementById(target) : null;
    if (section) {
      window.history.replaceState(null, '', `${homePath}#${target}`);
      scrollIntoViewWithMotionPreference(section, { block: 'start' });
    } else {
      navigate(`${homePath}#${target}`);
    }
  };

  return (
    <>
      <button 
        className="chat-button"
        onClick={toggleChat}
        aria-label={isOpen ? t.closeButton : t.openButton}
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
                <h3>{t.title}</h3>
                <p>{t.subtitle}</p>
              </div>
            </div>
            <button
              onClick={toggleChat}
              className="close-button"
              aria-label={t.closeButton}
            >
              <FaTimes />
            </button>
          </div>

          <div className="chat-content">
            <div className="messages-container">
              {messages.map((message, index) => (
                <div key={index} className={`message ${message.type} ${message.isGeminiPowered ? 'gemini-powered' : ''}`}>
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
              {getSectionShortcuts(language).map((shortcut) => (
                <ChatOptionButton
                  key={shortcut.key}
                  icon={shortcut.icon}
                  label={shortcut.label}
                  color={shortcut.color}
                  onClick={() => goToSection(shortcut)}
                />
              ))}
            </div>

            <div className="chat-input-container">
              <input
                type="text"
                className="chat-input"
                placeholder={t.inputPlaceholder}
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <button 
                className="send-button" 
                onClick={handleSendMessage}
                aria-label={t.sendButton}
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
