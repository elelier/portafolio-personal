import React, { act } from 'react';
import { createRoot } from 'react-dom/client';
import { MemoryRouter } from 'react-router-dom';
import Footer from './Footer';
import { LanguageContext } from '../contexts/LanguageContext';

globalThis.IS_REACT_ACT_ENVIRONMENT = true;

const renderFooter = (language = 'es') => {
  const container = document.createElement('div');
  document.body.appendChild(container);
  const root = createRoot(container);

  act(() => {
    root.render(
      <MemoryRouter>
        <LanguageContext.Provider value={{ language }}>
          <Footer />
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

describe('Footer', () => {
  beforeEach(() => {
    window.HTMLElement.prototype.scrollIntoView = jest.fn();
  });

  afterEach(() => {
    jest.restoreAllMocks();
    document.body.innerHTML = '';
  });

  it('links Casos reales / Case studies to the cases section', () => {
    ['es', 'en'].forEach((language) => {
      const target = document.createElement('section');
      target.id = 'casos-reales';
      target.scrollIntoView = jest.fn();
      document.body.appendChild(target);

      const { container, cleanup } = renderFooter(language);
      const label = language === 'es' ? 'Casos reales' : 'Case studies';
      const casesLink = findLinkByText(container, label);

      expect(casesLink).toBeTruthy();

      act(() => {
        casesLink.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      });

      expect(target.scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });

      cleanup();
      target.remove();
    });
  });

  it('shows Carrera / Career and removes the old Habilidades / Skills and Portafolio / Portfolio labels', () => {
    const { container: esContainer, cleanup: cleanupEs } = renderFooter('es');
    expect(esContainer.textContent).toContain('Carrera');
    expect(esContainer.textContent).not.toContain('Habilidades');
    expect(esContainer.textContent).not.toContain('Portafolio');
    cleanupEs();

    const { container: enContainer, cleanup: cleanupEn } = renderFooter('en');
    expect(enContainer.textContent).toContain('Career');
    expect(enContainer.textContent).not.toContain('Skills');
    expect(enContainer.textContent).not.toContain('Portfolio');
    cleanupEn();
  });

  it('keeps Soluciones, Contacto and Sobre Mí working', () => {
    const targets = ['sobre-mi', 'soluciones', 'contacto'].reduce((acc, id) => {
      const target = document.createElement('section');
      target.id = id;
      target.scrollIntoView = jest.fn();
      document.body.appendChild(target);
      acc[id] = target;
      return acc;
    }, {});

    const { container, cleanup } = renderFooter('es');
    const aboutLink = findLinkByText(container, 'Sobre Mí');
    const solutionsLink = findLinkByText(container, 'Soluciones');
    const contactLink = findLinkByText(container, 'Contacto');

    expect(aboutLink).toBeTruthy();
    expect(solutionsLink).toBeTruthy();
    expect(contactLink).toBeTruthy();
    act(() => {
      aboutLink.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      solutionsLink.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      contactLink.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    expect(targets['sobre-mi'].scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });
    expect(targets['soluciones'].scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });
    expect(targets['contacto'].scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });

    cleanup();
  });
});
