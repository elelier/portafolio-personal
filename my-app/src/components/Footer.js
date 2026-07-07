import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { scrollIntoViewWithMotionPreference } from './utils/generalUtils';
import '../styles/components/Footer.css';

function Footer() {
  const { language } = useLanguage();

  const footerLinks = {
    es: {
      inicio: 'Inicio',
      sobreMi: 'Sobre Mí',
      casosReales: 'Casos reales',
      portafolio: 'Carrera',
      soluciones: 'Soluciones',
      contacto: 'Contacto',
      privacy: 'Privacidad',
      terms: 'Términos',
      connect: 'Conéctate conmigo en:'
    },
    en: {
      inicio: 'Home',
      sobreMi: 'About Me',
      casosReales: 'Case studies',
      portafolio: 'Career',
      soluciones: 'Solutions',
      contacto: 'Contact',
      privacy: 'Privacy Policy',
      terms: 'Terms of Service',
      connect: 'Connect with me on:'
    }
  };

  const handleScrollToElement = (id) => {
    const element = document.getElementById(id);
    if (element) {
      scrollIntoViewWithMotionPreference(element);
    }
  };

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-links">
          <Link to="/" onClick={() => handleScrollToElement('hero-banner')}><i className="fas fa-home"></i></Link>
          <Link to="/" onClick={() => handleScrollToElement('sobre-mi')}>{footerLinks[language].sobreMi}</Link>
          <Link to="/" onClick={() => handleScrollToElement('casos-reales')}>{footerLinks[language].casosReales}</Link>
          <Link to="/" onClick={() => handleScrollToElement('portafolio')}>{footerLinks[language].portafolio}</Link>
          <Link to="/" onClick={() => handleScrollToElement('soluciones')}>{footerLinks[language].soluciones}</Link>
          <Link to="/" onClick={() => handleScrollToElement('contacto')}>{footerLinks[language].contacto}</Link>
          <Link to="/privacy-policy">{footerLinks[language].privacy}</Link>
          <Link to="/terms-of-service">{footerLinks[language].terms}</Link>
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
