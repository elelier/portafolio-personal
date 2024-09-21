import React, { useState, useEffect, useRef } from 'react';
import '../styles/components/SobreMi.css';
import personal_story from '../assets/images/profile-picture-elier2.png';
import professional from '../assets/images/ecommerce_marketing.png';
import tech_vision from '../assets/images/technologic_vision.png';
import { useSwipeable } from 'react-swipeable';
import { useLanguage } from '../contexts/LanguageContext'; 

function SobreMi() {
  const [currentSection, setCurrentSection] = useState(0);
  const { language } = useLanguage(); // Obtén el idioma del contexto
  const intervalRef = useRef(null); // Para mantener una referencia al intervalo

  const sections = {
    es: [
      {
        title: 'Historia Personal',
        image: personal_story,
        alt: 'Historia Personal',
        subtitle: 'Desde que tengo memoria, siempre he sentido una gran curiosidad por cómo funcionan las cosas.',
        content: (
          <>
            <p>
              Esa curiosidad me llevó a desarmar juguetes, estudiar ingeniería, y finalmente, transformar empresas a través de la tecnología.
            </p>
            <p>
              Soy Elier Loya, un Ingeniero Industrial y de Sistemas con más de 10 años de experiencia en la dirección y optimización de operaciones. Mi pasión por la tecnología y la innovación me ha llevado a especializarme en transformación digital y gestión logística.
            </p>
            <p>
              A lo largo de mi carrera, he tenido el privilegio de liderar transformaciones clave en empresas como GoFarma, Farmalisto y PepsiCo, enfocándome en la digitalización, automatización y escalabilidad de procesos complejos.
            </p>
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
            <h3>GoFarma</h3>
            <p>
              Como co-fundador y Director de Operaciones, diseñé e implementé un modelo operativo innovador que logró una precisión de inventario del 99.8% y tiempos de entrega altamente competitivos.
            </p>
            <h3>Farmalisto</h3>
            <p>
              En mi rol como Director de Ventas en Marketplaces, lideré la expansión de la presencia en línea de la compañía, logrando un incremento del 144% en ventas y una reducción significativa en reclamos y cancelaciones.
            </p>
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
            <p>
              Hace algunos años, tuve un momento de epifanía mientras implementaba un sistema de automatización en una cadena logística. Me di cuenta de que no solo estaba optimizando procesos, estaba cambiando la vida de las personas que trabajaban allí, haciéndoles la vida más fácil y sus trabajos más satisfactorios.
            </p>
            <p>
              Creo firmemente en el poder transformador de la tecnología en los negocios. Mi enfoque se centra en aprovechar soluciones innovadoras como la IA, la automatización y el análisis de datos para impulsar la eficiencia operativa y el crecimiento empresarial.
            </p>
            <p>
              Si compartes mi visión de un futuro más eficiente y tecnológicamente avanzado, me encantaría que trabajáramos juntos. Vamos a transformar tu negocio en una historia de éxito.
            </p>
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
            <p>
              This curiosity led me to disassemble toys, study engineering, and ultimately, transform companies through technology.
            </p>
            <p>
              I’m Elier Loya, an Industrial and Systems Engineer with over 10 years of experience in directing and optimizing operations. My passion for technology and innovation has led me to specialize in digital transformation and logistics management.
            </p>
            <p>
              Throughout my career, I’ve had the privilege of leading key transformations at companies like GoFarma, Farmalisto, and PepsiCo, focusing on digitization, automation, and scalability of complex processes.
            </p>
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
            <h3>GoFarma</h3>
            <p>
              As co-founder and Chief Operating Officer, I designed and implemented an innovative operational model that achieved a 99.8% inventory accuracy and highly competitive delivery times.
            </p>
            <h3>Farmalisto</h3>
            <p>
              In my role as Director of Marketplaces Sales, I led the company's online presence expansion, achieving a 144% increase in sales and a significant reduction in claims and cancellations.
            </p>
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
            <p>
              A few years ago, I had an epiphany while implementing an automation system in a logistics chain. I realized that I was not only optimizing processes; I was changing the lives of the people working there, making their lives easier and their jobs more fulfilling.
            </p>
            <p>
              I firmly believe in the transformative power of technology in business. My focus is on leveraging innovative solutions such as AI, automation, and data analysis to drive operational efficiency and business growth.
            </p>
            <p>
              If you share my vision of a more efficient and technologically advanced future, I’d love to work together. Let’s turn your business into a success story.
            </p>
          </>
        ),
      },
    ],
  };

  useEffect(() => {
    setCurrentSection(0); // Reinicia la sección a 0 cuando cambie el idioma
  }, [language]);

  useEffect(() => {
    // Limpia el intervalo previo si existe
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    // Configura el intervalo nuevo
    intervalRef.current = setInterval(() => {
      setCurrentSection((prevSection) => (prevSection + 1) % sections[language].length);
    }, 30000); // Cambia de sección cada 30 segundos

    // Limpia el intervalo al desmontar el componente
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [language, sections[language].length]);

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
    // Reinicia el intervalo al cambiar manualmente
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
        <h2>{language === 'es' ? 'Sobre Mí' : 'About Me'}</h2>

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
          <div className="image-container">
            <img src={sections[language][currentSection].image} alt={sections[language][currentSection].alt} />
          </div>
          <div className="text-content">
            {sections[language][currentSection].content}
          </div>
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
