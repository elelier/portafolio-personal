import React, { act } from 'react';
import { createRoot } from 'react-dom/client';
import { MemoryRouter } from 'react-router-dom';
import Navegacion from './Navegacion';
import { LanguageContext } from '../contexts/LanguageContext';

globalThis.IS_REACT_ACT_ENVIRONMENT = true;

const renderNavegacion = (language = 'es') => {
  const container = document.createElement('div');
  document.body.appendChild(container);
  const root = createRoot(container);

  act(() => {
    root.render(
      <MemoryRouter>
        <LanguageContext.Provider value={{ language }}>
          <Navegacion />
        </LanguageContext.Provider>
      </MemoryRouter>
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

const findLinkByText = (container, text) => Array.from(container.querySelectorAll('a')).find((link) => link.textContent.includes(text));

describe('Navegacion', () => {
  beforeEach(() => {
    window.HTMLElement.prototype.scrollIntoView = jest.fn();
  });

  afterEach(() => {
    jest.restoreAllMocks();
    document.body.innerHTML = '';
  });

  it('shows Casos reales in Spanish and keeps the existing destinations working', () => {
    const targets = ['sobre-mi', 'casos-reales', 'soluciones', 'contacto'].reduce((acc, id) => {
      const target = document.createElement('section');
      target.id = id;
      target.scrollIntoView = jest.fn();
      document.body.appendChild(target);
      acc[id] = target;
      return acc;
    }, {});

    const { container, cleanup } = renderNavegacion('es');
    const casesLink = findLinkByText(container, 'Casos reales');
    const aboutLink = findLinkByText(container, 'Sobre Mí');
    const solutionsLink = findLinkByText(container, 'Soluciones');
    const contactLink = findLinkByText(container, 'Hablemos de tu reto');

    expect(casesLink).toBeTruthy();
    expect(aboutLink).toBeTruthy();
    expect(solutionsLink).toBeTruthy();
    expect(contactLink).toBeTruthy();
    expect(container.textContent).toContain('Casos reales');
    expect(container.textContent).toContain('Carrera');
    expect(container.textContent).toContain('Sobre Mí');
    expect(container.textContent).toContain('Soluciones');
    expect(container.textContent).toContain('Hablemos de tu reto');
    expect(container.textContent).not.toContain('Habilidades');
    expect(container.textContent).not.toContain('Portafolio');

    act(() => {
      casesLink.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      aboutLink.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      solutionsLink.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      contactLink.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    expect(targets['casos-reales'].scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });
    expect(targets['sobre-mi'].scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });
    expect(targets['soluciones'].scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });
    expect(targets['contacto'].scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });

    cleanup();
  });

  it('shows Case studies in English and scrolls to the cases section', () => {
    const target = document.createElement('section');
    target.id = 'casos-reales';
    target.scrollIntoView = jest.fn();
    document.body.appendChild(target);

    const { container, cleanup } = renderNavegacion('en');
    const casesLink = findLinkByText(container, 'Case studies');

    expect(casesLink).toBeTruthy();
    expect(container.textContent).toContain('Case studies');
    expect(container.textContent).toContain('Career');
    expect(container.textContent).toContain('Let’s talk about your challenge');
    expect(container.textContent).not.toContain('Skills');
    expect(container.textContent).not.toContain('Portfolio');

    act(() => {
      casesLink.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    expect(target.scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });

    cleanup();
  });

  it('closes the mobile menu after selecting Casos reales', () => {
    const target = document.createElement('section');
    target.id = 'casos-reales';
    target.scrollIntoView = jest.fn();
    document.body.appendChild(target);

    const { container, cleanup } = renderNavegacion('es');
    const menuToggle = container.querySelector('.menu-toggle');
    const navLinks = container.querySelector('.nav-links');
    const casesLink = findLinkByText(container, 'Casos reales');

    expect(menuToggle).toBeTruthy();
    expect(navLinks).toBeTruthy();
    expect(casesLink).toBeTruthy();
    act(() => {
      menuToggle.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    expect(navLinks.classList.contains('open')).toBe(true);

    act(() => {
      casesLink.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    expect(target.scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });
    expect(navLinks.classList.contains('open')).toBe(false);

    cleanup();
  });

  it('uses the decision path and groups personal context under Más sobre mí', () => {
    const { container, cleanup } = renderNavegacion('es');
    const links = Array.from(container.querySelectorAll('.nav-links > li > a, .nav-links > li > button'))
      .map((element) => element.textContent.replace('⌄', '').trim())
      .filter(Boolean);

    expect(links).toEqual(['Soluciones', 'Casos reales', 'Cómo trabajo', 'Más sobre mí', 'Hablemos de tu reto']);
    expect(container.querySelector('.nav-links .fa-home')).toBeNull();

    const moreButton = container.querySelector('.nav-secondary-toggle');
    expect(moreButton.getAttribute('aria-haspopup')).toBe('true');
    expect(moreButton.getAttribute('aria-controls')).toBe('about-navigation');
    expect(moreButton.getAttribute('aria-expanded')).toBe('false');
    expect(container.querySelector('#about-navigation')).toBeTruthy();
    expect(container.textContent).toContain('Sobre Mí');
    expect(container.textContent).toContain('Carrera');

    cleanup();
  });

  it('opens Más sobre mí with keyboard and closes it with Escape while restoring focus', () => {
    const { container, cleanup } = renderNavegacion('es');
    const moreButton = container.querySelector('.nav-secondary-toggle');

    act(() => {
      moreButton.focus();
      moreButton.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
    });
    expect(moreButton.getAttribute('aria-expanded')).toBe('true');

    act(() => {
      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    });
    expect(moreButton.getAttribute('aria-expanded')).toBe('false');
    expect(document.activeElement).toBe(moreButton);

    cleanup();
  });

  it('maps Testimonios to Casos reales in the active navigation state', () => {
    const observed = [];
    const OriginalObserver = window.IntersectionObserver;
    window.IntersectionObserver = class {
      constructor(callback) {
        this.callback = callback;
      }

      observe(element) {
        observed.push({ element, observer: this });
      }

      disconnect() {
        this.disconnected = true;
      }
    };

    const testimonios = document.createElement('section');
    testimonios.id = 'testimonios';
    document.body.appendChild(testimonios);
    const { container, cleanup } = renderNavegacion('es');

    act(() => {
      const entry = observed.find(({ element }) => element.id === 'testimonios');
      entry.observer.callback([{ target: testimonios, isIntersecting: true }]);
    });

    const casesLink = findLinkByText(container, 'Casos reales');
    expect(casesLink.getAttribute('aria-current')).toBe('location');
    expect(casesLink.classList.contains('is-active')).toBe(true);

    cleanup();
    window.IntersectionObserver = OriginalObserver;
    testimonios.remove();
  });
});
