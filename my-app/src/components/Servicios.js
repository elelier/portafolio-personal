import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import '../styles/components/Servicios.css';

function Servicios({ style }) {
  const { language } = useLanguage();

  const content = {
    es: {
      heading: 'Mi método',
      intro: 'Filtro sin rodeos: trabajo mejor con retos acotados, métricas claras y entregas visibles.',
      blocks: [
        {
          title: '1. Diagnóstico exprés',
          items: ['Sesión inicial de hasta 1 hora', 'Entender reto, urgencia y restricciones', 'Separar idea vaga de oportunidad accionable']
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
      cta: 'Recibe diagnóstico exprés',
      ctaHelper: 'No tomo proyectos sin foco; sí tomo problemas que podemos mover rápido.'
    },
    en: {
      heading: 'My method',
      intro: 'Clear filter: I work best with scoped challenges, clear metrics and visible delivery.',
      blocks: [
        {
          title: '1. Express diagnosis',
          items: ['Initial session up to 1 hour', 'Understand challenge, urgency and constraints', 'Separate vague idea from actionable opportunity']
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
      cta: 'Get express diagnosis',
      ctaHelper: 'I do not take unfocused projects; I do take problems we can move quickly.'
    }
  };

  const t = content[language] || content.es;

  return (
    <section id="disponibilidad" className="servicios colaboraciones disponibilidad" style={style}>
      <div className="servicios-header">
        <h1>{t.heading}</h1>
      </div>
      <p className="introduccion shinyh">{t.intro}</p>
      <div className="servicios-grid simple-grid">
        {t.blocks.map((block, idx) => (
          <div key={idx} className="servicio-card minimal">
            <h3>{block.title}</h3>
            <ul className="bullet-clean">
              {block.items.map((it, i) => (<li key={i}>{it}</li>))}
            </ul>
          </div>
        ))}
      </div>
      <div className="servicio-cta global-cta">
        <button className="cta-button-3" onClick={() => document.getElementById('diagnostico')?.scrollIntoView({ behavior: 'smooth' })}>{t.cta}</button>
        <div className="cta-helper-text">{t.ctaHelper}</div>
      </div>
    </section>
  );
}

export default Servicios;
