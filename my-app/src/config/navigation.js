export const navigationConfig = {
  es: {
    primary: [
      { key: 'soluciones', label: 'Soluciones', target: 'soluciones' },
      { key: 'casosReales', label: 'Casos reales', target: 'casos-reales' },
      { key: 'comoTrabajo', label: 'Cómo trabajo', target: 'como-trabajo' }
    ],
    secondaryLabel: 'Más sobre mí',
    secondary: [
      { key: 'sobreMi', label: 'Sobre Mí', target: 'sobre-mi' },
      { key: 'carrera', label: 'Carrera', target: 'portafolio' }
    ],
    contact: 'Conversemos',
    navLabel: 'Navegación principal',
    menuOpen: 'Abrir menú',
    menuClose: 'Cerrar menú',
    footerContact: 'Contacto',
    inicio: 'Inicio',
    privacy: 'Privacidad',
    terms: 'Términos',
    connect: 'Conéctate conmigo en:'
  },
  en: {
    primary: [
      { key: 'soluciones', label: 'Solutions', target: 'soluciones' },
      { key: 'casosReales', label: 'Case studies', target: 'casos-reales' },
      { key: 'comoTrabajo', label: 'How I work', target: 'como-trabajo' }
    ],
    secondaryLabel: 'More about me',
    secondary: [
      { key: 'sobreMi', label: 'About Me', target: 'sobre-mi' },
      { key: 'carrera', label: 'Career', target: 'portafolio' }
    ],
    contact: 'Let’s connect',
    navLabel: 'Main navigation',
    menuOpen: 'Open menu',
    menuClose: 'Close menu',
    footerContact: 'Contact',
    inicio: 'Home',
    privacy: 'Privacy Policy',
    terms: 'Terms of Service',
    connect: 'Connect with me on:'
  },
  'pt-br': {
    primary: [
      { key: 'soluciones', label: 'Soluções', target: 'soluciones' },
      { key: 'casosReales', label: 'Casos reais', target: 'casos-reales' },
      { key: 'comoTrabajo', label: 'Como trabalho', target: 'como-trabajo' }
    ],
    secondaryLabel: 'Mais sobre mim',
    secondary: [
      { key: 'sobreMi', label: 'Sobre mim', target: 'sobre-mi' },
      { key: 'carrera', label: 'Carreira', target: 'portafolio' }
    ],
    contact: 'Vamos conversar',
    navLabel: 'Navegação principal',
    menuOpen: 'Abrir menu',
    menuClose: 'Fechar menu',
    footerContact: 'Contato',
    inicio: 'Início',
    privacy: 'Privacidade',
    terms: 'Termos de uso',
    connect: 'Encontre-me em:'
  }
};

export const getNavigationContent = (language) => navigationConfig[language] || navigationConfig.es;

export const activeSectionMap = {
  'hero-banner': null,
  soluciones: 'soluciones',
  'casos-reales': 'casosReales',
  testimonios: 'casosReales',
  'como-trabajo': 'comoTrabajo',
  'sobre-mi': 'sobreMi',
  portafolio: 'carrera',
  contacto: 'contact'
};

export const observedSectionIds = Object.keys(activeSectionMap);
