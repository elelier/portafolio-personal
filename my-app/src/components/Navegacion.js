import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import './css/Navegacion.css';

function Navegacion() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolling] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handleScrollToElement = (id) => {
    navigate('/');
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        closeMenu();
      }
    }, 100);
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
          <li><Link to="/" onClick={() => handleScrollToElement('sobre-mi')}>Sobre Mi</Link></li>
          <li><Link to="/portafolio" onClick={() => { closeMenu(); }}>Portafolio</Link></li>
          <li><Link to="/servicios" onClick={() => { closeMenu(); }}>Servicios</Link></li>
          <li><Link to="/blog" onClick={() => { closeMenu(); }}>Blog</Link></li>
          <li><Link to="/contacto" className="contact-button" onClick={() => { closeMenu(); }}><i className="fas fa-comment-dots"></i>Contáctame</Link></li>
        </ul>
      </div>
    </nav>
  );
}

export default Navegacion;