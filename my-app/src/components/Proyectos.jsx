import React from 'react';
import ProjectCard from './ProjectCard';
import '../styles/components/Proyectos.css';
import { useLanguage } from '../contexts/LanguageContext';
import imageCompressorBanner from '../assets/images/projects/image-compressor-banner.png';
import { FaGithub } from 'react-icons/fa';
import { FaBriefcase } from 'react-icons/fa';
import { FaComments } from 'react-icons/fa';

const Proyectos = () => {
  const { language } = useLanguage();


  const proyectosData = {
    es: [
      {
        "nombre": "Compresor de Imágenes",
        "version": "1.0.0",
        "descripcion": "Una herramienta simple pero poderosa para comprimir imágenes manteniendo una calidad óptima, perfecta para preparar imágenes para correo electrónico o web.",
        "tecnologias": [
          "Python 3.6+",
          "Pillow (PIL)",
          "CLI"
        ],
        "caracteristicas": [
          "Compresión inteligente de imágenes a menos de 1MB",
          "Soporte para múltiples formatos (JPG, JPEG, PNG, BMP, WEBP)",
          "Proceso por lotes automatizado",
          "Preservación de calidad con algoritmo adaptativo",
          "Conversión automática a RGB para formatos compatibles",
          "Interfaz de línea de comandos simple y directa"
        ],
        "link": "https://github.com/elelier/image-compressor",
        "link_u": "Ver en GitHub",
        "banner": imageCompressorBanner,
        "icon": FaGithub
      },
      {
        "nombre": "Mi portafolio personal",
        "version": "2.0.1",
        "descripcion": "Un sitio web profesional y moderno que muestra mi experiencia en transformación digital, e-commerce y optimización de operaciones. Construido con las últimas tecnologías web y centrado en ofrecer una experiencia de usuario excepcional.",
        "tecnologias": [
          "React",
          "JavaScript",
          "HTML",
          "CSS"
        ],
        "caracteristicas": [
          "Diseño responsivo y adaptativo",
          "Internacionalización con soporte multiidioma (ES/EN)",
          "Tema dinámico (modo claro/oscuro)",
          "Chatbot inteligente con IA",
          "SEO optimizado con meta tags dinámicos",
          "Sistema de blog integrado",
          "Animaciones y transiciones fluidas",
          "Integración con Google Analytics"
        ],
        "link": "https://www.elelier.com",
        "link_u": "Ver Sitio Web",
        "banner": imageCompressorBanner,
        "icon": FaBriefcase
      },
      {
        "nombre": "EL Bot - AI Assistant",
        "version": "1.0.0",
        "descripcion": "Un chatbot moderno y responsivo impulsado por inteligencia artificial, diseñado con Flask y la API GPT-3.5 de OpenAI. Proporciona una interfaz interactiva para responder preguntas y ofrecer información en tiempo real.",
        "tecnologias": [
          "Python",
          "Flask",
          "OpenAI API",
          "JavaScript"
        ],
        "caracteristicas": [
          "Interfaz de chat en tiempo real",
          "Diseño responsivo y moderno",
          "Preservación del contexto de la conversación",
          "Historial de conversación local",
          "Indicadores de escritura en tiempo real"
        ],
        "link": "https://github.com/elelier/el-bot", 
        "link_u": "Ver en GitHub",
        "banner": imageCompressorBanner,
        "icon": FaComments,
      }
    ],
    en: [
      {
        "nombre": "Image Compressor",
        "version": "1.0.0",
        "descripcion": "A simple yet powerful tool for compressing images while maintaining optimal quality, perfect for preparing images for email or web use.",
        "tecnologias": [
          "Python 3.6+",
          "Pillow (PIL)",
          "CLI"
        ],
        "caracteristicas": [
          "Smart image compression under 1MB",
          "Multiple format support (JPG, JPEG, PNG, BMP, WEBP)",
          "Automated batch processing",
          "Adaptive quality preservation algorithm",
          "Automatic RGB conversion for compatible formats",
          "Simple and straightforward command-line interface"
        ],
        "link": "https://github.com/elelier/image-compressor",
        "link_u": "View on GitHub",
        "banner": imageCompressorBanner,
        "icon": FaGithub
      },
      {
        "nombre": "My personal portfolio",
        "version": "2.0.1",
        "descripcion": "A professional and modern website showcasing my experience in digital transformation, e-commerce, and operations optimization. Built with the latest web technologies and focused on providing an exceptional user experience.",
        "tecnologias": [
          "React",
          "JavaScript",
          "HTML",
          "CSS"
        ],
        "caracteristicas": [
          "Responsive and adaptive design",
          "Internationalization with multi-language support (ES/EN)",
          "Dynamic theme (light/dark mode)",
          "Intelligent AI chatbot",
          "SEO optimized with dynamic meta tags",
          "Integrated blog system",
          "Fluid animations and transitions",
          "Integration with Google Analytics"
        ],
        "link": "https://www.elelier.com",
        "link_u": "View Website",
        "banner": imageCompressorBanner,
        "icon": FaBriefcase
      },
      {
        "nombre": "EL Bot - AI Assistant",
        "version": "1.0.0",
        "descripcion": "A modern and responsive chatbot powered by artificial intelligence, built with Flask and the GPT-3.5 OpenAI API. It provides an interactive interface to answer questions and deliver real-time information.",
        "tecnologias": [
          "Python",
          "Flask",
          "OpenAI API",
          "JavaScript"
        ],
        "caracteristicas": [
          "Real-time chat interface",
          "Responsive and modern design",
          "Conversation context preservation",
          "Local conversation history",
          "Typing indicators"
        ],
        "link": "https://github.com/elelier/el-bot",
        "link_u": "View on GitHub",
        "banner": imageCompressorBanner,
        "icon": FaComments,
      }
      
    ]
  };

  const content = {
    es: {
      title: "Proyectos Destacados",
      subtitle: "Explora algunos de mis proyectos personales más interesantes"
    },
    en: {
      title: "Featured Projects",
      subtitle: "Explore some of my most interesting personal projects"
    }
  };

  return (
    <section id="proyectos" className="proyectos-section">
      <div className="container">
        <h2>{content[language].title}</h2>
        <p className="section-subtitle">{content[language].subtitle}</p>
        
        <div className="proyectos-grid">
          {proyectosData[language].map((proyecto, index) => (
            <ProjectCard key={index} project={proyecto} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Proyectos;
