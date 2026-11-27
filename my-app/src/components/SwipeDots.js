import React, { useEffect, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { getMotionAwareScrollBehavior } from './utils/generalUtils';

const LABELS = {
  es: (n, total) => `Ver tarjeta ${n} de ${total}`,
  en: (n, total) => `Show card ${n} of ${total}`,
  'pt-br': (n, total) => `Ver cartão ${n} de ${total}`,
};

const getCards = (track) => (track ? Array.from(track.children).filter((child) => child.offsetWidth > 0) : []);

// Puntos de navegación para las rejillas que en móvil se vuelven carrusel.
// En escritorio se ocultan con CSS (.swipe-dots).
function SwipeDots({ targetRef, count }) {
  const { language } = useLanguage();
  const [active, setActive] = useState(0);

  useEffect(() => {
    const track = targetRef.current;
    if (!track) return undefined;
    let frame = 0;
    const update = () => {
      frame = 0;
      const cards = getCards(track);
      if (!cards.length) return;
      const start = track.getBoundingClientRect().left;
      let closest = 0;
      let best = Infinity;
      cards.forEach((card, index) => {
        const distance = Math.abs(card.getBoundingClientRect().left - start);
        if (distance < best) {
          best = distance;
          closest = index;
        }
      });
      // Si se ven varias tarjetas a la vez, al llegar al final marca la última.
      const atEnd = track.scrollWidth - track.clientWidth > 1
        && track.scrollLeft + track.clientWidth >= track.scrollWidth - 2;
      setActive(atEnd ? cards.length - 1 : closest);
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    track.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      track.removeEventListener('scroll', onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [targetRef]);

  if (count < 2) return null;

  const label = LABELS[language] || LABELS.es;

  const goTo = (index) => {
    const track = targetRef.current;
    const card = getCards(track)[index];
    if (!track || !card) return;
    const offset = card.getBoundingClientRect().left - track.getBoundingClientRect().left;
    const paddingLeft = parseFloat(window.getComputedStyle(track).paddingLeft) || 0;
    track.scrollTo({ left: track.scrollLeft + offset - paddingLeft, behavior: getMotionAwareScrollBehavior() });
  };

  return (
    <div className="swipe-dots">
      {Array.from({ length: count }, (_, index) => (
        <button
          key={index}
          type="button"
          className={`swipe-dots__dot${index === active ? ' swipe-dots__dot--active' : ''}`}
          aria-label={label(index + 1, count)}
          aria-current={index === active ? 'true' : undefined}
          onClick={() => goTo(index)}
        />
      ))}
    </div>
  );
}

export default SwipeDots;
