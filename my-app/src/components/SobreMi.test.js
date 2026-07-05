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

  it('keeps the method reference brief and links it to como-trabajo', () => {
    const metodo = document.createElement('section');
    metodo.id = 'como-trabajo';
    metodo.scrollIntoView = jest.fn();
    document.body.appendChild(metodo);

    const contacto = document.createElement('section');
    contacto.id = 'contacto';
    contacto.scrollIntoView = jest.fn();
    document.body.appendChild(contacto);

    const { container, cleanup } = renderSobreMi('es');
    const approachTab = Array.from(container.querySelectorAll('button')).find((button) => button.textContent === 'Mi enfoque');
    const methodCta = Array.from(container.querySelectorAll('button')).find((button) => button.textContent === 'Conoce cómo trabajo');
    const contactCta = Array.from(container.querySelectorAll('button')).find((button) => button.textContent === 'Hablemos de tu reto');

    expect(approachTab).toBeTruthy();
    expect(methodCta).toBeTruthy();
    expect(contactCta).toBeTruthy();

    act(() => {
      approachTab.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    expect(container.textContent).toContain('Mi experiencia me enseñó que una buena solución no empieza con tecnología');
    expect(container.textContent).toContain('Por eso conecto operación, producto y ejecución');
    expect(container.textContent).not.toContain('1. Aterrizamos el reto');
    expect(container.textContent).not.toContain('2. Diseñamos lo necesario');
    expect(container.textContent).not.toContain('3. Lo llevamos a uso real');

    act(() => {
      methodCta.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      contactCta.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    expect(metodo.scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });
    expect(contacto.scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });

    cleanup();
  });

  it('keeps the English about-me reference brief and points to How I work', () => {
    const metodo = document.createElement('section');
    metodo.id = 'como-trabajo';
    metodo.scrollIntoView = jest.fn();
    document.body.appendChild(metodo);

    const { container, cleanup } = renderSobreMi('en');
    const approachTab = Array.from(container.querySelectorAll('button')).find((button) => button.textContent === 'My approach');
    const methodCta = Array.from(container.querySelectorAll('button')).find((button) => button.textContent === 'See how I work');

    expect(approachTab).toBeTruthy();
    expect(methodCta).toBeTruthy();

    act(() => {
      approachTab.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    expect(container.textContent).toContain('I have learned that good solutions do not start with technology');
    expect(container.textContent).toContain('That is why I connect operations, product and execution');
    expect(container.textContent).not.toContain('1. Ground the challenge');
    expect(container.textContent).not.toContain('2. Design what is needed');
    expect(container.textContent).not.toContain('3. Bring it into real use');

    act(() => {
      methodCta.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    expect(metodo.scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });

    cleanup();
  });
});
