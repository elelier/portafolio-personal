import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import TechDetailsModal from './TechDetailsModal';
import { TECH_KEYS } from '../constants/techKeys';
import '../styles/components/Servicios.css';

function Servicios() {
  const { language } = useLanguage();
  const [selectedTech, setSelectedTech] = useState(null);

  const handleScrollToElement = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleTechClick = (tech) => {
    // Mapear el nombre de la tecnología a su clave correspondiente
    const techKeyMap = {
      // Desarrollo
      'React': TECH_KEYS.REACT,
      'Node.js': TECH_KEYS.NODEJS,
      'Python': TECH_KEYS.PYTHON,
      'Hugging Face': TECH_KEYS.HUGGING_FACE,
      
      // Análisis y Procesos
      'Análisis de procesos': TECH_KEYS.PROCESS_AUTO,
      'Process Analysis': TECH_KEYS.PROCESS_AUTO,
      'Planificación estratégica': TECH_KEYS.LEAN_SIX,
      'Strategic Planning': TECH_KEYS.LEAN_SIX,
      'Automatización digital': TECH_KEYS.PROCESS_AUTO,
      'Digital Automation': TECH_KEYS.PROCESS_AUTO,
      'Optimización logística': TECH_KEYS.INVENTORY,
      'Logistics Optimization': TECH_KEYS.INVENTORY,
      'Lean Management': TECH_KEYS.LEAN_SIX,
      'DMAIC': TECH_KEYS.DMAIC,
      
      // IA y Machine Learning
      'Chatbots': TECH_KEYS.AI_CUSTOMER,
      'Aprendizaje automático': TECH_KEYS.MACHINE_LEARNING,
      'Machine Learning': TECH_KEYS.MACHINE_LEARNING,
      'Procesamiento de Lenguaje Natural': TECH_KEYS.NLP,
      'Natural Language Processing': TECH_KEYS.NLP,
      'IA Generativa': TECH_KEYS.GEN_AI,
      'Generative AI': TECH_KEYS.GEN_AI,
      'IA para servicio al cliente': TECH_KEYS.AI_CUSTOMER,
      'AI for Customer Service': TECH_KEYS.AI_CUSTOMER,
      
      // Desarrollo e Integración
      'Desarrollo de APIs': TECH_KEYS.API_DEV,
      'API Development': TECH_KEYS.API_DEV,
      'Integración de sistemas': TECH_KEYS.API_DEV,
      'System Integration': TECH_KEYS.API_DEV,
      
      // Plataformas y E-commerce
      'Wix': TECH_KEYS.WIX,
      'ERP Olimpo': TECH_KEYS.ERP_OLIMPO,
      'Gestión de inventarios': TECH_KEYS.INVENTORY,
      'Inventory Management': TECH_KEYS.INVENTORY,
      'Mercado Libre': TECH_KEYS.MERCADO_LIBRE,
      'Amazon': TECH_KEYS.AMAZON,
      'Shopify': TECH_KEYS.SHOPIFY,
      'NetSuite': TECH_KEYS.NETSUITE,
      'SAP': TECH_KEYS.SAP,
      'SEO y SEM': TECH_KEYS.WIX,
      'SEO and SEM': TECH_KEYS.WIX
    };

    console.log('Tech clicked:', tech); // Para debugging
    const techKey = techKeyMap[tech];
    console.log('Tech key found:', techKey); // Para debugging
    
    if (techKey) {
      setSelectedTech(techKey);
    }
  };

  const handleCloseModal = () => {
    setSelectedTech(null);
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

  const { servicios, introduccion, encabezado, beneficios, tecnologias } = translations[language] || translations.es;

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
                    <li 
                      key={i} 
                      onClick={() => handleTechClick(tech)}
                      style={{ cursor: 'pointer', position: 'relative', zIndex: 10 }}
                    >
                      {tech}
                    </li>
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
      <TechDetailsModal
        isOpen={selectedTech !== null}
        onClose={handleCloseModal}
        techKey={selectedTech}
      />
    </section>
  );
}

export default Servicios;
