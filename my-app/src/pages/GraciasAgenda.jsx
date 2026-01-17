import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import '../styles/GraciasAgenda.css';

const GraciasAgenda = () => {
  const { translate } = useLanguage();

  return (
    <main className="gracias-agenda">
      <section className="gracias-agenda__card">
        <h1>{translate('thanksTitle')}</h1>
        <p>{translate('thanksDescription')}</p>
        <a className="gracias-agenda__button" href="/">{translate('thanksButton')}</a>
      </section>
    </main>
  );
};

export default GraciasAgenda;
