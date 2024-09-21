import React, { useState, useContext, useEffect, useRef } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import '../styles/components/SettingsMenu.css';

const SettingsMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { currentTheme, setTheme } = useContext(ThemeContext);
  const { language, toggleLanguage } = useLanguage();
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleMouseEnter = (event) => {
    const tooltip = event.currentTarget.querySelector('.tooltip');
    if (tooltip) {
      const tooltipWidth = tooltip.offsetWidth;
      tooltip.style.left = `${event.clientX - tooltipWidth - 20}px`;
      tooltip.style.top = `${event.clientY}px`;
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

  const handleThemeChange = (theme) => {
    setTheme(theme);
  };

  return (
    <div className="settings-menu-container" ref={menuRef}>
      <button
        className="settings-toggle"
        aria-label="Toggle settings"
        onClick={toggleMenu}
      >
        <i className="fas fa-cog settings-icon" alt="Settings" />
      </button>
      <div className={`settings-menu ${isMenuOpen ? 'open' : ''}`}>
        <div
          className={`settings-option ${currentTheme === 'light' ? 'active' : ''}`}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleThemeChange('light')}
        >
          <i className="fas fa-sun"></i>
          <div className="tooltip">Light Mode</div>
        </div>
        <div
          className={`settings-option ${currentTheme === 'dark' ? 'active' : ''}`}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleThemeChange('dark')}
        >
          <i className="fas fa-moon"></i>
          <div className="tooltip">Dark Mode</div>
        </div>
        <div
          className={`settings-option ${currentTheme === 'system' ? 'active' : ''}`}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleThemeChange('system')}
        >
          <i className="fas fa-desktop"></i>
          <div className="tooltip">System Theme</div>
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
          <div className="tooltip">{language === 'en' ? 'English' : 'Español'}</div>
        </div>
      </div>
    </div>
  );
};

export default SettingsMenu;