import React, { useState, useEffect, useRef, useMemo } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import '../styles/components/SobreMi.css';
import personal_story from '../assets/images/profile-picture-elier2.png';
import professional from '../assets/images/ecommerce_marketing.png';
import tech_vision from '../assets/images/technologic_vision.png';
import { useSwipeable } from 'react-swipeable';
import { useLanguage } from '../contexts/LanguageContext';

function SobreMi() {
  const [currentSection, setCurrentSection] = useState(0);
  const { language } = useLanguage();
  const intervalRef = useRef(null);

  const sections = useMemo(() => ({
    es: [
      {
        title: 'Historia Personal',
        image: personal_story,
        alt: 'Historia Personal',
        subtitle: 'Desde que tengo memoria, siempre he sentido una gran curiosidad por cómo funcionan las cosas.',
        content: (
          <>
            <div className="content-container">
              <div className="image-container">
                <LazyLoadImage
                  src={personal_story}
                  alt="Historia Personal"
                  width={500}
                  height={500}
                  effect="blur"
                  placeholderSrc={personal_story}
                  className="optimized-image"
                />
              </div>
              <div className="text-content">
                <p>
                  Esa misma curiosidad me impulsó a desmontar juguetes, adentrarme en la ingeniería y, con el tiempo, liderar transformaciones tecnológicas en diversas empresas.
                </p>
                <p>
                  Soy Elier Loya, Ingeniero Industrial y de Sistemas con más de una década de experiencia en dirección y optimización de operaciones. Mi pasión por la tecnología y la innovación me impulsó a especializarme en transformación digital y gestión logística.
                </p>
                <p>
                  A lo largo de mi carrera, he liderado transformaciones clave en empresas como GoFarma, Farmalisto y PepsiCo. Actualmente, en CHUBB, aplico mi experiencia para impulsar la transformación digital en el área de renovaciones, potenciando la automatización y personalización de procesos críticos.
                </p>
              </div>
            </div>
          </>
        ),
      },
      {
        title: 'Experiencia Destacada',
        image: professional,
        alt: 'Experiencia Destacada',
        subtitle: 'Mis logros reflejan mi compromiso con la excelencia operativa y mi pasión por transformar empresas.',
        content: (
          <>
            <div className="content-container">
              <div className="image-container">
                <LazyLoadImage
                  src={professional}
                  alt="Experiencia Destacada"
                  width={500}
                  height={500}
                  effect="blur"
                  placeholderSrc={professional}
                  className="optimized-image"
                />
              </div>
              <div className="text-content">
                <h3>CHUBB</h3>
                <p>
                  Actualmente, como Digital Product Owner en CHUBB, lidero la transformación digital del área de renovaciones de pólizas, impulsando la automatización y personalización de procesos críticos para mejorar la experiencia del cliente y la eficiencia operativa.
                </p>
                <h3>GoFarma</h3>
                <p>
                  Como co-fundador y Director de Operaciones, diseñé e implementé un modelo operativo innovador que logró una precisión de inventario del 99.8% y redujo significativamente los tiempos de entrega.
                </p>
                <h3>Farmalisto</h3>
                <p>
                  En mi rol como Director de Ventas en Marketplaces, lideré la expansión digital de la compañía, impulsando un incremento del 144% en ventas y reduciendo considerablemente reclamos y cancelaciones.
                </p>
              </div>
            </div>
          </>
        ),
      },
      {
        title: 'Visión Tecnológica',
        image: tech_vision,
        alt: 'Visión Tecnológica',
        subtitle: 'Creo en el poder de la tecnología para transformar negocios y construir un futuro más eficiente.',
        content: (
          <>
            <div className="content-container">
              <div className="image-container">
                <LazyLoadImage
                  src={tech_vision}
                  alt="Visión Tecnológica"
                  width={500}
                  height={500}
                  effect="blur"
                  placeholderSrc={tech_vision}
                  className="optimized-image"
                />
              </div>
              <div className="text-content">
                <p>
                  Hace algunos años, durante la implementación de un sistema de automatización en una cadena logística, tuve una revelación: no solo optimizábamos procesos, sino que también transformábamos la vida de las personas, facilitándoles las tareas y mejorando su bienestar.
                </p>
                <p>
                  Estoy convencido del poder transformador de la tecnología en los negocios. Mi enfoque se centra en aprovechar soluciones innovadoras, como la inteligencia artificial, la automatización y el análisis de datos, para impulsar la eficiencia operativa y el crecimiento empresarial.
                </p>
                <p>
                  Si compartes mi visión de un futuro más eficiente y tecnológicamente avanzado, me encantaría colaborar contigo para convertir tu negocio en una verdadera historia de éxito.
                </p>
              </div>
            </div>
          </>
        ),
      },
    ],
    en: [
      {
        title: 'Personal Story',
        image: personal_story,
        alt: 'Personal Story',
        subtitle: 'Since I can remember, I’ve always had a great curiosity about how things work.',
        content: (
          <>
            <div className="content-container">
              <div className="image-container">
                <LazyLoadImage
                  src={personal_story}
                  alt="Personal Story"
                  width={500}
                  height={500}
                  effect="blur"
                  placeholderSrc={personal_story}
                  className="optimized-image"
                />
              </div>
              <div className="text-content">
                <p>
                  This curiosity led me to disassemble toys, study engineering, and ultimately, transform companies through technology.
                </p>
                <p>
                  I’m Elier Loya, an Industrial and Systems Engineer with over 10 years of experience in directing and optimizing operations. My passion for technology and innovation has led me to specialize in digital transformation and logistics management.
                </p>
                <p>
                  Throughout my career, I have led key transformations at companies such as GoFarma, Farmalisto, and PepsiCo. Currently, at CHUBB, I leverage my expertise to drive digital transformation in the renewals area, enhancing the automation and customization of critical processes.
                </p>
              </div>
            </div>
          </>
        ),
      },
      {
        title: 'Highlighted Experience',
        image: professional,
        alt: 'Highlighted Experience',
        subtitle: 'My achievements reflect my commitment to operational excellence and my passion for transforming businesses.',
        content: (
          <>
            <div className="content-container">
              <div className="image-container">
                <LazyLoadImage
                  src={professional}
                  alt="Highlighted Experience"
                  width={500}
                  height={500}
                  effect="blur"
                  placeholderSrc={professional}
                  className="optimized-image"
                />
              </div>
              <div className="text-content">
                <h3>CHUBB</h3>
                <p>
                  Currently, as a Digital Product Owner at CHUBB, I lead the digital transformation of the policy renewals area by driving automation and customization of critical processes to improve customer experience and operational efficiency.
                </p>
                <h3>GoFarma</h3>
                <p>
                  As co-founder and Chief Operating Officer, I designed and implemented an innovative operational model that achieved 99.8% inventory accuracy and significantly reduced delivery times.
                </p>
                <h3>Farmalisto</h3>
                <p>
                  In my role as Director of Marketplaces Sales, I led the company's online presence expansion, achieving a 144% increase in sales and a significant reduction in claims and cancellations.
                </p>
              </div>
            </div>
          </>
        ),
      },
      {
        title: 'Technological Vision',
        image: tech_vision,
        alt: 'Technological Vision',
        subtitle: 'I believe in the power of technology to transform businesses and build a more efficient future.',
        content: (
          <>
            <div className="content-container">
              <div className="image-container">
                <LazyLoadImage
                  src={tech_vision}
                  alt="Technological Vision"
                  width={500}
                  height={500}
                  effect="blur"
                  placeholderSrc={tech_vision}
                  className="optimized-image"
                />
              </div>
              <div className="text-content">
                <p>
                  A few years ago, while implementing an automation system in a logistics chain, I had an epiphany: I realized that we were not only optimizing processes, but also changing the lives of the people working there, making their tasks easier and their jobs more fulfilling.
                </p>
                <p>
                  I firmly believe in the transformative power of technology in business. My focus is on leveraging innovative solutions such as AI, automation, and data analysis to drive operational efficiency and business growth.
                </p>
                <p>
                  If you share my vision of a more efficient and technologically advanced future, I’d love to collaborate with you to turn your business into a success story.
                </p>
              </div>
            </div>
          </>
        ),
      },
    ],
  }), [language]);

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
    const serviciosSection = document.getElementById('servicios');
    if (serviciosSection) {
      serviciosSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToContacto = () => {
    const contactoSection = document.getElementById('contacto');
    if (contactoSection) {
      contactoSection.scrollIntoView({ behavior: 'smooth' });
    }
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
    <section id="sobre-mi" className="sobre-mi" {...swipeHandlers}>
      <div className="contenido-sobre-mi">
        <h2>{language === 'es' ? 'SOBRE MI' : 'ABOUT ME'}</h2>

        <div className="tabs">
          <button
            className="nav-arrow left"
            onClick={() => handleManualChange((currentSection - 1 + sections[language].length) % sections[language].length)}
          >
            &lt;
          </button>
          {sections[language].map((section, index) => (
            <button
              key={index}
              className={`tab-button ${currentSection === index ? 'active' : ''}`}
              onClick={() => handleManualChange(index)}
            >
              {section.title}
            </button>
          ))}
          <button
            className="nav-arrow right"
            onClick={() => handleManualChange((currentSection + 1) % sections[language].length)}
          >
            &gt;
          </button>
        </div>
        <div className="section-content">
          <div className="sub-title-container shinyy">{sections[language][currentSection].subtitle}</div>
          {sections[language][currentSection].content}
        </div>
        <div className="cta-seccion-sobre-mi">
          <button onClick={scrollToServicios} className="cta-button-2">{language === 'es' ? 'Mis Servicios' : 'My Services'}</button>
          <button onClick={scrollToContacto} className="cta-button-2">{language === 'es' ? 'Contáctame' : 'Contact Me'}</button>
        </div>
        <div className="horizontal-scroll-indicator">
          {sections[language].map((_, index) => (
            <div
              key={index}
              className={`indicator ${currentSection === index ? 'active-indicator' : ''}`}
              onClick={() => handleManualChange(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default SobreMi;
