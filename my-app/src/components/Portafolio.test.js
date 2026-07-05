import React, { act } from 'react';
import { createRoot } from 'react-dom/client';
import Portafolio from './Portafolio';
import { LanguageContext } from '../contexts/LanguageContext';

jest.mock('./utils/languageUtils', () => ({
  getCurrentLanguage: jest.fn(() => 'es')
}));

globalThis.IS_REACT_ACT_ENVIRONMENT = true;

const renderPortafolio = (language = 'es') => {
  const container = document.createElement('div');
  document.body.appendChild(container);
  const root = createRoot(container);

  act(() => {
    root.render(
      <LanguageContext.Provider value={{ language }}>
        <Portafolio />
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

describe('Portafolio CTA', () => {
  beforeEach(() => {
    window.HTMLElement.prototype.scrollIntoView = jest.fn();
  });

  afterEach(() => {
    jest.restoreAllMocks();
    document.body.innerHTML = '';
  });

  it('points the secondary CTA to como-trabajo in Spanish', () => {
    const target = document.createElement('section');
    target.id = 'como-trabajo';
    target.scrollIntoView = jest.fn();
    document.body.appendChild(target);

    const { container, cleanup } = renderPortafolio('es');
    const secondaryCta = container.querySelector('.cta-button-secondary');

    expect(secondaryCta.textContent).toContain('Conoce cómo trabajo');

    act(() => {
      secondaryCta.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    expect(target.scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });

    cleanup();
  });

  it('renders the approved English secondary CTA copy', () => {
    const { container, cleanup } = renderPortafolio('en');

    expect(container.querySelector('.cta-button-secondary').textContent).toContain('See how I work');

    cleanup();
  });

  it('labels the primary CTA as a contact action in both languages', () => {
    const { container: esContainer, cleanup: cleanupEs } = renderPortafolio('es');
    expect(esContainer.querySelector('.cta-button-primary').textContent).toContain('Hablemos de tu proyecto');
    cleanupEs();

    const { container: enContainer, cleanup: cleanupEn } = renderPortafolio('en');
    expect(enContainer.querySelector('.cta-button-primary').textContent).toContain("Let's talk about your project");
    cleanupEn();
  });
});
