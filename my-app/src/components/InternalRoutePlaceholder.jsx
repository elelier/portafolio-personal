import React from 'react';
import { Link } from 'react-router-dom';

function InternalRoutePlaceholder() {
  return (
    <section
      aria-labelledby="internal-route-placeholder-title"
      style={{
        minHeight: '60vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '4rem 1.5rem',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '640px',
          textAlign: 'center',
          padding: '2.5rem 2rem',
          borderRadius: '1rem',
          background: 'var(--color-bg-2)',
          border: '1px solid var(--color-border, rgba(255, 255, 255, 0.08))',
          boxShadow: '0 18px 40px rgba(0, 0, 0, 0.12)',
        }}
      >
        <h1 id="internal-route-placeholder-title">Espacio no disponible</h1>
        <p style={{ margin: '1rem 0 1.75rem' }}>
          Esta vista no está disponible públicamente.
        </p>
        <Link to="/" className="hero-button">
          Volver al inicio
        </Link>
      </div>
    </section>
  );
}

export default InternalRoutePlaceholder;
