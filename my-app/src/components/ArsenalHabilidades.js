import React, { useState } from 'react';
import '../styles/components/Habilidades.css';
import { useLanguage } from '../contexts/LanguageContext'; // Ajusta la importación según tu estructura

function ArsenalHabilidades() {
  const [activeIndex, setActiveIndex] = useState(null);
  const { language } = useLanguage(); // Obtén el idioma del contexto

  const habilidades = {
    es: [
      {
        nombre: 'Visión Estratégica',
        iconoClass: 'strategic-vision',
        descripcion: 'Diseño e implementación de estrategias para impulsar el crecimiento empresarial.',
        ejemplos: [
          { texto: 'Evaluación de Procesos', enlace: '#evaluacion-procesos' },
          { texto: 'Análisis FODA', enlace: '#analisis-foda' },
          { texto: 'Transformación Digital', enlace: '#transformacion-digital' },
        ],
      },
      {
        nombre: 'Liderazgo de Equipos',
        iconoClass: 'team-leadership',
        descripcion: 'Gestión y desarrollo de equipos multidisciplinarios enfocados en alcanzar objetivos concretos.',
        ejemplos: [
          { texto: 'Metodologías Ágiles', enlace: '#metodologias-agiles' },
          { texto: 'Capacitación Personalizada', enlace: '#capacitacion-personalizada' },
          { texto: 'Gestión Remota', enlace: '#gestion-remota' },
        ],
      },
      {
        nombre: 'Integración Tecnológica',
        iconoClass: 'tech-integration',
        descripcion: 'Automatización y digitalización con BuildShip, Render y AWS para optimizar flujos de trabajo.',
        ejemplos: [
          { texto: 'Automatización con AWS', enlace: '#automatizacion-aws' },
          { texto: 'Despliegue en Render', enlace: '#despliegue-render' },
          { texto: 'Integración Continua', enlace: '#integracion-continua' },
        ],
      },
      {
        nombre: 'Soluciones AI Avanzadas',
        iconoClass: 'ai-solutions',
        descripcion: 'Implementación de inteligencia artificial con OpenAI, TensorFlow, Ollama, y chatbots personalizados.',
        ejemplos: [
          { texto: 'Asistentes Virtuales', enlace: '#asistentes-virtuales' },
          { texto: 'Automatización AI', enlace: '#automatizacion-ai' },
          { texto: 'Chatbots', enlace: '#chatbots' },
        ],
      },
      {
        nombre: 'Análisis de Datos',
        iconoClass: 'data-analysis',
        descripcion: 'Extracción, limpieza y análisis con JavaScript, Python, SQL, BI y Tableau para decisiones basadas en datos.',
        ejemplos: [
          { texto: 'Análisis Predictivo', enlace: '#analisis-predictivo' },
          { texto: 'Visualización de Datos', enlace: '#visualizacion-datos' },
          { texto: 'Dashboards BI', enlace: '#dashboards-bi' },
        ],
      },
      {
        nombre: 'Logística y Operaciones',
        iconoClass: 'logistics',
        descripcion: 'Optimización de operaciones y procesos para una mejora continua y sostenible.',
        ejemplos: [
          { texto: 'Optimización de Suministro', enlace: '#optimizacion-suministro' },
          { texto: 'Mejora en Almacenes', enlace: '#mejora-almacenes' },
          { texto: 'Gestión de Inventarios', enlace: '#gestion-inventarios' },
        ],
      },
      {
        nombre: 'E-Commerce & Marketplaces',
        iconoClass: 'ecommerce',
        descripcion: 'Experiencia en digitalización, integración y gestión en plataformas como Mercado Libre, Amazon y Shopify.',
        ejemplos: [
          { texto: 'SEO para Amazon', enlace: '#seo-amazon' },
          { texto: 'Integración en Shopify', enlace: '#integracion-shopify' },
          { texto: 'SEO en Mercado Libre', enlace: '#seo-mercado-libre' },
        ],
      },
    ],
    en: [
      {
        nombre: 'Strategic Vision',
        iconoClass: 'strategic-vision',
        descripcion: 'Design and implementation of strategies to drive business growth.',
        ejemplos: [
          { texto: 'Process Evaluation', enlace: '#process-evaluation' },
          { texto: 'SWOT Analysis', enlace: '#swot-analysis' },
          { texto: 'Digital Transformation', enlace: '#digital-transformation' },
        ],
      },
      {
        nombre: 'Team Leadership',
        iconoClass: 'team-leadership',
        descripcion: 'Management and development of multidisciplinary teams focused on achieving concrete objectives.',
        ejemplos: [
          { texto: 'Agile Methodologies', enlace: '#agile-methodologies' },
          { texto: 'Personalized Training', enlace: '#personalized-training' },
          { texto: 'Remote Management', enlace: '#remote-management' },
        ],
      },
      {
        nombre: 'Technological Integration',
        iconoClass: 'tech-integration',
        descripcion: 'Automation and digitalization with BuildShip, Render, and AWS to optimize workflows.',
        ejemplos: [
          { texto: 'Automation with AWS', enlace: '#automation-aws' },
          { texto: 'Deployment on Render', enlace: '#deployment-render' },
          { texto: 'Continuous Integration', enlace: '#continuous-integration' },
        ],
      },
      {
        nombre: 'Advanced AI Solutions',
        iconoClass: 'ai-solutions',
        descripcion: 'Implementation of artificial intelligence with OpenAI, TensorFlow, Ollama, and customized chatbots.',
        ejemplos: [
          { texto: 'Virtual Assistants', enlace: '#virtual-assistants' },
          { texto: 'AI Automation', enlace: '#ai-automation' },
          { texto: 'Chatbots', enlace: '#chatbots' },
        ],
      },
      {
        nombre: 'Data Analysis',
        iconoClass: 'data-analysis',
        descripcion: 'Extraction, cleaning, and analysis with JavaScript, Python, SQL, BI, and Tableau for data-driven decisions.',
        ejemplos: [
          { texto: 'Predictive Analysis', enlace: '#predictive-analysis' },
          { texto: 'Data Visualization', enlace: '#data-visualization' },
          { texto: 'BI Dashboards', enlace: '#bi-dashboards' },
        ],
      },
      {
        nombre: 'Logistics and Operations',
        iconoClass: 'logistics',
        descripcion: 'Optimization of operations and processes for continuous and sustainable improvement.',
        ejemplos: [
          { texto: 'Supply Optimization', enlace: '#supply-optimization' },
          { texto: 'Warehouse Improvement', enlace: '#warehouse-improvement' },
          { texto: 'Inventory Management', enlace: '#inventory-management' },
        ],
      },
      {
        nombre: 'E-Commerce & Marketplaces',
        iconoClass: 'ecommerce',
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
            <div className={`habilidad-header ${habilidad.iconoClass}`}>
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
