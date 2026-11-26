import React, { useRef } from 'react';
import SwipeDots from './SwipeDots';
import '../styles/components/CasosEstudio.css';
import { useLanguage } from '../contexts/LanguageContext';
import { scrollIntoViewWithMotionPreference } from './utils/generalUtils';
import arqidiaPreview from '../assets/images/casos-arqidia-preview.jpg';
import oneClicTripPreview from '../assets/images/casos-oneclictrip-preview.jpg';
import miRanchoPreview from '../assets/images/casos-mirancho-preview.jpg';

const MIRANCHO_URL = 'https://mirancho.elelier.com/';

const content = {
  es: {
    eyebrow: 'Casos reales',
    title: 'De un reto concreto a algo que ya funciona',
    description: 'Estrategia, tecnología y operación alineadas para generar resultados medibles.',
    cta: 'Cuéntame qué quieres resolver →',
    labels: {
      challenge: 'Reto',
      built: 'Construcción',
      result: 'Resultado'
    },
    cases: [
      {
        category: 'Ganadería · App móvil propia',
        title: 'MiRancho360',
        preview: miRanchoPreview,
        previewAlt: 'Pantallas de la app MiRancho360 sobre una foto de un corral',
        challenge: 'El rancho llevaba todo en libreta y memoria.',
        built: 'App móvil que funciona sin señal, con letra e iconos grandes, galería y fotos para compartir.',
        result: 'El ranchero registra y comparte su hato desde el corral.',
        linkText: 'Probar la app',
        url: MIRANCHO_URL
      },
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
    cta: 'Tell me what you want to solve →',
    labels: {
      challenge: 'Challenge',
      built: 'Build',
      result: 'Result'
    },
    cases: [
      {
        category: 'Livestock · In-house mobile app',
        title: 'MiRancho360',
        preview: miRanchoPreview,
        previewAlt: 'MiRancho360 app screens over a photo of a corral',
        challenge: 'The ranch kept everything in a notebook and in memory.',
        built: 'Mobile app that works offline, with large type and icons, a gallery and shareable photos.',
        result: 'The rancher records and shares the herd right from the corral.',
        linkText: 'Try the app',
        url: MIRANCHO_URL
      },
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
  },
  'pt-br': {
    eyebrow: 'Casos reais',
    title: 'De um desafio concreto a algo que funciona',
    description: 'Estratégia, tecnologia e operações conectadas para gerar resultados mensuráveis.',
    cta: 'Conte qual desafio você quer resolver →',
    labels: { challenge: 'Desafio', built: 'Solução', result: 'Resultado' },
    cases: [
      {
        category: 'Pecuária · App móvel próprio',
        title: 'MiRancho360',
        preview: miRanchoPreview,
        previewAlt: 'Telas do app MiRancho360 sobre uma foto de um curral',
        challenge: 'O rancho controlava tudo em caderno e de memória.',
        built: 'App móvel que funciona sem sinal, com letras e ícones grandes, galeria e fotos para compartilhar.',
        result: 'O pecuarista registra e compartilha o rebanho direto do curral.',
        linkText: 'Testar o app',
        url: MIRANCHO_URL
      },
      {
        category: 'Arquitetura · Presença e captação',
        title: 'Arqidia',
        preview: arqidiaPreview,
        previewAlt: 'Prévia visual do site da Arqidia',
        challenge: 'Ganhar visibilidade e organizar sua oferta digital.',
        built: 'Site sob medida, portfólio, SEO técnico e análise de dados.',
        result: 'Presença digital estruturada e fluxo de contatos mais claro.',
        linkText: 'Ver projeto',
        url: 'https://arqidia.mx/'
      },
      {
        category: 'Viagens personalizadas · Captação e operações',
        title: 'OneClicTrip',
        preview: oneClicTripPreview,
        previewAlt: 'Prévia visual do site OneClicTrip',
        challenge: 'Orçamentos e pagamentos dispersos, sem controle centralizado.',
        built: 'Plataforma sob medida com integração ao WhatsApp e Mercado Pago.',
        result: 'Operação centralizada e vendas efetivas.',
        linkText: 'Ver projeto',
        url: 'https://www.oneclictrip.com/'
      }
    ]
  }
};

function CasosEstudio({ style }) {
  const { language } = useLanguage();
  const t = content[language] || content.es;
  const gridRef = useRef(null);

  const scrollToContacto = () => {
    scrollIntoViewWithMotionPreference(document.getElementById('contacto'));
  };

  return (
    <section id="casos-reales" className="casos-estudio" style={style}>
      <div className="casos-estudio__header">
        <span>{t.eyebrow}</span>
        <h2>{t.title}</h2>
        <p>{t.description}</p>
      </div>
      <div className="casos-estudio__grid" ref={gridRef}>
        {t.cases.map((caseStudy) => (
          <article className="caso-card" key={caseStudy.title}>
            <div className="caso-card__preview">
              <img src={caseStudy.preview} alt={caseStudy.previewAlt} loading="lazy" />
            </div>
            <p className="caso-card__category">{caseStudy.category}</p>
            <div className="caso-card__title-row">
              <h3>{caseStudy.title}</h3>
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
      <SwipeDots targetRef={gridRef} count={t.cases.length} />
      <button className="casos-estudio__cta" onClick={scrollToContacto}>
        {t.cta}
      </button>
    </section>
  );
}

export default CasosEstudio;
