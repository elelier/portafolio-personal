import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { scrollIntoViewWithMotionPreference } from './utils/generalUtils';
import '../styles/components/Soluciones.css';

const content = {
  es: {
    eyebrow: 'Soluciones a medida',
    title: 'Qué puedo hacer por ti',
    intro: 'No empiezo por una tecnología. Empiezo por el punto donde tu operación, tu presencia digital o tu experiencia de cliente dejó de ser simple.',
    closing: 'Cada proyecto se define con un objetivo claro, entregables visibles y criterio de éxito antes de construir.',
    cta: 'Cuéntame qué quieres mejorar →',
    solutions: [
      {
        category: 'Presencia que convierte',
        title: 'Sitios y experiencias digitales',
        description: 'Sitios web, landing pages, rediseños y e-commerce que explican mejor tu propuesta y facilitan el siguiente paso.',
        support: 'Puede incluir UX/UI, desarrollo, SEO técnico y analítica.'
      },
      {
        category: 'Procesos con menos fricción',
        title: 'Automatizaciones e integraciones',
        description: 'Formularios, cotizadores y flujos conectados con CRM, WhatsApp, Mercado Pago o marketplaces para reducir trabajo manual y dar seguimiento.',
        support: 'La meta no es conectar herramientas: es quitar pasos que ya no deberían depender de una persona.'
      },
      {
        category: 'Herramientas que sí se usan',
        title: 'MVPs y producto a medida',
        description: 'Paneles, herramientas internas y productos acotados para validar una idea o darle estructura a una operación que ya pide algo propio.',
        support: 'Construimos lo necesario para probar, operar y aprender antes de hacer algo más grande.'
      },
      {
        category: 'IA con una tarea real',
        title: 'IA aplicada a tu operación',
        description: 'Chatbots, asistentes y agentes enfocados en responder, clasificar, resumir o activar un siguiente paso dentro de un proceso definido.',
        support: 'No IA de aparador: una función concreta, contexto claro y una mejora verificable.'
      }
    ]
  },
  en: {
    eyebrow: 'Tailored solutions',
    title: 'What I can help you move forward',
    intro: 'I do not start with a technology. I start where your operations, digital presence or customer experience stopped being simple.',
    closing: 'Every project is shaped around a clear goal, visible deliverables and success criteria before we build.',
    cta: 'Tell me what you want to improve →',
    solutions: [
      {
        category: 'Presence that converts',
        title: 'Websites and digital experiences',
        description: 'Websites, landing pages, redesigns and e-commerce experiences that explain your value more clearly and make the next step easier.',
        support: 'May include UX/UI, development, technical SEO and analytics.'
      },
      {
        category: 'Processes with less friction',
        title: 'Automation and integrations',
        description: 'Forms, quoting tools and flows connected to CRM, WhatsApp, Mercado Pago or marketplaces to reduce manual work and improve follow-up.',
        support: 'The goal is not to connect tools. It is to remove steps that should no longer depend on a person.'
      },
      {
        category: 'Tools people actually use',
        title: 'MVPs and tailored products',
        description: 'Dashboards, internal tools and scoped products to validate an idea or give structure to an operation that needs something of its own.',
        support: 'We build what is needed to test, operate and learn before making something larger.'
      },
      {
        category: 'AI with a real job',
        title: 'AI applied to your operations',
        description: 'Chatbots, assistants and agents focused on answering, classifying, summarizing or triggering a next step inside a defined process.',
        support: 'No AI for display: a concrete function, clear context and a verifiable improvement.'
      }
    ]
  }
};

function Soluciones({ style }) {
  const { language } = useLanguage();
  const t = content[language] || content.es;

  const scrollToContacto = () => {
    scrollIntoViewWithMotionPreference(document.getElementById('contacto'));
  };

  return (
    <section id="soluciones" className="soluciones" style={style}>
      <div className="soluciones-header">
        <span>{t.eyebrow}</span>
        <h2>{t.title}</h2>
        <p>{t.intro}</p>
      </div>

      <div className="soluciones-grid">
        {t.solutions.map((solution, index) => (
          <article className="soluciones-card" key={solution.title}>
            <div className="soluciones-card__meta">
              <span>{String(index + 1).padStart(2, '0')}</span>
              <p>{solution.category}</p>
            </div>
            <h3>{solution.title}</h3>
            <p className="soluciones-card__description">{solution.description}</p>
            <p className="soluciones-card__support">{solution.support}</p>
          </article>
        ))}
      </div>

      <div className="soluciones-footer">
        <p>{t.closing}</p>
        <button className="soluciones-cta" onClick={scrollToContacto}>
          {t.cta}
        </button>
      </div>
    </section>
  );
}

export default Soluciones;
