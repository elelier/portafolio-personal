import React from 'react';
import '../styles/components/CasosEstudio.css';
import { useLanguage } from '../contexts/LanguageContext';

const content = {
  es: {
    eyebrow: 'Casos reales',
    title: 'De un reto concreto a algo que ya funciona',
    description: 'Dos proyectos donde la estrategia, la tecnología y la operación se alinearon para convertir trabajo disperso en una experiencia más clara.',
    cta: 'Hablemos de tu reto →',
    labels: {
      challenge: 'El reto',
      decision: 'La decisión',
      built: 'Lo que construí',
      result: 'Resultado'
    },
    cases: [
      {
        category: 'Arquitectura · Presencia y captación',
        title: 'Arqidia',
        challenge: 'Una firma de arquitectura necesitaba una presencia digital a la altura de su trayectoria, capaz de ordenar su oferta, mostrar su portafolio y abrir conversaciones con clientes potenciales.',
        decision: 'En lugar de una plantilla genérica, construí una experiencia a medida que hace visible su forma de trabajar y facilita el siguiente paso para quien llega por primera vez.',
        built: 'Sitio web a medida, portafolio de más de 15 proyectos, páginas de servicios, SEO técnico, Search Console y analítica; un sistema visual responsivo con modo claro y oscuro.',
        result: 'Arqidia está publicado, el proyecto fue entregado y hoy cuenta con mantenimiento mensual activo.',
        linkText: 'Ver Arqidia',
        url: 'https://arqidia.mx/'
      },
      {
        category: 'Viajes a medida · Captación y operación',
        title: 'OneClicTrip',
        challenge: 'Una agencia de viajes a la medida gestionaba cotizaciones, seguimiento y pagos entre conversaciones sueltas de WhatsApp, sin un punto común para ordenar la operación.',
        decision: 'Construí una plataforma propia para dar estructura a la captación y acompañar el viaje, conservando a Ilse como la cara humana de cada decisión.',
        built: 'Sitio web, catálogo de experiencias, destinos y servicios, CRM a medida, rutas de WhatsApp e integración con Mercado Pago para centralizar presencia, captación y cobro.',
        result: 'La plataforma opera con clientes y ventas reales. Datos reportados el 4 de julio de 2026: 583 visitantes y 40 usuarios nuevos en los 30 días previos.',
        transparency: 'Transparencia: OneClicTrip es la agencia de viajes de Ilse Jasso, pareja de Elier.',
        linkText: 'Visitar OneClicTrip',
        url: 'https://www.oneclictrip.com/'
      }
    ]
  },
  en: {
    eyebrow: 'Real work',
    title: 'From a concrete challenge to something that works',
    description: 'Two projects where strategy, technology and operations came together to turn scattered work into a clearer experience.',
    cta: 'Let’s talk about your challenge →',
    labels: {
      challenge: 'Challenge',
      decision: 'Decision',
      built: 'Built',
      result: 'Result'
    },
    cases: [
      {
        category: 'Architecture · Presence and lead generation',
        title: 'Arqidia',
        challenge: 'An architecture firm needed a digital presence that reflected its track record, organized its offer, showcased its portfolio and opened better conversations with potential clients.',
        decision: 'Instead of using a generic template, I built a tailored experience that makes its way of working visible and clarifies the next step for first-time visitors.',
        built: 'A custom website, a portfolio of more than 15 projects, service pages, technical SEO, Search Console and analytics; a responsive visual system with light and dark modes.',
        result: 'Arqidia is live, the project was delivered, and it now has an active monthly maintenance plan.',
        linkText: 'View Arqidia',
        url: 'https://arqidia.mx/'
      },
      {
        category: 'Custom travel · Lead generation and operations',
        title: 'OneClicTrip',
        challenge: 'A custom travel agency handled quotes, follow-ups and payments across separate WhatsApp conversations, without a shared operational system.',
        decision: 'I built a proprietary platform to structure lead generation and support the travel-planning experience while keeping Ilse as the human face of every decision.',
        built: 'A website, experience catalog, destinations and services, a custom CRM, WhatsApp pathways and Mercado Pago integration to centralize presence, lead generation and payment.',
        result: 'The platform is operating with real clients and sales. Reported on July 4, 2026: 583 visitors and 40 new users in the preceding 30 days.',
        transparency: 'Transparency: OneClicTrip is the travel agency of Ilse Jasso, Elier’s partner.',
        linkText: 'Visit OneClicTrip',
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
            <p className="caso-card__category">{caseStudy.category}</p>
            <h3>{caseStudy.title}</h3>
            <div className="caso-card__blocks">
              <p><strong>{t.labels.challenge}</strong>{caseStudy.challenge}</p>
              <p><strong>{t.labels.decision}</strong>{caseStudy.decision}</p>
              <p><strong>{t.labels.built}</strong>{caseStudy.built}</p>
              <p className="caso-card__result"><strong>{t.labels.result}</strong>{caseStudy.result}</p>
            </div>
            {caseStudy.transparency && <p className="caso-card__transparency">{caseStudy.transparency}</p>}
            <a href={caseStudy.url} target="_blank" rel="noopener noreferrer" className="caso-card__link">
              {caseStudy.linkText}
            </a>
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
