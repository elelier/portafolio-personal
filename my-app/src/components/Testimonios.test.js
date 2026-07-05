import React, { act } from 'react';
import { createRoot } from 'react-dom/client';
import fs from 'fs';
import path from 'path';
import Testimonios from './Testimonios';
import { LanguageContext } from '../contexts/LanguageContext';

jest.mock('./HeroBanner', () => () => <section data-testid="hero">Hero</section>);
jest.mock('./Soluciones', () => () => <section data-testid="soluciones">Soluciones</section>);
jest.mock('./CasosEstudio', () => () => <section id="casos-reales" data-testid="casos">Casos reales</section>);
jest.mock('./SobreMi', () => () => <section id="sobre-mi" data-testid="sobre-mi">Sobre mí</section>);
jest.mock('./Portafolio', () => () => <section data-testid="portafolio">Portafolio</section>);
jest.mock('./Servicios', () => () => <section data-testid="servicios">Servicios</section>);
jest.mock('./Contacto', () => () => <section data-testid="contacto">Contacto</section>);
jest.mock('./Navegacion', () => () => <nav>Navegacion</nav>);
jest.mock('./Footer', () => () => <footer>Footer</footer>);
jest.mock('./FloatingButton', () => () => null);
jest.mock('./ChatModal', () => () => null);
jest.mock('./SettingsMenu', () => () => null);
jest.mock('./SEO', () => () => null);
jest.mock('./Tarifario', () => () => null);
jest.mock('./ExternalRedirect', () => () => null);
jest.mock('./MockupRedirect', () => () => null);
jest.mock('./ClientSpace', () => () => null);
jest.mock('./ClientDemo', () => () => null);
jest.mock('./Sites', () => () => null);
jest.mock('../pages/AdminLeads', () => () => null);
jest.mock('../pages/PrivacyPolicy', () => () => null);
jest.mock('../pages/TermsOfService', () => () => null);
jest.mock('./AionLabs', () => () => null);
jest.mock('./utils/themeUtils', () => ({
  getCurrentTheme: jest.fn(() => 'dark'),
  getSystemTheme: jest.fn(() => 'dark'),
  initializeTheme: jest.fn(),
  setTheme: jest.fn(),
}));
jest.mock('./utils/generalUtils', () => ({ loadExternalScripts: jest.fn(() => Promise.resolve()) }));

globalThis.IS_REACT_ACT_ENVIRONMENT = true;

const renderWithLanguage = (ui, language = 'es') => {
  const container = document.createElement('div');
  document.body.appendChild(container);
  const root = createRoot(container);

  act(() => {
    root.render(
      <LanguageContext.Provider value={{ language }}>
        {ui}
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

describe('Testimonios', () => {
  afterEach(() => {
    jest.restoreAllMocks();
    document.body.innerHTML = '';
  });

  it('renders the approved Spanish UI and three testimonial names', () => {
    const { container, cleanup } = renderWithLanguage(<Testimonios />, 'es');

    expect(container.textContent).toContain('Testimonios');
    expect(container.textContent).toContain('Lo que dicen de trabajar conmigo');
    expect(container.textContent).toContain('Tres recomendaciones reales de personas que han trabajado conmigo de cerca.');
    expect(container.textContent).toContain('Edgar E. Tienda Delgado');
    expect(container.textContent).toContain('Gloria Higuera');
    expect(container.textContent).toContain('Ilse Jasso');
    expect(Array.from(container.querySelectorAll('.testimonios__initials')).map((node) => node.textContent)).toEqual(['ET', 'GH', 'IJ']);
    expect(container.querySelector('img')).toBeNull();

    cleanup();
  });

  it('renders the approved English UI', () => {
    const { container, cleanup } = renderWithLanguage(<Testimonios />, 'en');

    expect(container.textContent).toContain('Testimonials');
    expect(container.textContent).toContain('What people say about working with me');
    expect(container.textContent).toContain('Three real recommendations from people who have worked closely with me.');
    expect(container.textContent).toContain('Worked with Elier on the same team');
    expect(container.textContent).toContain('Digital project and commercial operations');

    cleanup();
  });

  it('renders the three approved quote extracts without banned filler copy', () => {
    const { container, cleanup } = renderWithLanguage(<Testimonios />, 'es');

    expect(container.textContent).toContain('Elier stood out for his objectivity, commitment, continuous improvement focus and excellent data analysis. He is a dedicated leader, always working with teams to optimize processes and deliver results.');
    expect(container.textContent).toContain('Elier tiene una admirable capacidad de auto-aprendizaje y siempre está buscando cómo mejorar y automatizar procesos. Es una persona confiable, que se rige por principios y valores ante cualquier circunstancia.');
    expect(container.textContent).toContain('No sólo te enfocas en que algo se vea bonito, sino en entender el problema, pensar en las personas que lo van a usar y construir algo que realmente funcione. OneClicTrip hoy tiene mucho más dirección gracias a ti.');
    expect(container.textContent).not.toContain('referencias en proceso');
    expect(container.textContent).not.toContain('coming soon');
    expect(container.textContent).not.toContain('more testimonials soon');
    expect(container.textContent).not.toContain('Diagnóstico Exprés');
    expect(container.textContent).not.toContain('Calendly');
    expect(container.textContent).not.toContain('Cal.com');

    cleanup();
  });

  it('uses the approved LinkedIn links and keeps Ilse without an external link', () => {
    const { container, cleanup } = renderWithLanguage(<Testimonios />, 'es');

    const links = Array.from(container.querySelectorAll('a'));
    const hrefs = links.map((link) => link.getAttribute('href'));

    expect(hrefs).toContain('https://www.linkedin.com/in/edgar-tienda/?locale=en');
    expect(hrefs).toContain('https://www.linkedin.com/in/gloriahiguera/');
    expect(links.filter((link) => link.textContent === 'Ver en LinkedIn')).toHaveLength(2);
    expect(container.textContent).not.toContain('Fuente');

    const ilseCard = Array.from(container.querySelectorAll('.testimonios__card')).find((card) =>
      card.textContent.includes('Ilse Jasso')
    );

    expect(ilseCard.querySelector('a')).toBeNull();

    cleanup();
  });

  it('declares Testimonios between CasosEstudio and SobreMi in App', () => {
    const appSource = fs.readFileSync(path.join(__dirname, '../App.js'), 'utf8');

    expect(appSource.indexOf("{ key: 'casos', Component: CasosEstudio }")).toBeGreaterThan(-1);
    expect(appSource.indexOf("{ key: 'testimonios', Component: Testimonios }")).toBeGreaterThan(-1);
    expect(appSource.indexOf("{ key: 'sobre-mi', Component: SobreMi }")).toBeGreaterThan(-1);
    expect(appSource.indexOf("{ key: 'casos', Component: CasosEstudio }")).toBeLessThan(
      appSource.indexOf("{ key: 'testimonios', Component: Testimonios }")
    );
    expect(appSource.indexOf("{ key: 'testimonios', Component: Testimonios }")).toBeLessThan(
      appSource.indexOf("{ key: 'sobre-mi', Component: SobreMi }")
    );
  });
});
