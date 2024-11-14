import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import '../styles/components/Portafolio.css'; // Importa los estilos del portafolio desde la carpeta css
import { useTechDetails } from '../components/TechDetails';
import { TECH_KEYS } from '../constants/techKeys';

const Portafolio = () => {
  const { language } = useLanguage();
  const { getAllTechDetails } = useTechDetails();
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [modalTechId, setModalTechId] = useState(null);
  
  const allTechDetails = getAllTechDetails();
  const selectedTechDetails = modalTechId ? allTechDetails[modalTechId] : null;

  // eslint-disable-next-line no-unused-vars
  const toggleTech = (techName) => {
    console.log('Tech clicked:', techName);
    console.log('Available techs:', Object.keys(allTechDetails));
  };

  const tecnologiasMap = {
    "React": TECH_KEYS.REACT,
    "Node.js": TECH_KEYS.NODEJS,
    "Desarrollo de API": TECH_KEYS.API_DEV,
    "API Development": TECH_KEYS.API_DEV,
    "IA Generativa": TECH_KEYS.GEN_AI,
    "Generative AI": TECH_KEYS.GEN_AI,
    "Machine Learning": TECH_KEYS.MACHINE_LEARNING,
    "Python": TECH_KEYS.PYTHON,
    "WIX": TECH_KEYS.WIX,
    "Lean Six Sigma": TECH_KEYS.LEAN_SIX,
    "HuggingFace": TECH_KEYS.HUGGING_FACE,
    "Procesamiento de Lenguaje Natural": TECH_KEYS.NLP,
    "Natural Language Processing": TECH_KEYS.NLP,
    "ERP Olimpo": TECH_KEYS.ERP_OLIMPO,
    "Automatización de procesos": TECH_KEYS.PROCESS_AUTO,
    "Process Automation": TECH_KEYS.PROCESS_AUTO,
    "Gestión de inventarios": TECH_KEYS.INVENTORY,
    "Inventory Management": TECH_KEYS.INVENTORY,
    "Mercado Libre": TECH_KEYS.MERCADO_LIBRE,
    "Amazon": TECH_KEYS.AMAZON,
    "Shopify": TECH_KEYS.SHOPIFY,
    "NetSuite ERP": TECH_KEYS.NETSUITE,
    "IA para atención al cliente": TECH_KEYS.AI_CUSTOMER,
    "AI for customer service": TECH_KEYS.AI_CUSTOMER,
    "SAP": TECH_KEYS.SAP,
    "Metodología DMAIC": TECH_KEYS.DMAIC,
    "DMAIC Methodology": TECH_KEYS.DMAIC
  };

  const handleTechClick = (techName) => {
    const mappedTechName = tecnologiasMap[techName] || techName;
    console.log('Mapped tech name:', mappedTechName); // Para depuración
    setModalTechId(mappedTechName);
  };

  const proyectos = {
    es: [
      {
        nombre: "Wonderlabs",
        rol: "Desarrollador Backend Senior",
        descripcion: "Desarrollé la infraestructura backend de una plataforma que genera cuentos personalizados para niños, integrando IA avanzada para la generación automática de historias, imágenes y narraciones.",
        logros: [
          "Desarrollo de API's para gestionar los flujos esenciales, como bases de datos, generación de historias, imágenes y narraciones con IA",
          "Configuración y optimización del sitio web dinámico utilizando WIX para una experiencia de usuario fluida",
          "Implementación de un chatbot para atención al cliente utilizando inteligencia artificial avanzada"
        ],
        tecnologias: ["React", "Node.js", "Desarrollo de API", "IA Generativa", "WIX"],
        link: "https://wonderlabs.studio",
        link_u: "wonderlabs.studio"
      },
      {
        nombre: "Asistentes Virtuales",
        rol: "Desarrollador de IA",
        descripcion: "Desarrollé asistentes de IA enfocados en marketing y gestión de proyectos, mejorando la eficacia de estrategias de marca y la planificación de proyectos.",
        logros: [
          "Creación de un asistente para generar ideas innovadoras de campañas publicitarias",
          "Desarrollo de un asistente para planificar, actualizar y evaluar proyectos",
          "Implementación de funciones para mantener la motivación y el enfoque en los logros"
        ],
        tecnologias: ["HuggingFace", "Procesamiento de Lenguaje Natural", "Machine Learning", "Python"],
        link: "https://huggingface.co/chat/assistants?user=Elelier",
        link_u: "huggingface.co"
      },
      {
        nombre: "GoFarma",
        rol: "Co-fundador y Director de Operaciones",
        descripcion: "Diseñé e implementé el modelo operativo de la compañía, logrando una precisión de inventario del 99.8% y tiempos de entrega competitivos.",
        logros: [
          "Precisión del inventario del 99.8%",
          "Tiempo de procesamiento por pedido de 2 minutos",
          "Optimización de envíos locales y nacionales"
        ],
        tecnologias: ["ERP Olimpo", "Automatización de procesos", "Gestión de inventarios"],
        link: "http://www.gofarma.com",
        link_u: "gofarma.com"
      },
      {
        nombre: "Farmalisto",
        rol: "Director de Ventas en Marketplaces",
        descripcion: "Gestioné la presencia en línea en diversos marketplaces, aumentando la visibilidad y conversión de clientes.",
        logros: [
          "Reducción del 50% en reclamos y cancelaciones",
          "Incremento del 144% en ventas",
          "Aumento del 58% en ticket promedio"
        ],
        tecnologias: ["Mercado Libre", "Amazon", "Shopify", "NetSuite ERP", "IA para atención al cliente"],
        link: "https://www.farmalisto.com.mx/",
        link_u: "farmalisto.com.mx"
      },
      {
        nombre: "PepsiCo",
        rol: "Coordinador de Proyectos de Productividad",
        descripcion: "Lideré proyectos de mejora en 8 plantas de Gamesa-Quaker, optimizando procesos y aumentando la eficiencia.",
        logros: [
          "Incremento del rendimiento de materia prima en un 0.4% a nivel nacional",
          "Implementación de KPIs y gestión de proyectos de aumento de capacidad"
        ],
        tecnologias: ["SAP", "Metodología DMAIC", "Lean Six Sigma"]
      }
    ],
    en: [
      {
        nombre: "Wonderlabs",
        rol: "Senior Backend Developer",
        descripcion: "I developed the backend infrastructure for a platform that generates personalized children's stories, integrating advanced AI for automatic story, image, and narration generation.",
        logros: [
          "Developed APIs to manage core workflows, including databases, story generation, images, and AI-driven storytelling",
          "Configured and optimized a dynamic website using WIX for a seamless user experience",
          "Implemented a customer service chatbot using advanced artificial intelligence"
        ],
        tecnologias: ["React", "Node.js", "API Development", "Generative AI", "WIX"],
        link: "https://wonderlabs.studio",
        link_u: "wonderlabs.studio"
      },
      {
        nombre: "Virtual Assistants",
        rol: "AI Developer",
        descripcion: "Developed AI assistants focused on marketing and project management, improving brand strategy effectiveness and project planning.",
        logros: [
          "Creation of an assistant for generating innovative advertising campaign ideas",
          "Development of an assistant for planning, updating, and evaluating projects",
          "Implementation of features to maintain motivation and focus on achievements"
        ],
        tecnologias: ["HuggingFace", "Natural Language Processing", "Machine Learning", "Python"],
        link: "https://huggingface.co/chat/assistants?user=Elelier",
        link_u: "huggingface.co"
      },
      {
        nombre: "GoFarma",
        rol: "Co-Founder and Director of Operations",
        descripcion: "Designed and implemented the company's operational model, achieving a 99.8% inventory accuracy and competitive delivery times.",
        logros: [
          "99.8% inventory accuracy",
          "Order processing time of 2 minutes",
          "Optimization of local and national shipping"
        ],
        tecnologias: ["ERP Olimpo", "Process Automation", "Inventory Management"],
        link: "http://www.gofarma.com",
        link_u: "gofarma.com"
      },
      {
        nombre: "Farmalisto",
        rol: "Director of Sales in Marketplaces",
        descripcion: "Managed the online presence across various marketplaces, increasing visibility and customer conversion.",
        logros: [
          "50% reduction in complaints and cancellations",
          "144% increase in sales",
          "58% increase in average ticket size"
        ],
        tecnologias: ["Mercado Libre", "Amazon", "Shopify", "NetSuite ERP", "AI for customer service"],
        link: "https://www.farmalisto.com.mx/",
        link_u: "farmalisto.com.mx"
      },
      {
        nombre: "PepsiCo",
        rol: "Productivity Projects Coordinator",
        descripcion: "Led improvement projects in 8 Gamesa-Quaker plants, optimizing processes and increasing efficiency.",
        logros: [
          "0.4% increase in raw material performance nationwide",
          "Implementation of KPIs and capacity increase projects"
        ],
        tecnologias: ["SAP", "DMAIC Methodology", "Lean Six Sigma"]
      }
    ]
  };

  const toggleCollapse = (e) => {
    e.preventDefault();
    setIsCollapsed(!isCollapsed);
  };

  const closeModal = () => {
    setModalTechId(null);
  };

  const techTitles = {
    [TECH_KEYS.REACT]: "React",
    [TECH_KEYS.NODEJS]: "Node.js",
    [TECH_KEYS.API_DEV]: language === 'es' ? "Desarrollo de API's" : "API Development",
    [TECH_KEYS.GEN_AI]: language === 'es' ? "IA Generativa" : "Generative AI",
    [TECH_KEYS.MACHINE_LEARNING]: "Machine Learning",
    [TECH_KEYS.PYTHON]: "Python",
    [TECH_KEYS.WIX]: "WIX",
    [TECH_KEYS.LEAN_SIX]: "Lean Six Sigma",
    [TECH_KEYS.HUGGING_FACE]: "HuggingFace",
    [TECH_KEYS.NLP]: language === 'es' ? "Procesamiento de Lenguaje Natural" : "Natural Language Processing",
    [TECH_KEYS.ERP_OLIMPO]: "ERP Olimpo",
    [TECH_KEYS.PROCESS_AUTO]: language === 'es' ? "Automatización de procesos" : "Process Automation",
    [TECH_KEYS.INVENTORY]: language === 'es' ? "Gestión de inventarios" : "Inventory Management",
    [TECH_KEYS.MERCADO_LIBRE]: "Mercado Libre",
    [TECH_KEYS.AMAZON]: "Amazon",
    [TECH_KEYS.SHOPIFY]: "Shopify",
    [TECH_KEYS.NETSUITE]: "NetSuite ERP",
    [TECH_KEYS.AI_CUSTOMER]: language === 'es' ? "IA para atención al cliente" : "AI for customer service",
    [TECH_KEYS.SAP]: "SAP",
    [TECH_KEYS.DMAIC]: language === 'es' ? "Metodología DMAIC" : "DMAIC Methodology"
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        closeModal();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <section id="portafolio" className="portafolio">
      <div className="portafolio-header">
        <h1>{language === 'es' ? 'Portafolio de Proyectos' : 'Project Portfolio'}</h1>
      </div>
      <p className="introduccion shinyh">
        {language === 'es' ?
          'En mi trayectoria profesional, he liderado proyectos transformadores que han redefinido el éxito para diversas organizaciones.' :
          'Throughout my career, I have led transformative projects that have redefined success for various organizations.'}
        <br></br>
        <button className="leer-mas" onClick={toggleCollapse}>
          {language === 'es' ? 'Leer más' : 'Read more'}
        </button>
      </p>
      <div className={`contenido-colapsable ${isCollapsed ? 'collapsed' : ''}`}>
        <p>
          {language === 'es' ?
            'Desde aplicaciones innovadoras hasta la optimización de operaciones, mi portafolio combina estrategia, tecnología y una ejecución apasionada. Cada proyecto aborda desafíos complejos con soluciones escalables y automatizadas, ayudando a personas y organizaciones a superar obstáculos y crecer. Explora cómo estas experiencias han impulsado la transformación en cada caso.' :
            'From innovative applications to operational optimization, my portfolio blends strategy, technology, and passionate execution. Each project tackles complex challenges with scalable and automated solutions, helping individuals and organizations overcome obstacles and grow. Explore how these experiences have driven transformation in each case.'}
        </p>
      </div>
      <div className="proyectos-grid">
        {proyectos[language].map((proyecto, index) => (
          <div 
            key={index} 
            className={`proyecto-card ${proyecto.nombre === 'Wonderlabs' || proyecto.nombre === 'Virtual Assistants' ? 'destacado ia' : ''}`}
          >
            <h3>{proyecto.nombre}</h3>
            <p className="proyecto-rol">{proyecto.rol}</p>
            <p className="proyecto-descripcion">{proyecto.descripcion}</p>
            <div className="proyecto-logros">
              <h4>{language === 'es' ? 'Logros Destacados:' : 'Key Achievements:'}</h4>
              <ul>
                {proyecto.logros && proyecto.logros.map((logro, i) => (
                  <li key={i}>{logro}</li>
                ))}
              </ul>
            </div>
            <div className="proyecto-tecnologias">
              <h4>{language === 'es' ? 'Tecnologías Utilizadas:' : 'Technologies Used:'}</h4>
              <ul>
                {proyecto.tecnologias && proyecto.tecnologias.map((tec, i) => (
                  <li 
                    key={i} 
                    onClick={() => handleTechClick(tec)} 
                    className="tecnologia-item"
                  >
                    {tec}
                  </li>
                ))}
              </ul>
            </div>
            <div className="espacio"></div>
            {proyecto.link && (
              <div className="proyecto-cta">
                <a href={proyecto.link} className="cta-button-3" target="_blank" rel="noopener noreferrer">
                  {language === 'es' ? `Visita: ${proyecto.link_u}` : `Visit: ${proyecto.link_u}`}
                </a>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Modal mejorado */}
      {modalTechId && selectedTechDetails && (
        <div className="tech-modal-overlay" onClick={closeModal}>
          <div className="tech-modal-content" onClick={e => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={closeModal}>×</button>
            <div className="modal-header">
              <span className="tech-icon">{selectedTechDetails.icon}</span>
              <h2>
                {techTitles[modalTechId] || modalTechId}
              </h2>
            </div>
            <div className="modal-body">
              {selectedTechDetails ? (
                <>
                  <div className="tech-meta">
                    <span className="tech-year">
                      {language === 'es' ? 'Año: ' : 'Year: '}{selectedTechDetails.year || 'N/A'}
                    </span>
                    <span className="tech-creator">
                      {language === 'es' ? 'Creador: ' : 'Creator: '}{selectedTechDetails.creator || 'N/A'}
                    </span>
                    <span className="tech-popularity">
                      {language === 'es' ? 'Popularidad: ' : 'Popularity: '}{selectedTechDetails.popularity || 'N/A'}
                    </span>
                  </div>
                  <p className="tech-description">{selectedTechDetails.description || ''}</p>
                  {selectedTechDetails.features && selectedTechDetails.features.length > 0 && (
                    <>
                      <h4>{language === 'es' ? 'Características principales:' : 'Key features:'}</h4>
                      <ul className="tech-features">
                        {selectedTechDetails.features.map((feature, index) => (
                          <li key={index}>{feature}</li>
                        ))}
                      </ul>
                    </>
                  )}
                  {selectedTechDetails.tools && selectedTechDetails.tools.length > 0 && (
                    <div className="tech-tools">
                      <h4>{language === 'es' ? 'Herramientas relacionadas:' : 'Related tools:'}</h4>
                      <div className="tools-list">
                        {selectedTechDetails.tools.map((tool, index) => (
                          <span key={index} className="tool-tag">{tool}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <p>{language === 'es' 
                  ? `Información no disponible para ${modalTechId}` 
                  : `Information not available for ${modalTechId}`}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Portafolio;

