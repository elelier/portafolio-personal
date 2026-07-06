import React, { useEffect, useMemo, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { scrollIntoViewWithMotionPreference } from './utils/generalUtils';
import '../styles/components/Portafolio.css';
import '../styles/components/Timeline.css';
import { getCurrentLanguage } from './utils/languageUtils';

import chubbImg from '../assets/images/CHUBB.jpg';
import elelierImg from '../assets/images/elelier.jpg';
import farmalistoImg from '../assets/images/farmalisto.jpg';

const LINKEDIN_URL = 'https://linkedin.com/in/elier/';

const careerContent = {
  es: [
    {
      id: 'gofarma-farmalisto',
      name: 'GoFarma + Farmalisto',
      period: '2016–2024',
      role: 'Operación, producto digital y crecimiento comercial',
      description:
        'Convertí procesos operativos complejos en una operación más precisa, rápida y medible.',
      bannerAlt: 'Banner de Farmalisto con enfoque en operación y crecimiento comercial',
      image: farmalistoImg,
      chips: [
        '99.8% precisión de inventario',
        'Pedidos en ~2 min',
        '−50% reclamaciones y cancelaciones',
        '+144% ventas',
        '+58% ticket promedio'
      ],
      links: [
        {
          label: 'Ver Farmalisto ↗',
          href: 'https://www.farmalisto.com.mx/'
        }
      ],
      bullets: [
        'Diseñé procesos de inventario, operación y fulfillment.',
        'Estandaricé flujos para reducir reclamos y cancelaciones.',
        'Llevé operación y marketplaces a decisiones más medibles.'
      ]
    },
    {
      id: 'chubb',
      name: 'CHUBB',
      period: '2024–Actualidad',
      role: 'Digital Product Owner',
      description:
        'Lidero iniciativas de producto y transformación digital para mejorar experiencia, operación y toma de decisiones.',
      bannerAlt: 'Banner de CHUBB con enfoque en producto digital',
      image: chubbImg,
      chips: ['Producto digital', 'Operación', 'Transformación', 'Usabilidad', 'Datos'],
      links: [
        {
          label: 'Ver LinkedIn ↗',
          href: LINKEDIN_URL
        }
      ],
      bullets: [
        'Digitalización de renovaciones de pólizas.',
        'Mejora de cotización, emisión y experiencia de usuario.',
        'Uso de datos y usabilidad para priorizar decisiones.'
      ]
    },
    {
      id: 'elier',
      name: 'Elier',
      period: '2025–Actualidad',
      role: 'Producto y transformación digital',
      description:
        'Ayudo a negocios y equipos a aterrizar retos en soluciones digitales útiles, claras y accionables.',
      bannerAlt: 'Banner de Elier con enfoque en producto y transformación digital',
      image: elelierImg,
      chips: ['Automatización', 'IA aplicada', 'Producto', 'Integraciones', 'Consultoría'],
      links: [
        {
          label: 'Ver elelier.com ↗',
          href: 'https://elelier.com/'
        },
        {
          label: 'LinkedIn ↗',
          href: LINKEDIN_URL
        }
      ],
      bullets: [
        'Diseño y construcción de soluciones digitales.',
        'Automatización e IA aplicada a retos concretos.',
        'Integración entre operación, producto y ejecución.'
      ]
    }
  ],
  en: [
    {
      id: 'gofarma-farmalisto',
      name: 'GoFarma + Farmalisto',
      period: '2016–2024',
      role: 'Operations, digital product and commercial growth',
      description:
        'I turned complex operational processes into a more accurate, faster and measurable operation.',
      bannerAlt: 'Farmalisto banner focused on operations and commercial growth',
      image: farmalistoImg,
      chips: [
        '99.8% inventory accuracy',
        'Orders in ~2 min',
        '−50% claims and cancellations',
        '+144% sales',
        '+58% average ticket'
      ],
      links: [
        {
          label: 'View Farmalisto ↗',
          href: 'https://www.farmalisto.com.mx/'
        }
      ],
      bullets: [
        'Designed inventory, operations and fulfillment processes.',
        'Standardized flows to reduce claims and cancellations.',
        'Brought operations and marketplaces into more measurable decision-making.'
      ]
    },
    {
      id: 'chubb',
      name: 'CHUBB',
      period: '2024–Present',
      role: 'Digital Product Owner',
      description:
        'I lead product and digital transformation initiatives to improve experience, operations and decision-making.',
      bannerAlt: 'CHUBB banner focused on digital product work',
      image: chubbImg,
      chips: ['Digital product', 'Operations', 'Transformation', 'Usability', 'Data'],
      links: [
        {
          label: 'View LinkedIn ↗',
          href: LINKEDIN_URL
        }
      ],
      bullets: [
        'Digitalization of policy renewal processes.',
        'Improvement of quoting, issuance and user experience.',
        'Use of data and usability to prioritize decisions.'
      ]
    },
    {
      id: 'elier',
      name: 'Elier',
      period: '2025–Present',
      role: 'Product and digital transformation',
      description:
        'I help businesses and teams turn challenges into useful, clear and actionable digital solutions.',
      bannerAlt: 'Elier banner focused on product and digital transformation',
      image: elelierImg,
      chips: ['Automation', 'Applied AI', 'Product', 'Integrations', 'Consulting'],
      links: [
        {
          label: 'View elelier.com ↗',
          href: 'https://elelier.com/'
        },
        {
          label: 'LinkedIn ↗',
          href: LINKEDIN_URL
        }
      ],
      bullets: [
        'Design and delivery of digital solutions.',
        'Automation and applied AI for concrete challenges.',
        'Integration across operations, product and execution.'
      ]
    }
  ]
};

const ctaContent = {
  es: {
    title: '¿Te imaginas tu proyecto en este portafolio?',
    description:
      'Trabajemos juntos para diseñar una solución a medida, desde la estrategia hasta la implementación.',
    primary: 'Hablemos de tu proyecto',
    secondary: 'Conoce cómo trabajo'
  },
  en: {
    title: 'Ready to see your project featured here?',
    description:
      'Let’s craft a tailored solution together—from strategic planning to hands-on implementation.',
    primary: "Let's talk about your project",
    secondary: 'See how I work'
  }
};

function CareerCard({ entry, index, language, isExpanded, onToggle }) {
  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onToggle(index);
    }
  };

  const stopPropagation = (event) => {
    event.stopPropagation();
  };

  return (
    <article
      className={`timeline-card${isExpanded ? ' timeline-card--expanded' : ''}`}
      role="button"
      tabIndex={0}
      aria-expanded={isExpanded}
      data-testid="career-card"
      data-career-name={entry.name}
      onClick={() => onToggle(index)}
      onKeyDown={handleKeyDown}
      aria-label={`${entry.name} ${entry.period}`}
    >
      <span className="timeline-card__period">{entry.period}</span>

      <div className="timeline-card__banner">
        <img src={entry.image} alt={entry.bannerAlt} className="timeline-card__image" />
        <div className="timeline-card__overlay" aria-hidden="true" />
      </div>

      <div className="timeline-card__body">
        <div className="timeline-card__identity">
          <h3>{entry.name}</h3>
          <h4>{entry.role}</h4>
          <p>{entry.description}</p>
        </div>

        <div className="timeline-card__chips" aria-label={language === 'es' ? 'Logros destacados' : 'Highlighted achievements'}>
          {entry.chips.map((chip) => (
            <span key={chip} className="timeline-card__chip">
              {chip}
            </span>
          ))}
        </div>

        <div className="timeline-card__links">
          {entry.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={stopPropagation}
            >
              {link.label}
            </a>
          ))}
        </div>

        {isExpanded && (
          <div className="timeline-card__details">
            <h5>{language === 'es' ? 'Lo que moví' : 'What I moved'}</h5>
            <ul>
              {entry.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          </div>
        )}

        <span className="timeline-card__toggle">
          {isExpanded
            ? language === 'es'
              ? 'Ocultar detalles ↑'
              : 'Hide details ↑'
            : language === 'es'
              ? 'Ver detalles ↓'
              : 'View details ↓'}
        </span>
      </div>
    </article>
  );
}

const Portafolio = ({ style }) => {
  const [activeIndex, setActiveIndex] = useState(null);
  const { language } = useLanguage();
  const [currentLang, setCurrentLang] = useState(getCurrentLanguage());

  useEffect(() => {
    const handleLanguageChange = () => {
      setCurrentLang(getCurrentLanguage());
    };

    window.addEventListener('languagechange', handleLanguageChange);
    return () => {
      window.removeEventListener('languagechange', handleLanguageChange);
    };
  }, []);

  useEffect(() => {
    setCurrentLang(language || getCurrentLanguage());
  }, [language]);

  useEffect(() => {
    const section = document.getElementById('portafolio');

    if (!section || typeof window.IntersectionObserver === 'undefined' || typeof window.matchMedia !== 'function') {
      document.body.classList.remove('career-section-in-view');
      return undefined;
    }

    const mobileQuery = window.matchMedia('(max-width: 768px)');

    const syncFloatingControls = (isInView) => {
      document.body.classList.toggle('career-section-in-view', mobileQuery.matches && isInView);
    };

    const observer = new window.IntersectionObserver(
      ([entry]) => {
        syncFloatingControls(entry.isIntersecting);
      },
      { threshold: 0.18 }
    );

    observer.observe(section);

    const handleMediaChange = () => {
      const sectionRect = section.getBoundingClientRect();
      const isInView = sectionRect.top < window.innerHeight && sectionRect.bottom > 0;
      syncFloatingControls(isInView);
    };

    if (mobileQuery.addEventListener) {
      mobileQuery.addEventListener('change', handleMediaChange);
    } else {
      mobileQuery.addListener(handleMediaChange);
    }

    handleMediaChange();

    return () => {
      observer.disconnect();
      if (mobileQuery.removeEventListener) {
        mobileQuery.removeEventListener('change', handleMediaChange);
      } else {
        mobileQuery.removeListener(handleMediaChange);
      }
      document.body.classList.remove('career-section-in-view');
    };
  }, []);

  const projects = useMemo(() => careerContent[currentLang] || careerContent.es, [currentLang]);
  const currentCta = ctaContent[currentLang] || ctaContent.es;

  const handleToggle = (index) => {
    setActiveIndex((current) => (current === index ? null : index));
  };

  const handleScrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      scrollIntoViewWithMotionPreference(section);
    }
  };

  return (
    <section id="portafolio" className="portafolio" style={style}>
      <div className="portafolio__heading">
        <p className="portafolio__eyebrow">{currentLang === 'es' ? 'TRAYECTORIA' : 'CAREER'}</p>
        <h2>{currentLang === 'es' ? 'Carrera profesional' : 'Professional career'}</h2>
        <p className="introduccion">
          {currentLang === 'es'
            ? 'Una trayectoria construida entre operación, producto digital y soluciones que generan resultados reales.'
            : 'A career built across operations, digital product and solutions that create measurable results.'}
        </p>
      </div>

      <div className="timeline" role="list" aria-label={currentLang === 'es' ? 'Carrera profesional' : 'Professional career'}>
        {projects.map((project, idx) => (
          <div key={project.id} className="timeline__row" role="listitem">
            <span className="timeline__node" aria-hidden="true" />
            <CareerCard
              entry={project}
              index={idx}
              language={currentLang}
              isExpanded={activeIndex === idx}
              onToggle={handleToggle}
            />
          </div>
        ))}
      </div>

      <div className="portafolio-cta">
        <h3>{currentCta.title}</h3>
        <p>{currentCta.description}</p>
        <div className="portafolio-cta-buttons">
          <button className="cta-button-primary" onClick={() => handleScrollToSection('contacto')}>
            {currentCta.primary}
          </button>
          <button className="cta-button-secondary" onClick={() => handleScrollToSection('como-trabajo')}>
            {currentCta.secondary}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Portafolio;
