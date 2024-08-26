import React from 'react';
import './css/HeroBanner.css'; // Asegúrate de importar el archivo CSS

function HeroBanner() {
  return (
    <header id="inicio" className="hero-banner">
      <div className="hero-content">
        <h1>Elier Loya</h1>
        <h2>Impulsando tu negocio hacia el futuro</h2>
        <p>
          Especialista en transformación digital, e-commerce y optimización de operaciones con más de 10 años de experiencia.
        </p>
        <button className="cta-button">
          Descubre cómo
        </button>
      </div>
    </header>
  );
}

export default HeroBanner;
