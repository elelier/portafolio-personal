import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../LanguageContext';
import './css/Navegacion.css';

function Navegacion() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolling] = useState(false);
  const { language, toggleLanguage } = useLanguage();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
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
      if (menuOpen && !event.target.closest('.nav-links') && !event.target.closest('.menu-toggle')) {
        closeMenu();
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [menuOpen]);

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

  const flagEmoji = language === 'es' ? 'ES' : 'EN';

  return (
    <nav className={`navegacion ${isScrolling ? 'fade-out' : 'fade-in'}`} role="navigation" aria-label="Navegación principal">
      <div className="nav-content">
        <div className="logo-container">
          <Link to="/" onClick={() => handleScrollToElement('hero-banner')}>
            <div className="logo">Elier Loya Mata</div>
          </Link>
        </div>
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
          <li>
            <button onClick={toggleLanguage} className="language-toggle" aria-label="Cambiar idioma">
              <span className="flag-emoji" role="img" aria-label={language === 'es' ? 'Bandera de México' : 'USA Flag'}>
                {flagEmoji}
              </span>
              <span class="triangle"></span>
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navegacion;