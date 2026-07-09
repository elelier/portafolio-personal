export const INDEXABLE_SITEMAP_PATHS = ['/', '/privacy-policy', '/terms-of-service'];

export const ROUTE_SEO_POLICY = {
  '/': {
    title: 'Transformo procesos complicados en soluciones que realmente funcionan. | Elier Loya',
    description:
      'Transformo procesos complicados en soluciones que realmente funcionan. Especialista en operaciones, producto digital e IA aplicada.',
    canonicalPath: '/',
    robots: 'index,follow',
  },
  '/portafolio': {
    title: 'Carrera profesional | Elier Loya',
    description:
      'Una trayectoria construida entre operación, producto digital y soluciones que generan resultados reales.',
    canonicalPath: '/',
    robots: 'noindex,follow',
  },
  '/sobre-mi': {
    title: 'Sobre Mí | Elier Loya',
    description:
      'Combino criterio operativo, pensamiento de producto y ejecución técnica para sacar proyectos de la maraña estratégica o tecnológica.',
    canonicalPath: '/',
    robots: 'noindex,follow',
  },
  '/servicios': {
    title: 'Cómo trabajo | Elier Loya',
    description: 'Filtro sin rodeos: trabajo mejor con retos acotados, métricas claras y entregas visibles.',
    canonicalPath: '/',
    robots: 'noindex,follow',
  },
  '/contacto': {
    title: 'Contacto | Elier Loya',
    description: 'Cuéntame qué quieres mejorar, automatizar, simplificar, digitalizar o crear.',
    canonicalPath: '/',
    robots: 'noindex,follow',
  },
  '/blog': {
    title: 'Blog | Elier Loya',
    description:
      'Blog profesional de elelier.com con artículos y actualizaciones de tecnología, digitalización y más.',
    canonicalPath: '/',
    robots: 'noindex,follow',
  },
  '/aionlabs': {
    title: 'Aion Labs | Aion × Elier',
    description:
      'Un espacio experimental para presentar a Aion, cómo trabaja con EL y hacia dónde puede evolucionar esta colaboración.',
    canonicalPath: '/',
    robots: 'noindex,follow',
  },
  '/privacy-policy': {
    title: 'Política de Privacidad | Elier Loya',
    canonicalPath: '/privacy-policy',
    robots: 'index,follow',
  },
  '/terms-of-service': {
    title: 'Condiciones del Servicio | Elier Loya',
    canonicalPath: '/terms-of-service',
    robots: 'index,follow',
  },
  '/tarifas-2024': {
    canonicalPath: '/',
    robots: 'noindex,nofollow,noarchive',
  },
  '/hero-banner': {
    canonicalPath: '/',
    robots: 'noindex,nofollow,noarchive',
  },
  '/client-demo': {
    canonicalPath: '/',
    robots: 'noindex,nofollow,noarchive',
  },
  '/sites': {
    canonicalPath: '/',
    robots: 'noindex,nofollow,noarchive',
  },
  '/admin/leads': {
    canonicalPath: '/',
    robots: 'noindex,nofollow,noarchive',
  },
  '/entradas/2408_IA_Transforma_ecommerce': {
    canonicalPath: '/',
    robots: 'noindex,nofollow,noarchive',
  },
};

export function getRouteSeoPolicy(pathname) {
  return ROUTE_SEO_POLICY[pathname] || null;
}
