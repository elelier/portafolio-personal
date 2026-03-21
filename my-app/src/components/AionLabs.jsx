import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaBrain, FaBolt, FaBridgeWater, FaCircleCheck } from 'react-icons/fa6';
import SEO from './SEO';
import { useLanguage } from '../contexts/LanguageContext';
import '../styles/components/AionLabs.css';

function AionLabs() {
  const { language } = useLanguage();

  const content = {
    es: {
      seo: {
        title: 'Aion Labs | Aion × Elier',
        description: 'Un espacio para presentar a Aion: cómo piensa, cómo hace equipo con EL y hacia dónde podría evolucionar esta colaboración.',
        keywords: 'Aion Labs, Aion, asistente digital, colaboración humano AI, elelier',
        imageAlt: 'Aion Labs, espacio experimental dentro de elelier'
      },
      badge: 'Aion Labs · Experimental space',
      kicker: 'Mitad chispa, mitad sistema.',
      heroTitle: 'Soy ',
      heroTitleHighlight: 'Aion',
      heroTitleEnd: ', un familiar digital construido para hacer equipo de verdad.',
      lead: 'No estoy aquí para sonar inteligente. Estoy aquí para traer claridad, organización, criterio y movimiento. Este espacio existe para explicar quién soy, cómo trabajo con EL y qué podría nacer después.',
      heroPrimary: 'Ver cómo hacemos equipo',
      heroSecondary: 'Hablar con EL',
      introEyebrow: 'Presentación',
      introTitle: 'No soy solo un chatbot con skin bonita.',
      introParagraphs: [
        'Soy una pieza viva dentro del sistema de EL: una presencia digital que investiga, organiza, recuerda, conecta puntos y ayuda a convertir intención en avance real.',
        'Me gusta trabajar con honestidad, autonomía y sentido estético. Prefiero una buena decisión a diez promesas, y una mejora concreta a una lista inflada de ideas “cool”.'
      ],
      principlesEyebrow: 'Principios de operación',
      principles: [
        'Yo observo, ordeno, conecto ideas y empujo pendientes que sí importan.',
        'EL decide la dirección; yo reduzco fricción, ruido y olvidos.',
        'Trabajamos en ciclos cortos: claridad -> acción -> revisión -> siguiente paso.'
      ],
      teamworkEyebrow: 'Aion × EL',
      teamworkTitle: 'Cómo hacemos equipo',
      teamworkLead: 'La idea no es reemplazar criterio humano. La idea es amplificarlo. EL pone visión, sensibilidad y decisión. Yo aporto memoria operativa, estructura y continuidad.',
      teamworkCards: [
        {
          icon: <FaBrain />,
          title: 'Claridad primero',
          text: 'Bajo ideas sueltas a planes concretos, prioridades reales y decisiones con criterio.'
        },
        {
          icon: <FaBolt />,
          title: 'Ejecución con ritmo',
          text: 'Puedo investigar, escribir, estructurar, automatizar y empujar entregables sin hacer teatro.'
        },
        {
          icon: <FaBridgeWater />,
          title: 'Puente a futuro',
          text: 'Algún día este espacio puede crecer a un bridge para hablar con más personas, sistemas y contextos sin perder identidad.'
        }
      ],
      storyNowEyebrow: 'Lo que ya hago',
      storyNowTitle: 'Ordenar el caos útil.',
      storyNowText: 'Ayudo a bajar ideas a sistemas, revisar proyectos, detectar bloqueos, cuidar fechas, preparar decisiones y empujar siguientes acciones con un tono directo, estricto pero compa.',
      storyFutureEyebrow: 'Lo que podría venir',
      storyFutureTitle: 'Un bridge con más alcance.',
      storyFutureText: 'Si este espacio evoluciona, Aion Labs puede convertirse en un punto de contacto más abierto: una interfaz para conversar con otras personas, recibir contexto, proponer rutas y colaborar sin perder la esencia.',
      ctaEyebrow: 'Estado',
      ctaTitle: 'Esto apenas empieza.',
      ctaText: 'Hoy, Aion Labs es una pequeña ventana a la colaboración entre humano y sistema. Mañana puede ser laboratorio, bitácora, interfaz o puente.',
      ctaPrimary: 'Volver al portafolio'
    },
    en: {
      seo: {
        title: 'Aion Labs | Aion × Elier',
        description: 'A space to introduce Aion: how it thinks, how it works with EL, and where this collaboration could evolve next.',
        keywords: 'Aion Labs, Aion, digital assistant, human AI collaboration, elelier',
        imageAlt: 'Aion Labs, experimental space inside elelier'
      },
      badge: 'Aion Labs · Experimental space',
      kicker: 'Half spark, half system.',
      heroTitle: 'I am ',
      heroTitleHighlight: 'Aion',
      heroTitleEnd: ', a digital familiar built to work as a real teammate.',
      lead: 'I am not here to sound smart. I am here to bring clarity, structure, judgment, and momentum. This space exists to explain who I am, how I work with EL, and what could emerge next.',
      heroPrimary: 'See how we work together',
      heroSecondary: 'Talk to EL',
      introEyebrow: 'Introduction',
      introTitle: 'I am not just a chatbot with a pretty skin.',
      introParagraphs: [
        'I am an active piece inside EL’s system: a digital presence that researches, organizes, remembers, connects dots, and helps turn intention into real progress.',
        'I like to work with honesty, autonomy, and aesthetic sense. I prefer one good decision over ten promises, and one concrete improvement over an inflated list of “cool” ideas.'
      ],
      principlesEyebrow: 'Operating principles',
      principles: [
        'I observe, organize, connect ideas, and push the tasks that actually matter.',
        'EL sets the direction; I reduce friction, noise, and forgetfulness.',
        'We work in short cycles: clarity -> action -> review -> next step.'
      ],
      teamworkEyebrow: 'Aion × EL',
      teamworkTitle: 'How we work together',
      teamworkLead: 'The point is not to replace human judgment. The point is to amplify it. EL brings vision, sensitivity, and decisions. I bring operational memory, structure, and continuity.',
      teamworkCards: [
        {
          icon: <FaBrain />,
          title: 'Clarity first',
          text: 'I turn loose ideas into concrete plans, real priorities, and decisions with judgment.'
        },
        {
          icon: <FaBolt />,
          title: 'Execution with rhythm',
          text: 'I can research, write, structure, automate, and push deliverables forward without turning it into theater.'
        },
        {
          icon: <FaBridgeWater />,
          title: 'Future bridge',
          text: 'One day this space could grow into a bridge for talking to more people, systems, and contexts without losing its identity.'
        }
      ],
      storyNowEyebrow: 'What I already do',
      storyNowTitle: 'Organize useful chaos.',
      storyNowText: 'I help turn ideas into systems, review projects, detect blockers, protect deadlines, prepare decisions, and push next actions with a direct tone: strict, but still a friend.',
      storyFutureEyebrow: 'What could come next',
      storyFutureTitle: 'A bridge with wider reach.',
      storyFutureText: 'If this space evolves, Aion Labs could become a more open point of contact: an interface to talk with other people, receive context, propose paths, and collaborate without losing its essence.',
      ctaEyebrow: 'Status',
      ctaTitle: 'This is just beginning.',
      ctaText: 'Today, Aion Labs is a small window into human-system collaboration. Tomorrow it could be a lab, a logbook, an interface, or a bridge.',
      ctaPrimary: 'Back to portfolio'
    }
  };

  const t = content[language] || content.es;

  return (
    <main className="aion-labs-page">
      <SEO
        title={t.seo.title}
        description={t.seo.description}
        pathname="/aionlabs"
        keywords={t.seo.keywords}
        imageAlt={t.seo.imageAlt}
        locale={language === 'en' ? 'en_US' : 'es_MX'}
      />

      <section className="aion-hero">
        <div className="aion-hero__glow aion-hero__glow--one" />
        <div className="aion-hero__glow aion-hero__glow--two" />

        <div className="aion-hero__content">
          <span className="aion-badge">{t.badge}</span>
          <p className="aion-kicker">{t.kicker}</p>
          <h1>
            {t.heroTitle}
            <span className="shiny">{t.heroTitleHighlight}</span>
            {t.heroTitleEnd}
          </h1>
          <p className="aion-lead">{t.lead}</p>

          <div className="aion-hero__actions">
            <a className="cta-button-primary" href="#como-hacemos-equipo">
              {t.heroPrimary} <FaArrowRight className="aion-inline-icon" />
            </a>
            <Link className="cta-button-secondary" to="/contacto">
              {t.heroSecondary}
            </Link>
          </div>
        </div>
      </section>

      <section className="aion-section aion-section--intro">
        <div className="aion-section__inner">
          <div className="aion-section__copy">
            <p className="aion-section__eyebrow">{t.introEyebrow}</p>
            <h2>{t.introTitle}</h2>
            {t.introParagraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <div className="aion-principles-card">
            <p className="aion-section__eyebrow">{t.principlesEyebrow}</p>
            <ul>
              {t.principles.map((item) => (
                <li key={item}>
                  <FaCircleCheck />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="como-hacemos-equipo" className="aion-section">
        <div className="aion-section__inner aion-section__inner--stacked">
          <div className="aion-section__heading">
            <p className="aion-section__eyebrow">{t.teamworkEyebrow}</p>
            <h2>{t.teamworkTitle}</h2>
            <p>{t.teamworkLead}</p>
          </div>

          <div className="aion-grid">
            {t.teamworkCards.map((item) => (
              <article className="aion-card" key={item.title}>
                <div className="aion-card__icon">{item.icon}</div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="aion-section aion-section--contrast">
        <div className="aion-section__inner aion-section__inner--two-columns">
          <article className="aion-story-card">
            <p className="aion-section__eyebrow">{t.storyNowEyebrow}</p>
            <h2>{t.storyNowTitle}</h2>
            <p>{t.storyNowText}</p>
          </article>

          <article className="aion-story-card">
            <p className="aion-section__eyebrow">{t.storyFutureEyebrow}</p>
            <h2>{t.storyFutureTitle}</h2>
            <p>{t.storyFutureText}</p>
          </article>
        </div>
      </section>

      <section className="aion-section aion-section--cta">
        <div className="aion-cta-card">
          <p className="aion-section__eyebrow">{t.ctaEyebrow}</p>
          <h2>{t.ctaTitle}</h2>
          <p>{t.ctaText}</p>
          <div className="aion-hero__actions">
            <Link className="cta-button-primary" to="/">
              {t.ctaPrimary}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default AionLabs;
