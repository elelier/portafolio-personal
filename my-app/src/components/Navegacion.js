import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../LanguageContext';
import './css/Navegacion.css';
import mxFlag from './assets/files/mx_flag.png';
import usFlag from './assets/files/us_flag.png';
import gearIcon  from './assets/files/gear.svg';

function Navegacion() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [activeSetting, setActiveSetting] = useState(null);
  const { language, toggleLanguage } = useLanguage();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const toggleSettings = () => {
    setSettingsOpen(!settingsOpen);
  };

  const handleScrollToElement = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      closeMenu();
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Aquí nos aseguramos que al hacer clic fuera del menú, se cierre
      if (menuOpen && !event.target.closest('.nav-content') && !event.target.closest('.menu-toggle')) {
        closeMenu();
      }

      // Aquí cerramos el menú de settings si está abierto y se hace clic afuera
      if (settingsOpen && !event.target.closest('.settings-menu') && !event.target.closest('.settings-toggle')) {
        setSettingsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [menuOpen, settingsOpen]);

  const navItems = {
    es: {
      sobreMi: 'Sobre Mí',
      habilidades: 'Habilidades',
      portafolio: 'Portafolio',
      servicios: 'Servicios',
      contactame: 'Contáctame'
    },
    en: {
      sobreMi: 'About Me',
      habilidades: 'Skills',
      portafolio: 'Portfolio',
      servicios: 'Services',
      contactame: 'Contact Me'
    }
  };

  return (
    <nav className="navegacion" role="navigation" aria-label="Navegación principal">
      <div className="nav-content">
        <div className="logo-container">
          <Link to="/" onClick={() => handleScrollToElement('hero-banner')}>
            <div className="logo">Elier Loya Mata</div>
          </Link>
        </div>
        <button className="settings-toggle" onClick={toggleSettings} aria-label="Toggle settings">
          <img src={gearIcon} alt="Settings" className="settings-icon" />
        </button>
        <button className="menu-toggle" onClick={toggleMenu} aria-label="Toggle menu">
          {menuOpen ? '✖' : '☰'}
        </button>
        <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
          <li><Link to="/" onClick={() => handleScrollToElement('hero-banner')}><i className="fas fa-home"></i></Link></li>
          <li><Link to="/" onClick={() => handleScrollToElement('sobre-mi')}>{navItems[language].sobreMi}</Link></li>
          <li><Link to="/" onClick={() => handleScrollToElement('habilidades')}>{navItems[language].habilidades}</Link></li>
          <li><Link to="/" onClick={() => handleScrollToElement('portafolio')}>{navItems[language].portafolio}</Link></li>
          <li><Link to="/" onClick={() => handleScrollToElement('servicios')}>{navItems[language].servicios}</Link></li>
          <li><Link to="/" className="contact-button" onClick={() => handleScrollToElement('contacto')}><i className="fas fa-comment-dots"></i>{navItems[language].contactame}</Link></li>
        </ul>
       
        {settingsOpen && (
          <div className="settings-menu">
            <div 
              className={`settings-option ${activeSetting === 'sol' ? 'active' : ''}`} 
              onClick={() => setActiveSetting('sol')}>
                <div className="tooltip">{language === 'es' ? 'Modo Claro' : 'Light Mode'}</div>
              <i className="fas fa-sun"></i>
            </div>
            <div 
              className={`settings-option ${activeSetting === 'luna' ? 'active' : ''}`} 
              onClick={() => setActiveSetting('luna')}>
              <i className="fas fa-moon"></i>
            </div>
            <div 
              className={`settings-option ${activeSetting === 'sistema' ? 'active' : ''}`} 
              onClick={() => setActiveSetting('sistema')}>
              <i className="fas fa-desktop"></i>
            </div>
            <div className="settings-option language-toggle" onClick={toggleLanguage}>
              <img src={language === 'es' ? mxFlag : usFlag} alt={language === 'es' ? 'Bandera de México' : 'USA Flag'} className="flag-image"/>
              <span className="language-toggle-button">
                {language === 'es' ? 'ES' : 'EN'}
              </span>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navegacion;
