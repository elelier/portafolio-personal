import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import '../styles/components/ProjectProgress.css';

// Fecha de última actualización
const lastUpdated = {
  date: "27/02/2025",
  es: "Última actualización",
  en: "Last updated"
};

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
    ]
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
    ]
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
    ]
  }
};

const projectData = {
  sprints: [
    {
      id: 1,
      name: "Planificación y Diseño Base",
      progress: 100,
      tasks: [
        { name: "Configuración inicial del proyecto", status: "complete", notes: "Vite + TailwindCSS + PostCSS" },
        { name: "Definir estructura de carpetas", status: "complete", notes: "Assets organizados por tipo" },
        { name: "Configurar control de versiones", status: "complete", notes: "Git flow establecido" },
        { name: "Definir paleta de colores", status: "complete", notes: "Neutros: beige, marrón, gris oscuro" },
        { name: "Seleccionar y configurar tipografías", status: "complete", notes: "Inter + Playfair Display" },
        { name: "Crear wireframes mobile-first", status: "complete", notes: "Prioridad móvil implementada" },
        { name: "Documentar guías de estilo", status: "complete", notes: "Componentes y variables documentados" }
      ]
    },
    {
      id: 2,
      name: "Sistema de Diseño y Estructura Base",
      progress: 100,
      groups: [
        {
          name: "Sistema de Diseño",
          tasks: [
            { name: "Configurar Tailwind y PostCSS", priority: "high", status: "complete", dependencies: "-" },
            { name: "Implementar tokens de diseño", priority: "high", status: "complete", dependencies: "Tailwind config" },
            { name: "Documentar guía de estilos", priority: "medium", status: "complete", dependencies: "Sistema de diseño" }
          ]
        },
        {
          name: "Estructura Base",
          tasks: [
            { name: "Crear componentes base", priority: "high", status: "complete", dependencies: "Sistema de diseño" },
            { name: "Estructura HTML responsive", priority: "high", status: "complete", dependencies: "Wireframes" },
            { name: "Optimización de assets", priority: "medium", status: "complete", dependencies: "-" }
          ]
        },
        {
          name: "Desarrollo Frontend",
          tasks: [
            { name: "Implementar menú móvil (menu.js)", priority: "high", status: "complete", dependencies: "Sistema de diseño" },
            { name: "Sistema de traducciones (i18n/index.js)", priority: "high", status: "complete", dependencies: "-" },
            { name: "Lazy loading de imágenes (lazyload.js)", priority: "medium", status: "complete", dependencies: "Optimización de assets" },
            { name: "Estilos del menú (menu.css)", priority: "high", status: "complete", dependencies: "menu.js" },
            { name: "Lazy loading CSS (lazyload.css)", priority: "medium", status: "complete", dependencies: "lazyload.js" },
            { name: "Sistema de grid (grid.css)", priority: "high", status: "complete", dependencies: "Sistema de diseño" }
          ]
        },
        {
          name: "Internacionalización y SEO",
          tasks: [
            { name: "Traducciones ES (i18n/es.json)", priority: "medium", status: "complete", dependencies: "Sistema de traducciones" },
            { name: "Traducciones EN (i18n/en.json)", priority: "medium", status: "complete", dependencies: "Sistema de traducciones" },
            { name: "Meta tags SEO", priority: "high", status: "complete", dependencies: "-" },
            { name: "Markup semántico base", priority: "high", status: "complete", dependencies: "Estructura HTML" }
          ]
        },
        {
          name: "Configuración y Build",
          tasks: [
            { name: "Configuración de Vite", priority: "high", status: "complete", dependencies: "-" },
            { name: "Optimización de imágenes", priority: "high", status: "complete", dependencies: "-" },
            { name: "Compresión de assets", priority: "high", status: "complete", dependencies: "-" },
            { name: "Configuración de CloudFront", priority: "high", status: "complete", dependencies: "-" },
            { name: "Script de despliegue", priority: "high", status: "complete", dependencies: "Configuración AWS" }
          ]
        },
        {
          name: "Despliegue y Monitoreo",
          tasks: [
            { name: "Despliegue inicial", priority: "high", status: "complete", dependencies: "Build completo" },
            { name: "Configuración de caché", priority: "high", status: "complete", dependencies: "CloudFront" }
          ]
        },
        {
          name: "SEO",
          tasks: [
            { name: "Implementar meta tags", priority: "high", status: "complete", dependencies: "-" },
            { name: "Configurar Open Graph", priority: "high", status: "complete", dependencies: "Meta tags" },
            { name: "Implementar Twitter Cards", priority: "high", status: "complete", dependencies: "Meta tags" },
            { name: "Configurar Schema.org", priority: "high", status: "complete", dependencies: "-" },
            { name: "Implementar sitemap.xml", priority: "high", status: "complete", dependencies: "Rutas definidas" },
            { name: "Verificación de motores de búsqueda", priority: "high", status: "complete", dependencies: "Meta tags" },
            { name: "Optimizar rendimiento", priority: "medium", status: "complete", dependencies: "Lighthouse > 90" },
            { name: "Implementar canonical URLs", priority: "medium", status: "complete", dependencies: "-" },
            { name: "Configurar hreflang", priority: "medium", status: "complete", dependencies: "i18n" }
          ]
        }
      ]
    },
    {
      id: 3,
      name: "Portfolio y Navegación",
      progress: 70,
      groups: [
        {
          name: "Portfolio",
          tasks: [
            { name: "Grid responsivo de portfolio", priority: "high", status: "complete", dependencies: "Imágenes de proyectos" },
            { name: "Sistema de filtros por categoría", priority: "high", status: "complete", dependencies: "Taxonomía de proyectos" },
            { name: "Galería de imágenes con lazy loading", priority: "high", status: "in-progress", dependencies: "Optimización de imágenes" }
          ]
        },
        {
          name: "Páginas de Proyecto",
          tasks: [
            { name: "Páginas individuales de proyecto", priority: "high", status: "pending", dependencies: "Contenido de proyectos" },
            { name: "Animaciones y transiciones", priority: "medium", status: "pending", dependencies: "Grid implementado" },
            { name: "SEO básico y meta tags", priority: "medium", status: "in-progress", dependencies: "Contenido base" }
          ]
        }
      ]
    },
    {
      id: 4,
      name: "Contenido y Funcionalidad",
      progress: 100,
      groups: [
        {
          name: "Sistema de Traducción (i18n)",
          tasks: [
            { name: "Implementación del sistema base de traducciones", priority: "high", status: "complete", dependencies: "-" },
            { name: "Creación de archivos de traducción (es.json, en.json)", priority: "high", status: "complete", dependencies: "-" },
            { name: "Integración de atributos data-i18n en el HTML", priority: "high", status: "complete", dependencies: "-" },
            { name: "Selector de idioma en navegación desktop y móvil", priority: "high", status: "complete", dependencies: "-" },
            { name: "Traducción de todos los textos de la página principal", priority: "high", status: "complete", dependencies: "-" },
            { name: "Testing de cambio de idiomas", priority: "medium", status: "complete", dependencies: "-" }
          ]
        }
      ]
    },
    {
      id: 5,
      name: "SEO y Optimización",
      progress: 60,
      groups: [
        {
          name: "Optimización de Rendimiento",
          tasks: [
            { name: "Implementar compresión gzip/brotli", priority: "high", status: "complete", dependencies: "Configuración de servidor" },
            { name: "Optimizar imágenes (AVIF/WebP)", priority: "high", status: "complete", dependencies: "Sharp implementado" },
            { name: "Configurar caché y headers", priority: "high", status: "complete", dependencies: "Servidor Express" },
            { name: "Implementar lazy loading", priority: "high", status: "complete", dependencies: "OptimizedImage componente" }
          ]
        },
        {
          name: "Bundle Optimization",
          tasks: [
            { name: "Configurar code splitting", priority: "high", status: "complete", dependencies: "Vite config" },
            { name: "Implementar tree shaking", priority: "high", status: "complete", dependencies: "Build config" },
            { name: "Minificar con Terser", priority: "high", status: "complete", dependencies: "Build config" },
            { name: "Gestionar chunks", priority: "high", status: "complete", dependencies: "Rollup options" }
          ]
        },
        {
          name: "SEO",
          tasks: [
            { name: "Meta tags básicos", priority: "high", status: "complete", dependencies: "-" },
            { name: "Open Graph y Twitter Cards", priority: "high", status: "complete", dependencies: "Meta tags básicos" },
            { name: "Schema.org para Arquitectura", priority: "high", status: "complete", dependencies: "-" },
            { name: "URLs canónicas", priority: "high", status: "complete", dependencies: "-" },
            { name: "Soporte multi-idioma (hreflang)", priority: "high", status: "complete", dependencies: "URLs canónicas" },
            { name: "Meta tags de verificación", priority: "medium", status: "complete", dependencies: "-" }
          ]
        },
        {
          name: "Testing y Monitoreo",
          tasks: [
            { name: "Implementar Web Vitals tracking", priority: "high", status: "in-progress", dependencies: "Analytics configurado" },
            { name: "Testing cross-browser", priority: "high", status: "pending", dependencies: "UI completa" },
            { name: "Auditoría de accesibilidad", priority: "medium", status: "in-progress", dependencies: "UI completa" },
            { name: "Monitoreo de rendimiento", priority: "medium", status: "pending", dependencies: "Despliegue" },
            { name: "Pruebas de carga", priority: "medium", status: "pending", dependencies: "Despliegue" }
          ]
        },
        {
          name: "Próximas Optimizaciones",
          tasks: [
            { name: "Implementar Service Workers", priority: "medium", status: "pending", dependencies: "Optimizaciones base" },
            { name: "Configurar HTTP/2 Push", priority: "medium", status: "pending", dependencies: "Servidor configurado" },
            { name: "Optimizar Critical Path", priority: "high", status: "pending", dependencies: "Análisis de rendimiento" }
          ]
        }
      ]
    },
    {
      id: 6,
      name: "Lanzamiento",
      progress: 0,
      groups: [
        {
          name: "Documentación",
          tasks: [
            { name: "Documentación técnica final", priority: "high", status: "pending", dependencies: "Sprints completados" },
            { name: "Manual de usuario", priority: "high", status: "pending", dependencies: "UI final" },
            { name: "Pruebas de usuario", priority: "high", status: "pending", dependencies: "Sitio completo" }
          ]
        },
        {
          name: "Despliegue",
          tasks: [
            { name: "Configuración de dominio", priority: "high", status: "pending", dependencies: "DNS y certificados" },
            { name: "Capacitación del cliente", priority: "high", status: "pending", dependencies: "Manual y documentación" },
            { name: "Backup y plan de recuperación", priority: "medium", status: "pending", dependencies: "Sitio desplegado" }
          ]
        }
      ]
    }
  ]
};

const StatusIcon = ({ status }) => {
  const icons = {
    complete: "✅",
    partial: "🟡",
    pending: "⏳"
  };
  return <span>{icons[status] || status}</span>;
};

const PriorityIcon = ({ priority }) => {
  const icons = {
    high: "🔴",
    medium: "🟡"
  };
  return <span>{icons[priority] || priority}</span>;
};

const ProjectProgress = () => {
  const { language } = useLanguage();

  const getStatusClass = (status) => {
    const classes = {
      complete: 'status-complete',
      partial: 'status-partial',
      pending: 'status-pending'
    };
    return classes[status] || '';
  };

  const getPriorityClass = (priority) => {
    const classes = {
      high: 'priority-high',
      medium: 'priority-medium'
    };
    return classes[priority] || '';
  };

  return (
    <div className="project-progress">
      <div className="project-content">
        <div className="project-header">
          <h1 className="project-title">
            {language === 'es' ? 'Arquitecta DM' : 'Architect DM'}
          </h1>
          <p className="project-subtitle">
            {language === 'es' 
              ? 'Seguimiento detallado del progreso y requerimientos del proyecto' 
              : 'Detailed tracking of project progress and requirements'}
          </p>
          <p className="last-updated">
            {lastUpdated[language]}: {lastUpdated.date}
          </p>
        </div>

        <div className="requirements-section">
          <h3 className="group-title">
            {language === 'es' ? 'Requerimientos del Proyecto' : 'Project Requirements'}
          </h3>
          <div className="requirements-grid">
            {Object.entries(requirements).map(([key, section]) => (
              <div key={key} className="requirement-card">
                <h4 className="requirement-title">{section.title[language]}</h4>
                <ul className="requirement-list">
                  {section.items.map((item, index) => (
                    <li key={index}>{item[language]}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {projectData.sprints.map(sprint => (
          <div key={sprint.id} className="sprint-card">
            <div className="sprint-header">
              <h3 className="text-xl font-semibold">
                Sprint {sprint.id}: {sprint.name}
              </h3>
              <span className="text-lg font-medium">{sprint.progress}%</span>
            </div>

            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${sprint.progress}%` }}
              />
            </div>

            {sprint.tasks && (
              <table className="task-table">
                <thead>
                  <tr>
                    <th>Tarea</th>
                    <th>Estado</th>
                    <th>Notas</th>
                  </tr>
                </thead>
                <tbody>
                  {sprint.tasks.map((task, index) => (
                    <tr key={index}>
                      <td>{task.name}</td>
                      <td className={getStatusClass(task.status)}>
                        <StatusIcon status={task.status} />
                      </td>
                      <td>{task.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {sprint.groups && sprint.groups.map((group, index) => (
              <div key={index}>
                <h4 className="group-title">{group.name}</h4>
                <table className="task-table">
                  <thead>
                    <tr>
                      <th>Tarea</th>
                      <th>Prioridad</th>
                      <th>Estado</th>
                      <th>Dependencias</th>
                    </tr>
                  </thead>
                  <tbody>
                    {group.tasks.map((task, taskIndex) => (
                      <tr key={taskIndex}>
                        <td>{task.name}</td>
                        <td className={getPriorityClass(task.priority)}>
                          <PriorityIcon priority={task.priority} />
                        </td>
                        <td className={getStatusClass(task.status)}>
                          <StatusIcon status={task.status} />
                        </td>
                        <td>{task.dependencies}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectProgress;
