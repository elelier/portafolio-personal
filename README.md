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

## Seguridad y Protección de Datos

### Variables de Entorno
```bash
# .env.example
REACT_APP_API_URL=your_api_url
REACT_APP_ANALYTICS_ID=your_analytics_id
REACT_APP_GEMINI_API_KEY=your_gemini_key
```

### Datos Sensibles y Configuración
- **Variables de Entorno**: Usar `.env` para almacenar todas las claves de API y configuraciones sensibles
- **Git Ignore**:
  ```gitignore
  # Archivos de ambiente
  .env
  .env.local
  .env.*.local
  
  # Datos de clientes
  /src/data/private/*
  /src/data/clientProjects.json
  
  # Logs y cachés
  npm-debug.log*
  yarn-debug.log*
  yarn-error.log*
  .pnpm-debug.log*
  ```

### Mejores Prácticas de Seguridad

#### Protección de Datos de Cliente
1. **Sanitización de Datos**:
   - Eliminar información personal identificable (PII) antes de subir al repositorio
   - Usar nombres genéricos o códigos para clientes en ejemplos
   - Encriptar o hashear contraseñas y tokens de acceso

2. **Estructura de Datos Segura**:
   ```javascript
   // Ejemplo de estructura segura para datos públicos
   {
     "projectId": "PRJ001",
     "displayName": "Project Alpha",
     "status": "active",
     "publicDetails": {
       "industry": "Technology",
       "location": "Region"
     }
   }
   ```

3. **Control de Acceso**:
   - Implementar autenticación para áreas sensibles
   - Usar tokens JWT con expiración corta
   - Validar permisos en cada solicitud

#### Despliegue Seguro
1. **Preparación**:
   ```bash
   # Script de sanitización pre-deploy
   npm run sanitize-data    # Elimina datos sensibles
   npm run security-check   # Verifica exposición de datos
   npm run build           # Construye con variables de prod
   ```

2. **Verificación**:
   - Revisar archivos estáticos por datos sensibles
   - Validar headers de seguridad
   - Comprobar configuración CORS

3. **Monitoreo**:
   - Implementar logging seguro
   - Configurar alertas de seguridad
   - Realizar auditorías periódicas

### Herramientas Recomendadas
- **Seguridad**: 
  - [Helmet](https://helmetjs.github.io/) para headers HTTP
  - [node-rate-limiter](https://github.com/animir/node-rate-limiter) para protección DoS
  - [OWASP Dependency Check](https://owasp.org/www-project-dependency-check/) para vulnerabilidades

### Proceso de Desarrollo Seguro
1. Nunca commitear archivos `.env`
2. Usar variables de entorno para configuración
3. Implementar sanitización de datos automática
4. Revisar código por datos sensibles antes de push
5. Mantener dependencias actualizadas

### Documentación Adicional
- [Guía completa de seguridad](./docs/SECURITY.md)
- [Política de privacidad](./docs/PRIVACY.md)
- [Proceso de sanitización](./docs/DATA_SANITIZATION.md)

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