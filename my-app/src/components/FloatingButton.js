import React from 'react';
import '../styles/components/FloatingButton.css';

const FloatingButton = ({ icon, onClick, ariaLabel }) => {
  return (
    <button 
      className="floating-button"
      onClick={onClick}
      aria-label={ariaLabel}
    >
      {icon}
    </button>
  );
};

export default FloatingButton;
