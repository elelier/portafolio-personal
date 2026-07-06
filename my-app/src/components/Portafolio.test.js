import React, { act } from 'react';
import { createRoot } from 'react-dom/client';
import Portafolio from './Portafolio';
import { LanguageContext } from '../contexts/LanguageContext';

jest.mock('./utils/languageUtils', () => ({
  getCurrentLanguage: jest.fn(() => 'es')
}));

globalThis.IS_REACT_ACT_ENVIRONMENT = true;

const renderPortafolio = (language = 'es') => {
  const container = document.createElement('div');
  document.body.appendChild(container);
  const root = createRoot(container);

  act(() => {
    root.render(
      <LanguageContext.Provider value={{ language }}>
        <Portafolio />
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

const getCards = (container) => Array.from(container.querySelectorAll('[data-testid="career-card"]'));

const getCard = (container, name) =>
  getCards(container).find((card) => card.getAttribute('data-career-name') === name) || null;

describe('Portafolio career timeline', () => {
  beforeEach(() => {
    window.HTMLElement.prototype.scrollIntoView = jest.fn();
  });

  afterEach(() => {
    jest.restoreAllMocks();
    document.body.innerHTML = '';
  });

  it('shows only the three approved stages in Spanish and hides the retired ones', () => {
    const { container, cleanup } = renderPortafolio('es');

    expect(container.textContent).toContain('Carrera profesional');
    expect(container.textContent).toContain('GoFarma + Farmalisto');
    expect(container.textContent).toContain('CHUBB');
    expect(container.textContent).toContain('Elier');
    expect(container.textContent).not.toContain('Wonderlabs');
    expect(container.textContent).not.toContain('PepsiCo');
    expect(container.textContent).not.toContain('Freelancer');
    expect(getCards(container)).toHaveLength(3);

    cleanup();
  });

  it('shows the three approved stages in the correct English order', () => {
    const { container, cleanup } = renderPortafolio('en');

    expect(container.textContent).toContain('Professional career');
    expect(container.textContent).toContain('GoFarma + Farmalisto');
    expect(container.textContent).toContain('CHUBB');
    expect(container.textContent).toContain('Elier');
    expect(container.textContent).not.toContain('Wonderlabs');
    expect(container.textContent).not.toContain('PepsiCo');
    expect(container.textContent).not.toContain('Freelancer');

    const cards = getCards(container);
    expect(cards).toHaveLength(3);
    expect(cards.map((card) => card.getAttribute('data-career-name'))).toEqual([
      'GoFarma + Farmalisto',
      'CHUBB',
      'Elier'
    ]);

    cleanup();
  });

  it('starts every card collapsed and toggles details on click', () => {
    const { container, cleanup } = renderPortafolio('es');
    const card = getCard(container, 'GoFarma + Farmalisto');

    expect(card.getAttribute('aria-expanded')).toBe('false');
    expect(card.textContent).toContain('Ver detalles ↓');
    expect(card.textContent).not.toContain('Lo que moví');

    act(() => {
      card.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    expect(card.getAttribute('aria-expanded')).toBe('true');
    expect(card.textContent).toContain('Lo que moví');
    expect(card.textContent).toContain('Ocultar detalles ↑');

    act(() => {
      card.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    expect(card.getAttribute('aria-expanded')).toBe('false');
    expect(card.textContent).not.toContain('Lo que moví');

    cleanup();
  });

  it('expands with Enter and Space on keyboard', () => {
    const { container, cleanup } = renderPortafolio('en');
    const card = getCard(container, 'CHUBB');

    expect(card.getAttribute('aria-expanded')).toBe('false');

    act(() => {
      card.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
    });

    expect(card.getAttribute('aria-expanded')).toBe('true');
    expect(card.textContent).toContain('What I moved');

    act(() => {
      card.dispatchEvent(new KeyboardEvent('keydown', { key: ' ', bubbles: true }));
    });

    expect(card.getAttribute('aria-expanded')).toBe('false');

    cleanup();
  });

  it('keeps external links outside the toggle behavior', () => {
    const { container, cleanup } = renderPortafolio('es');
    const card = getCard(container, 'Elier');
    const links = Array.from(card.querySelectorAll('a'));

    expect(links).toHaveLength(2);
    expect(links[0].href).toBe('https://elelier.com/');
    expect(links[1].href).toBe('https://linkedin.com/in/elier/');
    expect(links[0].target).toBe('_blank');
    expect(links[1].target).toBe('_blank');
    expect(links[0].rel).toContain('noopener');
    expect(links[1].rel).toContain('noopener');

    act(() => {
      links[0].dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    expect(card.getAttribute('aria-expanded')).toBe('false');

    cleanup();
  });

  it('shows the approved Farmalisto metrics and the shared LinkedIn link', () => {
    const { container, cleanup } = renderPortafolio('es');
    const card = getCard(container, 'GoFarma + Farmalisto');
    const farmalistoLink = card.querySelector('a');

    expect(card.textContent).toContain('99.8% precisión de inventario');
    expect(card.textContent).toContain('Pedidos en ~2 min');
    expect(card.textContent).toContain('−50% reclamaciones y cancelaciones');
    expect(card.textContent).toContain('+144% ventas');
    expect(card.textContent).toContain('+58% ticket promedio');
    expect(farmalistoLink.href).toBe('https://www.farmalisto.com.mx/');

    cleanup();
  });

  it('shows the approved LinkedIn reuse on CHUBB and Elier', () => {
    const { container, cleanup } = renderPortafolio('en');
    const chubbCard = getCard(container, 'CHUBB');
    const elierCard = getCard(container, 'Elier');
    const chubbLink = chubbCard.querySelector('a');
    const elierLinks = Array.from(elierCard.querySelectorAll('a'));

    expect(chubbCard.textContent).toContain('Digital product');
    expect(chubbCard.textContent).toContain('Operations');
    expect(chubbLink.href).toBe('https://linkedin.com/in/elier/');
    expect(chubbLink.textContent).toBe('View LinkedIn ↗');
    expect(elierLinks.map((link) => link.href)).toEqual([
      'https://elelier.com/',
      'https://linkedin.com/in/elier/'
    ]);

    cleanup();
  });
});
