import React, { useState } from 'react';
import '../styles/components/ChatModal.css';
import { FaComment, FaTimes } from 'react-icons/fa';

const ChatModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button 
        className="floating-button chat-button"
        onClick={toggleChat}
        aria-label="Abrir chat"
      >
        <FaComment />
      </button>

      {isOpen && (
        <div className="chat-modal">
          <div className="chat-header">
            <h3>Chat</h3>
            <button 
              className="close-button"
              onClick={toggleChat}
              aria-label="Cerrar chat"
            >
              <FaTimes />
            </button>
          </div>
          <div className="chat-body">
            <div className="message system">
              ¡Hola! ¿En qué puedo ayudarte?
            </div>
            {/* Aquí puedes agregar más mensajes o un formulario de chat */}
          </div>
          <div className="chat-footer">
            <input 
              type="text" 
              placeholder="Escribe un mensaje..."
              className="chat-input"
            />
            <button className="send-button">Enviar</button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatModal;
