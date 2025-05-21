import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import '../styles/components/HeroBanner.css';

const URL_MAPS = {
  cotizacion: {
    '00132': 'https://www.canva.com/design/DAGcZPIh0jE/MXeJcVMjya5LRX9sp7cocw/view',
    '00133': 'https://www.canva.com/design/DAGn0jLRM2k/62nYjyNV7C8q6g2h_ekZ2Q/view',
    '00134': 'https://www.canva.com/design/DAGn8_3MaeA/jDuD68zakM740t7Rhv7gFQ/view'
  },
  mockup: {
    '00132': 'https://d1shbod9k202nu.cloudfront.net/mockup-1',
    '00133': 'https://d1shbod9k202nu.cloudfront.net/mockup-2'
  },
  proyecto: {
    'ecommerce': 'https://ejemplo.com/proyecto-ecommerce',
    'ai': 'https://ejemplo.com/proyecto-ai'
  }
};

const translations = {
  es: {
    types: {
      cotizacion: {
        title: 'Documento de Cotización',
        description: 'Acceda al documento detallado de su cotización.'
      },
      mockup: {
        title: 'Vista Previa del Diseño',
        description: 'Visualice el mockup de su proyecto.'
      },
      proyecto: {
        title: 'Detalles del Proyecto',
        description: 'Información detallada del proyecto.'
      }
    },
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

const ExternalRedirect = ({ type = 'cotizacion' }) => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const { language } = useLanguage();

  const t = (key) => translations[language][key];
  const typeInfo = t('types')[type];

  useEffect(() => {
    const url = URL_MAPS[type]?.[id];
    if (url) {
      setIsLoading(false);
    } else {
      console.error(`URL no encontrada para tipo: ${type}, id: ${id}`);
      setIsLoading(false);
    }
  }, [id, type]);

  const getTargetUrl = () => URL_MAPS[type]?.[id];

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

  const targetUrl = getTargetUrl();

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