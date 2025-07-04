import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import '../styles/components/QuoteCard.css';

export const isQuoteExpired = (quote) => {
  if (!quote.fechaExpiracion) return false;
  return new Date(quote.fechaExpiracion) < new Date();
};

export const getQuoteCategory = (quote) => {
  if (isQuoteExpired(quote)) {
    return 'Cotizaciones expiradas';
  }
  const closed = quote.estado === 'aprobada' || quote.estado === 'cerrada';
  if (!closed) {
    return 'Cotizaciones Activas';
  }
  return null;
};

const content = {
  es: {
    delivery: 'Entrega',
    created: 'Creada',
    expires: 'Expira',
    expiresSoon: 'Expira pronto',
    expiredLabel: 'Expirada',
    expiredAgo: (d) => `Hace ${d}d`,
    expiresToday: 'Hoy',
    expiresTomorrow: 'Mañana',
    expiresIn: (d) => `${d}d`,
    viewProgress: 'Ver avance',
    viewFullQuote: 'Ver cotización',
    viewProject: 'Ver proyecto',
    documentAlt: 'Ver documento de',
    viewQuote: 'Ver Cotización',
    viewProjectProgress: 'Ver Proyecto'
  },
  en: {
    delivery: 'Delivery',
    created: 'Created',
    expires: 'Expires',
    expiresSoon: 'Expires soon',
    expiredLabel: 'Expired',
    expiredAgo: (d) => `${d}d ago`,
    expiresToday: 'Today',
    expiresTomorrow: 'Tomorrow',
    expiresIn: (d) => `${d}d`,
    viewProgress: 'View progress',
    viewFullQuote: 'View quote',
    viewProject: 'View project',
    documentAlt: 'View document of',
    viewQuote: 'View Quote',
    viewProjectProgress: 'View Project'
  }
};

const QuoteCard = ({ quote, recentUpdates = [], onNotificationClick }) => {
  const { language } = useLanguage();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Helper para formatear fechas
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  // Helper para calcular días restantes
  const getDaysUntilExpiration = (dateString) => {
    const today = new Date();
    const expiration = new Date(dateString);
    const diffTime = expiration - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const daysUntilExpiration = quote.fechaExpiracion
    ? getDaysUntilExpiration(quote.fechaExpiracion)
    : null;
  const isUrgent =
    daysUntilExpiration !== null && daysUntilExpiration <= 7 && daysUntilExpiration > 0;
  const isExpired = daysUntilExpiration !== null && daysUntilExpiration < 0;

  const getStatusText = (status) => {
    const statusMap = {
      es: {
        abierta: 'Abierta',
        cerrada: 'Cerrada',
        aprobada: 'Aprobada',
        'en revision': 'Activa'
      },
      en: {
        abierta: 'Open',
        cerrada: 'Closed',
        aprobada: 'Approved',
        'en revision': 'Active'
      }
    };
    return statusMap[language][status] || status;
  };

  const getExpirationText = () => {
    if (!quote.fechaExpiracion) return null;
    if (isExpired) {
      return content[language].expiredAgo(Math.abs(daysUntilExpiration));
    } else if (daysUntilExpiration === 0) {
      return content[language].expiresToday;
    } else if (daysUntilExpiration === 1) {
      return content[language].expiresTomorrow;
    } else if (daysUntilExpiration <= 7) {
      return content[language].expiresIn(daysUntilExpiration);
    } else {
      return formatDate(quote.fechaExpiracion);
    }
  };

  const getCtaText = () => {
    // Si hay proyectoUrl, significa que hay un proyecto en progreso
    if (quote.proyectoUrl && ['aprobada', 'en revision'].includes(quote.estado)) {
      return content[language].viewProgress;
    }
    // Si no hay proyecto pero está aprobada, mostrar como proyecto cerrado
    if (quote.estado === 'aprobada') {
      return content[language].viewProject;
    }
    // Para cotizaciones en revisión sin proyecto, mostrar como cotización
    if (quote.estado === 'en revision') {
      return content[language].viewFullQuote;
    }
    if (quote.estado === 'abierta') {
      return content[language].viewFullQuote;
    }
    if (quote.estado === 'cerrada') {
      return content[language].viewProject;
    }
    return content[language].viewFullQuote;
  };

  // Diseño moderno tipo Linear/Jira
  return (
    <div 
      className={`quote-card ${isExpired ? 'expired' : ''}`} 
      data-status={quote.estado}
      data-urgent={isUrgent}
      data-expired={isExpired}
    >
      <div className="quote-header">
        <div className="quote-left">
          <span className="quote-id">{quote.id}</span>
          <div className={`quote-status-indicator ${quote.estado}`} data-status={quote.estado}></div>
        </div>
        <div className="quote-header-right">
          <span className={`quote-status-badge ${quote.estado}`} data-status={quote.estado}>
            {getStatusText(quote.estado)}
          </span>
          <div 
            className={`quote-notification-indicator ${recentUpdates.length === 0 ? 'empty' : ''}`}
            onClick={(e) => {
              e.stopPropagation();
              if (onNotificationClick) onNotificationClick();
            }}
          >
            <span className="quote-notification-icon">🔔</span>
            {recentUpdates.length > 0 && (
              <span className="quote-notification-count">{recentUpdates.length}</span>
            )}
          </div>
        </div>
      </div>
      
      <div className="quote-main-content">
        <div className="quote-title-section">
          <h4 className="quote-title">{quote.titulo}</h4>
          {quote.resumen && !isMobile && (
            <p className="quote-summary">{quote.resumen}</p>
          )}
        </div>
      </div>

      {(quote.fechaExpiracion || quote.tiempoEntrega) && (
        <div className="quote-meta">
          {quote.tiempoEntrega && (
            <div className="quote-meta-item">
              <span>{content[language].delivery}:</span>
              <span>{quote.tiempoEntrega}</span>
            </div>
          )}
          {quote.fechaExpiracion && (
            <div className="quote-meta-item">
              <span>{isExpired ? content[language].expiredLabel : content[language].expires}:</span>
              <span>{getExpirationText()}</span>
            </div>
          )}
        </div>
      )}
      
      <div className="quote-bottom-section">
        <div className="quote-amount">{quote.monto}</div>
        <div className="quote-actions-buttons">
          {quote.url && (
            <a
              href={quote.url}
              className={`quote-link ${quote.proyectoUrl ? 'quote-link-secondary' : ''}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${content[language].documentAlt} ${quote.titulo}`}
            >
              {quote.proyectoUrl ? content[language].viewQuote : getCtaText()}
            </a>
          )}
          {quote.proyectoUrl && (
            <a
              href={quote.proyectoUrl}
              className="quote-link quote-link-primary"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${content[language].viewProjectProgress} ${quote.titulo}`}
            >
              {content[language].viewProjectProgress}
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuoteCard;
