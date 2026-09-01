import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { scrollIntoViewWithMotionPreference } from './utils/generalUtils';
import { getNavigationContent } from '../config/navigation';
import '../styles/components/Footer.css';

function Footer() {
  const { language } = useLanguage();

  const footerLinks = getNavigationContent(language);

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
          <Link to="/" onClick={() => handleScrollToElement('hero-banner')}>{footerLinks.inicio}</Link>
          {footerLinks.primary.map((item) => (
            <Link key={item.key} to="/" onClick={() => handleScrollToElement(item.target)}>{item.label}</Link>
          ))}
          {footerLinks.secondary.map((item) => (
            <Link key={item.key} to="/" onClick={() => handleScrollToElement(item.target)}>{item.label}</Link>
          ))}
          <Link to="/" onClick={() => handleScrollToElement('contacto')}>{footerLinks.footerContact}</Link>
          <Link to="/privacy-policy">{footerLinks.privacy}</Link>
          <Link to="/terms-of-service">{footerLinks.terms}</Link>
        </div>
        <div className="footer-social">
          <p>{footerLinks.connect}</p>
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
