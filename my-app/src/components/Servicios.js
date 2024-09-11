import React from 'react';
import './css/Servicios.css'; // Asegúrate de que este archivo CSS esté en la misma carpeta

function Servicios() {
  const servicios = [
    {
      nombre: "Consultoría en Transformación Digital",
      descripcion: "Asesoramiento estratégico para la implementación de tecnologías digitales que optimicen procesos y mejoren la eficiencia operativa.",
      beneficios: [
        "Identificación de oportunidades de digitalización",
        "Desarrollo de estrategias de transformación a medida",
        "Implementación y seguimiento de proyectos digitales"
      ],
      tecnologias: ["Análisis de procesos", "Planificación estratégica", "Automatización digital"]
    },
    {
      nombre: "Optimización de Operaciones y Logística",
      descripcion: "Mejora de procesos operativos y logísticos para aumentar la eficiencia y reducir costos.",
      beneficios: [
        "Análisis y rediseño de procesos",
        "Implementación de sistemas de gestión de inventario",
        "Optimización de rutas y tiempos de entrega"
      ],
      tecnologias: ["Gestión de inventarios", "Optimización logística", "Lean Management"]
    },
    {
      nombre: "Implementación de Soluciones IA",
      descripcion: "Desarrollo e integración de soluciones de Inteligencia Artificial para automatizar tareas y mejorar la toma de decisiones.",
      beneficios: [
        "Chatbots y asistentes virtuales personalizados",
        "Sistemas de predicción y análisis avanzado",
        "Automatización de procesos mediante IA"
      ],
      tecnologias: ["Chatbots", "Aprendizaje automático", "Procesamiento de Lenguaje Natural"]
    },
    {
      nombre: "Desarrollo de Aplicaciones Personalizadas",
      descripcion: "Creación de aplicaciones a medida para satisfacer necesidades específicas de negocio.",
      beneficios: [
        "Soluciones adaptadas a requerimientos únicos",
        "Integración con sistemas existentes",
        "Mejora de la eficiencia y productividad"
      ],
      tecnologias: ["React", "Node.js", "Desarrollo de APIs", "Integración de sistemas"]
    },
    {
      nombre: "Estrategias de E-commerce y Marketplaces",
      descripcion: "Diseño e implementación de estrategias para optimizar la presencia y ventas en plataformas de comercio electrónico.",
      beneficios: [
        "Optimización de listings y contenido",
        "Estrategias de pricing y promociones",
        "Gestión de reputación y servicio al cliente"
      ],
      tecnologias: ["Shopify", "Amazon", "Mercado Libre", "SEO y SEM"]
    }
  ];

  // Función para desplazarse a la sección de contacto
  const handleScrollToElement = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="servicios" className="servicios">
      <div className="servicios-header">
        <h1>Servicios</h1>
      </div>
      <p className="introduccion shinyh">
        Ofrezco una amplia gama de servicios para ayudar a empresas y emprendedores a digitalizar y optimizar sus operaciones.
      </p>
      <div className="servicios-grid">
        {servicios.map((servicio, index) => (
          <div 
            key={index} 
            className={`servicio-card ${servicio.nombre === 'Implementación de Soluciones IA' || servicio.nombre === 'Asistentes Virtuales' ? 'destacado ia' : ''}`}
          >
            <h3>{servicio.nombre}</h3>
            <p className="servicio-descripcion">{servicio.descripcion}</p>
            <div className="servicio-beneficios">
              <h4>Beneficios:</h4>
              <ul>
                {servicio.beneficios.map((beneficio, i) => (
                  <li key={i}>{beneficio}</li>
                ))}
              </ul>
            </div>
            <div className="contenedor-tecnologias">
              <div className="servicio-tecnologias">
                <h4>Tecnologías:</h4>
                <ul>
                  {servicio.tecnologias.map((tech, i) => (
                    <li key={i}>{tech}</li>
                  ))}
                </ul>
              </div>
            </div>  
            <div className="servicio-cta">
              {/* Desplazar hacia la sección de contacto */}
              <button className="cta-button-3" onClick={() => handleScrollToElement('contacto')}>
                Contáctame
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Servicios;
