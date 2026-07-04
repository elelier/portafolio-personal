import React, { act } from 'react';
import { createRoot } from 'react-dom/client';
import HeroBanner from './HeroBanner';
import { LanguageContext } from '../contexts/LanguageContext';
import { ThemeContext } from '../contexts/ThemeContext';

const calendlyUrl = 'https://calendly.com/loya-elier/primer-contacto-15-min';
globalThis.IS_REACT_ACT_ENVIRONMENT = true;

const renderHero = (language = 'es') => {
  const container = document.createElement('div');
  document.body.appendChild(container);
  const root = createRoot(container);

  act(() => {
    root.render(
      <LanguageContext.Provider value={{ language }}>
        <ThemeContext.Provider value={{ currentTheme: 'light' }}>
          <HeroBanner />
        </ThemeContext.Provider>
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

describe('HeroBanner', () => {
  beforeEach(() => {
    jest.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue({
      clearRect: jest.fn()
    });
    window.HTMLElement.prototype.scrollIntoView = jest.fn();
  });

  afterEach(() => {
    jest.restoreAllMocks();
    document.body.innerHTML = '';
  });

  it('shows the approved Spanish hero message and Calendly CTA', () => {
    const { container, cleanup } = renderHero('es');

    expect(container.textContent).toContain('Transformo procesos complicados en soluciones que realmente funcionan.');
    expect(container.textContent).not.toContain('Solo tomo proyectos con foco');
    expect(container.textContent).not.toContain('producto digital funcional en semanas, no meses');

    const primaryCta = container.querySelector('.hero-button');
    expect(primaryCta.textContent).toContain('Diagnóstico exprés');
    expect(primaryCta.tagName).toBe('A');
    expect(primaryCta.getAttribute('href')).toBe(calendlyUrl);

    const secondaryCta = container.querySelector('.hero-button-secondary');
    expect(secondaryCta.textContent).toContain('Ver casos reales');

    cleanup();
  });

  it('keeps the existing English headline until a stakeholder translation is approved', () => {
    const { container, cleanup } = renderHero('en');

    expect(container.textContent).toContain('I turn your business idea into a working digital product in weeks, not months');

    cleanup();
  });
});
