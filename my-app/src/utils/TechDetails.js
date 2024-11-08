import { useLanguage } from '../contexts/LanguageContext';

export const useTechDetails = () => {
  const { language } = useLanguage();

  // Objeto de traducciones
  const translations = {
    "REACT": {
      es: "React",
      en: "React"
    },
    "NODEJS": {
      es: "Node.js",
      en: "Node.js"
    },
    "PYTHON": {
      es: "Python",
      en: "Python"
    },
    "API_DEV": {
      es: "Desarrollo de API",
      en: "API Development"
    },
    "GEN_AI": {
      es: "IA Generativa",
      en: "Generative AI"
    },
    "WIX": {
      es: "WIX",
      en: "WIX"
    },
    "ML": {
      es: "Machine Learning",
      en: "Machine Learning"
    },
    "AWS": {
      es: "AWS",
      en: "AWS"
    },
    "LEAN_SIX": {
      es: "Lean Six Sigma",
      en: "Lean Six Sigma"
    }
  };

  const techCategories = {
    "development": {
      "REACT": {
        name: translations.REACT[language],
        description: language === 'es' 
          ? "Biblioteca de JavaScript para construir interfaces de usuario interactivas y reactivas. Desarrollada por Facebook, React ha revolucionado la forma en que construimos aplicaciones web modernas."
          : "JavaScript library for building interactive and reactive user interfaces. Developed by Facebook, React has revolutionized how we build modern web applications.",
        features: language === 'es'
          ? [
              "Componentes reutilizables para una arquitectura modular",
              "Virtual DOM para renderizado eficiente",
              "Gestión de estado unidireccional",
              "Amplio ecosistema de bibliotecas y herramientas",
              "Excelente para aplicaciones de una sola página (SPA)"
            ]
          : [
              "Reusable components for modular architecture",
              "Virtual DOM for efficient rendering",
              "Unidirectional state management",
              "Vast ecosystem of libraries and tools",
              "Great for Single Page Applications (SPA)"
            ],
        icon: "⚛️",
        year: "2013",
        creator: "Facebook",
        popularity: "★★★★★",
        tools: ["Redux", "React Router", "Material-UI", "Styled Components", "Next.js"]
      },
      "NODEJS": {
        name: translations.NODEJS[language],
        // ... resto del contenido de Node.js
      },
      // ... otras tecnologías
    },
    "infrastructure": {
      "API_DEV": {
        name: translations.API_DEV[language],
        description: language === 'es'
          ? "Desarrollo de interfaces de programación de aplicaciones (APIs) que permiten la comunicación efectiva entre diferentes sistemas y servicios de software."
          : "Development of Application Programming Interfaces (APIs) that enable effective communication between different software systems and services.",
        // ... resto del contenido
      },
      // ... otras tecnologías
    },
    // ... otras categorías
  };

  // Función simplificada para obtener detalles de tecnología
  const getTechDetails = (techName) => {
    // Primero buscamos el ID correspondiente al nombre
    const techId = Object.entries(translations).find(([_, trans]) => 
      trans[language] === techName
    )?.[0];

    if (!techId) return null;

    // Luego buscamos los detalles usando el ID
    for (const category of Object.values(techCategories)) {
      if (category[techId]) {
        return {
          ...category[techId],
          id: techId
        };
      }
    }
    return null;
  };

  return {
    getTechDetails,
    // ... otras funciones que necesites
  };
};