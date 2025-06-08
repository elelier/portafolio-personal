import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import '../styles/components/Navegacion.css';

function Navegacion() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const { language } = useLanguage();

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
      portafolio: 'Carrera',
      servicios: 'Servicios',
      contactame: ' Contáctame',
      sites: 'Sitios'
    },
    en: {
      sobreMi: 'About Me',
      habilidades: 'Skills',
      portafolio: 'Carrer',
      servicios: 'Services',
      contactame: ' Contact Me',
      sites: 'Sites'
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
        <button className="menu-toggle" onClick={toggleMenu} aria-label="Toggle menu">
          {menuOpen ? '✖' : '☰'}
        </button>
        <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
          <li><Link to="/" onClick={() => handleScrollToElement('hero-banner')}><i className="fas fa-home"></i></Link></li>
          <li><Link to="/" onClick={() => handleScrollToElement('sobre-mi')}>{navItems[language].sobreMi}</Link></li>
          <li><Link to="/" onClick={() => handleScrollToElement('habilidades')}>{navItems[language].habilidades}</Link></li>
          <li><Link to="/" onClick={() => handleScrollToElement('portafolio')}>{navItems[language].portafolio}</Link></li>
          <li><Link to="/" onClick={() => handleScrollToElement('servicios')}>{navItems[language].servicios}</Link></li>
          <li><Link to="/" onClick={() => handleScrollToElement('sites')}>{navItems[language].sites}</Link></li>
          <li>
            <Link
              to="/"
              className="contact-button"
              onClick={() => handleScrollToElement('contacto')}
            >
              <div className="icon-container" style={{ display: 'inline-block' }}>
                <i className="fas fa-comment-dots"></i>
              </div>
              {navItems[language].contactame}
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navegacion;
