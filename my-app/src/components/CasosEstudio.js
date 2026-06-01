import React from 'react';
import '../styles/components/CasosEstudio.css';

function CasosEstudio({ style }) {
  return (
    <section id="casos-reales" className="casos-estudio" style={style}>
      <div className="casos-estudio__header">
        <span>Casos reales</span>
        <h2>Casos de estudio mínimos</h2>
        <p>Problema, solución y resultado. Prueba concreta antes que lista de habilidades.</p>
      </div>
      <div className="casos-estudio__grid">
        <article className="caso-card">
          <h3>GoFarma</h3>
          <p><strong>Problema:</strong> operación tipo dark store con inventario sensible y presión constante de entregas.</p>
          <p><strong>Solución:</strong> estandarización operativa, control de inventario, procedimientos de almacén y mejora diaria de procesos.</p>
          <p><strong>Resultado:</strong> precisión de inventario de 99.8%.</p>
        </article>
        <article className="caso-card">
          <h3>Wonderlabs</h3>
          <p><strong>Problema:</strong> convertir una idea creativa con IA en un prototipo funcional.</p>
          <p><strong>Solución:</strong> flujo digital para generación y asistencia de historias con IA.</p>
          <p><strong>Resultado:</strong> MVP funcional demostrable.</p>
        </article>
        <article className="caso-card">
          <h3>Farmalisto</h3>
          <p><strong>Problema:</strong> canal marketplace con fricción comercial y operación digital mejorable.</p>
          <p><strong>Solución:</strong> optimización de presencia online, catálogo y canales comerciales.</p>
          <p><strong>Resultado:</strong> incremento de ventas de 144%.</p>
        </article>
      </div>
      <button className="casos-estudio__cta" onClick={() => document.getElementById('diagnostico')?.scrollIntoView({ behavior: 'smooth' })}>
        Quiero un resultado así →
      </button>
    </section>
  );
}

export default CasosEstudio;
