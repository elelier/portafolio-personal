import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import '../styles/components/QuoteCard.css';

const statusIcons = {
  'abierta': '🟢',
  'cerrada': '🔴',
  'aprobada': '✅',
  'en revision': '🟡'
};

const content = {
  es: {
    delivery: 'Tiempo de entrega',
    created: 'Creada',
    expires: 'Expira',
    expiresSoon: 'Expira pronto',
    expiredLabel: 'Expirada',
    expiredAgo: (d) => `Expiró hace ${d} días`,
    expiresToday: 'Expira hoy',
    expiresTomorrow: 'Expira mañana',
    expiresIn: (d) => `Expira en ${d} días`,
    viewProgress: 'Ver avance',
    viewFullQuote: 'Ver cotización completa',
    viewProject: 'Ver proyecto',
    documentAlt: 'Ver documento completo de'
  },
  en: {
    delivery: 'Delivery time',
    created: 'Created',
    expires: 'Expires',
    expiresSoon: 'Expires soon',
    expiredLabel: 'Expired',
    expiredAgo: (d) => `Expired ${d} days ago`,
    expiresToday: 'Expires today',
    expiresTomorrow: 'Expires tomorrow',
    expiresIn: (d) => `Expires in ${d} days`,
    viewProgress: 'View progress',
    viewFullQuote: 'View full quote',
    viewProject: 'View project',
    documentAlt: 'View full document of'
  }
};

const QuoteCard = ({ quote }) => {
  const { language } = useLanguage();
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
        'en revision': 'En Revisión'
      },
      en: {
        abierta: 'Open',
        cerrada: 'Closed',
        aprobada: 'Approved',
        'en revision': 'In Review'
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
    if (['aprobada', 'en revision'].includes(quote.estado)) {
      return content[language].viewProgress;
    }
    if (quote.estado === 'abierta') {
      return content[language].viewFullQuote;
    }
    if (quote.estado === 'cerrada') {
      return content[language].viewProject;
    }
    return content[language].viewFullQuote;
  };

  return (
    <div className="quote-card" data-status={quote.estado}>
      <div className="quote-header">
        <span className="quote-id">{quote.id}</span>
        <span className={`quote-status-badge ${quote.estado}`} data-status={quote.estado}>
          {statusIcons[quote.estado]} {getStatusText(quote.estado)}
        </span>
      </div>
      
      <h4 className="quote-title">{quote.titulo}</h4>
      {quote.resumen && (
        <p className="quote-summary">{quote.resumen}</p>
      )}
      <div className="quote-amount">{quote.monto}</div>
      
      <div className="quote-info-grid">
        {quote.tiempoEntrega && (
          <div className="quote-info-item delivery">
            <span className="quote-info-label">{content[language].delivery}</span>
            <span className="quote-info-value">{quote.tiempoEntrega}</span>
          </div>
        )}

        {quote.fechaExpiracion && (
          <div className={`quote-info-item expiration ${isUrgent || isExpired ? 'urgent' : ''}`}>
            <span className="quote-info-label">
              {isExpired
                ? content[language].expiredLabel
                : isUrgent
                ? content[language].expiresSoon
                : content[language].expires}
            </span>
            <span className="quote-info-value">{getExpirationText()}</span>
          </div>
        )}

        {!quote.tiempoEntrega && quote.fechaCreacion && (
          <div className="quote-info-item creation">
            <span className="quote-info-label">{content[language].created}</span>
            <span className="quote-info-value">{formatDate(quote.fechaCreacion)}</span>
          </div>
        )}
      </div>

      {quote.incluidos && quote.incluidos.length > 0 && (
        <ul className="quote-items">
          {quote.incluidos.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      )}
      
      {quote.documento && (
        <a
          href={`/cotizacion/${quote.documento}`}
          className="quote-link"
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${content[language].documentAlt} ${quote.titulo}`}
        >
          📄 {getCtaText()}
        </a>
      )}
    </div>
  );
};

export default QuoteCard;
