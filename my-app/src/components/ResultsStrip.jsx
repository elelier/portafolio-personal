import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import '../styles/components/ResultsStrip.css';

const results = {
  es: [
    { value: '99.8%', label: 'precisión de inventario' },
    { value: '+144%', label: 'crecimiento en marketplace' },
    { value: '−50%', label: 'reclamos y cancelaciones' },
    { value: '+10', label: 'años entre operación y producto' },
  ],
  en: [
    { value: '99.8%', label: 'inventory accuracy' },
    { value: '+144%', label: 'marketplace growth' },
    { value: '−50%', label: 'claims and cancellations' },
    { value: '+10', label: 'years across operations and product' },
  ],
};

function ResultsStrip() {
  const { language } = useLanguage();
  const items = results[language] || results.es;

  return (
    <section id="resultados" className="results-strip" aria-labelledby="results-title">
      <div className="results-strip__intro">
        <span>{language === 'es' ? 'EVIDENCIA' : 'EVIDENCE'}</span>
        <h2 id="results-title">{language === 'es' ? 'Resultados que se pueden ver' : 'Outcomes you can see'}</h2>
      </div>
      <div className="results-strip__grid">
        {items.map((item) => (
          <div className="result-stat" key={item.label}>
            <strong>{item.value}</strong>
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ResultsStrip;

