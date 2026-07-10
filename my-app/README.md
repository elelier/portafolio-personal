# Elier Portfolio

**Elier Portfolio** es un sitio web profesional que muestra mi experiencia en transformación digital, e-commerce y optimización de operaciones. Construido con tecnologías modernas y enfocado en la experiencia del usuario.

## Tabla de Contenidos

- [Estructura del Proyecto](#estructura-del-proyecto)
- [Stack Tecnológico](#stack-tecnológico)
- [Características](#características)
- [Despliegue](#despliegue)
- [Inicio Rápido](#inicio-rápido)
- [Scripts Disponibles](#scripts-disponibles)
- [Seguridad y Privacidad](#seguridad-y-privacidad)
- [Contributing](#contributing)
- [License](#license)

## Estructura del Proyecto

```bash
/
├── public/                 # Activos públicos y configuración base
│   ├── index.html         # HTML base con meta tags SEO y analytics
│   ├── manifest.json      # PWA manifest
│   ├── robots.txt         # SEO robots
│   ├── sitemap.xml        # Mapa del sitio
│   └── assets/            # Recursos estáticos públicos
├── src/
│   ├── components/        # Componentes React
│   │   ├── ChatModal.js   # Chatbot con IA (Gemini)
│   │   ├── entradas/      # Componentes del blog
│   │   ├── hooks/         # Hooks personalizados
│   │   └── utils/         # Funciones de utilidad
│   ├── contexts/          # Contextos React
│   │   ├── LanguageContext.js  # Internacionalización
│   │   └── ThemeContext.js     # Tema claro/oscuro
│   ├── services/          # Servicios de backend
│   │   ├── geminiService.js    # Integración Google Gemini AI
│   │   ├── securityService.js  # Seguridad del chatbot
│   │   └── clientAuthService.js # Autenticación de clientes
│   ├── config/            # Configuraciones
│   │   ├── buildConfig.js      # Configuración de build
│   │   └── hashedPasscodes.js  # Códigos seguros
│   ├── data/              # Datos de la aplicación
│   │   ├── sites.js            # Información de proyectos
│   │   ├── clientProjects.json # Proyectos de clientes
│   │   └── benefitResponses.json # Respuestas del chatbot
│   ├── styles/            # Estilos CSS
│   │   ├── components/    # Estilos por componente
│   │   └── shared/        # Estilos compartidos
│   ├── utils/             # Utilidades JavaScript
│   ├── debug-gemini.js    # Herramientas de debug IA (dev)
│   └── assets/            # Recursos multimedia
├── scripts/               # Scripts de automatización
│   ├── process-images.js  # Optimización de imágenes
│   ├── sanitize-data.js   # Limpieza de datos
│   └── security/          # Scripts de seguridad
│       └── generate-client-data.js # Generación segura de datos
├── build/                 # Build de producción (generado)
├── .github/               # Configuración GitHub
├── next.config.js         # Configuración (legacy)
├── package.json           # Dependencias y scripts
├── README.md              # Documentación del proyecto
└── .gitignore            # Archivos ignorados por Git
```

## Stack Tecnológico

### Frontend
- **React 18.0.0**: Framework principal (SPA)
- **React Router 6**: Enrutamiento del cliente
- **Context API**: Gestión de estado global
- **CSS Modules**: Estilos modulares
- **Tailwind CSS**: Framework de utilidades CSS
- **Typed.js**: Animaciones de texto
- **React Icons**: Iconografía
- **FontAwesome**: Iconos adicionales

### Animaciones y UX
- **Framer Motion**: Animaciones avanzadas
- **React Spring**: Animaciones fluidas
- **React Swipeable**: Gestos táctiles
- **React Use Gesture**: Interacciones gestuales

### Inteligencia Artificial
- **Google Gemini AI**: Chatbot conversacional inteligente
- **Rate Limiting**: Control de spam y seguridad
- **Memoria Conversacional**: Contexto persistente
- **Sanitización de Mensajes**: Seguridad de entrada

### Optimización y Rendimiento
- **React Suspense & Lazy Loading**: Carga diferida de componentes
- **React Helmet Async**: SEO dinámico
- **Google Tag Manager**: Análisis y seguimiento
- **Meta Tags Dinámicos**: SEO optimizado
- **Responsive Design**: Diseño adaptativo

### Herramientas de Desarrollo
- **Git & GitHub**: Control de versiones
- **Cloudflare Pages**: Hosting productivo actual
- **GitHub Pages**: Ruta legacy/manual de rollback
- **NPM**: Gestión de paquetes
- **React Scripts 5.0.1**: Herramientas de desarrollo

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
- **Chatbot Inteligente con Google Gemini AI**:
  - 🧠 **Motor de IA**: Google Gemini 1.5 Flash
  - 🗣️ **Conversación Natural**: Respuestas contextuales inteligentes
  - 🌐 **Soporte Bilingüe**: Español e inglés automático
  - 💾 **Memoria Conversacional**: Mantiene contexto de la conversación
  - ⚡ **Indicadores Visuales**: Estados de escritura y procesamiento
  - 🎯 **Botones de Acceso Rápido**: Navegación asistida
  - 🔒 **Sistema de Seguridad**:
    - Rate limiting (máximo 5 mensajes/minuto)
    - Sanitización de entrada
    - Validación de contenido
    - Prevención de spam
  - 🛠️ **Herramientas de Debug**: Testing y monitoreo (desarrollo)
  - 📱 **Responsive**: Adaptado para móviles y escritorio
  - ♿ **Accesibilidad**: ARIA labels y navegación por teclado

## Despliegue

El portfolio tiene como hosting productivo actual Cloudflare Pages y está accesible en [elelier.com](https://elelier.com). GitHub Pages se conserva únicamente como ruta legacy/manual de rollback.

### Configuración de Producción
- **Dominio Personalizado**: `elelier.com` y `www.elelier.com` activos en Cloudflare Pages
- **HTTPS Habilitado**: SSL/TLS automático por Cloudflare Pages
- **Compresión de Activos**: Minificación automática de CSS/JS
- **Caché Optimizado**: Headers de caché para recursos estáticos
- **Analytics Configurado**: Google Tag Manager y Google Analytics 4
- **Sitemap XML**: Generado automáticamente para SEO
- **PWA Ready**: Manifest.json configurado para instalación

### Pipeline de Despliegue
1. **Build Automático**: `npm run build` genera datos de cliente y construye
2. **Optimización**: Minificación, tree-shaking y code-splitting
3. **Deploy legacy/manual**: `npm run deploy` mantiene la ruta histórica de GitHub Pages con `gh-pages`
4. **DNS**: Cloudflare Pages atiende `elelier.com` y `www.elelier.com`; una redirección `301` de `www` a apex sigue como evaluación no bloqueante

### Variables de Entorno Requeridas
```bash
REACT_APP_GEMINI_API_KEY=your_gemini_api_key_here  # Para producción
```

### Monitoreo y Analytics
- **Google Analytics 4**: Tracking de usuarios y conversiones
- **Google Tag Manager**: Gestión avanzada de tags
- **Core Web Vitals**: Métricas de rendimiento automáticas

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

## Scripts Disponibles

### Desarrollo
```bash
npm start          # Servidor de desarrollo
npm run dev        # Alias para npm start
npm test           # Ejecutar tests
```

### Producción
```bash
npm run build      # Construir para producción (incluye generación de datos)
npm run deploy     # Ruta legacy/manual hacia GitHub Pages
npm run predeploy  # Pre-construcción automática
npm run pre-prod   # Testing local de build de producción
```

### Utilidades y Seguridad
```bash
npm run generate-client-data  # Generar datos seguros de clientes
npm run security-check        # Auditoría de seguridad y formato
```

### Scripts Internos
- **generate-client-data**: Procesa y hashea datos sensibles de clientes
- **security-check**: Ejecuta `npm audit` y verifica formato de package.json

## Seguridad y Privacidad

### Protección de Datos
- **Hasheado de Contraseñas**: Códigos de acceso encriptados
- **Datos de Cliente Seguros**: Información sensible procesada y protegida
- **Variables de Entorno**: API keys y secretos en variables seguras

### Chatbot Security
- **Rate Limiting**: Máximo 5 mensajes por minuto por usuario
- **Sanitización**: Filtrado automático de contenido malicioso
- **Validación de Entrada**: Verificación de longitud y contenido
- **Sesiones Temporales**: No se almacenan conversaciones permanentemente

## Contributing

No se aceptan contribuciones, pero siéntete libre de copiar el repositorio para hacer tu propia landing.

## License

Este proyecto está licenciado bajo la licencia MIT. Consulte el archivo [LICENSE](LICENSE) para obtener más detalles.
