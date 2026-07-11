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
    contact: 'Hablemos de tu reto',
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
    contact: "Let’s talk about your challenge",
    footerContact: 'Contact',
    inicio: 'Home',
    privacy: 'Privacy Policy',
    terms: 'Terms of Service',
    connect: 'Connect with me on:'
  }
};

export const getNavigationContent = (language) => navigationConfig[language] || navigationConfig.es;

export const activeSectionMap = {
  soluciones: 'soluciones',
  'casos-reales': 'casosReales',
  testimonios: 'casosReales',
  'como-trabajo': 'comoTrabajo',
  'sobre-mi': 'sobreMi',
  portafolio: 'carrera',
  contacto: 'contact'
};

export const observedSectionIds = Object.keys(activeSectionMap);
