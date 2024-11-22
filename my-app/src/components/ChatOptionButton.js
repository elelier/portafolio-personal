import React from 'react';
import '../styles/components/ChatOptionButton.css';

const ChatOptionButton = ({ icon: Icon, label, color, onClick }) => {
  return (
    <button
      className={`chat-option-button ${color}`}
      onClick={onClick}
      aria-label={label}
    >
      {Icon && <Icon className="button-icon" />}
      <span className="option-tooltip">{label}</span>
    </button>
  );
};

export default ChatOptionButton;
