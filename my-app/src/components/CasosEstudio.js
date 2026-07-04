import React from 'react';
import '../styles/components/CasosEstudio.css';
import { useLanguage } from '../contexts/LanguageContext';
import arqidiaPreview from '../assets/images/casos-arqidia-preview.jpg';
import oneClicTripPreview from '../assets/images/casos-oneclictrip-preview.jpg';

const content = {
  es: {
    eyebrow: 'Casos reales',
    title: 'De un reto concreto a algo que ya funciona',
    description: 'Estrategia, tecnología y operación alineadas para generar resultados medibles.',
    cta: 'Hablemos de tu reto →',
    labels: {
      challenge: 'Reto',
      built: 'Construcción',
      result: 'Resultado'
    },
    cases: [
      {
        category: 'Arquitectura · Presencia y captación',
        title: 'Arqidia',
        preview: arqidiaPreview,
        previewAlt: 'Preview visual del sitio Arqidia',
        challenge: 'Ganar visibilidad y organizar su oferta digital.',
        built: 'Sitio web a medida, portafolio, SEO técnico y analítica.',
        result: 'Presencia digital sólida y flujo de consultas.',
        linkText: 'Ver proyecto',
        url: 'https://arqidia.mx/'
      },
      {
        category: 'Viajes a medida · Captación y operación',
        title: 'OneClicTrip',
        preview: oneClicTripPreview,
        previewAlt: 'Preview visual del sitio OneClicTrip',
        challenge: 'Cotizaciones y pagos dispersos sin control.',
        built: 'Plataforma a medida, WhatsApp y Mercado Pago integrados.',
        result: 'Operación centralizada y ventas reales.',
        linkText: 'Ver proyecto',
        url: 'https://www.oneclictrip.com/'
      }
    ]
  },
  en: {
    eyebrow: 'Real work',
    title: 'From a concrete challenge to something that works',
    description: 'Strategy, technology and operations aligned to generate measurable results.',
    cta: 'Let’s talk about your challenge →',
    labels: {
      challenge: 'Challenge',
      built: 'Build',
      result: 'Result'
    },
    cases: [
      {
        category: 'Architecture · Presence and lead generation',
        title: 'Arqidia',
        preview: arqidiaPreview,
        previewAlt: 'Preview visual del sitio Arqidia',
        challenge: 'Gain visibility and organize its digital offer.',
        built: 'Custom website, portfolio, technical SEO and analytics.',
        result: 'A solid digital presence and clearer inquiry flow.',
        linkText: 'View project',
        url: 'https://arqidia.mx/'
      },
      {
        category: 'Custom travel · Lead generation and operations',
        title: 'OneClicTrip',
        preview: oneClicTripPreview,
        previewAlt: 'Preview visual del sitio OneClicTrip',
        challenge: 'Quotes and payments scattered without control.',
        built: 'Custom platform with WhatsApp and Mercado Pago integration.',
        result: 'Centralized operations and real sales.',
        linkText: 'View project',
        url: 'https://www.oneclictrip.com/'
      }
    ]
  }
};

function CasosEstudio({ style }) {
  const { language } = useLanguage();
  const t = content[language] || content.es;

  const scrollToContacto = () => {
    document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="casos-reales" className="casos-estudio" style={style}>
      <div className="casos-estudio__header">
        <span>{t.eyebrow}</span>
        <h2>{t.title}</h2>
        <p>{t.description}</p>
      </div>
      <div className="casos-estudio__grid">
        {t.cases.map((caseStudy) => (
          <article className="caso-card" key={caseStudy.title}>
            <div className="caso-card__preview">
              <img src={caseStudy.preview} alt={caseStudy.previewAlt} loading="lazy" />
            </div>
            <p className="caso-card__category">{caseStudy.category}</p>
            <div className="caso-card__title-row">
              <h3>{caseStudy.title}</h3>
              <span aria-hidden="true">→</span>
            </div>
            <div className="caso-card__blocks">
              <p><strong>{t.labels.challenge}</strong>{caseStudy.challenge}</p>
              <p><strong>{t.labels.built}</strong>{caseStudy.built}</p>
              <p className="caso-card__result"><strong>{t.labels.result}</strong>{caseStudy.result}</p>
            </div>
            <a href={caseStudy.url} target="_blank" rel="noopener noreferrer" className="caso-card__link">
              {caseStudy.linkText}
            </a>
            {caseStudy.transparency && <p className="caso-card__transparency">{caseStudy.transparency}</p>}
          </article>
        ))}
      </div>
      <button className="casos-estudio__cta" onClick={scrollToContacto}>
        {t.cta}
      </button>
    </section>
  );
}

export default CasosEstudio;
