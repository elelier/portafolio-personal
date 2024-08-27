# Elier Portfolio

**Elier Portfolio** es un sitio web de portafolio personal que muestra el trabajo y las habilidades del desarrollador. El proyecto está construido utilizando tecnologías web modernas y está alojado en GitHub Pages.

## 🗂️ Tabla de Contenidos

- [📁 Estructura del Proyecto](#estructura-del-proyecto)
- [🛠️ Tecnologías Utilizadas](#tecnologías-utilizadas)
- [🚀 Despliegue](#despliegue)
- [🚧 Comenzando](#comenzando)
- [🤝 Contribuciones](#contribuciones)
- [📜 Licencia](#licencia)

## 📁 Estructura del Proyecto

El proyecto está organizado de la siguiente manera:

```bash
/
├── public/                 # Archivos públicos e index.html
├── src/                    # Archivos fuente (componentes, recursos, estilos)
├── .github/                # Archivos específicos de GitHub (Actions, configuración de Pages)
├── README.md               # Documentación del proyecto
├── package.json            # Dependencias y scripts del proyecto
└── .gitignore              # Archivos y carpetas a ignorar en el control de versiones
```

## 🛠️ Tecnologías Utilizadas

- **HTML/CSS**: Para la estructura y el diseño responsivo del sitio.
- **JavaScript (React)**: Para agregar interactividad y contenido dinámico.
- **Git/GitHub**: Para el control de versiones y la gestión del proyecto.
- **GitHub Pages**: Utilizado para alojar el sitio web del portafolio.
- **🌐 Dominio Personalizado**: Configurado para una URL personalizada.

## 🚀 Despliegue

El portafolio está desplegado utilizando GitHub Pages. Puedes verlo en vivo en [Elier Portfolio](https://elelier.github.io/elier-portfolio).

### ⚙️ Configuración de GitHub Pages

El proyecto está configurado para desplegarse desde la rama `main`. Asegúrate de que:

- El contenido se sirva desde la carpeta `/src`.
- GitHub Pages esté configurado para desplegar desde la raíz (`/`).

## 🚧 Comenzando

### 📋 Prerrequisitos

Asegúrate de tener [Node.js](https://nodejs.org/) instalado.

### 💻 Instalación

1. Clona el repositorio:
    ```bash
    git clone https://github.com/elelier/elier-portfolio.git
    cd elier-portfolio
    ```

2. Instala las dependencias:
    ```bash
    npm install
    ```

### ▶️ Ejecutando la Aplicación Localmente

Para ejecutar la aplicación en modo de desarrollo:

```bash
npm start
```

Esto iniciará la aplicación y la abrirá en tu navegador en [http://localhost:3000](http://localhost:3000). La página se recargará automáticamente si realizas cambios en el código.

### 🏗️ Construcción para Producción

Para crear una versión optimizada para producción:

```bash
npm run build
```

Esto generará los archivos de producción en el directorio `build`, listos para ser desplegados.

## 🤝 Contribuciones

¡Las contribuciones son bienvenidas! Sigue estos pasos:

1. Haz un fork del repositorio.
2. Crea una nueva rama:
    ```bash
    git checkout -b feature/tu-nombre-de-característica
    ```
3. Realiza tus cambios y haz commit:
    ```bash
    git commit -m "Agregar característica: tu nombre de característica"
    ```
4. Empuja la rama:
    ```bash
    git push origin feature/tu-nombre-de-característica
    ```
5. Abre un Pull Request.

Por favor, asegúrate de que tu código siga los estándares de codificación del proyecto y esté bien documentado.

## 📜 Licencia

Este proyecto está licenciado bajo la Licencia MIT. Consulta el archivo [LICENSE](LICENSE) para más detalles.

---
