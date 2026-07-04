import React, { act } from 'react';
import { createRoot } from 'react-dom/client';
import CasosEstudio from './CasosEstudio';
import { LanguageContext } from '../contexts/LanguageContext';

globalThis.IS_REACT_ACT_ENVIRONMENT = true;

const renderCasosEstudio = (language = 'es') => {
  const container = document.createElement('div');
  document.body.appendChild(container);
  const root = createRoot(container);

  act(() => {
    root.render(
      <LanguageContext.Provider value={{ language }}>
        <CasosEstudio />
      </LanguageContext.Provider>
    );
  });

  return {
    container,
    cleanup: () => {
      act(() => root.unmount());
      container.remove();
    }
  };
};

describe('CasosEstudio', () => {
  beforeEach(() => {
    window.HTMLElement.prototype.scrollIntoView = jest.fn();
  });

  afterEach(() => {
    jest.restoreAllMocks();
    document.body.innerHTML = '';
  });

  it('shows the approved Spanish case studies without legacy portfolio cases', () => {
    const { container, cleanup } = renderCasosEstudio('es');

    expect(container.textContent).toContain('Arqidia');
    expect(container.textContent).toContain('OneClicTrip');
    expect(container.textContent).toContain('De un reto concreto a algo que ya funciona');
    expect(container.textContent).toContain('Estrategia, tecnología y operación alineadas para generar resultados medibles.');
    expect(container.textContent).toContain('Ganar visibilidad y organizar su oferta digital.');
    expect(container.textContent).toContain('Operación centralizada y ventas reales.');
    expect(container.textContent).not.toContain('La decisión');
    expect(container.textContent).not.toContain('GoFarma');
    expect(container.textContent).not.toContain('Wonderlabs');
    expect(container.textContent).not.toContain('Farmalisto');

    cleanup();
  });


  it('uses the approved external project links safely', () => {
    const { container, cleanup } = renderCasosEstudio('es');

    const links = Array.from(container.querySelectorAll('a')).filter((link) => link.textContent === 'Ver proyecto');
    const [arqidiaLink, oneClicTripLink] = links;

    expect(links).toHaveLength(2);
    expect(arqidiaLink.getAttribute('href')).toBe('https://arqidia.mx/');
    expect(arqidiaLink.getAttribute('rel')).toBe('noopener noreferrer');
    expect(oneClicTripLink.getAttribute('href')).toBe('https://www.oneclictrip.com/');
    expect(oneClicTripLink.getAttribute('rel')).toBe('noopener noreferrer');

    cleanup();
  });

  it('shows the approved English case copy', () => {
    const { container, cleanup } = renderCasosEstudio('en');

    expect(container.textContent).toContain('From a concrete challenge to something that works');
    expect(container.textContent).toContain('Strategy, technology and operations aligned to generate measurable results.');
    expect(container.textContent).toContain('Architecture · Presence and lead generation');
    expect(container.textContent).toContain('Custom travel · Lead generation and operations');
    expect(container.textContent).toContain('Gain visibility and organize its digital offer.');
    expect(container.textContent).toContain('Centralized operations and real sales.');

    cleanup();
  });

  it('renders descriptive static previews for both projects', () => {
    const { container, cleanup } = renderCasosEstudio('es');

    const previews = Array.from(container.querySelectorAll('.caso-card__preview img'));

    expect(previews).toHaveLength(2);
    expect(previews[0].getAttribute('alt')).toBe('Preview visual del sitio Arqidia');
    expect(previews[1].getAttribute('alt')).toBe('Preview visual del sitio OneClicTrip');
    expect(previews[0].getAttribute('src')).toContain('arqidia');
    expect(previews[1].getAttribute('src')).toContain('oneclictrip');

    cleanup();
  });

  it('scrolls the lower CTA to contacto', () => {
    const contacto = document.createElement('section');
    contacto.id = 'contacto';
    document.body.appendChild(contacto);

    const { container, cleanup } = renderCasosEstudio('es');
    const cta = container.querySelector('.casos-estudio__cta');

    act(() => {
      cta.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    expect(contacto.scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });

    cleanup();
  });
});
