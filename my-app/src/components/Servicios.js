import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import '../styles/components/Servicios.css';

function Servicios() {
  const { language } = useLanguage();

  const content = {
    es: {
      heading: 'Disponibilidad',
      intro: 'Proyectos pequeños y colaboraciones (10–20 h/semana). Si encaja, escríbeme.',
      blocks: [
        {
          title: 'Qué sí hago',
          items: ['Landing page enfocada', 'Prototipo funcional temprano', 'Mejora incremental de un módulo', 'Refactor pequeño con objetivo claro', 'Asesoría técnica puntual (orientación / criterio)']
        },
        {
          title: 'Qué no tomo',
          items: ['Proyectos urgentes o “para ayer”', 'Re-escrituras completas sin validación previa', 'Procesos largos de consultoría', 'Roadmaps indefinidos sin foco', 'Marketing vapor / buzzwords']
        },
        {
          title: 'Cómo trabajo',
          items: ['Alcance reducido y explícito', 'Iteraciones visibles antes de seguir', 'Preferencia por simplicidad mantenible', 'Documentar decisiones clave', 'Solo compromisos que realmente cumplo']
        },
        {
          title: 'Ejemplos típicos',
          items: ['MVP de formulario + listado', 'Página de producto validando propuesta', 'Pequeña API proxy / wrapper', 'Optimización de performance puntual', 'UI refactor: limpiar componentes']
        }
      ],
      cta: 'Hablemos',
      ctaHelper: 'Cuéntame el mínimo necesario para evaluar.'
    },
    en: {
      heading: 'Availability',
      intro: 'Small projects and collaborations (10–20 h/week). If it fits, get in touch.',
      blocks: [
        {
          title: 'What I do',
          items: ['Focused landing page', 'Early functional prototype', 'Incremental module improvement', 'Small purposeful refactor', 'Targeted technical advisory']
        },
        {
          title: 'What I decline',
          items: ['“Urgent yesterday” projects', 'Full rewrites without prior validation', 'Lengthy consulting programs', 'Vague endless roadmaps', 'Buzzword-driven fluff']
        },
        {
          title: 'How I operate',
          items: ['Reduced, explicit scope', 'Visible iteration before expanding', 'Bias for maintainable simplicity', 'Document key decisions', 'Only commitments I can honor']
        },
        {
          title: 'Typical examples',
          items: ['Form + list MVP', 'Product page validating proposition', 'Small API proxy / wrapper', 'Targeted performance tweak', 'UI cleanup / component pruning']
        }
      ],
      cta: 'Start conversation',
      ctaHelper: 'Share just enough context to assess.'
    }
  };

  const t = content[language] || content.es;

  return (
    <section id="disponibilidad" className="servicios colaboraciones disponibilidad">
      <div className="servicios-header">
        <h1>{/* title */}{t.heading}</h1>
      </div>
      <p className="introduccion shinyh">{t.intro}</p>
      <div className="servicios-grid simple-grid">
        {t.blocks.map((block, idx) => (
          <div key={idx} className="servicio-card minimal">
            <h3>{block.title}</h3>
            <ul className="bullet-clean">
              {block.items.map((it,i)=>(<li key={i}>{it}</li>))}
            </ul>
          </div>
        ))}
      </div>
      <div className="servicio-cta global-cta">
        <button className="cta-button-3" onClick={() => document.getElementById('contacto')?.scrollIntoView({behavior:'smooth'})}>{t.cta}</button>
        <div className="cta-helper-text">{t.ctaHelper}</div>
      </div>
    </section>
  );
}

export default Servicios;
