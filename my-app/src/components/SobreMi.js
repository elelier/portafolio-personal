// SobreMi.js
import React, { useState, useEffect } from 'react';
import './css/SobreMi.css';

function SobreMi() {
  const [currentSection, setCurrentSection] = useState(0);

  const sections = [
    {
      title: 'Historia Personal',
      image: 'ruta_de_la_imagen_historia_personal.jpg',
      alt: 'Historia Personal',
      content: (
        <>
          <p className="gancho-emocional">
            Desde que tengo memoria, siempre he sentido una gran curiosidad por cómo funcionan las cosas.
          </p>
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
      image: 'ruta_de_la_imagen_experiencia_destacada.jpg',
      alt: 'Experiencia Destacada',
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
      image: 'ruta_de_la_imagen_vision_tecnologica.jpg',
      alt: 'Visión Tecnológica',
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
    const nav = document.querySelector('.navegacion');
    nav.classList.add('no-hide');
  
    const timeout = setTimeout(() => {
      nav.classList.remove('no-hide');
    }, 2000); // Desactivar la desaparición por 2 segundos
  
    return () => clearTimeout(timeout);
  }, [currentSection]); // Se ejecuta cada vez que cambia la sección
  
  return (
    <section id="sobre-mi" className="sobre-mi">
      <div className="contenido-sobre-mi">
        <h2>Sobre Mí</h2>
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
          <div className="image-container">
            <img src={sections[currentSection].image} alt={sections[currentSection].alt} />
          </div>
          <div className="text-content">
            {sections[currentSection].content}
          </div>
        </div>
      </div>
    </section>
  );
}

export default SobreMi;
