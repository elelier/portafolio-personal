import React, { useState, useEffect, useRef, useMemo } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import '../styles/components/SobreMi.css';
import personal_story from '../assets/images/profile-picture-elier2.png';
import professional from '../assets/images/ecommerce_marketing.png';
import tech_vision from '../assets/images/technologic_vision.png';
import { useSwipeable } from 'react-swipeable';
import { useLanguage } from '../contexts/LanguageContext';

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
        title: 'Casos mínimos',
        image: tech_vision,
        alt: 'Casos de estudio',
        subtitle: 'Problema → solución → resultado. Sin buzzwords.',
        content: (
          <div className="content-container">
            <div className="image-container">
              <LazyLoadImage src={tech_vision} alt="Casos de estudio" width={500} height={500} effect="blur" placeholderSrc={tech_vision} className="optimized-image" />
            </div>
            <div className="text-content">
              <h3>GoFarma</h3>
              <p><strong>Problema:</strong> operación con inventario sensible y presión de entregas. <strong>Solución:</strong> modelo operativo estandarizado para dark store. <strong>Resultado:</strong> 99.8% de precisión de inventario.</p>
              <h3>Farmalisto</h3>
              <p><strong>Problema:</strong> canal marketplace con fricción comercial y operativa. <strong>Solución:</strong> gestión de presencia online y optimización de catálogo/canales. <strong>Resultado:</strong> 144% de incremento en ventas.</p>
              <h3>CHUBB</h3>
              <p><strong>Problema:</strong> procesos de renovación con alta complejidad operativa. <strong>Solución:</strong> liderazgo de producto para automatización, UX y priorización. <strong>Resultado:</strong> mejoras digitales en cotización, emisión y experiencia.</p>
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
        title: 'Mini cases',
        image: tech_vision,
        alt: 'Case studies',
        subtitle: 'Problem → solution → result. No buzzwords.',
        content: (
          <div className="content-container">
            <div className="image-container">
              <LazyLoadImage src={tech_vision} alt="Case studies" width={500} height={500} effect="blur" placeholderSrc={tech_vision} className="optimized-image" />
            </div>
            <div className="text-content">
              <h3>GoFarma</h3>
              <p><strong>Problem:</strong> inventory-sensitive operation under delivery pressure. <strong>Solution:</strong> standardized dark-store operating model. <strong>Result:</strong> 99.8% inventory accuracy.</p>
              <h3>Farmalisto</h3>
              <p><strong>Problem:</strong> marketplace channel with commercial and operational friction. <strong>Solution:</strong> online presence and catalog/channel optimization. <strong>Result:</strong> 144% sales growth.</p>
              <h3>CHUBB</h3>
              <p><strong>Problem:</strong> renewal processes with high operational complexity. <strong>Solution:</strong> product leadership for automation, UX and prioritization. <strong>Result:</strong> digital improvements in quote, issuance and experience.</p>
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
    document.getElementById('disponibilidad')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContacto = () => {
    document.getElementById('diagnostico')?.scrollIntoView({ behavior: 'smooth' });
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
          <button onClick={scrollToServicios} className="cta-button-2">{language === 'es' ? 'Ver método' : 'See method'}</button>
          <button onClick={scrollToContacto} className="cta-button-2">{language === 'es' ? 'Recibe diagnóstico' : 'Get diagnosis'}</button>
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
