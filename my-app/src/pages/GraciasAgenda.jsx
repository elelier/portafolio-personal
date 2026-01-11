import React from 'react';
import '../styles/GraciasAgenda.css';

const GraciasAgenda = () => {
  return (
    <main className="gracias-agenda">
      <section className="gracias-agenda__card">
        <h1>Sesión confirmada</h1>
        <p>Gracias por agendar tu Diagnóstico Express. Puedes cerrar esta pestaña o volver a elelier.com.</p>
        <a className="gracias-agenda__button" href="/">Volver a elelier.com</a>
      </section>
    </main>
  );
};

export default GraciasAgenda;
