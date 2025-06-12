import React from 'react';
import '../styles/components/QuoteCard.css';

const statusIcons = {
  'abierta': '🟢',
  'en revision': '🟡',
  'cerrada': '🔴',
  'aprobada': '✅'
};

const QuoteCard = ({ quote }) => {
  const icon = statusIcons[quote.estado] || '';
  return (
    <div className="quote-card">
      <div className="quote-header">
        <span className="quote-id">{quote.id}</span>
        <span className="quote-status">{icon}</span>
      </div>
      <h4 className="quote-title">{quote.titulo}</h4>
      <p className="quote-amount">{quote.monto}</p>
      <p className="quote-time">{quote.tiempoEntrega}</p>
      <ul className="quote-items">
        {quote.incluidos && quote.incluidos.map((item, idx) => (
          <li key={idx}>{item}</li>
        ))}
      </ul>
      {quote.documento && (
        <a href={`/cotizacion/${quote.documento}`} className="quote-link" target="_blank" rel="noopener noreferrer">
          Ver Documento →
        </a>
      )}
    </div>
  );
};

export default QuoteCard;
