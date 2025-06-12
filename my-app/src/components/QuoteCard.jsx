import React from 'react';
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

const statusIcons = {
  'abierta': '🟢',
  'cerrada': '🔴',
  'aprobada': '✅',
  'en revision': '🟡'
};

const QuoteCard = ({ quote }) => {
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

  const daysUntilExpiration = quote.fechaExpiracion ? getDaysUntilExpiration(quote.fechaExpiracion) : null;
  const isUrgent = daysUntilExpiration !== null && daysUntilExpiration <= 7 && daysUntilExpiration > 0;
  const isExpired = daysUntilExpiration !== null && daysUntilExpiration < 0;

  const getStatusText = (status) => {
    const statusMap = {
      'abierta': 'Abierta',
      'cerrada': 'Cerrada',
      'aprobada': 'Aprobada',
      'en revision': 'En Revisión'
    };
    return statusMap[status] || status;
  };

  const getExpirationText = () => {
    if (!quote.fechaExpiracion) return null;
    
    if (isExpired) {
      return `Expiró hace ${Math.abs(daysUntilExpiration)} días`;
    } else if (daysUntilExpiration === 0) {
      return 'Expira hoy';
    } else if (daysUntilExpiration === 1) {
      return 'Expira mañana';
    } else if (daysUntilExpiration <= 7) {
      return `Expira en ${daysUntilExpiration} días`;
    } else {
      return formatDate(quote.fechaExpiracion);
    }
  };

  return (
    <div className={`quote-card ${isExpired ? 'expired' : ''}`} data-status={quote.estado}>
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
        <div className="quote-info-item delivery">
          <span className="quote-info-label">Tiempo de entrega</span>
          <span className="quote-info-value">{quote.tiempoEntrega}</span>
        </div>
        
        {quote.fechaExpiracion && (
          <div className={`quote-info-item expiration ${isUrgent || isExpired ? 'urgent' : ''}`}>
            <span className="quote-info-label">
              {isExpired ? 'Expirada' : isUrgent ? 'Expira pronto' : 'Expira'}
            </span>
            <span className="quote-info-value">{getExpirationText()}</span>
          </div>
        )}
        
        {quote.fechaCreacion && (
          <div className="quote-info-item creation">
            <span className="quote-info-label">Creada</span>
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
          aria-label={`Ver documento completo de ${quote.titulo}`}
        >
          📄 Ver Documento Completo
        </a>
      )}
    </div>
  );
};

export default QuoteCard;
