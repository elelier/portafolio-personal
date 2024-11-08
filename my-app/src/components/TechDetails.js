import { useLanguage } from '../contexts/LanguageContext';

export const useTechDetails = () => {
  const { language } = useLanguage();

  const techCategories = {
    "development": {
      "React": {
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
        tools: language === 'es'
          ? ["Redux", "React Router", "Material-UI", "Styled Components", "Next.js"]
          : ["Redux", "React Router", "Material-UI", "Styled Components", "Next.js"]
      },
      "Node.js": {
        description: language === 'es'
          ? "Entorno de ejecución de JavaScript del lado del servidor que permite construir aplicaciones web escalables y de alto rendimiento."
          : "Server-side JavaScript runtime environment that enables building scalable and high-performance web applications.",
        features: language === 'es'
          ? [
              "Ejecución asíncrona y no bloqueante",
              "Amplio ecosistema de paquetes (npm)",
              "Excelente para APIs y microservicios",
              "Integración perfecta con JavaScript frontend",
              "Alto rendimiento para operaciones I/O"
            ]
          : [
              "Asynchronous non-blocking execution",
              "Vast package ecosystem (npm)",
              "Great for APIs and microservices", 
              "Seamless integration with frontend JavaScript",
              "High performance for I/O operations"
            ],
        icon: "🟢",
        year: "2009",
        creator: "Ryan Dahl",
        popularity: "★★★★★",
        tools: ["Express", "NestJS", "Socket.IO", "Mongoose", "PM2"]
      },
      "Python": {
        description: language === 'es'
          ? "Lenguaje de programación versátil y fácil de aprender, ideal para desarrollo web, ciencia de datos e IA."
          : "Versatile and easy-to-learn programming language, ideal for web development, data science, and AI.",
        features: language === 'es'
          ? [
              "Sintaxis clara y legible",
              "Excelente para procesamiento de datos",
              "Gran soporte para machine learning",
              "Amplia biblioteca estándar",
              "Multiplataforma"
            ]
          : [
              "Clear and readable syntax",
              "Excellent for data processing",
              "Great machine learning support",
              "Extensive standard library",
              "Cross-platform"
            ],
        icon: "🐍",
        year: "1991",
        creator: "Guido van Rossum",
        popularity: "★★★★★",
        tools: ["Django", "Flask", "NumPy", "Pandas", "TensorFlow"]
      }
    },
    "infrastructure": {
      "API Development": {
        description: language === 'es'
          ? "Diseño y desarrollo de interfaces de programación de aplicaciones para permitir la comunicación entre sistemas."
          : "Design and development of application programming interfaces to enable communication between systems.",
        features: language === 'es'
          ? [
              "Arquitectura RESTful",
              "Documentación automatizada",
              "Seguridad y autenticación",
              "Manejo de versiones",
              "Pruebas y monitoreo"
            ]
          : [
              "RESTful architecture",
              "Automated documentation",
              "Security and authentication",
              "Version management",
              "Testing and monitoring"
            ],
        icon: "🔌",
        year: "2000",
        creator: "Roy Fielding",
        popularity: "★★★★★",
        tools: ["Swagger", "Postman", "GraphQL", "OAuth", "JWT"]
      },
      "AWS": {
        description: language === 'es'
          ? "Plataforma líder de servicios en la nube que proporciona una amplia gama de servicios de infraestructura y computación."
          : "Leading cloud services platform providing a wide range of infrastructure and computing services.",
        features: language === 'es'
          ? [
              "Computación en la nube escalable",
              "Almacenamiento seguro y redundante",
              "Servicios de base de datos gestionados",
              "Herramientas de desarrollo y despliegue",
              "Servicios de IA y Machine Learning"
            ]
          : [
              "Scalable cloud computing",
              "Secure and redundant storage",
              "Managed database services",
              "Development and deployment tools",
              "AI and Machine Learning services"
            ],
        icon: "☁️",
        year: "2006",
        creator: "Amazon",
        popularity: "★★★★★",
        tools: ["EC2", "S3", "Lambda", "RDS", "CloudFront"]
      }
    },
    "ai_solutions": {
      "Generative AI": {
        // ... contenido existente de Generative AI
      },
      "Machine Learning": {
        description: language === 'es'
          ? "Rama de la inteligencia artificial que permite a los sistemas aprender y mejorar a partir de la experiencia."
          : "Branch of artificial intelligence that enables systems to learn and improve from experience.",
        features: language === 'es'
          ? [
              "Aprendizaje supervisado y no supervisado",
              "Procesamiento de datos a gran escala",
              "Modelos predictivos avanzados",
              "Optimización de algoritmos",
              "Análisis de patrones"
            ]
          : [
              "Supervised and unsupervised learning",
              "Large-scale data processing",
              "Advanced predictive models",
              "Algorithm optimization",
              "Pattern analysis"
            ],
        icon: "🧠",
        year: "1959",
        creator: "Arthur Samuel",
        popularity: "★★★★★",
        tools: ["TensorFlow", "scikit-learn", "PyTorch", "Keras", "OpenCV"]
      }
    },
    "platforms": {
      "WIX": {
        // ... contenido existente de WIX
      }
    },
    "methodologies": {
      "Lean Six Sigma": {
        description: language === 'es'
          ? "Metodología de mejora de procesos que combina Lean Manufacturing y Six Sigma para reducir desperdicios y variabilidad."
          : "Process improvement methodology that combines Lean Manufacturing and Six Sigma to reduce waste and variability.",
        features: language === 'es'
          ? [
              "Eliminación de desperdicios",
              "Reducción de variabilidad",
              "Mejora continua",
              "Enfoque en el cliente",
              "Toma de decisiones basada en datos"
            ]
          : [
              "Waste elimination",
              "Variability reduction",
              "Continuous improvement",
              "Customer focus",
              "Data-driven decision making"
            ],
        icon: "📊",
        year: "2002",
        creator: "Multiple Organizations",
        popularity: "★★★★★",
        tools: language === 'es'
          ? ["DMAIC", "Value Stream Mapping", "5S", "Kaizen", "Control Charts"]
          : ["DMAIC", "Value Stream Mapping", "5S", "Kaizen", "Control Charts"]
      }
    }
  };

  const getTechDetails = (category, techName) => {
    return techCategories[category]?.[techName];
  };

  const getAllTechDetails = () => {
    return Object.entries(techCategories).reduce((acc, [_, categoryTechs]) => {
      return { ...acc, ...categoryTechs };
    }, {});
  };

  const getCategoryTechs = (category) => {
    return techCategories[category] || {};
  };

  return {
    getTechDetails,
    getAllTechDetails,
    getCategoryTechs,
    techCategories
  };
}; 