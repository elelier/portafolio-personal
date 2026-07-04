import React, { act } from 'react';
import { createRoot } from 'react-dom/client';
import { MemoryRouter } from 'react-router-dom';
import Contacto from './Contacto';
import { LanguageContext } from '../contexts/LanguageContext';

globalThis.IS_REACT_ACT_ENVIRONMENT = true;

const renderContacto = (language = 'es') => {
  const container = document.createElement('div');
  document.body.appendChild(container);
  const root = createRoot(container);

  act(() => {
    root.render(
      <MemoryRouter>
        <LanguageContext.Provider value={{ language }}>
          <Contacto />
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

describe('Contacto', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('removes public Calendly references and exposes the resume as a safe PDF link in Spanish', () => {
    const { container, cleanup } = renderContacto('es');

    expect(container.textContent).not.toContain('Agenda 15 minutos');
    expect(container.textContent).not.toContain('Agenda y Documentos');
    expect(container.innerHTML).not.toContain('calendly.com');

    const resumeLink = Array.from(container.querySelectorAll('a')).find((link) => link.textContent.includes('Ver CV (PDF)'));

    expect(resumeLink).toBeTruthy();
    expect(resumeLink.getAttribute('target')).toBe('_blank');
    expect(resumeLink.getAttribute('rel')).toBe('noopener noreferrer');
    expect(resumeLink.hasAttribute('download')).toBe(false);

    cleanup();
  });

  it('renders the approved English resume copy', () => {
    const { container, cleanup } = renderContacto('en');

    expect(container.textContent).not.toContain('Schedule 15 minutes');
    expect(container.textContent).toContain('View resume (PDF)');

    cleanup();
  });
});
