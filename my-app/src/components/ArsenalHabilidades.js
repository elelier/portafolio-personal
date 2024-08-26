import React from 'react';

function ArsenalHabilidades() {
  const habilidades = [
    { nombre: 'Visión Estratégica', icono: '🎯', descripcion: 'Diseño e implementación de estrategias para impulsar el crecimiento empresarial.' },
    { nombre: 'Liderazgo de Equipos', icono: '👥', descripcion: 'Gestión y desarrollo de equipos multidisciplinarios enfocados en alcanzar objetivos concretos.' },
    { nombre: 'E-Commerce & Marketplaces', icono: '🛒', descripcion: 'Experiencia en digitalización, integración y gestión en plataformas como Mercado Libre, Amazon y Shopify.' },
    { nombre: 'Soluciones AI Avanzadas', icono: '🤖', descripcion: 'Implementación de inteligencia artificial con OpenAI, TensorFlow, Ollama, y chatbots personalizados.' },
    { nombre: 'Logística y Operaciones', icono: '📦', descripcion: 'Optimización de operaciones y procesos para una mejora continua y sostenible.' },
    { nombre: 'Análisis de Datos', icono: '📊', descripcion: 'Extracción, limpieza y análisis con JavaScript, Python, SQL, BI y Tableau para decisiones basadas en evidencia.' },
    { nombre: 'Integración Tecnológica', icono: '🔗', descripcion: 'Automatización y digitalización con BuildShip, Render y Amazon Web Services (AWS) para optimizar flujos de trabajo.' },
  ];

  return (
    <section id="habilidades" className="arsenal-habilidades">
      <h2>Arsenal de Habilidades</h2>
      <div className="habilidades-grid">
        {habilidades.map((habilidad, index) => (
          <div key={index} className="habilidad-card">
            <div className="habilidad-icono">{habilidad.icono}</div>
            <div className="habilidad-info">
              <div className="habilidad-nombre">{habilidad.nombre}</div>
              <div className="habilidad-descripcion">{habilidad.descripcion}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ArsenalHabilidades;