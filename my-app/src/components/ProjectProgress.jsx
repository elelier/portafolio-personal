import React, { useMemo } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import '../styles/components/ProjectProgress.css';
import { FaCheckCircle, FaSpinner, FaExclamationCircle, FaLock } from 'react-icons/fa';
import { FaSitemap, FaCog, FaPalette } from 'react-icons/fa';

// Fecha de última actualización
const lastUpdated = {
  date: "09/07/2025",
  es: "Última actualización",
  en: "Last updated"
};

// Requerimientos del proyecto
const requirements = {
  structure: {
    title: {
      es: "Estructura del Sitio",
      en: "Site Structure"
    },
    items: [
      { es: "Portada", en: "Homepage" },
      { es: "Portafolio de Proyectos", en: "Project Portfolio" },
      { es: "Sobre la Arquitecta DM", en: "About Architect DM" },
      { es: "Servicios", en: "Services" },
      { es: "Contacto", en: "Contact" }
    ],
    icon: <FaSitemap />
  },
  technical: {
    title: {
      es: "Especificaciones Técnicas",
      en: "Technical Specifications"
    },
    items: [
      { es: "Diseño responsivo (prioridad mobile)", en: "Responsive design (mobile-first)" },
      { es: "Optimización de carga", en: "Load optimization" },
      { es: "SEO friendly", en: "SEO friendly" },
      { es: "Formato digital integral", en: "Comprehensive digital format" },
      { es: "Soporte multiidioma", en: "Multilanguage support" }
    ],
    icon: <FaCog />
  },
  design: {
    title: {
      es: "Diseño Visual",
      en: "Visual Design"
    },
    items: [
      { es: "Minimalista y sofisticado", en: "Minimalist and sophisticated" },
      { es: "Paleta de colores neutros", en: "Neutral color palette" },
      { es: "Tipografía moderna y limpia", en: "Modern and clean typography" },
      { es: "Espacios en blanco definidos", en: "Well-defined whitespace" }
    ],
    icon: <FaPalette />
  }
};

// Datos del proyecto - sprints
const sprints = [
    {
      id: 1,
      name: {
        es: 'Planificación y Diseño Base',
        en: 'Planning and Base Design'
      },
      description: {
        es: 'Definición de objetivos, alcance y diseño conceptual del proyecto',
        en: 'Definition of objectives, scope and conceptual design of the project'
      },
      progress: 100,
      tasks: [
        { name: { es: 'Análisis de requerimientos', en: 'Requirements analysis' }, status: 'completed' },
        { name: { es: 'Definición de arquitectura', en: 'Architecture definition' }, status: 'completed' },
        { name: { es: 'Diseño de wireframes', en: 'Wireframes design' }, status: 'completed' },
        { name: { es: 'Selección de tecnologías', en: 'Technology selection' }, status: 'completed' }
      ]
    },
    {
      id: 2,
      name: {
        es: 'Sistema de Diseño y Estructura Base',
        en: 'Design System and Base Structure'
      },
      description: {
        es: 'Implementación del sistema de diseño y componentes fundamentales',
        en: 'Implementation of the design system and fundamental components'
      },
      progress: 100,
      tasks: [
        { name: { es: 'Configuración de Next.js + Tailwind', en: 'Next.js + Tailwind configuration' }, status: 'completed' },
        { name: { es: 'Implementación de Framer Motion', en: 'Framer Motion implementation' }, status: 'completed' },
        { name: { es: 'Creación de componentes base', en: 'Creation of base components' }, status: 'completed' },
        { name: { es: 'Tipografía arquitectónica', en: 'Architectural typography' }, status: 'completed' },
        { name: { es: 'Documentación del sistema de diseño', en: 'Design system documentation' }, status: 'completed' }
      ]
    },
    {
      id: 3,
      name: {
        es: 'Desarrollo de Secciones Principales',
        en: 'Development of Main Sections'
      },
      description: {
        es: 'Construcción de las secciones clave del portafolio y navegación',
        en: 'Construction of the key sections of the portfolio and navigation'
      },
      progress: 100,
      tasks: [
        { name: { es: 'Implementación de header y navegación', en: 'Header and navigation implementation' }, status: 'completed' },
        { name: { es: 'Desarrollo de sección Hero', en: 'Hero section development' }, status: 'completed' },
        { name: { es: 'Implementación de sección Sobre Mí', en: 'About Me section implementation' }, status: 'completed' },
        { name: { es: 'Desarrollo de sección Portafolio', en: 'Portfolio section development' }, status: 'completed' },
        { name: { es: 'Optimización de experiencia móvil', en: 'Mobile experience optimization' }, status: 'completed' }
      ]
    },
    {
      id: 4,
      name: {
        es: 'Proyectos y Trayectoria Profesional',
        en: 'Projects and Professional Career'
      },
      description: {
        es: 'Integración de proyectos destacados y experiencia profesional',
        en: 'Integration of featured projects and professional experience'
      },
      progress: 100,
      tasks: [
        { name: { es: 'Diseño de tarjetas de proyectos', en: 'Project card design' }, status: 'completed' },
        { name: { es: 'Implementación de filtros de categorías', en: 'Category filter implementation' }, status: 'completed' },
        { name: { es: 'Integración de timeline profesional', en: 'Professional timeline integration' }, status: 'completed' },
        { name: { es: 'Documentación de logros profesionales', en: 'Documentation of professional achievements' }, status: 'completed' }
      ]
    },
    {
      id: 5,
      name: {
        es: 'Optimización y Despliegue',
        en: 'Optimization and Deployment'
      },
      description: {
        es: 'Mejoras de rendimiento, SEO y despliegue en producción',
        en: 'Performance improvements, SEO and deployment in production'
      },
      progress: 100,
      tasks: [
        { name: { es: 'Optimización de imágenes con Sharp', en: 'Image optimization with Sharp' }, status: 'completed' },
        { name: { es: 'Implementación de lazy loading', en: 'Lazy loading implementation' }, status: 'completed' },
        { name: { es: 'Configuración de SEO avanzado', en: 'Advanced SEO configuration' }, status: 'completed' },
        { name: { es: 'Despliegue en AWS', en: 'Deployment on AWS' }, status: 'completed' },
        { name: { es: 'Optimización de Lighthouse score', en: 'Lighthouse score optimization' }, status: 'completed' },
        { name: { es: 'Implementación de analytics', en: 'Analytics implementation' }, status: 'completed' }
      ]
    },
    {
      id: 6,
      name: {
        es: 'Refinamiento y Funcionalidades Avanzadas',
        en: 'Refinement and Advanced Features'
      },
      description: {
        es: 'Implementación de características avanzadas y pulido final',
        en: 'Implementation of advanced features and final polishing'
      },
      progress: 100,
      tasks: [
        { name: { es: 'Sistema de contacto con validación', en: 'Contact system with validation' }, status: 'completed' },
        { name: { es: 'Animaciones y transiciones', en: 'Animations and transitions' }, status: 'completed' },
        { name: { es: 'Modo oscuro/claro', en: 'Dark/light mode' }, status: 'completed' },
        { name: { es: 'Integración con CMS para blog', en: 'CMS integration for blog' }, status: 'completed' },
        { name: { es: 'Pruebas de usabilidad', en: 'Usability tests' }, status: 'completed' },
        { name: { es: 'Implementación de feedback', en: 'Feedback implementation' }, status: 'completed' }
      ]
    },
    {
      id: 7,
      name: {
        es: 'Mudanza Ligera y Staging',
        en: 'Light Migration and Staging'
      },
      description: {
        es: 'Migración del sitio a un hosting gratuito y configuración de entorno de pruebas',
        en: 'Site migration to free hosting and testing environment setup'
      },
      progress: 100,
      tasks: [
        { name: { es: 'Migración exitosa de AWS a Netlify', en: 'Successful migration from AWS to Netlify' }, status: 'completed' },
        { name: { es: 'Configuración de staging.arqidia.mx', en: 'Configuration of staging.arqidia.mx' }, status: 'completed' },
        { name: { es: 'Configuración DNS desde GoDaddy a Netlify', en: 'DNS configuration from GoDaddy to Netlify' }, status: 'completed' },
        { name: { es: 'Pipeline CI/CD con GitHub Actions', en: 'CI/CD Pipeline with GitHub Actions' }, status: 'completed' },
        { name: { es: 'Documentación del flujo de despliegue', en: 'Deployment flow documentation' }, status: 'completed' },
        { name: { es: 'Arquitectura de datos centralizada', en: 'Centralized data architecture' }, status: 'completed' }
      ]
    },
    {
      id: 8,
      name: {
        es: 'Guía de Contenido & Branding Final',
        en: 'Content Guide & Final Branding'
      },
      description: {
        es: 'Finalización de branding y creación de guías para el cliente',
        en: 'Branding finalization and creation of client guides'
      },
      progress: 100,
      tasks: [
        { name: { es: 'Efectos hover y botones estandarizados', en: 'Hover effects and standardized buttons' }, status: 'completed' },
        { name: { es: 'Experiencia móvil mejorada', en: 'Improved mobile experience' }, status: 'completed' },
        { name: { es: 'Páginas legales y logos de clientes', en: 'Legal pages and client logos' }, status: 'completed' },
        { name: { es: 'Implementación de logo definitivo', en: 'Implementation of final logo' }, status: 'completed' },
        { name: { es: 'Organización de carpeta Drive de assets', en: 'Organization of Drive assets folder' }, status: 'completed' }
      ]
    },
    {
      id: 9,
      name: {
        es: 'Expansión de Contenido y Testing',
        en: 'Content Expansion and Testing'
      },
      description: {
        es: 'Integración de proyectos reales y sistema de testing automatizado',
        en: 'Integration of real projects and automated testing system'
      },
      progress: 100,
      tasks: [
        { name: { es: 'Agregar 15+ proyectos reales al portafolio', en: 'Add 15+ real projects to portfolio' }, status: 'completed' },
        { name: { es: 'Eliminación de contenido dummy', en: 'Removal of dummy content' }, status: 'completed' },
        { name: { es: 'Sistema de categorización multi-proyecto', en: 'Multi-project categorization system' }, status: 'completed' },
        { name: { es: 'Integración de testing automatizado con Lighthouse', en: 'Automated testing integration with Lighthouse' }, status: 'completed' },
        { name: { es: 'Documentación QA completa', en: 'Complete QA documentation' }, status: 'completed' }
      ]
    },
    {
      id: 10,
      name: {
        es: 'Migración SSR/ISR y SEO Optimization',
        en: 'SSR/ISR Migration and SEO Optimization'
      },
      description: {
        es: 'Migración completa a SSR/ISR con optimización SEO avanzada',
        en: 'Complete migration to SSR/ISR with advanced SEO optimization'
      },
      progress: 100,
      tasks: [
        { name: { es: 'Migración de SSG a SSR/ISR en Netlify', en: 'Migration from SSG to SSR/ISR on Netlify' }, status: 'completed' },
        { name: { es: 'Configuración de metadatos dinámicos', en: 'Dynamic metadata configuration' }, status: 'completed' },
        { name: { es: 'Sitemap.xml y robots.txt automáticos', en: 'Automatic sitemap.xml and robots.txt' }, status: 'completed' },
        { name: { es: 'Optimización canonical URLs', en: 'Canonical URLs optimization' }, status: 'completed' },
        { name: { es: 'Investigación OG images WhatsApp/Twitter', en: 'OG images WhatsApp/Twitter research' }, status: 'completed' }
      ]
    },
    {
      id: 11,
      name: {
        es: 'Refinamiento Visual y UX Avanzada',
        en: 'Visual Refinement and Advanced UX'
      },
      description: {
        es: 'Implementación de funcionalidades visuales avanzadas y design system',
        en: 'Implementation of advanced visual features and design system'
      },
      progress: 100,
      tasks: [
        { name: { es: 'Slider Before/After para proyectos', en: 'Before/After slider for projects' }, status: 'completed' },
        { name: { es: 'Esquinas redondeadas responsivas en imágenes', en: 'Responsive rounded corners on images' }, status: 'completed' },
        { name: { es: 'Grilla de servicios optimizada (1-2-3-5-5)', en: 'Optimized services grid (1-2-3-5-5)' }, status: 'completed' },
        { name: { es: 'Tipografía y efectos hover estandarizados', en: 'Standardized typography and hover effects' }, status: 'completed' },
        { name: { es: 'Dropdown y formularios con tema consistente', en: 'Dropdowns and forms with consistent theming' }, status: 'completed' },
        { name: { es: 'Integración inicial de Google Analytics 4 (GA4)', en: 'Initial integration of Google Analytics 4 (GA4)' }, status: 'completed' },
        { name: { es: 'Depuración y despliegue de Analytics a producción', en: 'Analytics debugging and deployment to production' }, status: 'completed' },
        { name: { es: 'Solución de hits aplazados y validación en GA4', en: 'Hits delay fix and GA4 validation' }, status: 'completed' },
        { name: { es: 'Configuración administrativa y monitoreo final', en: 'Administrative setup and final monitoring' }, status: 'completed' },
        { name: { es: 'Google Analytics 4 configuración completa', en: 'Google Analytics 4 complete configuration' }, status: 'completed' }
      ]
    },
    {
      id: 12,
      name: {
        es: 'Optimización Final y Go-Live',
        en: 'Final Optimization and Go-Live'
      },
      description: {
        es: 'Preparación final para lanzamiento y entrega completa',
        en: 'Final preparation for launch and complete delivery'
      },
      progress: 0,
      tasks: [
        { name: { es: 'Pruebas QA multi-navegador finales', en: 'Final multi-browser QA testing' }, status: 'pending' },
        { name: { es: 'Apuntar arqidia.mx a producción', en: 'Point arqidia.mx to production' }, status: 'pending' },
        { name: { es: 'Video tutorial y manual de auto-edición', en: 'Video tutorial and self-editing manual' }, status: 'pending' },
        { name: { es: 'Corrección de bugs finales', en: 'Final bug corrections' }, status: 'pending' },
        { name: { es: 'Monitoreo post-lanzamiento', en: 'Post-launch monitoring' }, status: 'pending' },
        { name: { es: 'Retro final y cierre de proyecto', en: 'Final retrospective and project closure' }, status: 'pending' }
      ]
    }
  ];

// Datos completos del proyecto
const projectData = {
  title: {
    es: 'ARQIDIA - Portafolio Digital',
    en: 'ARQIDIA - Digital Portfolio'
  },
  subtitle: {
    es: 'Desarrollo de portafolio web para estudio de arquitectura',
    en: 'Web portfolio development for architecture studio'
  },
  lastUpdate: "09/07/2025",
  status: {
    es: 'Finalización - Sprint 11',
    en: 'Finalization - Sprint 11'
  },
  sprints: sprints,
  achievements: {
    es: [
      "🏗️ Infraestructura completa: Next.js, Tailwind, migración AWS→Netlify→SSR/ISR",
      "🎨 Slider Before/After único y design system estandarizado con efectos hover",
      "📱 Sitio responsive con 15+ proyectos reales y contenido auténtico",
      "🚀 SEO optimization: sitemap automático, robots.txt y metadatos dinámicos",
      "🧪 Sistema de testing automatizado con Lighthouse y documentación QA",
      "⚖️ Páginas legales completas y grilla de servicios optimizada (1-2-3-5-5)",
      "📊 Google Analytics 4 configurado completamente y listo para producción"
    ],
    en: [
      "🏗️ Complete infrastructure: Next.js, Tailwind, AWS→Netlify→SSR/ISR migration", 
      "🎨 Unique Before/After slider and standardized design system with hover effects",
      "📱 Responsive site with 15+ real projects and authentic content",
      "🚀 SEO optimization: automatic sitemap, robots.txt and dynamic metadata",
      "🧪 Automated testing system with Lighthouse and QA documentation",
      "⚖️ Complete legal pages and optimized services grid (1-2-3-5-5)",
      "📊 Google Analytics 4 fully configured and ready for production"
    ]
  },
  nextSteps: {
    es: [
      "Sprint 12: Pruebas QA finales multi-navegador y corrección de bugs",
      "Go-Live: Apuntar arqidia.mx a producción y monitoreo post-lanzamiento",
      "Hand-off: Video tutorial, manual de auto-edición y cierre de proyecto"
    ],
    en: [
      "Sprint 12: Final multi-browser QA testing and bug corrections",
      "Go-Live: Point arqidia.mx to production and post-launch monitoring", 
      "Hand-off: Video tutorial, self-editing manual and project closure"
    ]
  }
};

const achievementIcons = {
  es: {
    "🏗️ Infraestructura técnica completa": "🏗️",
    "🎨 Sistema de diseño y UX optimizada": "🎨",
    "📱 Sitio responsive con contenido integrado": "�",
    "⚖️ Páginas legales y optimización final": "⚖️"
  },
  en: {
    "🏗️ Complete technical infrastructure": "🏗️",
    "🎨 Design system and optimized UX": "🎨",
    "📱 Responsive site with integrated content": "�",
    "⚖️ Legal pages and final optimization": "⚖️"
  }
};

// Agregar esta definición que falta
const nextStepIcons = {
  es: "👉",
  en: "👉"
};

// Componente principal
const ProjectProgress = ({ overallProgress }) => {
  const { language } = useLanguage();

  // Estilos en línea para evitar conflictos
  const styles = useMemo(() => {
    const baseStyles = {
      container: {
        position: 'relative',
        width: '100vw',
        marginLeft: 'calc(-50vw + 50%)',
        marginRight: 'calc(-50vw + 50%)',
        background: 'linear-gradient(to bottom, var(--color-bg-3), var(--color-bg))',
        minHeight: '100vh',
        overflow: 'hidden',
        padding: '40px 0',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        zIndex: 1
      },
      content: {
        maxWidth: '1200px',
        width: '100%',
        padding: '0 20px',
        margin: '0 auto'
      },
      sprintsGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '1.5rem',
        marginTop: '1.5rem'
      },
      requirementsGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '1.5rem',
        marginTop: '1.5rem'
      },
      summaryContainer: {
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '1.5rem',
        marginTop: '1.5rem'
      },
      taskItem: {
        display: 'flex',
        flexDirection: 'column',
        marginBottom: '0.8rem'
      },
      taskHeader: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '0.3rem'
      },
      taskBullet: {
        marginRight: '0.5rem',
        display: 'flex',
        alignItems: 'center'
      },
      statusTag: {
        display: 'inline-block',
        fontSize: '0.7rem',
        padding: '0.2rem 0.5rem',
        borderRadius: '4px',
        fontWeight: 'bold',
        whiteSpace: 'nowrap',
        width: 'fit-content',
        marginLeft: 'calc(1.5rem + 0.5rem)' // Adjusted marginLeft
      },
      taskText: {
        marginLeft: '0.5rem',
        lineHeight: '1.3',
        marginBottom: '0.3rem'
      },
      progressContainer: {
        width: '100%',
        marginTop: '15px',
        marginBottom: '15px'
      },
      progressBar: {
        height: '10px',
        backgroundColor: 'var(--color-bg-2)',
        borderRadius: '5px',
        overflow: 'hidden',
        width: '100%'
      },
      progressFill: {
        height: '100%',
        backgroundColor: 'var(--color-primary)',
        borderRadius: '5px',
        width: '100%' // Asegurar que el fill tome todo el ancho disponible
      },
      progressIndicator: {
        display: 'flex',
        justifyContent: 'flex-end',
        marginBottom: '5px',
        width: '100%'
      },
      progressPercentage: {
        fontWeight: 'bold',
        color: 'var(--color-primary)'
      },
      summaryCard: {
        textAlign: 'left', // Alinea el contenido a la izquierda
      },
      dataList: {
        listStyleType: 'none',
        padding: 0,
      },
      dataListItem: {
        display: 'flex',
        alignItems: 'center',
        padding: '0.5rem 0',
        borderBottom: '1px solid var(--color-bg-2)',
      },
      dataListIcon: {
        marginRight: '0.5rem',
        fontSize: '1.2rem',
      },
      dataListText: {
        lineHeight: '1.4',
      }
    };

    // Media queries para dispositivos móviles
    if (window.innerWidth <= 768) {
      baseStyles.sprintsGrid.gridTemplateColumns = '1fr';
      baseStyles.requirementsGrid.gridTemplateColumns = '1fr';
      baseStyles.summaryContainer.gridTemplateColumns = '1fr';
    } else if (window.innerWidth <= 992) {
      baseStyles.requirementsGrid.gridTemplateColumns = 'repeat(2, 1fr)';
    }

    return baseStyles;
  }, []);

  // Función para traducir el estado de las tareas
  const translateStatus = useMemo(() => (status) => {
    const statusMap = {
      'completed': language === 'es' ? 'Completado' : 'Completed',
      'complete': language === 'es' ? 'Completado' : 'Completed',
      'in-progress': language === 'es' ? 'En progreso' : 'In progress',
      'partial': language === 'es' ? 'Parcial' : 'Partial',
      'pending': language === 'es' ? 'Pendiente' : 'Pending',
      'blocked': language === 'es' ? 'Bloqueado' : 'Blocked'
    };
    return statusMap[status] || status;
  }, [language]);

  // Función para obtener el icono según el estado
  const getStatusIcon = useMemo(() => (status) => {
    switch (status) {
      case 'completed':
      case 'complete':
        return <FaCheckCircle className="text-success" />;
      case 'in-progress':
      case 'partial':
        return <FaSpinner className="text-primary animate-spin" />;
      case 'pending':
        return <FaExclamationCircle className="text-warning" />;
      case 'blocked':
        return <FaLock className="text-danger" />;
      default:
        return null;
    }
  }, []);

  // Función para obtener la clase CSS según el estado
  const getStatusClass = useMemo(() => (status) => {
    switch (status) {
      case 'completed':
      case 'complete':
        return 'status-completed';
      case 'in-progress':
        return 'status-in-progress';
      case 'pending':
        return 'status-pending';
      case 'blocked':
        return 'status-blocked';
      default:
        return '';
    }
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <div className="project-header">
          <h2 className="project-title">{language === 'es' ? 'Progreso del Proyecto' : 'Project Progress'}</h2>
          <p className="project-description">
            {language === 'es'
              ? 'Seguimiento de sprints y tareas clave para el desarrollo del portafolio personal'
              : 'Tracking of sprints and key tasks for the development of the personal portfolio'}
          </p>
          <p className="last-updated">
            {lastUpdated[language]}: {lastUpdated.date}
          </p>

          {/* Barra de progreso general (Hero) */}
          <div className="overall-progress" style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
            <span style={{ fontWeight: 'bold' }}>95%</span>
            <div style={{ flex: '1 1 0%', height: '10px', backgroundColor: 'var(--color-bg-2)', borderRadius: '5px', overflow: 'hidden' }}>
              <div style={{ width: '95%', height: '100%', backgroundColor: 'var(--color-primary)', borderRadius: '5px' }}></div>
            </div>
          </div>

          {/* Resumen del proyecto (arriba) */}
          <div className="summary-section">
            <div style={styles.summaryContainer} className="summary-container">
              <div className="summary-card" style={styles.summaryCard}>
                <h3 className="summary-title">{language === 'es' ? 'Logros Destacados' : 'Achievements'}</h3>
                <ul className="data-list" style={styles.dataList}>
                  {projectData.achievements[language].map((achievement, index) => (
                    <li key={index} className="data-list-item" style={styles.dataListItem}>
                      <span className="data-list-icon" style={styles.dataListIcon}>{achievementIcons[language][achievement]}</span>
                      <span className="data-list-text" style={styles.dataListText}>{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="summary-card" style={styles.summaryCard}>
                <h3 className="summary-title">{language === 'es' ? 'Próximos Pasos' : 'Next Steps'}</h3>
                <ul className="data-list" style={styles.dataList}>
                  {projectData.nextSteps[language].map((step, index) => (
                    <li key={index} className="data-list-item" style={styles.dataListItem}>
                      <span className="data-list-icon" style={styles.dataListIcon}>{nextStepIcons[language]}</span>
                      <span className="data-list-text" style={styles.dataListText}>{step}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div> 
          </div>

          {/* Requerimientos */}
          <div className="requirements-section">
            <h3 className="section-title">
              {language === 'es' ? 'Requerimientos' : 'Requirements'}
            </h3>
            <div style={styles.requirementsGrid}>
              {Object.entries(requirements).map(([key, section]) => (
                <div key={key} className="requirement-card">
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <span style={{ marginRight: '0.5rem', fontSize: '1.2rem' }}>{section.icon}</span>
                    <h4 className="card-title">{section.title[language]}</h4>
                  </div>
                  <ul className="requirement-list">
                    {section.items.slice(0, 4).map((item, index) => (
                      <li key={index}>{item[language]}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Sprints */}
          <h3 className="section-title">
            {language === 'es' ? 'Sprints' : 'Sprints'}
          </h3>
          <div style={styles.sprintsGrid}>
            {projectData.sprints.slice().reverse().map((sprint) => (
              <div key={sprint.id} className="sprint-card">
                <h3 className="sprint-title">Sprint {sprint.id}: {sprint.name[language]}</h3>

                {/* Objetivo del sprint */}
                <div className="sprint-objective">
                  {sprint.description[language]}
                </div>

                {/* Barra de progreso */}
                <div className="progress-container" style={styles.progressContainer}>
                  <div className="progress-indicator" style={styles.progressIndicator}>
                    <span className="progress-percentage" style={styles.progressPercentage}>{sprint.progress}%</span>
                  </div>
                  <div className="progress-bar" style={styles.progressBar}>
                    <div
                      className="progress-fill"
                      style={{ ...styles.progressFill, width: `${sprint.progress}%` }}
                    ></div>
                  </div>
                </div>

                {/* Tareas clave */}
                <div className="task-list">
                  <h4 className="task-list-title">{language === 'es' ? 'Tareas clave:' : 'Key tasks:'}</h4>
                  {sprint.tasks.slice(0, 3).map((task, index) => (
                    <div key={index} className="task-item" style={styles.taskItem}>
                      <div className="task-header" style={styles.taskHeader}>
                        <span className="task-bullet" style={styles.taskBullet}>
                          {getStatusIcon(task.status)}
                        </span>
                        <span className="task-text" style={{ ...styles.taskText, marginBottom: 0 }}>{task.name[language]}</span>
                      </div>
                      <span className={`status-tag ${getStatusClass(task.status)}`} style={{ ...styles.statusTag }}>
                        {translateStatus(task.status)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectProgress;
