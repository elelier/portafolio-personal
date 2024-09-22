import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import '../styles/components/Footer.css';

function Footer() {
  const { language } = useLanguage();

  const footerLinks = {
    es: {
      inicio: 'Inicio',
      sobreMi: 'Sobre Mí',
      habilidades: 'Habilidades',
      portafolio: 'Portafolio',
      servicios: 'Servicios',
      contacto: 'Contacto',
      connect: 'Conéctate conmigo en:'
    },
    en: {
      inicio: 'Home',
      sobreMi: 'About Me',
      habilidades: 'Skills',
      portafolio: 'Portfolio',
      servicios: 'Services',
      contacto: 'Contact',
      connect: 'Connect with me on:'
    }
  };

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
          <Link to="/" onClick={() => handleScrollToElement('hero-banner')}><i className="fas fa-home"></i></Link>
          <Link to="/" onClick={() => handleScrollToElement('sobre-mi')}>{footerLinks[language].sobreMi}</Link>
          <Link to="/" onClick={() => handleScrollToElement('habilidades')}>{footerLinks[language].habilidades}</Link>
          <Link to="/" onClick={() => handleScrollToElement('portafolio')}>{footerLinks[language].portafolio}</Link>
          <Link to="/" onClick={() => handleScrollToElement('servicios')}>{footerLinks[language].servicios}</Link>
          <Link to="/" onClick={() => handleScrollToElement('contacto')}>{footerLinks[language].contacto}</Link>
        </div>
        <div className="footer-social">
          <p>{footerLinks[language].connect}</p>
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
