import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { scrollIntoViewWithMotionPreference } from './utils/generalUtils';
import { activeSectionMap, getNavigationContent, observedSectionIds } from '../config/navigation';
import '../styles/components/Navegacion.css';

function Navegacion() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(null);
  const { language } = useLanguage();
  const aboutButtonRef = useRef(null);
  const content = getNavigationContent(language);

  const closeMenu = () => setMenuOpen(false);

  const handleScrollToElement = (id) => {
    const element = document.getElementById(id);
    if (element) {
      scrollIntoViewWithMotionPreference(element);
      closeMenu();
      setAboutOpen(false);
    }
  };

  const toggleAbout = () => setAboutOpen((current) => !current);

  const handleAboutKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      toggleAbout();
    }
  };

  useEffect(() => {
    const observedSections = observedSectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (!observedSections.length || typeof window.IntersectionObserver === 'undefined') {
      return undefined;
    }

    const observer = new window.IntersectionObserver(
      (entries) => {
        const visibleEntry = entries.find((entry) => entry.isIntersecting);
        if (visibleEntry) {
          setActiveSection(activeSectionMap[visibleEntry.target.id] || null);
        }
      },
      { rootMargin: '-80px 0px -55% 0px', threshold: [0, 0.1, 0.5, 1] }
    );

    observedSections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        if (aboutOpen) {
          setAboutOpen(false);
          aboutButtonRef.current?.focus();
        } else if (menuOpen) {
          closeMenu();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [aboutOpen, menuOpen]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuOpen && !event.target.closest('.nav-content') && !event.target.closest('.menu-toggle')) {
        closeMenu();
      }

      if (aboutOpen && !event.target.closest('.nav-secondary')) {
        setAboutOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [menuOpen, aboutOpen]);

  const isActive = (key) => activeSection === key;
  const isAboutActive = isActive('sobreMi') || isActive('carrera');

  return (
    <nav className="navegacion" role="navigation" aria-label="Navegación principal">
      <div className="nav-content">
        <div className="logo-container">
          <Link to="/" onClick={() => handleScrollToElement('hero-banner')}>
            <div className="logo">Elier Loya Mata</div>
          </Link>
        </div>

        <button
          className="menu-toggle"
          onClick={() => setMenuOpen((current) => !current)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
        >
          {menuOpen ? '✖' : '☰'}
        </button>

        <ul id="primary-navigation" className={`nav-links ${menuOpen ? 'open' : ''}`}>
          {content.primary.map((item) => (
            <li key={item.key}>
              <Link
                to="/"
                className={isActive(item.key) ? 'is-active' : ''}
                aria-current={isActive(item.key) ? 'location' : undefined}
                onClick={() => handleScrollToElement(item.target)}
              >
                {item.label}
              </Link>
            </li>
          ))}

          <li className={`nav-secondary${isAboutActive ? ' is-active' : ''}`}>
            <button
              ref={aboutButtonRef}
              className="nav-secondary-toggle"
              type="button"
              aria-haspopup="true"
              aria-expanded={aboutOpen}
              aria-controls="about-navigation"
              aria-current={isAboutActive ? 'location' : undefined}
              onClick={toggleAbout}
              onKeyDown={handleAboutKeyDown}
            >
              {content.secondaryLabel}<span aria-hidden="true">⌄</span>
            </button>
            <ul id="about-navigation" className={`nav-secondary-menu${aboutOpen ? ' open' : ''}`}>
              {content.secondary.map((item) => (
                <li key={item.key}>
                  <Link
                    to="/"
                    className={isActive(item.key) ? 'is-active' : ''}
                    aria-current={isActive(item.key) ? 'location' : undefined}
                    onClick={() => handleScrollToElement(item.target)}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </li>

          <li>
            <Link
              to="/"
              className={`contact-button${isActive('contact') ? ' is-active' : ''}`}
              aria-current={isActive('contact') ? 'location' : undefined}
              onClick={() => handleScrollToElement('contacto')}
            >
              <span className="icon-container" aria-hidden="true">
                <i className="fas fa-comment-dots"></i>
              </span>
              {content.contact}
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navegacion;
