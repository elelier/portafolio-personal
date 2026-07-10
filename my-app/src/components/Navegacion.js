import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { scrollIntoViewWithMotionPreference } from './utils/generalUtils';
import '../styles/components/Navegacion.css';

function Navegacion() {
  const [menuOpen, setMenuOpen] = useState(false);
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
      scrollIntoViewWithMotionPreference(element);
      closeMenu();
    }
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') closeMenu();
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.classList.toggle('nav-menu-open', menuOpen);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.classList.remove('nav-menu-open');
    };
  }, [menuOpen]);

  const navItems = {
    es: {
      proyectos: 'Proyectos',
      resultados: 'Resultados',
      casosReales: 'Casos reales',
      comoTrabajo: 'Cómo trabajo',
      contactame: 'Hablemos de tu reto',
    },
    en: {
      proyectos: 'Projects',
      resultados: 'Outcomes',
      casosReales: 'Case studies',
      comoTrabajo: 'How I work',
      contactame: 'Let’s talk about your challenge',
    }
  };

  const navLinks = [
    ['proyectos', navItems[language].proyectos],
    ['resultados', navItems[language].resultados],
    ['casos-reales', navItems[language].casosReales],
    ['como-trabajo', navItems[language].comoTrabajo],
  ];

  return (
    <nav className="navegacion" role="navigation" aria-label="Navegación principal">
      <div className="nav-content">
        <div className="logo-container">
          <Link to="/" onClick={() => handleScrollToElement('hero-banner')}>
            <div className="logo">Elier Loya Mata</div>
          </Link>
        </div>
        <button className="menu-toggle" onClick={toggleMenu} aria-expanded={menuOpen} aria-controls="primary-navigation" aria-label={menuOpen ? 'Close menu' : 'Open menu'}>
          {menuOpen ? '✖' : '☰'}
        </button>
        <div className={`nav-menu-backdrop ${menuOpen ? 'open' : ''}`} onClick={closeMenu} aria-hidden="true" />
        <ul id="primary-navigation" className={`nav-links ${menuOpen ? 'open' : ''}`}>
          <li><Link to="/" onClick={() => handleScrollToElement('hero-banner')}><i className="fas fa-home"></i></Link></li>
          {navLinks.map(([id, label]) => (
            <li key={id}><Link to={`/#${id}`} onClick={() => handleScrollToElement(id)}>{label}</Link></li>
          ))}
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
