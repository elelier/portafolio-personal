import React, { useState, useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';  // Cambia esta línea
import '../styles/components/SettingsMenu.css';

const SettingsMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { currentTheme, toggleTheme } = useContext(ThemeContext);
  const { language, toggleLanguage } = useLanguage();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleMouseEnter = (event) => {
    const tooltip = event.currentTarget.querySelector('.tooltip');
    if (tooltip) {
      const tooltipWidth = tooltip.offsetWidth; // Obtén el ancho del tooltip
      tooltip.style.left = `${event.clientX - tooltipWidth - 10}px`; // Posiciona a la izquierda del mouse
      tooltip.style.top = `${event.clientY}px`; // Alinea verticalmente con el mouse
      tooltip.style.visibility = 'visible';
      tooltip.style.opacity = 1;
    }
  };

  const handleMouseLeave = (event) => {
    const tooltip = event.currentTarget.querySelector('.tooltip');
    if (tooltip) {
      tooltip.style.visibility = 'hidden';
      tooltip.style.opacity = 0;
    }
  };

  return (
    <div className="settings-menu-container">
      <button
        className="settings-toggle"
        aria-label="Toggle settings"
        onClick={toggleMenu}
      >
        <i className="fas fa-cog settings-icon" alt="Settings" />
      </button>
      {isMenuOpen && (
        <div className="settings-menu">
          <div
            className="settings-option"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={toggleTheme}
          >
            <div className="tooltip">{currentTheme === 'light' ? 'Dark Mode' : 'Light Mode'}</div>
            <i className={`fas fa-${currentTheme === 'light' ? 'sun' : 'moon'}`}></i>
          </div>
          <div
            className="settings-option language-toggle"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={toggleLanguage}
          >
            <img
              src={language === 'en' ? '/assets/files/flag-us.png' : '/assets/files/flag-mx.png'}
              alt="Flag"
              className="flag-image"
            />
            <span className="language-toggle-button">{language.toUpperCase()}</span>
            <div className="tooltip">{language === 'en' ? 'English' : 'Español'}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsMenu;