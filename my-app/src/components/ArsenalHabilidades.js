import React, { useState } from 'react';
import './css/Habilidades.css';

function ArsenalHabilidades() {
  const [activeIndex, setActiveIndex] = useState(null);

  const habilidades = [
    {
      nombre: 'Visión Estratégica',
      icono: '🎯',
      descripcion: 'Diseño e implementación de estrategias para impulsar el crecimiento empresarial.',
      ejemplos: [
        { texto: 'Evaluación de Procesos', enlace: '#evaluacion-procesos' },
        { texto: 'Análisis FODA', enlace: '#analisis-foda' },
        { texto: 'Transformación Digital', enlace: '#transformacion-digital' },
      ],
    },
    {
      nombre: 'Liderazgo de Equipos',
      icono: '👥',
      descripcion: 'Gestión y desarrollo de equipos multidisciplinarios enfocados en alcanzar objetivos concretos.',
      ejemplos: [
        { texto: 'Metodologías Ágiles', enlace: '#metodologias-agiles' },
        { texto: 'Capacitación Personalizada', enlace: '#capacitacion-personalizada' },
        { texto: 'Gestión Remota', enlace: '#gestion-remota' },
      ],
    },
    {
      nombre: 'Integración Tecnológica',
      icono: '🔗',
      descripcion: 'Automatización y digitalización con BuildShip, Render y AWS para optimizar flujos de trabajo.',
      ejemplos: [
        { texto: 'Automatización con AWS', enlace: '#automatizacion-aws' },
        { texto: 'Despliegue en Render', enlace: '#despliegue-render' },
        { texto: 'Integración Continua', enlace: '#integracion-continua' },
      ],
    },
    {
      nombre: 'Soluciones AI Avanzadas',
      icono: '🤖',
      descripcion: 'Implementación de inteligencia artificial con OpenAI, TensorFlow, Ollama, y chatbots personalizados.',
      ejemplos: [
        { texto: 'Asistentes Virtuales', enlace: '#asistentes-virtuales' },
        { texto: 'Automatización AI', enlace: '#automatizacion-ai' },
        { texto: 'Chatbots', enlace: '#chatbots' },
      ],
    },
    {
      nombre: 'Análisis de Datos',
      icono: '📊',
      descripcion: 'Extracción, limpieza y análisis con JavaScript, Python, SQL, BI y Tableau para decisiones basadas en datos.',
      ejemplos: [
        { texto: 'Análisis Predictivo', enlace: '#analisis-predictivo' },
        { texto: 'Visualización de Datos', enlace: '#visualizacion-datos' },
        { texto: 'Dashboards BI', enlace: '#dashboards-bi' },
      ],
    },
    {
      nombre: 'Logística y Operaciones',
      icono: '📦',
      descripcion: 'Optimización de operaciones y procesos para una mejora continua y sostenible.',
      ejemplos: [
        { texto: 'Optimización de Suministro', enlace: '#optimizacion-suministro' },
        { texto: 'Mejora en Almacenes', enlace: '#mejora-almacenes' },
        { texto: 'Gestión de Inventarios', enlace: '#gestion-inventarios' },
      ],
    },
    {
      nombre: 'E-Commerce & Marketplaces',
      icono: '🛒',
      descripcion: 'Experiencia en digitalización, integración y gestión en plataformas como Mercado Libre, Amazon y Shopify.',
      ejemplos: [
        { texto: 'SEO para Amazon', enlace: '#seo-amazon' },
        { texto: 'Integración en Shopify', enlace: '#integracion-shopify' },
        { texto: 'SEO en Mercado Libre', enlace: '#seo-mercado-libre' },
      ],
    },
  ];

  const handleCardClick = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };
  return (
    <section id="habilidades" className="arsenal-habilidades">
      <h2 className="titulo-seccion">Arsenal de Habilidades</h2>
      <p className="introduccion shinyh">
        Descubre el arsenal de habilidades que utilizo para transformar y potenciar negocios. Cada habilidad es una herramienta clave en mi caja de herramientas digital, diseñada para enfrentar desafíos y ofrecer soluciones innovadoras.
      </p>
      <div className="habilidades-grid">
        {habilidades.map((habilidad, index) => (
          <div
            key={index}
            className={`habilidad-card ${activeIndex === index ? 'active' : ''}`}
            onClick={() => handleCardClick(index)}
          >
            <div className="habilidad-header">
              <div className="habilidad-icono">{habilidad.icono}</div>
              <div className="habilidad-nombre">{habilidad.nombre}</div>
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
