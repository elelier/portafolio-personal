import React, { useState, useContext, useEffect, useRef } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import '../styles/components/SettingsMenu.css';

const SettingsMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { currentTheme, setTheme } = useContext(ThemeContext);
  const { language, setLanguage } = useLanguage();
  const menuRef = useRef(null);
  const menuPanelRef = useRef(null);
  const toggleRef = useRef(null);

  const labels = {
    es: {
      open: 'Abrir configuración',
      close: 'Cerrar configuración',
      light: 'Modo claro',
      dark: 'Modo oscuro',
      system: 'Tema del sistema',
      language: 'Idioma'
    },
    en: {
      open: 'Open settings',
      close: 'Close settings',
      light: 'Light mode',
      dark: 'Dark mode',
      system: 'System theme',
      language: 'Language'
    },
    'pt-br': {
      open: 'Abrir configurações',
      close: 'Fechar configurações',
      light: 'Tema claro',
      dark: 'Tema escuro',
      system: 'Tema do sistema',
      language: 'Idioma'
    }
  };

  const t = labels[language] || labels.en;

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

  useEffect(() => {
    if (!menuPanelRef.current) {
      return;
    }

    if (isMenuOpen) {
      menuPanelRef.current.removeAttribute('inert');
    } else {
      menuPanelRef.current.setAttribute('inert', '');
    }
  }, [isMenuOpen]);

  useEffect(() => {
    if (!isMenuOpen) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key !== 'Escape') {
        return;
      }

      event.preventDefault();
      setIsMenuOpen(false);
      toggleRef.current?.focus();
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMenuOpen]);

  return (
    <div className="settings-menu-container" ref={menuRef}>
      <button
        ref={toggleRef}
        className="settings-toggle"
        type="button"
        aria-expanded={isMenuOpen}
        aria-controls="settings-menu"
        aria-label={isMenuOpen ? t.close : t.open}
        onClick={toggleMenu}
      >
        <i className="fas fa-cog settings-icon" aria-hidden="true" />
      </button>
      <div
        id="settings-menu"
        ref={menuPanelRef}
        className={`settings-menu ${isMenuOpen ? 'open' : ''}`}
        aria-hidden={!isMenuOpen}
      >
        <div className="settings-theme-group">
          <button
            type="button"
            data-settings-theme="light"
            className="settings-option-button"
            aria-pressed={currentTheme === 'light'}
            aria-label={t.light}
            onClick={() => handleThemeChange('light')}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <i className="fas fa-sun" aria-hidden="true"></i>
            <span className="tooltip">{t.light}</span>
          </button>
          <button
            type="button"
            data-settings-theme="dark"
            className="settings-option-button"
            aria-pressed={currentTheme === 'dark'}
            aria-label={t.dark}
            onClick={() => handleThemeChange('dark')}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <i className="fas fa-moon" aria-hidden="true"></i>
            <span className="tooltip">{t.dark}</span>
          </button>
          <button
            type="button"
            data-settings-theme="system"
            className="settings-option-button"
            aria-pressed={currentTheme === 'system'}
            aria-label={t.system}
            onClick={() => handleThemeChange('system')}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <i className="fas fa-desktop" aria-hidden="true"></i>
            <span className="tooltip">{t.system}</span>
          </button>
        </div>
        <div className="settings-language-group" role="group" aria-label={t.language}>
          {[
            { code: 'es', label: 'Español', short: 'ES' },
            { code: 'en', label: 'English', short: 'EN' },
            { code: 'pt-br', label: 'Português (Brasil)', short: 'PT' }
          ].map((option) => (
            <button
              key={option.code}
              type="button"
              data-settings-language={option.code}
              className="settings-option-button language-toggle"
              aria-pressed={language === option.code}
              aria-label={option.label}
              lang={option.code === 'pt-br' ? 'pt-BR' : option.code}
              title={option.label}
              onClick={() => { setLanguage(option.code); setIsMenuOpen(false); }}
            >
              <span aria-hidden="true">{option.short}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SettingsMenu;
