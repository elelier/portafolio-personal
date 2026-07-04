import React, { act } from 'react';
import { createRoot } from 'react-dom/client';
import SobreMi from './SobreMi';
import { LanguageContext } from '../contexts/LanguageContext';

jest.mock('react-lazy-load-image-component', () => ({
  LazyLoadImage: ({ placeholderSrc, effect, ...props }) => require('react').createElement('img', props)
}));

globalThis.IS_REACT_ACT_ENVIRONMENT = true;

const renderSobreMi = (language = 'es') => {
  const container = document.createElement('div');
  document.body.appendChild(container);
  const root = createRoot(container);

  act(() => {
    root.render(
      <LanguageContext.Provider value={{ language }}>
        <SobreMi />
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

describe('SobreMi', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    window.HTMLElement.prototype.scrollIntoView = jest.fn();
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.restoreAllMocks();
    document.body.innerHTML = '';
  });

  it('sends method and conversation CTAs to the approved sections', () => {
    const metodo = document.createElement('section');
    metodo.id = 'como-trabajo';
    metodo.scrollIntoView = jest.fn();
    document.body.appendChild(metodo);

    const contacto = document.createElement('section');
    contacto.id = 'contacto';
    contacto.scrollIntoView = jest.fn();
    document.body.appendChild(contacto);

    const { container, cleanup } = renderSobreMi('es');
    const methodCta = Array.from(container.querySelectorAll('button')).find((button) => button.textContent === 'Ver método');
    const contactCta = Array.from(container.querySelectorAll('button')).find((button) => button.textContent === 'Hablemos de tu reto');

    expect(methodCta).toBeTruthy();
    expect(contactCta).toBeTruthy();
    expect(container.textContent).not.toContain('Recibe diagnóstico');

    act(() => {
      methodCta.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      contactCta.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    expect(metodo.scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });
    expect(contacto.scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });

    cleanup();
  });
});
