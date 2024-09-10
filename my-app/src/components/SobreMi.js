import React, { useState, useEffect } from 'react';
import './css/SobreMi.css';
import personal_story from './assets/files/profile-picture-elier2.png';
import professional from './assets/files/ecommerce_marketing.png';
import tech_vision from './assets/files/technologic_vision.png';
import { Link } from 'react-router-dom';
import { useSwipeable } from 'react-swipeable';

function SobreMi() {
  const [currentSection, setCurrentSection] = useState(0);

  const sections = [
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
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSection((prevSection) => (prevSection + 1) % sections.length);
    }, 30000); // Cambia de sección cada 30 segundos

    return () => clearInterval(interval);
  }, [sections.length]);

  const handleSwipe = (eventData) => {
    if (eventData && eventData.dir) {
      const { dir } = eventData;
      if (dir === 'Left') {
        setCurrentSection((prevSection) => (prevSection + 1) % sections.length);
      } else if (dir === 'Right') {
        setCurrentSection((prevSection) => (prevSection - 1 + sections.length) % sections.length);
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

  return (
    <section id="sobre-mi" className="sobre-mi" {...swipeHandlers}>
      <div className="contenido-sobre-mi">
        <h2>Sobre Mí</h2>
        <div className="navigation-arrows">
          <button
            className="nav-arrow left"
            onClick={() => setCurrentSection((prevSection) => (prevSection - 1 + sections.length) % sections.length)}
          >
            &lt;
          </button>
          <button
            className="nav-arrow right"
            onClick={() => setCurrentSection((prevSection) => (prevSection + 1) % sections.length)}
          >
            &gt;
          </button>
        </div>
        <div className="tabs">
          {sections.map((section, index) => (
            <button
              key={index}
              className={`tab-button ${currentSection === index ? 'active' : ''}`}
              onClick={() => setCurrentSection(index)}
            >
              {section.title}
            </button>
          ))}
        </div>
        <div className="section-content">
          <div className="sub-title-container shinyy">{sections[currentSection].subtitle}</div>
          <div className="image-container">
            <img src={sections[currentSection].image} alt={sections[currentSection].alt} />
          </div>
          <div className="text-content">
            {sections[currentSection].content}
          </div>
        </div>
        <div className="cta-seccion-sobre-mi">
          <Link to="/servicios" className="cta-button-2">Mis Servicios</Link>
          <Link to="/contacto" className="cta-button-2">Contáctame</Link>
        </div>
        <div className="horizontal-scroll-indicator">
          {sections.map((_, index) => (
            <div
              key={index}
              className={`indicator ${currentSection === index ? 'active-indicator' : ''}`}
              onClick={() => setCurrentSection(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default SobreMi;
