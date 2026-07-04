import React, { act } from 'react';
import { createRoot } from 'react-dom/client';
import Soluciones from './Soluciones';
import { LanguageContext } from '../contexts/LanguageContext';

globalThis.IS_REACT_ACT_ENVIRONMENT = true;

const renderSoluciones = (language = 'es') => {
  const container = document.createElement('div');
  document.body.appendChild(container);
  const root = createRoot(container);

  act(() => {
    root.render(
      <LanguageContext.Provider value={{ language }}>
        <Soluciones />
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

describe('Soluciones', () => {
  beforeEach(() => {
    window.HTMLElement.prototype.scrollIntoView = jest.fn();
  });

  afterEach(() => {
    jest.restoreAllMocks();
    document.body.innerHTML = '';
  });

  it('renders four approved solution cards in Spanish', () => {
    const { container, cleanup } = renderSoluciones('es');

    expect(container.querySelectorAll('.soluciones-card')).toHaveLength(4);
    expect(container.textContent).toContain('Soluciones a medida');
    expect(container.textContent).toContain('Qué puedo hacer por ti');
    expect(container.textContent).toContain('Presencia que convierte');
    expect(container.textContent).toContain('Sitios y experiencias digitales');
    expect(container.textContent).toContain('Procesos con menos fricción');
    expect(container.textContent).toContain('Automatizaciones e integraciones');
    expect(container.textContent).toContain('Herramientas que sí se usan');
    expect(container.textContent).toContain('MVPs y producto a medida');
    expect(container.textContent).toContain('IA con una tarea real');
    expect(container.textContent).toContain('IA aplicada a tu operación');
    expect(container.textContent).toContain('Cada proyecto se define con un objetivo claro');

    cleanup();
  });

  it('renders four approved solution cards in English', () => {
    const { container, cleanup } = renderSoluciones('en');

    expect(container.querySelectorAll('.soluciones-card')).toHaveLength(4);
    expect(container.textContent).toContain('Tailored solutions');
    expect(container.textContent).toContain('What I can help you move forward');
    expect(container.textContent).toContain('Presence that converts');
    expect(container.textContent).toContain('Websites and digital experiences');
    expect(container.textContent).toContain('Processes with less friction');
    expect(container.textContent).toContain('Automation and integrations');
    expect(container.textContent).toContain('Tools people actually use');
    expect(container.textContent).toContain('MVPs and tailored products');
    expect(container.textContent).toContain('AI with a real job');
    expect(container.textContent).toContain('AI applied to your operations');

    cleanup();
  });

  it('scrolls the CTA to contacto', () => {
    const contacto = document.createElement('section');
    contacto.id = 'contacto';
    contacto.scrollIntoView = jest.fn();
    document.body.appendChild(contacto);

    const { container, cleanup } = renderSoluciones('es');
    const cta = container.querySelector('.soluciones-cta');

    act(() => {
      cta.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    expect(contacto.scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });

    cleanup();
  });
});
