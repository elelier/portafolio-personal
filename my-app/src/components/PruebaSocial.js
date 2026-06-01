import React from 'react';

function PruebaSocial({ style }) {
  return (
    <section id="prueba-social" className="prueba-social" style={style}>
      <div>
        <h2>Referencias</h2>
        <p>Esta sección se completará con referencias verificadas. Mientras tanto, revisa los casos anteriores.</p>
        <button onClick={() => document.getElementById('diagnostico')?.scrollIntoView({ behavior: 'smooth' })}>
          Iniciar diagnóstico →
        </button>
      </div>
    </section>
  );
}

export default PruebaSocial;
