import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/components/HeroBanner.css';

// Mapeo de IDs a URLs externas (fuera del componente)
const EXTERNAL_URL_MAP = {
  '00132': 'https://www.canva.com/design/DAGcZPIh0jE/MXeJcVMjya5LRX9sp7cocw/view?utm_content=DAGcZPIh0jE&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=hb4992d367b'
  // Puedes agregar más mapeos aquí
};

const ExternalRedirect = () => {
  const { id } = useParams();
  const [targetUrl, setTargetUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const url = EXTERNAL_URL_MAP[id];
    if (url) {
      setTargetUrl(url);
      setIsLoading(false);
    } else {
      console.error('URL no encontrada');
      setIsLoading(false);
    }
  }, [id]);

  if (isLoading) {
    return (
      <div className="hero-banner">
        <div className="info-container">
          <h1 className="hero-title">Cargando...</h1>
          <p>Por favor, espere un momento.</p>
        </div>
      </div>
    );
  }

  if (!targetUrl) {
    return (
      <div className="hero-banner">
        <div className="info-container">
          <h1 className="hero-title">Documento no encontrado</h1>
          <p>Lo sentimos, el documento solicitado no está disponible.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="hero-banner">
      <div className="info-container">
        <h1 className="hero-title">Documento de Cotización</h1>
        <p>Haz clic en el botón para abrir el documento.</p>
        <a 
          href={targetUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="btn btn-primary"
          style={{
            marginTop: '20px',
            display: 'inline-block',
            padding: '10px 20px',
            backgroundColor: 'var(--color-primary)',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '5px',
            transition: 'background-color 0.3s ease'
          }}
        >
          Abrir Documento
        </a>
      </div>
    </div>
  );
};

export default ExternalRedirect;