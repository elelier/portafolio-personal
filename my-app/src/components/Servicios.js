import React from 'react';
import { useLanguage } from '../LanguageContext'; // Asegúrate de ajustar esta ruta si es necesario
import './css/Servicios.css';

function Servicios() {
  const { language } = useLanguage(); // Obtén el idioma actual del contexto

  const handleScrollToElement = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const translations = {
    es: {
      servicios: [
        {
          id: "consultoria-transformacion-digital",  // ID en español
          nombre: "Consultoría en Transformación Digital",
          descripcion: "Asesoramiento estratégico para la implementación de tecnologías digitales que optimicen procesos y mejoren la eficiencia operativa.",
          beneficios: [
            "Identificación de oportunidades de digitalización",
            "Desarrollo de estrategias de transformación a medida",
            "Implementación y seguimiento de proyectos digitales"
          ],
          tecnologias: ["Análisis de procesos", "Planificación estratégica", "Automatización digital"],
          link_u: "Digitaliza tu Negocio"
        },
        {
          id: "optimizacion-operaciones-logistica",  // ID en español
          nombre: "Optimización de Operaciones y Logística",
          descripcion: "Mejora de procesos operativos y logísticos para aumentar la eficiencia y reducir costos.",
          beneficios: [
            "Análisis y rediseño de procesos",
            "Implementación de sistemas de gestión de inventario",
            "Optimización de rutas y tiempos de entrega"
          ],
          tecnologias: ["Gestión de inventarios", "Optimización logística", "Lean Management"],
          link_u: "Mejora tus Procesos"
        },
        {
          id: "implementacion-soluciones-ia",  // ID en español
          nombre: "Implementación de Soluciones IA",
          descripcion: "Desarrollo e integración de soluciones de Inteligencia Artificial para automatizar tareas y mejorar la toma de decisiones.",
          beneficios: [
            "Chatbots y asistentes virtuales personalizados",
            "Sistemas de predicción y análisis avanzado",
            "Automatización de procesos mediante IA"
          ],
          tecnologias: ["Chatbots", "Aprendizaje automático", "Procesamiento de Lenguaje Natural"],
          link_u: "Innova con IA"
        },
        {
          id: "desarrollo-aplicaciones-personalizadas",  // ID en español
          nombre: "Desarrollo de Aplicaciones Personalizadas",
          descripcion: "Creación de aplicaciones a medida para satisfacer necesidades específicas de negocio.",
          beneficios: [
            "Soluciones adaptadas a requerimientos únicos",
            "Integración con sistemas existentes",
            "Mejora de la eficiencia y productividad"
          ],
          tecnologias: ["React", "Node.js", "Desarrollo de APIs", "Integración de sistemas"],
          link_u: "Desarrolla tu idea"
        },
        {
          id: "estrategias-ecommerce-marketplaces",  // ID en español
          nombre: "Estrategias de E-commerce y Marketplaces",
          descripcion: "Diseño e implementación de estrategias para optimizar la presencia y ventas en plataformas de comercio electrónico.",
          beneficios: [
            "Optimización de listings y contenido",
            "Estrategias de pricing y promociones",
            "Gestión de reputación y servicio al cliente"
          ],
          tecnologias: ["Shopify", "Amazon", "Mercado Libre", "SEO y SEM"],
          link_u: "Mejora tu Estrategia"
        }
      ],
      introduccion: "Ofrezco una amplia gama de servicios para ayudar a empresas y emprendedores a digitalizar y optimizar sus procesos.",
      encabezado: "Servicios",
      beneficios: "Beneficios",
      tecnologias: "Soluciones, Herramientas y Metodologías"
    },
    en: {
      servicios: [
        {
          id: "digital-transformation-consulting",  // ID en inglés
          nombre: "Digital Transformation Consulting",
          descripcion: "Strategic advice for implementing digital technologies that optimize processes and improve operational efficiency.",
          beneficios: [
            "Identification of digitalization opportunities",
            "Development of customized transformation strategies",
            "Implementation and monitoring of digital projects"
          ],
          tecnologias: ["Process Analysis", "Strategic Planning", "Digital Automation"],
          link_u: "Digitize Your Business"
        },
        {
          id: "operations-logistics-optimization",  // ID en inglés
          nombre: "Operations and Logistics Optimization",
          descripcion: "Improving operational and logistical processes to increase efficiency and reduce costs.",
          beneficios: [
            "Process analysis and redesign",
            "Implementation of inventory management systems",
            "Optimization of routes and delivery times"
          ],
          tecnologias: ["Inventory Management", "Logistics Optimization", "Lean Management"],
          link_u: "Improve Your Processes"
        },
        {
          id: "ai-solutions-implementation",  // ID en inglés
          nombre: "AI Solutions Implementation",
          descripcion: "Development and integration of artificial intelligence solutions to automate tasks and enhance decision-making.",
          beneficios: [
            "Customized chatbots and virtual assistants",
            "Prediction and advanced analytics systems",
            "Process automation through AI"
          ],
          tecnologias: ["Chatbots", "Machine Learning", "Natural Language Processing"],
          link_u: "Innovate with AI"
        },
        {
          id: "custom-application-development",  // ID en inglés
          nombre: "Custom Application Development",
          descripcion: "Creation of tailored applications to meet specific business needs.",
          beneficios: [
            "Solutions tailored to unique requirements",
            "Integration with existing systems",
            "Improvement of efficiency and productivity"
          ],
          tecnologias: ["React", "Node.js", "API Development", "System Integration"],
          link_u: "Develop Your Idea"
        },
        {
          id: "ecommerce-marketplace-strategies",  // ID en inglés
          nombre: "E-commerce and Marketplaces Strategies",
          descripcion: "Design and implementation of strategies to optimize presence and sales on e-commerce platforms.",
          beneficios: [
            "Optimization of listings and content",
            "Pricing and promotional strategies",
            "Reputation management and customer service"
          ],
          tecnologias: ["Shopify", "Amazon", "Mercado Libre", "SEO and SEM"],
          link_u: "Improve Your Strategy"
        }
      ],
      introduccion: "I offer a wide range of services to help businesses and entrepreneurs digitalize and optimize their processes.",
      encabezado: "Services",
      beneficios: "Benefits",
      tecnologias: "Solutions, Tools, and Methodologies"
    }
  };
  

  const { servicios, introduccion, encabezado, beneficios, tecnologias } = translations[language] || translations.es; // Obtén las traducciones según el idioma

  return (
    <section id="servicios" className="servicios">
      <div className="servicios-header">
        <h1>{encabezado}</h1>
      </div>
      <p className="introduccion shinyh">
        {introduccion}
      </p>
      <div className="servicios-grid">
        {servicios.map((servicio, index) => (
          <div 
            key={index} 
            className={`servicio-card ${servicio.nombre === 'Implementación de Soluciones IA' || servicio.nombre === 'AI Solutions Implementation' ? 'destacado ia' : ''}`}
          >
            <h3>{servicio.nombre}</h3>
            <p className="servicio-descripcion">{servicio.descripcion}</p>
            <div className="servicio-beneficios">
              <h4>{beneficios}:</h4>
              <ul>
                {servicio.beneficios.map((beneficio, i) => (
                  <li key={i}>{beneficio}</li>
                ))}
              </ul>
            </div>
            <div className="contenedor-tecnologias">
              <div className="servicio-tecnologias">
                <h4>{tecnologias}:</h4>
                <ul>
                  {servicio.tecnologias.map((tech, i) => (
                    <li key={i}>{tech}</li>
                  ))}
                </ul>
              </div>
            </div>  
            <div className="servicio-cta">
              <button className="cta-button-3" onClick={() => handleScrollToElement('contacto')}>
                {servicio.link_u}
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Servicios;
