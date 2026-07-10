import { sitesData } from './sites';

const projectContent = {
  es: {
    'diana-mtz': {
      category: 'Arquitectura · presencia digital',
      summary: 'Una presencia digital clara para convertir visitas en conversaciones.',
      role: 'Producto digital, UX y construcción web',
      metrics: ['Portfolio visual', 'SEO técnico', 'Captación'],
    },
    elelier: {
      category: 'Portfolio · transformación digital',
      summary: 'Un sistema vivo para explicar experiencia, resultados y formas de trabajo.',
      role: 'Estrategia, producto y ejecución',
      metrics: ['React', 'Contenido bilingüe', 'Experiencia responsive'],
    },
    'monterrey-respira': {
      category: 'Datos · utilidad pública',
      summary: 'Información ambiental en tiempo real, convertida en una experiencia fácil de consultar.',
      role: 'Producto web y datos',
      metrics: ['Tiempo real', 'Supabase', 'API pública'],
    },
    'jasso-tours': {
      category: 'Turismo · conversión',
      summary: 'Una landing que hace tangible el destino y facilita el siguiente paso.',
      role: 'Experiencia digital y construcción web',
      metrics: ['Responsive', 'Mapas', 'AWS'],
    },
  },
  en: {
    'diana-mtz': {
      category: 'Architecture · digital presence',
      summary: 'A clear digital presence designed to turn visits into conversations.',
      role: 'Digital product, UX and web delivery',
      metrics: ['Visual portfolio', 'Technical SEO', 'Lead generation'],
    },
    elelier: {
      category: 'Portfolio · digital transformation',
      summary: 'A living system to explain experience, outcomes and ways of working.',
      role: 'Strategy, product and delivery',
      metrics: ['React', 'Bilingual content', 'Responsive experience'],
    },
    'monterrey-respira': {
      category: 'Data · public utility',
      summary: 'Real-time environmental information turned into an easy-to-use experience.',
      role: 'Web product and data',
      metrics: ['Real time', 'Supabase', 'Public API'],
    },
    'jasso-tours': {
      category: 'Travel · conversion',
      summary: 'A landing page that makes the destination tangible and clarifies the next step.',
      role: 'Digital experience and web delivery',
      metrics: ['Responsive', 'Maps', 'AWS'],
    },
  },
};

const getLocalizedContent = (language, id) => (projectContent[language] || projectContent.es)[id] || {
  category: 'Proyecto digital',
  summary: 'Una solución digital construida para resolver un reto concreto.',
  role: 'Producto y ejecución',
  metrics: [],
};

const toProject = (site, language) => {
  const copy = getLocalizedContent(language, site.id);
  const gallery = [
    site.images?.desktop?.carousel,
    site.images?.desktop?.grid,
    site.images?.mobile?.carousel,
    site.images?.mobile?.grid,
    site.fullImage,
    site.thumbnail,
  ].filter(Boolean).filter((image, index, images) => images.indexOf(image) === index);

  return {
    ...site,
    title: site.name,
    category: copy.category,
    summary: copy.summary,
    role: copy.role,
    metrics: copy.metrics,
    featuredImage: site.fullImage || site.thumbnail,
    gallery,
  };
};

export const projectsData = {
  es: sitesData.es.map((site) => toProject(site, 'es')),
  en: sitesData.en.map((site) => toProject(site, 'en')),
};

export const getProjects = (language = 'es') => projectsData[language] || projectsData.es;

export const getProjectById = (id, language = 'es') => getProjects(language).find((project) => project.id === id) || null;

