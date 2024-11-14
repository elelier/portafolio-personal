import { useLanguage } from '../contexts/LanguageContext';
import { TECH_KEYS } from '../constants/techKeys';

export const useTechDetails = () => {
  const { language } = useLanguage();

  const techCategories = {
    "development": {
      [TECH_KEYS.REACT]: {
        name: {
          es: "React",
          en: "React"
        },
        description: language === 'es' 
          ? "Biblioteca de JavaScript para construir interfaces de usuario interactivas y reactivas."
          : "JavaScript library for building interactive and reactive user interfaces.",
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
      [TECH_KEYS.NODEJS]: {
        name: {
          es: "Node.js",
          en: "Node.js"
        },
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
      [TECH_KEYS.HUGGING_FACE]: {
        name: {
          es: "Hugging Face",
          en: "Hugging Face"
        },
        description: language === 'es'
          ? "Plataforma de inteligencia artificial que ofrece modelos de lenguaje para generación de contenido."
          : "Artificial intelligence platform offering language models for content generation.",
        features: language === 'es'
          ? [
              "Generación de texto, imágenes y audio",
              "Adaptación a diferentes contextos",
              "Optimización de resultados",
              "Integración con otras tecnologías",
              "Security and compliance"
            ]
          : [
              "Text, image, and audio generation",
              "Adaptation to different contexts",
              "Optimization of results",
              "Integration with other technologies",
              "Security and compliance"
            ],  
        icon: "🤗",
        year: "2020",
        creator: "Various",
        popularity: "★★★★★",
        tools: ["Hugging Face", "OpenAI", "Google", "Anthropic"]
      },
      [TECH_KEYS.PYTHON]: {
        name: {
          es: "Python",
          en: "Python"
        },
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
      [TECH_KEYS.API_DEV]: {
        description: language === 'es'
          ? "Diseño y desarrollo de API's para permitir la comunicación entre sistemas."
          : "Design and development of APIs to enable communication between systems.",
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
      [TECH_KEYS.GEN_AI]: {
        description: language === 'es'  
          ? "Generación de contenido creativo y adaptativo utilizando modelos de lenguaje."
          : "Creative and adaptive content generation using language models.",
        features: language === 'es'
          ? [
              "Generación de texto, imágenes y audio",
              "Adaptación a diferentes contextos",
              "Optimización de resultados",
              "Integración con otras tecnologías",
              "Security and compliance"
            ]
          : [
              "Text, image, and audio generation",
              "Adaptation to different contexts",
              "Optimization of results",
              "Integration with other technologies",
              "Security and compliance"
            ],
        icon: "🤖",
        year: "2020",
        creator: "Various",
        popularity: "★★★★★",
        tools: ["OpenAI", "Google", "Anthropic", "Microsoft"]
      },
      [TECH_KEYS.MACHINE_LEARNING]: {
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
      [TECH_KEYS.WIX]: {
        description: language === 'es'
          ? "Plataforma de desarrollo web que permite crear sitios web profesionales sin necesidad de código."
          : "Web development platform that allows creating professional websites without coding.",
        features: language === 'es'
          ? [
              "Constructor de sitios web drag-and-drop",
              "Plantillas personalizables",
              "Herramientas de comercio electrónico",
              "Optimización SEO integrada",
              "Hosting incluido"
            ]
          : [
              "Drag-and-drop website builder",
              "Customizable templates",
              "E-commerce tools",
              "Built-in SEO optimization",
              "Included hosting"
            ],
        icon: "🎨",
        year: "2006",
        creator: "Wix.com Ltd.",
        popularity: "★★★★☆",
        tools: ["Wix ADI", "Wix Editor", "Wix Stores", "Wix Bookings", "Wix Analytics"]
      },
      [TECH_KEYS.MERCADO_LIBRE]: {
        description: language === 'es'
          ? "Principal plataforma de comercio electrónico en América Latina que conecta vendedores y compradores."
          : "Leading e-commerce platform in Latin America that connects sellers and buyers.",
        features: language === 'es'
          ? [
              "Sistema de gestión de ventas",
              "Logística integrada",
              "Sistema de pagos seguro",
              "Analytics y métricas de ventas",
              "Herramientas de publicidad"
            ]
          : [
              "Sales management system",
              "Integrated logistics",
              "Secure payment system",
              "Sales analytics and metrics",
              "Advertising tools"
            ],
        icon: "🛍️",
        year: "1999",
        creator: "Marcos Galperin",
        popularity: "★★★★★",
        tools: ["Mercado Pago", "Mercado Envíos", "Mercado Shops", "Mercado Ads"]
      },
      [TECH_KEYS.AMAZON]: {
        description: language === 'es'
          ? "Plataforma global de comercio electrónico y servicios en la nube líder mundial."
          : "Global e-commerce platform and world-leading cloud services provider.",
        features: language === 'es'
          ? [
              "Marketplace global",
              "Logística avanzada (FBA)",
              "Sistema de reviews y ratings",
              "Herramientas para vendedores",
              "Programa de afiliados"
            ]
          : [
              "Global marketplace",
              "Advanced logistics (FBA)",
              "Review and rating system",
              "Seller tools",
              "Affiliate program"
            ],
        icon: "📦",
        year: "1994",
        creator: "Jeff Bezos",
        popularity: "★★★★★",
        tools: ["Seller Central", "FBA", "Amazon Advertising", "Brand Registry"]
      },
      [TECH_KEYS.SHOPIFY]: {
        description: language === 'es'
          ? "Plataforma de comercio electrónico que permite crear y gestionar tiendas online."
          : "E-commerce platform that enables creating and managing online stores.",
        features: language === 'es'
          ? [
              "Constructor de tiendas online",
              "Procesamiento de pagos integrado",
              "Gestión de inventario",
              "Análisis de ventas",
              "Marketplace de apps"
            ]
          : [
              "Online store builder",
              "Integrated payment processing",
              "Inventory management",
              "Sales analytics",
              "App marketplace"
            ],
        icon: "🏪",
        year: "2006",
        creator: "Tobias Lütke",
        popularity: "★★★★★",
        tools: ["Shopify POS", "Shopify Payments", "Shopify Apps", "Shopify Analytics"]
      },
      [TECH_KEYS.NETSUITE]: {
        description: language === 'es'
          ? "Sistema ERP en la nube que integra gestión financiera, CRM, e-commerce y más."
          : "Cloud ERP system integrating financial management, CRM, e-commerce, and more.",
        features: language === 'es'
          ? [
              "Gestión financiera completa",
              "CRM integrado",
              "Automatización de procesos",
              "Reportes en tiempo real",
              "Gestión de inventario"
            ]
          : [
              "Complete financial management",
              "Integrated CRM",
              "Process automation",
              "Real-time reporting",
              "Inventory management"
            ],
        icon: "💼",
        year: "1998",
        creator: "Oracle Corporation",
        popularity: "★★★★☆",
        tools: ["SuiteCommerce", "SuiteAnalytics", "SuitePeople", "SuiteFlow"]
      }
    },
    "methodologies": {
      [TECH_KEYS.LEAN_SIX]: {
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
      },
      [TECH_KEYS.DMAIC]: {
        description: language === 'es'
          ? "Metodología de mejora de procesos que forma parte de Six Sigma para optimizar y estabilizar procesos."
          : "Process improvement methodology part of Six Sigma to optimize and stabilize processes.",
        features: language === 'es'
          ? [
              "Definir objetivos del proyecto",
              "Medir el rendimiento actual",
              "Analizar causas raíz",
              "Implementar mejoras",
              "Controlar resultados"
            ]
          : [
              "Define project goals",
              "Measure current performance",
              "Analyze root causes",
              "Implement improvements",
              "Control results"
            ],
        icon: "📈",
        year: "1986",
        creator: "Motorola",
        popularity: "★★★★☆",
        tools: ["Minitab", "Quality Tools", "Statistical Analysis", "Process Mapping"]
      },
      [TECH_KEYS.PROCESS_AUTO]: {
        description: language === 'es'
          ? "Implementación de sistemas y tecnologías para automatizar procesos empresariales repetitivos."
          : "Implementation of systems and technologies to automate repetitive business processes.",
        features: language === 'es'
          ? [
              "Automatización de flujos de trabajo",
              "Reducción de errores humanos",
              "Incremento de eficiencia",
              "Integración de sistemas",
              "Análisis de procesos"
            ]
          : [
              "Workflow automation",
              "Human error reduction",
              "Efficiency increase",
              "System integration",
              "Process analysis"
            ],
        icon: "🤖",
        year: "1990s",
        creator: "Various",
        popularity: "★★★★★",
        tools: ["RPA", "BPM", "Workflow Engines", "Integration Platforms"]
      },
      [TECH_KEYS.SAP]: {
        description: language === 'es'
          ? "Sistema líder de planificación de recursos empresariales para gestionar operaciones de negocio."
          : "Leading enterprise resource planning system for managing business operations.",
        features: language === 'es'
          ? [
              "Gestión financiera integrada",
              "Control de producción",
              "Gestión de recursos humanos",
              "Análisis en tiempo real",
              "Gestión de la cadena de suministro"
            ]
          : [
              "Integrated financial management",
              "Production control",
              "Human resources management",
              "Real-time analytics",
              "Supply chain management"
            ],
        icon: "🏢",
        year: "1972",
        creator: "SAP SE",
        popularity: "★★★★★",
        tools: ["SAP S/4HANA", "SAP ECC", "SAP Fiori", "SAP Analytics"]
      },
      [TECH_KEYS.INVENTORY]: {
        description: language === 'es'
          ? "Sistema para controlar y gestionar eficientemente el inventario de una organización."
          : "System to efficiently control and manage an organization's inventory.",
        features: language === 'es'
          ? [
              "Control de stock en tiempo real",
              "Gestión de almacenes",
              "Optimización de niveles de inventario",
              "Trazabilidad de productos",
              "Previsión de demanda"
            ]
          : [
              "Real-time stock control",
              "Warehouse management",
              "Inventory level optimization",
              "Product traceability",
              "Demand forecasting"
            ],
        icon: "📦",
        year: "N/A",
        creator: "Various",
        popularity: "★★★★☆",
        tools: ["WMS", "Barcode Systems", "RFID", "Inventory Software"]
      }
    }
  };

  const getTechDetails = (category, techName) => {
    return techCategories[category]?.[techName];
  };

  const getAllTechDetails = () => {
    const allTechs = {};
    
    Object.values(techCategories).forEach(category => {
      Object.entries(category).forEach(([techName, techDetails]) => {
        allTechs[techName] = techDetails;
      });
    });
    
    console.log('All available techs:', allTechs);
    return allTechs;
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