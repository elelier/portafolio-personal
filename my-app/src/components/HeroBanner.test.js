import React, { act } from 'react';
import { createRoot } from 'react-dom/client';
import HeroBanner from './HeroBanner';
import { LanguageContext } from '../contexts/LanguageContext';
import { ThemeContext } from '../contexts/ThemeContext';

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

  it('shows the approved Spanish hero message and scroll CTA to contacto', () => {
    const contacto = document.createElement('section');
    contacto.id = 'contacto';
    contacto.scrollIntoView = jest.fn();
    document.body.appendChild(contacto);

    const soluciones = document.createElement('section');
    soluciones.id = 'soluciones';
    soluciones.scrollIntoView = jest.fn();
    document.body.appendChild(soluciones);

    const { container, cleanup } = renderHero('es');

    expect(container.textContent).toContain('Transformo procesos complicados en soluciones que realmente funcionan.');
    expect(container.textContent).toContain('con claridad y ejecución visible');
    expect(container.textContent).not.toContain('sin humo');
    expect(container.textContent).not.toContain('Solo tomo proyectos con foco');
    expect(container.textContent).not.toContain('producto digital funcional en semanas, no meses');

    const primaryCta = container.querySelector('.hero-button');
    expect(primaryCta.textContent).toContain('Hablemos de tu reto');
    expect(primaryCta.tagName).toBe('BUTTON');
    expect(container.innerHTML).not.toContain('calendly.com');

    act(() => {
      primaryCta.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    expect(contacto.scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });

    const secondaryCta = container.querySelector('.hero-button-secondary');
    expect(secondaryCta.textContent).toContain('Ver casos reales');

    const scrollIndicator = container.querySelector('.scroll-indicator');
    expect(scrollIndicator.textContent).toContain('Ver soluciones');

    act(() => {
      scrollIndicator.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    expect(soluciones.scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });

    cleanup();
  });

  it('uses the approved English hero positioning and CTA copy', () => {
    const soluciones = document.createElement('section');
    soluciones.id = 'soluciones';
    soluciones.scrollIntoView = jest.fn();
    document.body.appendChild(soluciones);

    const { container, cleanup } = renderHero('en');

    expect(container.textContent).toContain('I turn complex business processes into digital solutions that actually work');
    expect(container.textContent).toContain('I combine operations, product thinking and practical technology');
    expect(container.textContent).toContain('help teams move faster, make better decisions and solve real business problems');
    expect(container.textContent).not.toContain('working digital product in weeks, not months');
    expect(container.textContent).not.toContain('turn your business idea into a working digital product');
    expect(container.querySelector('.hero-button').textContent).toContain('Let’s talk about your challenge');
    expect(container.querySelector('.hero-button-secondary').textContent).toContain('Explore real projects');
    expect(container.querySelector('.scroll-indicator').textContent).toContain('See solutions');
    expect(container.innerHTML).not.toContain('calendly.com');

    cleanup();
  });
});
