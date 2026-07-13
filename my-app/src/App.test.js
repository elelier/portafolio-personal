const fs = require('fs');
const path = require('path');
import React, { act } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

globalThis.IS_REACT_ACT_ENVIRONMENT = true;

jest.mock('./components/HeroBanner', () => () => <header id="hero-banner" />);
jest.mock('./components/Soluciones', () => () => <section id="soluciones" />);
jest.mock('./components/CasosEstudio', () => () => <section id="casos-reales" />);
jest.mock('./components/Testimonios', () => () => <section id="testimonios" />);
jest.mock('./components/Servicios', () => () => <section id="como-trabajo" />);
jest.mock('./components/SobreMi', () => () => <section id="sobre-mi" />);
jest.mock('./components/Portafolio', () => () => <section id="portafolio" />);
jest.mock('./components/Contacto', () => () => <section id="contacto" />);
jest.mock('./components/Navegacion', () => () => null);
jest.mock('./components/Footer', () => () => null);
jest.mock('./components/SettingsMenu', () => () => null);
jest.mock('./components/FloatingButton', () => () => null);
jest.mock('./components/ChatModal', () => () => null);

describe('App public diagnosis removal', () => {
  const appSource = fs.readFileSync(path.join(__dirname, 'App.js'), 'utf8');

  it('does not import or render LeadQualifier on the public home', () => {
    expect(appSource).not.toContain("import LeadQualifier");
    expect(appSource).not.toContain("Component: LeadQualifier");
    expect(appSource).not.toContain("key: 'diagnostico'");
  });

  it('does not render PruebaSocial on the public home', () => {
    expect(appSource).not.toContain("import PruebaSocial");
    expect(appSource).not.toContain("key: 'prueba-social'");
  });

  it('does not expose the public gracias-agenda route', () => {
    expect(appSource).not.toContain('/gracias-agenda');
  });

  it('renders the landing sections in the approved narrative order', () => {
    const sectionOrder = [
      "{ key: 'hero', Component: HeroBanner }",
      "{ key: 'soluciones', Component: Soluciones }",
      "{ key: 'casos', Component: CasosEstudio }",
      "{ key: 'testimonios', Component: Testimonios }",
      "{ key: 'servicios', Component: Servicios }",
      "{ key: 'sobre-mi', Component: SobreMi }",
      "{ key: 'portafolio', Component: Portafolio }",
      "{ key: 'contacto', Component: Contacto }"
    ];
    const positions = sectionOrder.map((entry) => appSource.indexOf(entry));

    expect(positions.every((position) => position >= 0)).toBe(true);
    expect(positions).toEqual([...positions].sort((a, b) => a - b));
  });

  it('renders the home sections in the approved DOM order', async () => {
    const container = document.createElement('div');
    document.body.appendChild(container);
    const root = createRoot(container);

    await act(async () => {
      root.render(<App initialLanguage="es" />);
    });

    const actualOrder = Array.from(container.querySelectorAll('section[id], header[id]'))
      .map((element) => element.id)
      .filter((id) => ['hero-banner', 'soluciones', 'casos-reales', 'testimonios', 'como-trabajo', 'sobre-mi', 'portafolio', 'contacto'].includes(id));

    expect(actualOrder).toEqual([
      'hero-banner',
      'soluciones',
      'casos-reales',
      'testimonios',
      'como-trabajo',
      'sobre-mi',
      'portafolio',
      'contacto'
    ]);

    act(() => root.unmount());
    container.remove();
  });
});
