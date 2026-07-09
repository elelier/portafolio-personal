import React, { act } from 'react';
import { createRoot } from 'react-dom/client';
import { MemoryRouter } from 'react-router-dom';
import Blog from './Blog';
import { LanguageContext } from '../contexts/LanguageContext';

globalThis.IS_REACT_ACT_ENVIRONMENT = true;

const renderBlog = (language = 'es') => {
  const container = document.createElement('div');
  document.body.appendChild(container);
  const root = createRoot(container);

  act(() => {
    root.render(
      <MemoryRouter>
        <LanguageContext.Provider value={{ language }}>
          <Blog />
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

describe('Blog', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('renders the approved Spanish static copy', () => {
    const { container, cleanup } = renderBlog('es');

    expect(container.textContent).toContain('Blog');
    expect(container.textContent).toContain(
      'Bienvenido a nuestro blog, donde compartimos artículos sobre las últimas tendencias y avances en tecnología, digitalización y más.'
    );
    expect(container.textContent).toContain('Mis Servicios');
    expect(container.textContent).toContain('Hablemos de tu reto');
    expect(container.textContent).not.toContain('My Services');
    expect(container.textContent).not.toContain('Let’s talk about your challenge');

    cleanup();
  });

  it('renders the approved English static copy without Spanish CTA leakage', () => {
    const { container, cleanup } = renderBlog('en');

    expect(container.textContent).toContain('Blog');
    expect(container.textContent).toContain(
      'Welcome to the blog, where I share articles about technology, digitalization and practical product thinking.'
    );
    expect(container.textContent).toContain('My Services');
    expect(container.textContent).toContain('Let’s talk about your challenge');
    expect(container.textContent).not.toContain('Mis Servicios');
    expect(container.textContent).not.toContain('Hablemos de tu reto');

    cleanup();
  });
});
