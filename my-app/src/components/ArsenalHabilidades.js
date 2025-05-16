import React, { useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import '../styles/components/Habilidades.css';
import strategic_vision from '../assets/images/skills/strategic_vision.png';
import team_leadership from '../assets/images/skills/team_leadership.png';
import tech_integration from '../assets/images/skills/tech_integration.png';
import ai_solutions from '../assets/images/skills/ai_solutions.png';
import data_analysis from '../assets/images/skills/data_analysis.png';
import logistics from '../assets/images/skills/logistics.png';
import ecommerce from '../assets/images/skills/ecommerce.png';
import { useLanguage } from '../contexts/LanguageContext';

function ArsenalHabilidades() {
  const [activeIndex, setActiveIndex] = useState(null);
  const { language } = useLanguage();

  const habilidades = {
    es: [
      {
        nombre: 'Visión Estratégica',
        imagen: strategic_vision,
        descripcion: 'Diseño e implementación de estrategias para impulsar el crecimiento empresarial.',
        ejemplos: [
          { texto: 'Evaluación de Procesos', enlace: '#evaluacion-procesos' },
          { texto: 'Análisis FODA', enlace: '#analisis-foda' },
          { texto: 'Transformación Digital', enlace: '#transformacion-digital' },
        ],
      },
      {
        nombre: 'Liderazgo de Equipos',
        imagen: team_leadership,
        descripcion: 'Gestión y desarrollo de equipos multidisciplinarios enfocados en alcanzar objetivos concretos.',
        ejemplos: [
          { texto: 'Metodologías Ágiles', enlace: '#metodologias-agiles' },
          { texto: 'Capacitación Personalizada', enlace: '#capacitacion-personalizada' },
          { texto: 'Gestión Remota', enlace: '#gestion-remota' },
        ],
      },
      {
        nombre: 'Integración Tecnológica',
        imagen: tech_integration,
        descripcion: 'Automatización y digitalización con BuildShip, Render y AWS para optimizar flujos de trabajo.',
        ejemplos: [
          { texto: 'Automatización con AWS', enlace: '#automatizacion-aws' },
          { texto: 'Despliegue en Render', enlace: '#despliegue-render' },
          { texto: 'Integración Continua', enlace: '#integracion-continua' },
        ],
      },
      {
        nombre: 'Soluciones AI Avanzadas',
        imagen: ai_solutions,
        descripcion: 'Implementación de inteligencia artificial con OpenAI, TensorFlow, Ollama, y chatbots personalizados.',
        ejemplos: [
          { texto: 'Asistentes Virtuales', enlace: '#asistentes-virtuales' },
          { texto: 'Automatización AI', enlace: '#automatizacion-ai' },
          { texto: 'Chatbots', enlace: '#chatbots' },
        ],
      },
      {
        nombre: 'Análisis de Datos',
        imagen: data_analysis,
        descripcion: 'Análisis avanzado de datos para toma de decisiones estratégicas.',
        ejemplos: [
          { texto: 'Análisis Predictivo', enlace: '#analisis-predictivo' },
          { texto: 'Visualización de Datos', enlace: '#visualizacion-datos' },
          { texto: 'Machine Learning', enlace: '#machine-learning' },
        ],
      },
      {
        nombre: 'Logística y Operaciones',
        imagen: logistics,
        descripcion: 'Optimización de cadenas de suministro y operaciones logísticas.',
        ejemplos: [
          { texto: 'Gestión de Almacenes', enlace: '#gestion-almacenes' },
          { texto: 'Rutas Óptimas', enlace: '#rutas-optimas' },
          { texto: 'Inventario Inteligente', enlace: '#inventario-inteligente' },
        ],
      },
      {
        nombre: 'E-commerce',
        imagen: ecommerce,
        descripcion: 'Desarrollo y optimización de tiendas en línea y marketplaces.',
        ejemplos: [
          { texto: 'SEO Avanzado', enlace: '#seo-avanzado' },
          { texto: 'Marketing Digital', enlace: '#marketing-digital' },
          { texto: 'UX/UI', enlace: '#ux-ui' },
        ],
      },
    ],
    en: [
      {
        nombre: 'Strategic Vision',
        imagen: strategic_vision,
        descripcion: 'Design and implementation of strategies to drive business growth.',
        ejemplos: [
          { texto: 'Process Evaluation', enlace: '#process-evaluation' },
          { texto: 'SWOT Analysis', enlace: '#swot-analysis' },
          { texto: 'Digital Transformation', enlace: '#digital-transformation' },
        ],
      },
      {
        nombre: 'Team Leadership',
        imagen: team_leadership,
        descripcion: 'Management and development of multidisciplinary teams focused on achieving concrete objectives.',
        ejemplos: [
          { texto: 'Agile Methodologies', enlace: '#agile-methodologies' },
          { texto: 'Personalized Training', enlace: '#personalized-training' },
          { texto: 'Remote Management', enlace: '#remote-management' },
        ],
      },
      {
        nombre: 'Technological Integration',
        imagen: tech_integration,
        descripcion: 'Automation and digitalization with BuildShip, Render, and AWS to optimize workflows.',
        ejemplos: [
          { texto: 'Automation with AWS', enlace: '#automation-aws' },
          { texto: 'Deployment on Render', enlace: '#deployment-render' },
          { texto: 'Continuous Integration', enlace: '#continuous-integration' },
        ],
      },
      {
        nombre: 'Advanced AI Solutions',
        imagen: ai_solutions,
        descripcion: 'Implementation of artificial intelligence with OpenAI, TensorFlow, Ollama, and customized chatbots.',
        ejemplos: [
          { texto: 'Virtual Assistants', enlace: '#virtual-assistants' },
          { texto: 'AI Automation', enlace: '#ai-automation' },
          { texto: 'Chatbots', enlace: '#chatbots' },
        ],
      },
      {
        nombre: 'Data Analysis',
        imagen: data_analysis,
        descripcion: 'Extraction, cleaning, and analysis with JavaScript, Python, SQL, BI, and Tableau for data-driven decisions.',
        ejemplos: [
          { texto: 'Predictive Analysis', enlace: '#predictive-analysis' },
          { texto: 'Data Visualization', enlace: '#data-visualization' },
          { texto: 'Machine Learning', enlace: '#machine-learning' },
        ],
      },
      {
        nombre: 'Logistics and Operations',
        imagen: logistics,
        descripcion: 'Optimization of operations and processes for continuous and sustainable improvement.',
        ejemplos: [
          { texto: 'Supply Optimization', enlace: '#supply-optimization' },
          { texto: 'Warehouse Improvement', enlace: '#warehouse-improvement' },
          { texto: 'Inventory Management', enlace: '#inventory-management' },
        ],
      },
      {
        nombre: 'E-Commerce & Marketplaces',
        imagen: ecommerce,
        descripcion: 'Experience in digitalization, integration, and management on platforms like Mercado Libre, Amazon, and Shopify.',
        ejemplos: [
          { texto: 'SEO for Amazon', enlace: '#seo-amazon' },
          { texto: 'Integration on Shopify', enlace: '#integration-shopify' },
          { texto: 'SEO on Mercado Libre', enlace: '#seo-mercado-libre' },
        ],
      },
    ],
  };

  const handleCardClick = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <section id="habilidades" className="arsenal-habilidades">
      <h2 className="titulo-seccion">
        {language === 'es' ? 'Arsenal de Habilidades' : 'Skill Arsenal'}
      </h2>
      <p className="introduccion">
        {language === 'es'
          ? 'Estas son algunas herramientas que utilizo para transformar y potenciar negocios. Cada una es clave en mi navaja suiza digital, diseñada para enfrentar desafíos y ofrecer soluciones innovadoras.'
          : 'These are some of the tools I use to transform and empower businesses. Each one is key in my digital Swiss army knife, designed to tackle challenges and provide innovative solutions.'}
      </p>
      <div className="habilidades-grid">
        {habilidades[language].map((habilidad, index) => (
          <div
            key={index}
            className={`habilidad-card ${activeIndex === index ? 'active' : ''}`}
            onClick={() => handleCardClick(index)}
          >
            <div className="habilidad-header">
              <LazyLoadImage
                src={habilidad.imagen}
                alt={habilidad.nombre}
                width="100%"
                height="100%"
                effect="blur"
                className="habilidad-imagen"
              />
              <h3 className="habilidad-nombre">{habilidad.nombre}</h3>
            </div>
            <div className="habilidad-descripcion">
              {habilidad.descripcion}
            </div>
            <ul className={`habilidad-ejemplos ${activeIndex === index ? 'active' : ''}`}>
              {habilidad.ejemplos.map((ejemplo, ejemploIndex) => (
                <li key={ejemploIndex}>
                  <a href={ejemplo.enlace} target="_blank" rel="noopener noreferrer">{ejemplo.texto}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ArsenalHabilidades;
