import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { initializeSettings } from './settings';

// Obtén el contenedor del DOM donde se montará la aplicación
const container = document.getElementById('root');

// Crea una raíz para tu aplicación utilizando createRoot en lugar de ReactDOM.render
const root = createRoot(container);

// Renderiza la aplicación en la raíz
root.render(
  //<React.StrictMode>
    <App />
  //</React.StrictMode>
);

// Inicializa el manejo del chat y la configuración
window.addEventListener("load", () => {
  const chatButton = document.querySelector('[data-buildship-chat-widget-button]');
  const chatContainer = document.querySelector('#buildship-chat-widget__container');

  if (chatButton && chatContainer) {
    // Función para abrir el contenedor del chat
    function openChatContainer() {
      chatContainer.style.display = 'block'; // Muestra el contenedor del chat
      chatButton.classList.add('no-bounce'); // Desactiva la animación del botón
    }

    // Función para cerrar el contenedor del chat
    function closeChatContainer() {
      chatContainer.style.display = 'none'; // Oculta el contenedor del chat
      chatButton.classList.remove('no-bounce'); // Reactiva la animación del botón
    }

    // Configura el botón para alternar el estado del contenedor
    chatButton.addEventListener('click', () => {
      if (chatContainer.style.display === 'block') {
        closeChatContainer();
      } else {
        openChatContainer();
      }
    });

    // Inicializa el contenedor como oculto al cargar la página
    chatContainer.style.display = 'none';
  }

  // Inicializa la configuración
  initializeSettings();
});
