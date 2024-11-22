import React from 'react';
import '../styles/components/TypingIndicator.css';

const TypingIndicator = () => {
  return (
    <div className="typing-container">
      <div className="typing-content">
        <div className="typing-indicator">
          <div className="typing-circle"></div>
          <div className="typing-circle"></div>
          <div className="typing-circle"></div>
          <div className="typing-shadow"></div>
          <div className="typing-shadow"></div>
          <div className="typing-shadow"></div>
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;
