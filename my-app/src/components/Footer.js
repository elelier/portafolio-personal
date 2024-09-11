import React from 'react';
import { Link } from 'react-router-dom';
import './css/Footer.css';

function Footer() {
  const handleScrollToElement = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-links">
          <Link to="/" onClick={() => handleScrollToElement('hero-banner')}>Inicio</Link>
          <Link to="/" onClick={() => handleScrollToElement('sobre-mi')}>Sobre Mí</Link>
          <Link to="/" onClick={() => handleScrollToElement('habilidades')}>Habilidades</Link>
          <Link to="/" onClick={() => handleScrollToElement('portafolio')}>Portafolio</Link>
          <Link to="/" onClick={() => handleScrollToElement('servicios')}>Servicios</Link>
          <Link to="/blog">Blog</Link>
          <Link to="/" onClick={() => handleScrollToElement('contacto')}>Contacto</Link>
        </div>
        <div className="footer-social">
          <p>Conéctate conmigo en:</p>
          <div className="social-links">
            <a href="https://linkedin.com/in/elier/" target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin"></i> LinkedIn</a>
            <a href="https://github.com/elelier" target="_blank" rel="noopener noreferrer"><i className="fab fa-github"></i> GitHub</a>
            <a href="https://wa.me/528117801157" target="_blank" rel="noopener noreferrer"><i className="fab fa-whatsapp"></i> WhatsApp</a>
          </div>
        </div>
        <div className="footer-copyright">
          <p>&copy; {new Date().getFullYear()} Elier Loya Mata</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;