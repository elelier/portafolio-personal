import React, { useEffect, useMemo, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { scrollIntoViewWithMotionPreference } from './utils/generalUtils';
import '../styles/components/Portafolio.css';
import '../styles/components/Timeline.css';
import { getCurrentLanguage } from './utils/languageUtils';
import { getCvRoute } from '../config/cvRoutes';

import chubbImg from '../assets/images/CHUBB.jpg';
import elelierImg from '../assets/images/elelier.jpg';
import farmalistoImg from '../assets/images/farmalisto.jpg';

const LINKEDIN_URL = 'https://linkedin.com/in/elier/';

const CV_LANGUAGE_OPTIONS = [
  { code: 'es', label: 'ES' },
  { code: 'en', label: 'EN' },
  { code: 'pt-br', label: 'PT' }
];

const cvCopy = {
  es: {
    main: 'Ver CV en español (PDF) ↗',
    accessible: 'Ver CV en español (PDF, abre en una pestaña nueva)',
    languageNav: 'Versiones del CV disponibles por idioma',
    languageLinks: {
      en: 'Ver CV en inglés (PDF, abre en una pestaña nueva)',
      'pt-br': 'Ver CV en portugués (PDF, abre en una pestaña nueva)'
    }
  },
  en: {
    main: 'View CV in English (PDF) ↗',
    accessible: 'View CV in English (PDF, opens in a new tab)',
    languageNav: 'Available CV language versions',
    languageLinks: {
      es: 'View CV in Spanish (PDF, opens in a new tab)',
      'pt-br': 'View CV in Portuguese (PDF, opens in a new tab)'
    }
  }
};

cvCopy['pt-br'] = {
  main: 'Ver currículo em português (PDF) ↗',
  accessible: 'Ver currículo em português (PDF, abre em uma nova aba)',
  languageNav: 'Versões disponíveis do currículo por idioma',
  languageLinks: {
    es: 'Ver currículo em espanhol (PDF, abre em uma nova aba)',
    en: 'Ver currículo em inglês (PDF, abre em uma nova aba)'
  }
};

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
        },
        {
          label: 'Cotiza tu seguro de auto ↗',
          href: '/seguro-auto'
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
        },
        {
          label: 'Get an auto insurance quote ↗',
          href: '/seguro-auto'
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

careerContent['pt-br'] = [
  {
    id: 'gofarma-farmalisto',
    name: 'GoFarma + Farmalisto',
    period: '2016–2024',
    role: 'Operações, produto digital e crescimento comercial',
    description: 'Transformei processos complexos em operações mais precisas, rápidas e mensuráveis.',
    bannerAlt: 'Farmalisto: operações e crescimento comercial',
    image: farmalistoImg,
    chips: ['99,8% de precisão de estoque', 'Pedidos em ~2 min', '−50% em reclamações e cancelamentos', '+144% em vendas', '+58% no tíquete médio'],
    links: [{ label: 'Ver Farmalisto ↗', href: 'https://www.farmalisto.com.mx/' }],
    bullets: [
      'Estruturei processos de estoque, operação e fulfillment.',
      'Padronizei fluxos para reduzir reclamações e cancelamentos.',
      'Transformei operações e marketplaces em decisões baseadas em dados.'
    ]
  },
  {
    id: 'chubb',
    name: 'CHUBB',
    period: '2024–Presente',
    role: 'Digital Product Owner',
    description: 'Lidero iniciativas de produto e transformação digital para melhorar a experiência, as operações e a tomada de decisões.',
    bannerAlt: 'CHUBB: produto digital',
    image: chubbImg,
    chips: ['Produto digital', 'Operações', 'Transformação', 'Usabilidade', 'Dados'],
    links: [
      { label: 'Ver LinkedIn ↗', href: LINKEDIN_URL },
      { label: 'Cotação de seguro de carro no México ↗', href: '/seguro-auto' }
    ],
    bullets: [
      'Digitalização dos processos de renovação de apólices.',
      'Melhoria de cotações, emissão e experiência do usuário.',
      'Uso de dados e usabilidade para priorizar decisões.'
    ]
  },
  {
    id: 'elier',
    name: 'Elier',
    period: '2025–Presente',
    role: 'Produto e transformação digital',
    description: 'Ajudo empresas e equipes a transformar desafios em soluções digitais úteis, claras e viáveis.',
    bannerAlt: 'Elier: produto e transformação digital',
    image: elelierImg,
    chips: ['Automação', 'IA aplicada', 'Produto', 'Integrações', 'Consultoria'],
    links: [
      { label: 'Ver elelier.com ↗', href: 'https://elelier.com/' },
      { label: 'LinkedIn ↗', href: LINKEDIN_URL }
    ],
    bullets: [
      'Desenvolvimento e entrega de soluções digitais.',
      'Automação e IA aplicada a desafios específicos.',
      'Integração entre operações, produto e execução.'
    ]
  }
];

const ctaContent = {
  es: {
    title: '¿Te imaginas tu proyecto en este portafolio?',
    description:
      'Trabajemos juntos para diseñar una solución a medida, desde la estrategia hasta la implementación.',
    primary: 'Hablemos de tu reto',
    secondary: 'Conoce cómo trabajo'
  },
  en: {
    title: 'Ready to see your project featured here?',
    description:
      'Let’s craft a tailored solution together—from strategic planning to hands-on implementation.',
    primary: "Let’s talk about your challenge",
    secondary: 'See how I work'
  }
};

ctaContent['pt-br'] = {
  title: 'Quer ver seu projeto neste portfólio?',
  description: 'Vamos criar uma solução sob medida, da estratégia à implementação prática.',
  primary: 'Vamos conversar sobre seu desafio',
  secondary: 'Veja como trabalho'
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

        <div className="timeline-card__chips" aria-label={language === 'es' ? 'Logros destacados' : language === 'pt-br' ? 'Resultados em destaque' : 'Highlighted achievements'}>
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
              className={link.href === '/seguro-auto' ? 'timeline-card__link--auto-insurance' : undefined}
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
            <h5>{language === 'es' ? 'Lo que moví' : language === 'pt-br' ? 'Meu impacto' : 'What I moved'}</h5>
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
              : language === 'pt-br' ? 'Ocultar detalhes ↑' : 'Hide details ↑'
            : language === 'es'
              ? 'Ver detalles ↓'
              : language === 'pt-br' ? 'Ver detalhes ↓' : 'View details ↓'}
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
  const currentCvCopy = cvCopy[currentLang] || cvCopy.es;

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
        <p className="portafolio__eyebrow">{currentLang === 'es' ? 'TRAYECTORIA' : currentLang === 'pt-br' ? 'TRAJETÓRIA' : 'CAREER'}</p>
        <h2>{currentLang === 'es' ? 'Carrera profesional' : currentLang === 'pt-br' ? 'Carreira profissional' : 'Professional career'}</h2>
        <p className="introduccion">
          {currentLang === 'es'
            ? 'Una trayectoria construida entre operación, producto digital y soluciones que generan resultados reales.'
            : currentLang === 'pt-br' ? 'Uma trajetória entre operações, produto digital e soluções com resultados mensuráveis.' : 'A career built across operations, digital product and solutions that create measurable results.'}
        </p>
        <div className="portafolio__cv-actions">
          <a
            className="portafolio__cv-link"
            href={getCvRoute(currentLang)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={currentCvCopy.accessible}
          >
            {currentCvCopy.main}
          </a>
          <div className="portafolio__cv-languages" role="group" aria-label={currentCvCopy.languageNav}>
            {CV_LANGUAGE_OPTIONS.map(({ code, label }, index) => (
              <React.Fragment key={code}>
                {index > 0 && <span className="portafolio__cv-separator" aria-hidden="true">·</span>}
                {code === currentLang ? (
                  <span className="portafolio__cv-language portafolio__cv-language--active">{label}</span>
                ) : (
                  <a
                    className="portafolio__cv-language"
                    href={getCvRoute(code)}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={currentCvCopy.languageLinks[code]}
                  >
                    {label}
                  </a>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
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
