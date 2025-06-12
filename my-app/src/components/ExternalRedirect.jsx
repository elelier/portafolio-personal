import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import '../styles/components/HeroBanner.css';

const EXTERNAL_URL_MAP = {
  '00132': 'https://www.canva.com/design/DAGcZPIh0jE/MXeJcVMjya5LRX9sp7cocw/view?utm_content=DAGcZPIh0jE&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=hb4992d367b',
  'mockup': 'https://staging.arqidia.mx/',
  '00133': 'https://www.canva.com/design/DAGn0jLRM2k/62nYjyNV7C8q6g2h_ekZ2Q/view',
  '00134': 'https://www.canva.com/design/DAGn8_3MaeA/jDuD68zakM740t7Rhv7gFQ/view',
  '00135': 'https://www.canva.com/design/DAGo4p8xR1M/9kH2vP6Lm3NqT8wF5jA2oQ/view',
  '00136': 'https://www.canva.com/design/DAGo7n2wK9P/2rL5bC8mN7fG6tU4hK9sXv/view'
};

const translations = {
  es: {
    loading: {
      title: 'Preparando su documento',
      description: 'Optimizando la experiencia de visualización...'
    },
    notFound: {
      title: 'Documento no disponible',
      description: 'El recurso solicitado no se encuentra en este momento. Verifique el enlace o contacte soporte.'
    },
    success: {
      title: 'Documento de Cotización',
      description: 'Haga clic para acceder al documento detallado de su cotización.',
      buttonText: 'Abrir Documento'
    }
  },
  en: {
    loading: {
      title: 'Preparing Your Document',
      description: 'Optimizing viewing experience...'
    },
    notFound: {
      title: 'Document Unavailable',
      description: 'The requested resource is not available at this time. Please verify the link or contact support.'
    },
    success: {
      title: 'Quotation Document',
      description: 'Click to access the detailed quotation document.',
      buttonText: 'Open Document'
    }
  }
};

const ExternalRedirect = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const { language } = useLanguage();

  const t = (key) => translations[language][key];

  useEffect(() => {
    const url = EXTERNAL_URL_MAP[id];
    if (url) {
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
          <h1 className="hero-title">{t('loading').title}</h1>
          <p>{t('loading').description}</p>
          <div className="spinner" style={{ 
            margin: '2rem auto', 
            borderTop: '4px solid var(--color-primary)' 
          }}></div>
        </div>
      </div>
    );
  }

  const targetUrl = EXTERNAL_URL_MAP[id];

  if (!targetUrl) {
    return (
      <div className="hero-banner">
        <div className="info-container">
          <h1 className="hero-title">{t('notFound').title}</h1>
          <p>{t('notFound').description}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="hero-banner">
      <div className="info-container">
        <h1 className="hero-title">{t('success').title}</h1>
        <p style={{ marginBottom: '2rem' }}>{t('success').description}</p>
        <a 
          href={targetUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="hero-button"
          style={{ 
            marginTop: '2rem', 
            textDecoration: 'none' 
          }}
        >
          {t('success').buttonText} →
        </a>
      </div>
    </div>
  );
};

export default ExternalRedirect;