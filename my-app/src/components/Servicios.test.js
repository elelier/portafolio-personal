import React, { act } from 'react';
import { createRoot } from 'react-dom/client';
import Servicios from './Servicios';
import { LanguageContext } from '../contexts/LanguageContext';

globalThis.IS_REACT_ACT_ENVIRONMENT = true;

const renderServicios = (language = 'es') => {
  const container = document.createElement('div');
  document.body.appendChild(container);
  const root = createRoot(container);

  act(() => {
    root.render(
      <LanguageContext.Provider value={{ language }}>
        <Servicios />
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

describe('Servicios', () => {
  beforeEach(() => {
    window.HTMLElement.prototype.scrollIntoView = jest.fn();
  });

  afterEach(() => {
    jest.restoreAllMocks();
    document.body.innerHTML = '';
  });

  it('removes express diagnosis copy from the Spanish workflow', () => {
    const { container, cleanup } = renderServicios('es');

    expect(container.textContent).toContain('1. Aterrizamos el reto');
    expect(container.textContent).toContain('Conversación inicial para entender el contexto');
    expect(container.textContent).not.toMatch(/Diagn[oó]stico expr[eé]s/i);
    expect(container.textContent).not.toMatch(/diagn[oó]stico/i);

    cleanup();
  });

  it('removes express diagnosis copy from the English workflow', () => {
    const { container, cleanup } = renderServicios('en');

    expect(container.textContent).toContain('1. Ground the challenge');
    expect(container.textContent).toContain('Initial conversation to understand the context');
    expect(container.textContent).not.toMatch(/Express diagnosis/i);
    expect(container.textContent).not.toMatch(/diagnosis/i);

    cleanup();
  });

  it('scrolls its CTA to contacto', () => {
    const contacto = document.createElement('section');
    contacto.id = 'contacto';
    contacto.scrollIntoView = jest.fn();
    document.body.appendChild(contacto);

    const { container, cleanup } = renderServicios('es');
    const cta = container.querySelector('.cta-button-3');

    expect(cta.textContent).toContain('Hablemos de tu reto');

    act(() => {
      cta.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    expect(contacto.scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });

    cleanup();
  });
});
