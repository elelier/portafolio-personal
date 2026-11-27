import React, { useRef } from 'react';
import SwipeDots from './SwipeDots';
import '../styles/components/CasosEstudio.css';
import { useLanguage } from '../contexts/LanguageContext';
import { scrollIntoViewWithMotionPreference } from './utils/generalUtils';
import { blogPath } from '../data/blogPosts';
import arqidiaPreview from '../assets/images/casos-arqidia-preview.jpg';
import oneClicTripPreview from '../assets/images/casos-oneclictrip-preview.jpg';
import miRanchoPreview from '../assets/images/casos-mirancho-preview.jpg';
import sevaPreview from '../assets/images/casos-seva-preview.jpg';
import mtyRespiraPreview from '../assets/images/casos-mtyrespira-preview.jpg';

const MIRANCHO_URL = 'https://mirancho.elelier.com/';
const MIRANCHO_ARTICLE_SLUG = 'app-rancho-de-mi-papa';
const SEVA_URL = 'https://seva.elelier.com/';
const SEVA_ARTICLE_SLUG = 'vender-mis-cosas-con-mi-propia-app';
const MTYRESPIRA_URL = 'https://mtyrespira.elelier.com/';

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
        category: 'Ganadería',
        title: 'MiRancho',
        kind: 'own',
        status: 'En uso',
        preview: miRanchoPreview,
        previewAlt: 'Pantallas de la app MiRancho sobre una foto de un corral',
        challenge: 'El rancho llevaba todo en libreta y memoria.',
        tags: ['Funciona sin señal', 'Letra grande', 'Fotos para compartir'],
        result: 'El ranchero registra y comparte su hato desde el corral.',
        linkText: 'Probar la app',
        articleText: 'Leer artículo',
        articleSlug: MIRANCHO_ARTICLE_SLUG,
        url: MIRANCHO_URL
      },
      {
        category: 'Mudanza',
        title: 'SeVa',
        kind: 'own',
        status: 'Piloto',
        preview: sevaPreview,
        previewAlt: "Pantallas de SeVa: el catálogo privado de un invitado y la ficha de un objeto con los botones Me interesa, Preguntar y Apartar",
        challenge: 'Vender, regalar y apartar cosas por la mudanza.',
        tags: ['Catálogo por invitación', 'Apartados', 'Ventas y entregas'],
        result: 'Amigos apartan desde el celular y yo sé qué falta entregar.',
        linkText: 'Probar la app',
        articleText: 'Leer artículo',
        articleSlug: SEVA_ARTICLE_SLUG,
        url: SEVA_URL
      },
      {
        category: 'Ciudad',
        title: 'MonterreyRespira',
        kind: 'own',
        status: 'Pública',
        preview: mtyRespiraPreview,
        previewAlt: 'Pantalla de MonterreyRespira con la lectura de calidad del aire de Monterrey, su AQI y el clima de contexto',
        challenge: 'Saber cómo está el aire de tu municipio sin pelearte con el mapa oficial.',
        tags: ['Lectura por municipio', 'Mapa metropolitano', 'Historial'],
        result: 'Cualquiera consulta el aire de su zona desde el celular.',
        linkText: 'Probar la app',
        url: MTYRESPIRA_URL
      },
      {
        category: 'Arquitectura',
        title: 'Arqidia',
        kind: 'client',
        status: 'Cliente',
        preview: arqidiaPreview,
        previewAlt: 'Preview visual del sitio Arqidia',
        challenge: 'Ganar visibilidad y organizar su oferta digital.',
        tags: ['Sitio a medida', 'SEO técnico', 'Analítica'],
        result: 'Presencia digital sólida y flujo de consultas.',
        linkText: 'Ver proyecto',
        url: 'https://arqidia.mx/'
      },
      {
        category: 'Viajes a medida',
        title: 'OneClicTrip',
        kind: 'client',
        status: 'Cliente',
        preview: oneClicTripPreview,
        previewAlt: 'Preview visual del sitio OneClicTrip',
        challenge: 'Cotizaciones y pagos dispersos sin control.',
        tags: ['Plataforma a medida', 'WhatsApp', 'Mercado Pago'],
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
        category: 'Livestock',
        title: 'MiRancho',
        kind: 'own',
        status: 'In use',
        preview: miRanchoPreview,
        previewAlt: 'MiRancho app screens over a photo of a corral',
        challenge: 'The ranch kept everything in a notebook and in memory.',
        tags: ['Works offline', 'Large type', 'Shareable photos'],
        result: 'The rancher records and shares the herd right from the corral.',
        linkText: 'Try the app',
        articleText: 'Read the article',
        articleSlug: MIRANCHO_ARTICLE_SLUG,
        url: MIRANCHO_URL
      },
      {
        category: 'Moving',
        title: 'SeVa',
        kind: 'own',
        status: 'Pilot',
        preview: sevaPreview,
        previewAlt: "SeVa screens: a guest's private catalog and an item card with the I'm interested, Ask and Reserve buttons",
        challenge: 'Selling, gifting and reserving our things before the move.',
        tags: ['Invite-only catalog', 'Holds', 'Sales and handoffs'],
        result: "Friends reserve from their phones; I know what's left to hand over.",
        linkText: 'Try the app',
        articleText: 'Read the article',
        articleSlug: SEVA_ARTICLE_SLUG,
        url: SEVA_URL
      },
      {
        category: 'City',
        title: 'MonterreyRespira',
        kind: 'own',
        status: 'Public',
        preview: mtyRespiraPreview,
        previewAlt: 'MonterreyRespira screen showing the air quality reading for Monterrey, its AQI and the weather context',
        challenge: 'Knowing how clean the air is where you live without fighting the official map.',
        tags: ['By municipality', 'Metro map', 'History'],
        result: 'Anyone can check the air in their area from their phone.',
        linkText: 'Try the app',
        url: MTYRESPIRA_URL
      },
      {
        category: 'Architecture',
        title: 'Arqidia',
        kind: 'client',
        status: 'Client',
        preview: arqidiaPreview,
        previewAlt: 'Preview visual del sitio Arqidia',
        challenge: 'Gain visibility and organize its digital offer.',
        tags: ['Custom website', 'Technical SEO', 'Analytics'],
        result: 'A solid digital presence and clearer inquiry flow.',
        linkText: 'View project',
        url: 'https://arqidia.mx/'
      },
      {
        category: 'Custom travel',
        title: 'OneClicTrip',
        kind: 'client',
        status: 'Client',
        preview: oneClicTripPreview,
        previewAlt: 'Preview visual del sitio OneClicTrip',
        challenge: 'Quotes and payments scattered without control.',
        tags: ['Custom platform', 'WhatsApp', 'Mercado Pago'],
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
        category: 'Pecuária',
        title: 'MiRancho',
        kind: 'own',
        status: 'Em uso',
        preview: miRanchoPreview,
        previewAlt: 'Telas do app MiRancho sobre uma foto de um curral',
        challenge: 'O rancho controlava tudo em caderno e de memória.',
        tags: ['Funciona sem sinal', 'Letra grande', 'Fotos para compartilhar'],
        result: 'O pecuarista registra e compartilha o rebanho direto do curral.',
        linkText: 'Testar o app',
        articleText: 'Ler artigo',
        articleSlug: MIRANCHO_ARTICLE_SLUG,
        url: MIRANCHO_URL
      },
      {
        category: 'Mudança',
        title: 'SeVa',
        kind: 'own',
        status: 'Piloto',
        preview: sevaPreview,
        previewAlt: "Telas do SeVa: o catálogo privado de um convidado e a ficha de um objeto com os botões Tenho interesse, Perguntar e Reservar",
        challenge: 'Vender, doar e reservar coisas na mudança.',
        tags: ['Catálogo por convite', 'Reservas', 'Vendas e entregas'],
        result: 'Amigos reservam pelo celular e eu sei o que falta entregar.',
        linkText: 'Testar o app',
        articleText: 'Ler artigo',
        articleSlug: SEVA_ARTICLE_SLUG,
        url: SEVA_URL
      },
      {
        category: 'Cidade',
        title: 'MonterreyRespira',
        kind: 'own',
        status: 'Público',
        preview: mtyRespiraPreview,
        previewAlt: 'Tela do MonterreyRespira com a leitura da qualidade do ar de Monterrey, o AQI e o clima de contexto',
        challenge: 'Saber como está o ar do seu município sem brigar com o mapa oficial.',
        tags: ['Por município', 'Mapa metropolitano', 'Histórico'],
        result: 'Qualquer pessoa consulta o ar da sua região pelo celular.',
        linkText: 'Testar o app',
        url: MTYRESPIRA_URL
      },
      {
        category: 'Arquitetura',
        title: 'Arqidia',
        kind: 'client',
        status: 'Cliente',
        preview: arqidiaPreview,
        previewAlt: 'Prévia visual do site da Arqidia',
        challenge: 'Ganhar visibilidade e organizar sua oferta digital.',
        tags: ['Site sob medida', 'SEO técnico', 'Análise de dados'],
        result: 'Presença digital estruturada e fluxo de contatos mais claro.',
        linkText: 'Ver projeto',
        url: 'https://arqidia.mx/'
      },
      {
        category: 'Viagens personalizadas',
        title: 'OneClicTrip',
        kind: 'client',
        status: 'Cliente',
        preview: oneClicTripPreview,
        previewAlt: 'Prévia visual do site OneClicTrip',
        challenge: 'Orçamentos e pagamentos dispersos, sem controle centralizado.',
        tags: ['Plataforma sob medida', 'WhatsApp', 'Mercado Pago'],
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
          <article className={`caso-card caso-card--${caseStudy.kind}`} data-case={caseStudy.title.toLowerCase()} key={caseStudy.title}>
            <div className="caso-card__preview">
              <img src={caseStudy.preview} alt={caseStudy.previewAlt} loading="lazy" />
            </div>
            <div className="caso-card__body">
              <p className="caso-card__meta">
                <span className="caso-card__category">{caseStudy.category}</span>
                <span className={`caso-card__status caso-card__status--${caseStudy.kind}`}>{caseStudy.status}</span>
              </p>
              <div className="caso-card__title-row">
                <h3>{caseStudy.title}</h3>
              </div>
              <p className="caso-card__result">
                <span className="caso-card__sr-only">{t.labels.result}: </span>
                {caseStudy.result}
              </p>
              <p className="caso-card__challenge"><strong>{t.labels.challenge}:</strong> {caseStudy.challenge}</p>
              <ul className="caso-card__tags" aria-label={t.labels.built}>
                {caseStudy.tags.map((tag) => <li key={tag}>{tag}</li>)}
              </ul>
              <div className="caso-card__links">
                <a href={caseStudy.url} target="_blank" rel="noopener noreferrer" className="caso-card__link">
                  {caseStudy.linkText}
                </a>
                {caseStudy.articleSlug && (
                  <a href={blogPath(language, caseStudy.articleSlug)} className="caso-card__link caso-card__link--article">
                    {caseStudy.articleText}
                  </a>
                )}
              </div>
            </div>
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
