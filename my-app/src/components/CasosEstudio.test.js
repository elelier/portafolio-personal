import React, { act } from 'react';
import { createRoot } from 'react-dom/client';
import CasosEstudio from './CasosEstudio';
import { LanguageContext } from '../contexts/LanguageContext';

globalThis.IS_REACT_ACT_ENVIRONMENT = true;

const renderCasosEstudio = (language = 'es') => {
  const container = document.createElement('div');
  document.body.appendChild(container);
  const root = createRoot(container);

  act(() => {
    root.render(
      <LanguageContext.Provider value={{ language }}>
        <CasosEstudio />
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

describe('CasosEstudio', () => {
  beforeEach(() => {
    window.HTMLElement.prototype.scrollIntoView = jest.fn();
  });

  afterEach(() => {
    jest.restoreAllMocks();
    document.body.innerHTML = '';
  });

  it('shows the approved Spanish case studies without legacy portfolio cases', () => {
    const { container, cleanup } = renderCasosEstudio('es');

    expect(container.textContent).toContain('Arqidia');
    expect(container.textContent).toContain('OneClicTrip');
    expect(container.textContent).toContain('De un reto concreto a algo que ya funciona');
    expect(container.textContent).toContain('Estrategia, tecnología y operación alineadas para generar resultados medibles.');
    expect(container.textContent).toContain('Ganar visibilidad y organizar su oferta digital.');
    expect(container.textContent).toContain('Operación centralizada y ventas reales.');
    expect(container.textContent).not.toContain('La decisión');
    expect(container.textContent).not.toContain('GoFarma');
    expect(container.textContent).not.toContain('Wonderlabs');
    expect(container.textContent).not.toContain('Farmalisto');

    cleanup();
  });


  it('uses the approved external project links safely', () => {
    const { container, cleanup } = renderCasosEstudio('es');

    const links = Array.from(container.querySelectorAll('a')).filter((link) => link.textContent === 'Ver proyecto');
    const [arqidiaLink, oneClicTripLink] = links;

    expect(links).toHaveLength(2);
    expect(arqidiaLink.getAttribute('href')).toBe('https://arqidia.mx/');
    expect(arqidiaLink.getAttribute('rel')).toBe('noopener noreferrer');
    expect(oneClicTripLink.getAttribute('href')).toBe('https://www.oneclictrip.com/');
    expect(oneClicTripLink.getAttribute('rel')).toBe('noopener noreferrer');

    cleanup();
  });

  it('shows the approved English case copy', () => {
    const { container, cleanup } = renderCasosEstudio('en');

    expect(container.textContent).toContain('From a concrete challenge to something that works');
    expect(container.textContent).toContain('Strategy, technology and operations aligned to generate measurable results.');
    expect(container.textContent).toContain('Architecture');
    expect(container.textContent).toContain('Custom travel');
    expect(container.textContent).toContain('Gain visibility and organize its digital offer.');
    expect(container.textContent).toContain('Centralized operations and real sales.');

    cleanup();
  });

  it('shows own apps as large cards and client work as compact cards, with status and tags', () => {
    const { container, cleanup } = renderCasosEstudio('es');
    const cards = Array.from(container.querySelectorAll('.caso-card'));

    expect(cards.map((card) => card.classList.contains('caso-card--own'))).toEqual([true, true, true, false, false]);
    expect(cards.map((card) => card.querySelector('.caso-card__status').textContent)).toEqual([
      'En uso', 'Piloto', 'Pública', 'Cliente', 'Cliente'
    ]);
    expect(cards[0].querySelector('.caso-card__result').textContent).toContain('El ranchero registra y comparte su hato desde el corral.');
    expect(Array.from(cards[0].querySelectorAll('.caso-card__tags li')).map((tag) => tag.textContent)).toEqual([
      'Funciona sin señal', 'Letra grande', 'Fotos para compartir'
    ]);
    expect(cards[0].querySelector('.caso-card__tags').getAttribute('aria-label')).toBe('Construcción');

    cleanup();
  });

  it('does not render decorative arrows next to case titles', () => {
    const { container, cleanup } = renderCasosEstudio('es');

    expect(container.querySelector('.caso-card__title-row').textContent).not.toContain('→');

    cleanup();
  });

  it('renders descriptive static previews for every case, own apps first', () => {
    const { container, cleanup } = renderCasosEstudio('es');

    const previews = Array.from(container.querySelectorAll('.caso-card__preview img'));

    expect(previews).toHaveLength(5);
    expect(previews[0].getAttribute('alt')).toBe('Pantallas de la app MiRancho sobre una foto de un corral');
    expect(previews[1].getAttribute('alt')).toContain('Pantallas de SeVa');
    expect(previews[2].getAttribute('alt')).toContain('Pantalla de MonterreyRespira');
    expect(previews[3].getAttribute('alt')).toBe('Preview visual del sitio Arqidia');
    expect(previews[4].getAttribute('alt')).toBe('Preview visual del sitio OneClicTrip');
    expect(previews[0].getAttribute('src')).toContain('mirancho');
    expect(previews[1].getAttribute('src')).toContain('seva');
    expect(previews[2].getAttribute('src')).toContain('mtyrespira');
    expect(previews[3].getAttribute('src')).toContain('arqidia');
    expect(previews[4].getAttribute('src')).toContain('oneclictrip');

    cleanup();
  });

  it.each([
    ['es', 'Probar la app', 'Leer artículo', '/blog/app-rancho-de-mi-papa/'],
    ['en', 'Try the app', 'Read the article', '/en/blog/app-rancho-de-mi-papa/'],
    ['pt-br', 'Testar o app', 'Ler artigo', '/pt-br/blog/app-rancho-de-mi-papa/'],
  ])('links the MiRancho case to the live app and the article in %s', (language, appText, articleText, articlePath) => {
    const { container, cleanup } = renderCasosEstudio(language);
    const card = container.querySelector('.caso-card');
    const [appLink, articleLink] = Array.from(card.querySelectorAll('.caso-card__links a'));

    expect(card.querySelector('h3').textContent).toBe('MiRancho');
    expect(appLink.getAttribute('href')).toBe('https://mirancho.elelier.com/');
    expect(appLink.textContent).toBe(appText);
    expect(appLink.getAttribute('rel')).toContain('noopener');
    expect(articleLink.getAttribute('href')).toBe(articlePath);
    expect(articleLink.textContent).toBe(articleText);

    cleanup();
  });

  it.each([
    ['es', 'Probar la app', 'Leer artículo', '/blog/vender-mis-cosas-con-mi-propia-app/'],
    ['en', 'Try the app', 'Read the article', '/en/blog/vender-mis-cosas-con-mi-propia-app/'],
    ['pt-br', 'Testar o app', 'Ler artigo', '/pt-br/blog/vender-mis-cosas-con-mi-propia-app/'],
  ])('links the SeVa case to the live app and the article in %s', (language, appText, articleText, articlePath) => {
    const { container, cleanup } = renderCasosEstudio(language);
    const card = container.querySelectorAll('.caso-card')[1];
    const [appLink, articleLink] = Array.from(card.querySelectorAll('.caso-card__links a'));

    expect(card.querySelector('h3').textContent).toBe('SeVa');
    expect(appLink.getAttribute('href')).toBe('https://seva.elelier.com/');
    expect(appLink.textContent).toBe(appText);
    expect(appLink.getAttribute('rel')).toContain('noopener');
    expect(articleLink.getAttribute('href')).toBe(articlePath);
    expect(articleLink.textContent).toBe(articleText);

    cleanup();
  });

  it.each([
    ['es', 'Probar la app'],
    ['en', 'Try the app'],
    ['pt-br', 'Testar o app'],
  ])('links the MonterreyRespira case only to the live app in %s', (language, appText) => {
    const { container, cleanup } = renderCasosEstudio(language);
    const card = container.querySelectorAll('.caso-card')[2];
    const links = Array.from(card.querySelectorAll('.caso-card__links a'));

    expect(card.querySelector('h3').textContent).toBe('MonterreyRespira');
    expect(links).toHaveLength(1);
    expect(links[0].getAttribute('href')).toBe('https://mtyrespira.elelier.com/');
    expect(links[0].textContent).toBe(appText);
    expect(links[0].getAttribute('rel')).toContain('noopener');

    cleanup();
  });

  it('scrolls the lower CTA to contacto', () => {
    const contacto = document.createElement('section');
    contacto.id = 'contacto';
    document.body.appendChild(contacto);

    const { container, cleanup } = renderCasosEstudio('es');
    const cta = container.querySelector('.casos-estudio__cta');

    expect(cta.textContent).toContain('Cuéntame qué quieres resolver');

    act(() => {
      cta.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    expect(contacto.scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });

    cleanup();
  });

  it('shows the approved English lower CTA copy while keeping the same contact scroll', () => {
    const contacto = document.createElement('section');
    contacto.id = 'contacto';
    document.body.appendChild(contacto);

    const { container, cleanup } = renderCasosEstudio('en');
    const cta = container.querySelector('.casos-estudio__cta');

    expect(cta.textContent).toContain('Tell me what you want to solve');

    act(() => {
      cta.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    expect(contacto.scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });

    cleanup();
  });
});
