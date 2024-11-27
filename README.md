# Elier Portfolio

**Elier Portfolio** es un sitio web profesional que muestra mi experiencia en transformación digital, e-commerce y optimización de operaciones. Construido con tecnologías modernas y enfocado en la experiencia del usuario.

## Tabla de Contenidos

- [Estructura del Proyecto](#estructura-del-proyecto)
- [Stack Tecnológico](#stack-tecnológico)
- [Características](#características)
- [Despliegue](#despliegue)
- [Inicio Rápido](#inicio-rápido)
- [Contributing](#contributing)
- [License](#license)

## Estructura del Proyecto

```bash
/
├── public/                 # Activos públicos y configuración base
│   └── index.html         # HTML base con meta tags SEO y analytics
├── src/
│   ├── components/        # Componentes React
│   │   ├── ChatModal/    # Chatbot interactivo con IA
│   │   ├── entradas/     # Componentes del blog
│   │   ├── hooks/        # Hooks personalizados
│   │   └── utils/        # Funciones de utilidad
│   ├── contexts/         # Contextos (Idioma, Tema)
│   ├── styles/           # Estilos CSS
│   │   ├── components/   # Estilos específicos por componente
│   │   └── shared/       # Estilos compartidos
│   └── assets/           # Imágenes y recursos estáticos
├── .github/              # GitHub-specific files
├── README.md             # Project documentation
├── package.json          # Project dependencies and scripts
└── .gitignore           # Git ignore configuration
```

## Stack Tecnológico

### Frontend
- **React 18+**: Framework principal
- **React Router 6**: Enrutamiento del cliente
- **Context API**: Gestión de estado global
- **CSS Modules**: Estilos modulares
- **Typed.js**: Animaciones de texto
- **React Icons**: Iconografía

### Optimización y Rendimiento
- **React Suspense & Lazy Loading**: Carga diferida de componentes
- **Google Tag Manager**: Análisis y seguimiento
- **Meta Tags Dinámicos**: SEO optimizado
- **Responsive Design**: Diseño adaptativo

### Herramientas de Desarrollo
- **Git & GitHub**: Control de versiones
- **GitHub Pages**: Alojamiento
- **NPM**: Gestión de paquetes

## Características

### Componentes Principales
- **HeroBanner**: Presentación dinámica con animaciones
- **ArsenalHabilidades**: Showcase de habilidades técnicas
- **Portafolio**: Galería de proyectos con ProjectCard
- **Blog**: Sistema de blog con entradas dinámicas
- **Servicios**: Servicios profesionales ofrecidos
- **Tarifario**: Planes y precios
- **ChatModal**: Asistente virtual inteligente

### Características Técnicas
- **Internacionalización**: Soporte multiidioma (ES/EN)
- **Tema Dinámico**: Modo claro/oscuro
- **SEO Optimizado**: Meta tags y Open Graph
- **Analytics Integrado**: GTM y Google Analytics
- **Diseño Responsivo**: Mobile-first
- **Accesibilidad**: ARIA labels y semántica HTML5

### Integración de IA
- **Chatbot Inteligente**:
  - Navegación asistida
  - Respuestas contextuales
  - Soporte bilingüe
  - Historial de conversación
  - Indicador de escritura
  - Botones de acceso rápido

## Despliegue

El portfolio está desplegado en GitHub Pages y accesible en [elelier.com](https://www.elelier.com).

### Configuración de Producción
- Dominio personalizado configurado
- HTTPS habilitado
- Compresión de activos
- Caché optimizado
- Analytics configurado

## Inicio Rápido

### Prerrequisitos
- Node.js 16+
- NPM 7+

### Instalación

```bash
git clone https://github.com/elelier/portafolio-personal.git
cd portafolio-personal
npm install
```

### Desarrollo Local

```bash
npm start
```

### Construcción para Producción

```bash
npm run build
```

## Contributing

No se aceptan contribuciones, pero siéntete libre de copiar el repositorio para hacer tu propia landing.

## License

Este proyecto está licenciado bajo la licencia MIT. Consulte el archivo [LICENSE](LICENSE) para obtener más detalles.