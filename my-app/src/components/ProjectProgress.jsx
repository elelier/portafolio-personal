import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import '../styles/components/ProjectProgress.css';

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
            { name: "Implementar tokens de diseño", priority: "high", status: "complete", dependencies: "Tailwind config" }
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
            { name: "Implementar menú móvil", priority: "high", status: "complete", dependencies: "Sistema de diseño" },
            { name: "Sistema de traducciones base", priority: "high", status: "complete", dependencies: "-" },
            { name: "Lazy loading de imágenes", priority: "medium", status: "complete", dependencies: "Optimización de assets" }
          ]
        }
      ]
    },
    {
      id: 3,
      name: "Portfolio y Contenido",
      progress: 40,
      groups: [
        {
          name: "Portfolio",
          tasks: [
            { name: "Grid responsivo de portfolio", priority: "high", status: "pending", dependencies: "Imágenes de proyectos" },
            { name: "Sistema de filtros por categoría", priority: "high", status: "pending", dependencies: "Taxonomía de proyectos" },
            { name: "Galería de imágenes con lazy loading", priority: "medium", status: "in-progress", dependencies: "Optimización de imágenes" }
          ]
        },
        {
          name: "Páginas de Proyecto",
          tasks: [
            { name: "Páginas individuales de proyecto", priority: "high", status: "pending", dependencies: "Contenido de proyectos" },
            { name: "Animaciones y transiciones", priority: "medium", status: "pending", dependencies: "Grid implementado" }
          ]
        }
      ]
    },
    {
      id: 4,
      name: "Internacionalización y SEO",
      progress: 100,
      groups: [
        {
          name: "Sistema de Traducción (i18n)",
          tasks: [
            { name: "Archivos de traducción (es/en)", priority: "high", status: "complete", dependencies: "-" },
            { name: "Integración de atributos data-i18n", priority: "high", status: "complete", dependencies: "-" },
            { name: "Selector de idioma", priority: "high", status: "complete", dependencies: "-" },
            { name: "Testing de cambio de idiomas", priority: "medium", status: "complete", dependencies: "-" }
          ]
        },
        {
          name: "SEO Base",
          tasks: [
            { name: "Meta tags básicos", priority: "high", status: "complete", dependencies: "-" },
            { name: "Open Graph y Twitter Cards", priority: "high", status: "complete", dependencies: "Meta tags básicos" },
            { name: "Schema.org", priority: "high", status: "complete", dependencies: "-" },
            { name: "URLs canónicas", priority: "high", status: "complete", dependencies: "-" },
            { name: "Soporte multi-idioma (hreflang)", priority: "high", status: "complete", dependencies: "URLs canónicas" }
          ]
        }
      ]
    },
    {
      id: 5,
      name: "Optimización y Testing",
      progress: 60,
      groups: [
        {
          name: "Optimización de Rendimiento",
          tasks: [
            { name: "Compresión gzip/brotli", priority: "high", status: "complete", dependencies: "-" },
            { name: "Optimización avanzada de imágenes", priority: "high", status: "complete", dependencies: "-" },
            { name: "Configurar caché y headers", priority: "high", status: "complete", dependencies: "-" }
          ]
        },
        {
          name: "Bundle Optimization",
          tasks: [
            { name: "Code splitting", priority: "high", status: "complete", dependencies: "-" },
            { name: "Tree shaking", priority: "high", status: "complete", dependencies: "-" },
            { name: "Minificación con Terser", priority: "high", status: "complete", dependencies: "-" },
            { name: "Gestión de chunks", priority: "high", status: "complete", dependencies: "-" }
          ]
        },
        {
          name: "Testing y Monitoreo",
          tasks: [
            { name: "Web Vitals tracking", priority: "high", status: "in-progress", dependencies: "Analytics" },
            { name: "Testing cross-browser", priority: "high", status: "pending", dependencies: "UI completa" },
            { name: "Auditoría de accesibilidad", priority: "medium", status: "pending", dependencies: "UI completa" }
          ]
        }
      ]
    },
    {
      id: 6,
      name: "Lanzamiento y Documentación",
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
          <h2 className="project-title">
            {language === 'es' ? 'Desarrollo del Proyecto' : 'Project Development'}
          </h2>
          <p className="project-subtitle">
            {language === 'es' 
              ? 'Seguimiento detallado del progreso y requerimientos del proyecto' 
              : 'Detailed tracking of project progress and requirements'}
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
