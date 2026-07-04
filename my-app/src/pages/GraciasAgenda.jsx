import React, { useEffect, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import '../styles/GraciasAgenda.css';

const DEFAULT_CAL_URL = 'https://cal.com/elelier/reto';

const GraciasAgenda = () => {
  const { translate } = useLanguage();
  const [calendarUrl, setCalendarUrl] = useState(DEFAULT_CAL_URL);

  useEffect(() => {
    const storedUrl = sessionStorage.getItem('elelierLastContactCalUrl');
    if (storedUrl) {
      setCalendarUrl(storedUrl);
    }
  }, []);

  return (
    <main className="gracias-agenda">
      <section className="gracias-agenda__card">
        <h1>{translate('thanksTitle')}</h1>
        <p>{translate('thanksDescription')}</p>
        <a className="gracias-agenda__button" href={calendarUrl} target="_blank" rel="noreferrer">
          {translate('thanksCalendarButton')}
        </a>
        <a className="gracias-agenda__button gracias-agenda__button--secondary" href="/">
          {translate('thanksButton')}
        </a>
      </section>
    </main>
  );
};

export default GraciasAgenda;
