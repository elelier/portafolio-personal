import React, { useEffect, useState } from 'react';
import styles from './ChatWidget.module.css';

const ChatWidget = () => {
  const [isWidgetLoaded, setIsWidgetLoaded] = useState(false);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/@buildshipapp/chat-widget@^1';
    script.defer = true;
    script.onload = () => setIsWidgetLoaded(true);
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    if (isWidgetLoaded && window.buildShipChatWidget) {
      configureChatWidget();
    }
  }, [isWidgetLoaded]);

  const configureChatWidget = () => {
    window.buildShipChatWidget.config = {
      url: "https://81ocg9.buildship.run/el_bot",
      widgetTitle: "¿Quieres un Chatbot?",
      widgetBranding: "¿Quieres un chatbot para ti?",
      greetingMessage: `
        ¡Hola! Soy un <b>Chatbot desarrollado por <a href="https://elelier.com" target="_blank" style="color: #7dd3fc;">Elier Loya Mata</a></b> para <b><a href="#hero-banner" style="color: #7dd3fc;">este portafolio</a></b>.
        <br><br>
        <b>¿Cómo puedo asistirte hoy?</b>
        <ul style="color: #f6f9fc; padding-left: 20px;">
          <li><a href="#portafolio" onclick="scrollToSection('portafolio'); return false;" style="color: #7dd3fc;">Ver Proyectos</a></li>
          <li><a href="#servicios" onclick="scrollToSection('servicios'); return false;" style="color: #7dd3fc;">Conocer Servicios</a></li>
          <li><a href="#contacto" onclick="scrollToSection('contacto'); return false;" style="color: #7dd3fc;">Contáctame</a></li>
          <li><a href="#sobre-mi" onclick="scrollToSection('sobre-mi'); return false;" style="color: #7dd3fc;">Más Sobre Mi</a></li>
        </ul>
        <br>
        Explora <a href="#hero-banner" onclick="scrollToSection('hero-banner'); return false;" style="color: #7dd3fc;">mi sitio web</a> para más información.
        <br><br>
        ¡Estoy aquí para ayudarte a encontrar lo que necesitas!
      `,
      width: 300,
      height: 500,
    };

    setTimeout(() => {
      const titleElement = document.querySelector('.buildship-chat-widget__branding');
      if (titleElement) {
        titleElement.style.display = 'none';
      }
    }, 100);
  };

  return (
    <div>
      <button className={styles.chatButton} data-buildship-chat-widget-button>
        <i className="fas fa-robot"></i> ¡Hola!
      </button>
    </div>
  );
};

export default ChatWidget;