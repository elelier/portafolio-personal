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
    expect(container.textContent).not.toContain('GoFarma');
    expect(container.textContent).not.toContain('Wonderlabs');
    expect(container.textContent).not.toContain('Farmalisto');

    cleanup();
  });

  it('shows the OneClicTrip transparency note', () => {
    const { container, cleanup } = renderCasosEstudio('es');

    expect(container.textContent).toContain('Transparencia: OneClicTrip es la agencia de viajes de Ilse Jasso, pareja de Elier.');

    cleanup();
  });

  it('uses the approved external project links safely', () => {
    const { container, cleanup } = renderCasosEstudio('es');

    const arqidiaLink = Array.from(container.querySelectorAll('a')).find((link) => link.textContent === 'Ver Arqidia');
    const oneClicTripLink = Array.from(container.querySelectorAll('a')).find((link) => link.textContent === 'Visitar OneClicTrip');

    expect(arqidiaLink.getAttribute('href')).toBe('https://arqidia.mx/');
    expect(arqidiaLink.getAttribute('rel')).toBe('noopener noreferrer');
    expect(oneClicTripLink.getAttribute('href')).toBe('https://www.oneclictrip.com/');
    expect(oneClicTripLink.getAttribute('rel')).toBe('noopener noreferrer');

    cleanup();
  });

  it('shows the approved English case copy', () => {
    const { container, cleanup } = renderCasosEstudio('en');

    expect(container.textContent).toContain('From a concrete challenge to something that works');
    expect(container.textContent).toContain('Architecture · Presence and lead generation');
    expect(container.textContent).toContain('Custom travel · Lead generation and operations');
    expect(container.textContent).toContain('The platform is operating with real clients and sales.');
    expect(container.textContent).toContain('Transparency: OneClicTrip is the travel agency of Ilse Jasso, Elier’s partner.');

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
