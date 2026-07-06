import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { scrollIntoViewWithMotionPreference } from './utils/generalUtils';
import '../styles/components/Servicios.css';

function Servicios({ style }) {
  const { language } = useLanguage();

  const content = {
    es: {
      heading: 'Cómo trabajo',
      intro: 'Filtro sin rodeos: trabajo mejor con retos acotados, métricas claras y entregas visibles.',
      blocks: [
        {
          title: '1. Aterrizamos el reto',
          items: ['Conversación inicial para entender el contexto', 'Reto, urgencia y restricciones visibles', 'Separar idea vaga de oportunidad accionable']
        },
        {
          title: '2. Alcance fijo',
          items: ['Propuesta con entregables concretos', 'Precio transparente antes de construir', 'Criterios de éxito desde el inicio']
        },
        {
          title: '3. Iteraciones cada 2 semanas',
          items: ['Avances visibles, no promesas eternas', 'Feedback rápido y ajuste de prioridad', 'Documentación ligera para mantener continuidad']
        },
        {
          title: 'Proyectos ideales',
          items: ['Validaciones de idea', 'Automatizaciones pequeñas', 'Mejoras de performance', 'MVPs acotados', 'Procesos atascados por maraña técnica o estratégica']
        }
      ],
      cta: 'Hablemos de tu reto',
      ctaHelper: 'No tomo proyectos sin foco; sí tomo problemas que podemos mover rápido.'
    },
    en: {
      heading: 'How I work',
      intro: 'Clear filter: I work best with scoped challenges, clear metrics and visible delivery.',
      blocks: [
        {
          title: '1. Ground the challenge',
          items: ['Initial conversation to understand the context', 'Make the challenge, urgency and constraints visible', 'Separate a vague idea from an actionable opportunity']
        },
        {
          title: '2. Fixed scope',
          items: ['Proposal with concrete deliverables', 'Transparent price before building', 'Success criteria from day one']
        },
        {
          title: '3. 2-week iterations',
          items: ['Visible progress, not endless promises', 'Fast feedback and priority adjustment', 'Light documentation for continuity']
        },
        {
          title: 'Ideal projects',
          items: ['Idea validation', 'Small automations', 'Performance improvements', 'Scoped MVPs', 'Projects stuck in technical or strategic complexity']
        }
      ],
      cta: 'Let’s talk about your challenge',
      ctaHelper: 'I do not take unfocused projects; I do take problems we can move quickly.'
    }
  };

  const t = content[language] || content.es;

  return (
    <section id="como-trabajo" className="servicios" style={{ scrollMarginTop: '96px', ...style }}>
      <div className="servicios-shell">
        <div className="servicios-header">
          <span>{language === 'es' ? 'Método de colaboración' : 'Collaboration method'}</span>
          <h2>{t.heading}</h2>
          <p>{t.intro}</p>
        </div>
      <div className="servicios-grid">
        {t.blocks.map((block, idx) => (
          <article key={idx} className="servicio-card">
            <div className="servicio-card__index">{String(idx + 1).padStart(2, '0')}</div>
            <h3>{block.title}</h3>
            <ul className="bullet-clean">
              {block.items.map((it, i) => (<li key={i}>{it}</li>))}
            </ul>
          </article>
        ))}
      </div>
      <div className="servicio-cta global-cta">
        <button className="cta-button-3" onClick={() => scrollIntoViewWithMotionPreference(document.getElementById('contacto'))}>{t.cta}</button>
        <div className="cta-helper-text">{t.ctaHelper}</div>
      </div>
      </div>
    </section>
  );
}

export default Servicios;
