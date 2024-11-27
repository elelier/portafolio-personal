import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import '../styles/components/Portafolio.css';
import '../styles/components/Timeline.css';
import { getCurrentLanguage } from './utils/languageUtils';

// Import images
import wonderlabsImg from '../assets/images/wonderlabs.jpg';
import elelierImg from '../assets/images/elelier.jpg';
import gofarmaImg from '../assets/images/gofarma.jpg';
import farmalistoImg from '../assets/images/farmalisto.jpg';
import pepsicoImg from '../assets/images/pepsico.jpg';

const Portafolio = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const { language } = useLanguage();
  const [currentLang, setCurrentLang] = useState(getCurrentLanguage());

  useEffect(() => {
    const handleLanguageChange = () => {
      setCurrentLang(getCurrentLanguage());
    };

    window.addEventListener('languagechange', handleLanguageChange);
    return () => {
      window.removeEventListener('languagechange', handleLanguageChange);
    };
  }, []);

  useEffect(() => {
    setCurrentLang(getCurrentLanguage());
  }, [language]);

  const proyectos = {
    es: [
      {
        nombre: "Asistentes Virtuales",
        timeline: "2024",
        rol: "Desarrollador de IA",
        image: elelierImg,
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
        nombre: "Wonderlabs",
        timeline: "2023-2024",
        rol: "Desarrollador Backend Senior",
        image: wonderlabsImg,
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
        nombre: "GoFarma",
        timeline: "2016-2024",
        rol: "Co-fundador y Director de Operaciones",
        image: gofarmaImg,
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
        timeline: "2022-2024",
        rol: "Director de Ventas en Marketplaces",
        image: farmalistoImg,
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
        timeline: "2012-2016",
        rol: "Coordinador de Proyectos de Productividad",
        image: pepsicoImg,
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
        nombre: "Virtual Assistants",
        timeline: "2024",
        rol: "AI Developer",
        image: elelierImg,
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
        nombre: "Wonderlabs",
        timeline: "2023-2024",
        rol: "Senior Backend Developer",
        image: wonderlabsImg,
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
        nombre: "GoFarma",
        timeline: "2016-2024",
        rol: "Co-founder and Operations Director",
        image: gofarmaImg,
        descripcion: "Designed and implemented the company's operating model, achieving 99.8% inventory accuracy and competitive delivery times.",
        logros: [
          "99.8% inventory accuracy",
          "2-minute order processing time",
          "Optimization of local and national shipping"
        ],
        tecnologias: ["ERP Olimpo", "Process Automation", "Inventory Management"],
        link: "http://www.gofarma.com",
        link_u: "gofarma.com"
      },
      {
        nombre: "Farmalisto",
        timeline: "2022-2024",
        rol: "Marketplace Sales Director",
        image: farmalistoImg,
        descripcion: "Managed the online presence across various marketplaces, increasing customer visibility and conversion.",
        logros: [
          "50% reduction in claims and cancellations",
          "144% increase in sales",
          "58% increase in average ticket"
        ],
        tecnologias: ["Mercado Libre", "Amazon", "Shopify", "NetSuite ERP", "AI for Customer Service"],
        link: "https://www.farmalisto.com.mx/",
        link_u: "farmalisto.com.mx"
      },
      {
        nombre: "PepsiCo",
        timeline: "2012-2016",
        rol: "Productivity Projects Coordinator",
        image: pepsicoImg,
        descripcion: "Led improvement projects in 8 Gamesa-Quaker plants, optimizing processes and increasing efficiency.",
        logros: [
          "0.4% increase in raw material performance nationwide",
          "Implementation of KPIs and capacity increase projects"
        ],
        tecnologias: ["SAP", "DMAIC Methodology", "Lean Six Sigma"]
      }
    ]
  };

  return (
    <section className="portafolio">
      <h2>{currentLang === 'es' ? 'Carrera Profesional' : 'Professional Career'}</h2>
      <p className="introduccion">
        {currentLang === 'es' 
          ? 'Mi portafolio refleja una trayectoria diversa en tecnología y gestión empresarial. Cada proyecto representa un desafío único donde he aplicado mis conocimientos en desarrollo de software, inteligencia artificial y optimización de procesos.' 
          : "My portfolio reflects a diverse background in technology and business management. Each project represents a unique challenge where I've applied my expertise in software development, artificial intelligence, and process optimization."}
      </p>
      <div className="timeline">
        {(currentLang === 'es' ? proyectos.es : proyectos.en).map((proyecto, idx) => (
          <article key={proyecto.nombre} className={idx % 2 === 0 ? 'left' : 'right'}>
            <div 
              className={`content-wrapper ${activeIndex === idx ? 'expanded' : ''}`}
              onClick={() => setActiveIndex(activeIndex === idx ? null : idx)}
            >
              <span className="year">{proyecto.timeline}</span>
              <div className="banner-container">
                <img 
                  src={proyecto.image} 
                  alt={proyecto.nombre || ''} 
                  className="banner-image"
                />
                <div className="image-overlay"></div>
              </div>
              <div className="content">
                <h3>{proyecto.nombre || ''}</h3>
                <h4>{proyecto.rol || ''}</h4>
                <p>{proyecto.descripcion || ''}</p>
                {activeIndex === idx && (
                  <div className="logros">
                    <h5>{currentLang === 'es' ? 'Logros Destacados:' : 'Key Achievements:'}</h5>
                    <ul>
                      {proyecto.logros?.map((logro, logroIdx) => (
                        <li key={logroIdx}>{logro}</li>
                      ))}
                    </ul>
                    {proyecto.link && (
                      <a 
                        href={proyecto.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="proyecto-link"
                      >
                        {proyecto.link_u} →
                      </a>
                    )}
                  </div>
                )}
              </div>
              <div className="examples">
                {proyecto.tecnologias?.map((tech, techIndex) => (
                  <a 
                    key={techIndex} 
                    href={`#${tech.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    {tech}
                  </a>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Portafolio;
