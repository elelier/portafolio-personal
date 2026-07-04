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

describe('Navegacion', () => {
  beforeEach(() => {
    window.HTMLElement.prototype.scrollIntoView = jest.fn();
  });

  afterEach(() => {
    jest.restoreAllMocks();
    document.body.innerHTML = '';
  });

  it('shows Como trabajo and scrolls to the existing section in Spanish', () => {
    const target = document.createElement('section');
    target.id = 'como-trabajo';
    target.scrollIntoView = jest.fn();
    document.body.appendChild(target);

    const { container, cleanup } = renderNavegacion('es');
    const howIWorkLink = Array.from(container.querySelectorAll('a')).find((link) => link.textContent.includes('Cómo trabajo'));

    expect(howIWorkLink).toBeTruthy();
    expect(container.textContent).not.toContain('Servicios');
    expect(container.querySelectorAll('li')).toHaveLength(6);

    act(() => {
      howIWorkLink.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    expect(target.scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });

    cleanup();
  });

  it('shows How I work and fixes Career in English', () => {
    const { container, cleanup } = renderNavegacion('en');

    expect(container.textContent).toContain('How I work');
    expect(container.textContent).toContain('Career');
    expect(container.textContent).not.toContain('Carrer');

    cleanup();
  });
});
