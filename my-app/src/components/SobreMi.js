import React, { useState, useEffect, useRef, useMemo } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import '../styles/components/SobreMi.css';
import personal_story from '../assets/images/profile-picture-elier2.png';
import professional from '../assets/images/ecommerce_marketing.png';
import tech_vision from '../assets/images/technologic_vision.png';
import { useSwipeable } from 'react-swipeable';
import { useLanguage } from '../contexts/LanguageContext';
import { scrollIntoViewWithMotionPreference } from './utils/generalUtils';

function SobreMi({ style }) {
  const [currentSection, setCurrentSection] = useState(0);
  const { language } = useLanguage();
  const intervalRef = useRef(null);

  const sections = useMemo(() => ({
    es: [
      {
        title: 'Resultados',
        image: personal_story,
        alt: 'Elier Loya',
        subtitle: 'He pasado de coordinar operaciones en PepsiCo a co-fundar una startup con 99.8% de precisión de inventario.',
        content: (
          <div className="content-container">
            <div className="image-container">
              <LazyLoadImage src={personal_story} alt="Elier Loya" width={500} height={500} effect="blur" placeholderSrc={personal_story} className="optimized-image" />
            </div>
            <div className="text-content">
              <p>Combino criterio operativo, pensamiento de producto y ejecución técnica para sacar proyectos de la maraña estratégica o tecnológica.</p>
              <p>Si tienes una idea validable, un proceso trabado o una automatización que podría mover ingresos, costos o velocidad, yo lo bajo a alcance, prototipo y métrica.</p>
              <p><strong>Si tu proyecto está atascado, lo desatascamos con foco.</strong></p>
            </div>
          </div>
        ),
      },
      {
        title: 'Datos duros',
        image: professional,
        alt: 'Resultados profesionales',
        subtitle: '+10 años transformando operaciones, productos digitales y canales comerciales.',
        content: (
          <div className="content-container">
            <div className="image-container">
              <LazyLoadImage src={professional} alt="Resultados profesionales" width={500} height={500} effect="blur" placeholderSrc={professional} className="optimized-image" />
            </div>
            <div className="text-content">
              <h3>+10 años transformando operaciones</h3>
              <p>Experiencia entre logística, e-commerce, marketplaces, producto digital y automatización de procesos.</p>
              <h3>99.8% de precisión de inventario</h3>
              <p>Modelo operativo en GoFarma con foco en control, velocidad y confiabilidad para operación tipo dark store.</p>
              <h3>144% de crecimiento en marketplaces</h3>
              <p>Expansión digital en Farmalisto con mejora comercial, visibilidad y reducción de fricción operativa.</p>
            </div>
          </div>
        ),
      },
      {
        title: 'Mi enfoque',
        image: tech_vision,
        alt: 'Mi enfoque',
        subtitle: 'La solución correcta empieza por entender qué está frenando al negocio.',
        content: (
          <div className="content-container">
            <div className="image-container">
              <LazyLoadImage src={tech_vision} alt="Mi enfoque" width={500} height={500} effect="blur" placeholderSrc={tech_vision} className="optimized-image" />
            </div>
            <div className="text-content">
              <p>Mi experiencia me enseñó que una buena solución no empieza con tecnología, sino con entender qué está frenando al negocio.</p>
              <p>Por eso conecto operación, producto y ejecución antes de llevar el trabajo completo a la sección dedicada más abajo.</p>
            </div>
          </div>
        ),
      },
    ],
    en: [
      {
        title: 'Outcomes',
        image: personal_story,
        alt: 'Elier Loya',
        subtitle: 'I went from coordinating operations at PepsiCo to co-founding a startup with 99.8% inventory accuracy.',
        content: (
          <div className="content-container">
            <div className="image-container">
              <LazyLoadImage src={personal_story} alt="Elier Loya" width={500} height={500} effect="blur" placeholderSrc={personal_story} className="optimized-image" />
            </div>
            <div className="text-content">
              <p>I combine operational judgment, product thinking and technical execution to move projects out of strategic or technical complexity.</p>
              <p>If you have a validatable idea, a stuck process or an automation that could move revenue, costs or speed, I translate it into scope, prototype and metrics.</p>
              <p><strong>If your project is stuck, we unblock it with focus.</strong></p>
            </div>
          </div>
        ),
      },
      {
        title: 'Hard numbers',
        image: professional,
        alt: 'Professional outcomes',
        subtitle: '+10 years transforming operations, digital products and commercial channels.',
        content: (
          <div className="content-container">
            <div className="image-container">
              <LazyLoadImage src={professional} alt="Professional outcomes" width={500} height={500} effect="blur" placeholderSrc={professional} className="optimized-image" />
            </div>
            <div className="text-content">
              <h3>+10 years transforming operations</h3>
              <p>Experience across logistics, e-commerce, marketplaces, digital product and process automation.</p>
              <h3>99.8% inventory accuracy</h3>
              <p>Operational model at GoFarma focused on control, speed and reliability for a dark-store operation.</p>
              <h3>144% marketplace growth</h3>
              <p>Digital expansion at Farmalisto through online presence, catalog and channel optimization.</p>
            </div>
          </div>
        ),
      },
      {
        title: 'My approach',
        image: tech_vision,
        alt: 'My approach',
        subtitle: 'The right solution starts with understanding what is slowing the business down.',
        content: (
          <div className="content-container">
            <div className="image-container">
              <LazyLoadImage src={tech_vision} alt="My approach" width={500} height={500} effect="blur" placeholderSrc={tech_vision} className="optimized-image" />
            </div>
            <div className="text-content">
              <p>I have learned that good solutions do not start with technology. They start by understanding what is slowing the business down.</p>
              <p>That is why I connect operations, product and execution before moving the full work to the dedicated section below.</p>
            </div>
          </div>
        ),
      },
    ],
  }), []);

  useEffect(() => {
    setCurrentSection(0);
  }, [language]);

  const sectionLength = sections[language].length;

  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(() => {
      setCurrentSection((prevSection) => (prevSection + 1) % sectionLength);
    }, 30000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [language, sections, sectionLength]);

  const handleSwipe = (eventData) => {
    if (eventData && eventData.dir) {
      const { dir } = eventData;
      if (dir === 'Left') {
        setCurrentSection((prevSection) => (prevSection + 1) % sections[language].length);
      } else if (dir === 'Right') {
        setCurrentSection((prevSection) => (prevSection - 1 + sections[language].length) % sections[language].length);
      }
    } else {
      console.warn('Swipe eventData is missing or does not have the dir property');
    }
  };

  const swipeHandlers = useSwipeable({
    onSwiped: handleSwipe,
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  const scrollToServicios = () => {
    scrollIntoViewWithMotionPreference(document.getElementById('como-trabajo'));
  };

  const scrollToContacto = () => {
    scrollIntoViewWithMotionPreference(document.getElementById('contacto'));
  };

  const handleManualChange = (index) => {
    setCurrentSection(index);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = setInterval(() => {
      setCurrentSection((prevSection) => (prevSection + 1) % sections[language].length);
    }, 30000);
  };

  return (
    <section id="sobre-mi" className="sobre-mi" style={style} {...swipeHandlers}>
      <div className="contenido-sobre-mi">
        <h2>{language === 'es' ? 'SOBRE MÍ' : 'ABOUT ME'}</h2>

        <div className="tabs">
          <button className="nav-arrow left" onClick={() => handleManualChange((currentSection - 1 + sections[language].length) % sections[language].length)}>&lt;</button>
          {sections[language].map((section, index) => (
            <button key={index} className={`tab-button ${currentSection === index ? 'active' : ''}`} onClick={() => handleManualChange(index)}>
              {section.title}
            </button>
          ))}
          <button className="nav-arrow right" onClick={() => handleManualChange((currentSection + 1) % sections[language].length)}>&gt;</button>
        </div>
        <div className="section-content">
          <div className="sub-title-container shinyy">{sections[language][currentSection].subtitle}</div>
          {sections[language][currentSection].content}
        </div>
        <div className="cta-seccion-sobre-mi">
          <button onClick={scrollToServicios} className="cta-button-2">{language === 'es' ? 'Conoce cómo trabajo' : 'See how I work'}</button>
          <button onClick={scrollToContacto} className="cta-button-2">{language === 'es' ? 'Hablemos de tu reto' : 'Let’s talk about your challenge'}</button>
        </div>
        <div className="horizontal-scroll-indicator">
          {sections[language].map((_, index) => (
            <div key={index} className={`indicator ${currentSection === index ? 'active' : ''}`}></div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default SobreMi;
