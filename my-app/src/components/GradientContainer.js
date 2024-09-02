import React, { useState } from 'react';
import './GradientContainer.css';

const items = [
  {
    id: 'item1',
    content: (
      <>
        <div className="contenido-sobre-mi">
          <div className="historia-personal">
            <h3 className="shiny">
              <b>Desde que tengo memoria, siempre he sentido una gran curiosidad por cómo funcionan las cosas.</b>
            </h3>
            <p>Esa curiosidad me llevó a desarmar juguetes, estudiar ingeniería, y finalmente, transformar empresas a través de la tecnología.</p>
            <p>Soy Elier Loya, un Ingeniero Industrial y de Sistemas con más de 10 años de experiencia en la dirección y optimización de operaciones...</p>
            <p>A lo largo de mi carrera, he tenido el privilegio de liderar transformaciones clave en empresas como GoFarma, Farmalisto y PepsiCo...</p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'item2',
    content: (
      <>
        <div className="contenido-sobre-mi">
          <div className="historia-personal">
            <h3 className="shiny">
              <b>Experiencia Destacada</b>
            </h3>
            <h4>GoFarma</h4>
            <p>
              Como co-fundador y Director de Operaciones, diseñé e implementé un modelo operativo innovador que logró una precisión de inventario del 99.8% y tiempos de entrega altamente competitivos.
            </p>
            <h4>Farmalisto</h4>
            <p>
              En mi rol como Director de Ventas en Marketplaces, lideré la expansión de la presencia en línea de la compañía, logrando un incremento del 144% en ventas y una reducción significativa en reclamos y cancelaciones.
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'item3',
    content: (
      <>
        <div className="contenido-sobre-mi">
          <div className="historia-personal">
            <h3 className="shiny">
              <b>Mi Visión Tecnológica</b>
            </h3>
            <p>
              Hace algunos años, tuve un momento de epifanía mientras implementaba un sistema de automatización en una cadena logística. Me di cuenta de que no solo estaba optimizando procesos, estaba cambiando la vida de las personas que trabajaban allí, haciéndoles la vida más fácil y sus trabajos más satisfactorios.
            </p>
            <p>
              Creo firmemente en el poder transformador de la tecnología en los negocios. Mi enfoque se centra en aprovechar soluciones innovadoras como la IA, la automatización y el análisis de datos para impulsar la eficiencia operativa y el crecimiento empresarial.
            </p>
            <p>
              Si compartes mi visión de un futuro más eficiente y tecnológicamente avanzado, me encantaría que trabajáramos juntos. Vamos a transformar tu negocio en una historia de éxito.
          </p>
          </div>
        </div>
      </>
    ),
  },
];

const GradientContainer = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextItem = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
  };

  const prevItem = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + items.length) % items.length);
  };

  // Agrega el h2 fuera del contenedor .gradient-container
  return (
    <>
      <h2 className="title">Más sobre mí</h2> {/* Mover esta línea aquí */}
      <section id="sobre-mi" className="gradient-container">
        {items[currentIndex].content}
        <div className="navigation">
          <button className="nav-button" onClick={prevItem}>‹</button>
          <div className="dots">
            {items.map((_, index) => (
              <span key={index} className={`dot ${index === currentIndex ? 'active' : ''}`}></span>
            ))}
          </div>
          <button className="nav-button" onClick={nextItem}>›</button>
        </div>
      </section>
    </>
  );
};

export default GradientContainer;
