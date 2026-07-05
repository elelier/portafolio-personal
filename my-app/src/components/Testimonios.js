import React from 'react';
import { FiExternalLink } from 'react-icons/fi';
import { useLanguage } from '../contexts/LanguageContext';
import edgarPhoto from '../assets/images/testimonios/edgar.jpg';
import gloriaPhoto from '../assets/images/testimonios/gloria.jpg';
import ilsePhoto from '../assets/images/testimonios/ilse.jpg';
import '../styles/components/Testimonios.css';

const content = {
  es: {
    eyebrow: 'Testimonios',
    title: 'Lo que dicen de trabajar conmigo',
    description: 'Tres recomendaciones reales de personas que han trabajado conmigo de cerca.',
    linkedinLabel: 'Ver en LinkedIn',
    items: [
      {
        name: 'Edgar E. Tienda Delgado',
        relationship: 'Trabajó con Elier en Pepsico',
        date: '2012-2016',
        quote: 'Elier stood out for his objectivity, commitment, continuous improvement focus and excellent data analysis. He is a dedicated leader, always working with teams to optimize processes and deliver results.',
        link: 'https://www.linkedin.com/in/edgar-tienda/?locale=en',
        initials: 'ET',
        photo: edgarPhoto,
      },
      {
        name: 'Gloria Higuera',
        relationship: 'Trabajó con Elier en Gofarma y Farmalisto',
        date: '2016-2024',
        quote: 'Elier tiene una admirable capacidad de auto-aprendizaje y siempre está buscando cómo mejorar y automatizar procesos. Es una persona confiable, que se rige por principios y valores ante cualquier circunstancia.',
        link: 'https://www.linkedin.com/in/gloriahiguera/',
        initials: 'GH',
        photo: gloriaPhoto,
      },
      {
        name: 'Ilse Jasso',
        relationship: 'Marketing OneClicTrip',
        date: '2025-2026',
        quote: 'No sólo te enfocas en que algo se vea bonito, sino en entender el problema, pensar en las personas que lo van a usar y construir algo que realmente funcione. OneClicTrip hoy tiene mucho más dirección gracias a ti.',
        initials: 'IJ',
        photo: ilsePhoto,
      },
    ],
  },
  en: {
    eyebrow: 'Testimonials',
    title: 'What people say about working with me',
    description: 'Three real recommendations from people who have worked closely with me.',
    linkedinLabel: 'View on LinkedIn',
    items: [
      {
        name: 'Edgar E. Tienda Delgado',
        relationship: 'Worked with Elier on Pepsico',
        date: '2012-2016',
        quote: 'Elier stood out for his objectivity, commitment, continuous improvement focus and excellent data analysis. He is a dedicated leader, always working with teams to optimize processes and deliver results.',
        link: 'https://www.linkedin.com/in/edgar-tienda/?locale=en',
        initials: 'ET',
        photo: edgarPhoto,
      },
      {
        name: 'Gloria Higuera',
        relationship: 'Worked with Elier on Gofarma-Farmalisto',
        date: '2016-2024',
        quote: 'Elier tiene una admirable capacidad de auto-aprendizaje y siempre está buscando cómo mejorar y automatizar procesos. Es una persona confiable, que se rige por principios y valores ante cualquier circunstancia.',
        link: 'https://www.linkedin.com/in/gloriahiguera/',
        initials: 'GH',
        photo: gloriaPhoto,
      },
      {
        name: 'Ilse Jasso',
        relationship: 'Marketing OneClicTrip',
        date: '2025-2026',
        quote: 'No sólo te enfocas en que algo se vea bonito, sino en entender el problema, pensar en las personas que lo van a usar y construir algo que realmente funcione. OneClicTrip hoy tiene mucho más dirección gracias a ti.',
        initials: 'IJ',
        photo: ilsePhoto,
      },
    ],
  },
};

function Testimonios({ style }) {
  const { language } = useLanguage();
  const t = content[language] || content.es;

  return (
    <section id="testimonios" data-testid="testimonios" className="testimonios" style={style}>
      <div className="testimonios__inner">
        <header className="testimonios__header">
          <span>{t.eyebrow}</span>
          <h2>{t.title}</h2>
          <p>{t.description}</p>
        </header>
        <div className="testimonios__grid">
          {t.items.map((item) => (
            <article className="testimonios__card" key={item.name}>
              <p className="testimonios__quote-mark" aria-hidden="true">“</p>
              <blockquote className="testimonios__quote">{item.quote}</blockquote>
              <div className="testimonios__divider" aria-hidden="true" />
              <div className="testimonios__person">
                <div className="testimonios__avatar">
                  <img
                    className="testimonios__photo"
                    src={item.photo}
                    alt={item.name}
                    loading="lazy"
                  />
                  <span className="testimonios__initials testimonios__initials--fallback" aria-hidden="true">{item.initials}</span>
                </div>
                <div className="testimonios__meta">
                  <h3>{item.name}</h3>
                  <p>{item.relationship}{item.date ? ` · ${item.date}` : ''}</p>
                  {item.link ? (
                    <a href={item.link} target="_blank" rel="noopener noreferrer" className="testimonios__link">
                      {t.linkedinLabel}
                      <FiExternalLink aria-hidden="true" />
                    </a>
                  ) : null}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonios;
