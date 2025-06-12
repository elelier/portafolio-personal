import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import ProjectProgress from './ProjectProgress';

const PROJECT_URL_MAP = {
  '00132': 'https://d1shbod9k202nu.cloudfront.net/',
  '00132-drive': 'https://drive.google.com/drive/folders/11N3nQ7-H2YRDgTaKSM19lLVb42mtWsaO?usp=drive_link'
};

const translations = {
  es: {
    notFound: {
      title: 'Proyecto no encontrado',
      description: 'Lo sentimos, no pudimos encontrar el proyecto que buscas.'
    },
    loading: {
      title: 'Cargando tu proyecto...',
      description: 'Estamos preparando todo para ti.'
    },
    success: {
      title: 'Tu Proyecto en Desarrollo',
      description: 'Aquí podrás ver el avance en tiempo real de tu proyecto.',
      buttonText: 'Ver Avance del Proyecto'
    }
  },
  en: {
    notFound: {
      title: 'Project not found',
      description: 'Sorry, we couldn\'t find the project you\'re looking for.'
    },
    loading: {
      title: 'Loading your project...',
      description: 'We\'re getting everything ready for you.'
    },
    success: {
      title: 'Your Project in Development',
      description: 'Here you can see your project\'s real-time progress.',
      buttonText: 'View Project Progress'
    }
  }
};

const MockupRedirect = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [showScroll, setShowScroll] = useState(true);
  const { language } = useLanguage();

  const handleScrollToProgress = () => {
    const progressSection = document.getElementById('project-progress');
    if (progressSection) {
      progressSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const t = translations[language];

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    const handleScroll = () => {
      const currentScroll = window.pageYOffset;
      setShowScroll(currentScroll < 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const getContent = () => {
    if (!PROJECT_URL_MAP[id]) {
      return {
        title: t.notFound.title,
        description: t.notFound.description,
        buttonText: ''
      };
    }

    if (isLoading) {
      return {
        title: t.loading.title,
        description: t.loading.description,
        buttonText: ''
      };
    }
    
    return {
      title: t.success.title,
      description: t.success.description,
      buttonText: t.success.buttonText
    };
  };

  const content = getContent();

  return (
    <div className="mockup-redirect-container" style={{ position: 'relative', minHeight: '100vh' }}>
      <div className="hero-banner" style={{ marginBottom: 0 }}>
        <div className="info-container">
          <h1 className="hero-title">{content.title}</h1>
          <p style={{ marginBottom: '2rem' }}>{content.description}</p>
          {/* Progreso general extra en el hero-banner */}
          <div className="overall-progress" style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
            <span style={{ fontWeight: 'bold' }}>100%</span>
            <div style={{ flex: 1, height: '10px', backgroundColor: 'var(--color-bg-2)', borderRadius: '5px', overflow: 'hidden' }}>
              <div style={{ width: '95%', height: '100%', backgroundColor: 'var(--color-primary)', borderRadius: '5px' }}></div>
            </div>
          </div>
          {!isLoading && PROJECT_URL_MAP[id] && (
            <a 
              href={PROJECT_URL_MAP[id]} 
              target="_blank" 
              rel="noopener noreferrer"
              className="hero-button"
              style={{ 
                marginTop: '2rem', 
                textDecoration: 'none' 
              }}
            >
              {content.buttonText} →
            </a>
          )}
          {isLoading && (
            <div className="spinner" style={{ 
              margin: '2rem auto', 
              borderTop: '4px solid var(--color-primary)' 
            }}></div>
          )}
        </div>
      </div>

      <div id="project-progress" style={{ 
        width: '100%',
        background: 'linear-gradient(to bottom, var(--color-bg-3), var(--color-bg))'
      }}>
        <ProjectProgress />
        {!isLoading && PROJECT_URL_MAP[id] && (
          <div className="cta-section" style={{
            background: 'var(--color-bg)',
            padding: '3rem 2rem',
            textAlign: 'center',
            borderRadius: '0 0 1rem 1rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '2rem',
            alignItems: 'center'
          }}>
            <h2 className="text-2xl font-bold" style={{ marginBottom: '2rem' }}>
              {language === 'es' 
                ? '¿Listo para ver tu proyecto en acción?' 
                : 'Ready to see your project in action?'}
            </h2>
            <p style={{ 
              fontSize: '1.2rem', 
              marginBottom: '3rem', 
              maxWidth: '600px',
              lineHeight: '1.6'
            }}>
              {language === 'es' 
                ? 'Tu proyecto está avanzando según lo planeado. Haz clic para ver los últimos cambios y el diseño actualizado.' 
                : 'Your project is progressing as planned. Click to see the latest changes and updated design.'}
            </p>
            <a 
              href={PROJECT_URL_MAP[id]} 
              target="_blank" 
              rel="noopener noreferrer"
              className="hero-button"
              style={{ 
                textDecoration: 'none',
                display: 'inline-block',
                marginTop: '1rem',
                fontSize: '1.1rem',
                padding: '1rem 2rem'
              }}
            >
              {language === 'es' 
                ? 'Ver Avance del proyecto →' 
                : 'View Project Progress →'}
            </a>
          </div>
        )}
      </div>

      {!isLoading && PROJECT_URL_MAP[id] && (
        <div 
          className={`scroll-indicator ${showScroll ? 'visible' : 'hidden'}`}
          onClick={handleScrollToProgress}
        >
          <span style={{ whiteSpace: 'nowrap' }}>
            {language === 'es' ? 'Ver detalles' : 'View details'}
          </span>
          <div className="scroll-arrow">
            <div className="scroll-arrow-icon">▼</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MockupRedirect;
