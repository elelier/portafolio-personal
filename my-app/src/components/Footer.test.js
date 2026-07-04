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

describe('Footer', () => {
  beforeEach(() => {
    window.HTMLElement.prototype.scrollIntoView = jest.fn();
  });

  afterEach(() => {
    jest.restoreAllMocks();
    document.body.innerHTML = '';
  });

  it('links Soluciones to the solutions section in Spanish', () => {
    const target = document.createElement('section');
    target.id = 'soluciones';
    target.scrollIntoView = jest.fn();
    document.body.appendChild(target);

    const { container, cleanup } = renderFooter('es');
    const solutionsLink = Array.from(container.querySelectorAll('a')).find((link) => link.textContent.includes('Soluciones'));

    expect(solutionsLink).toBeTruthy();
    expect(container.textContent).not.toContain('Cómo trabajo');

    act(() => {
      solutionsLink.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    expect(target.scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });

    cleanup();
  });

  it('renders Solutions in English', () => {
    const { container, cleanup } = renderFooter('en');

    expect(container.textContent).toContain('Solutions');
    expect(container.textContent).not.toContain('How I work');
    expect(container.textContent).not.toContain('Services');

    cleanup();
  });
});
