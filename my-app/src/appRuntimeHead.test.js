import React from 'react';
import { act } from 'react';
import { createRoot } from 'react-dom/client';
jest.unmock('react-helmet-async');
import { HelmetProvider } from 'react-helmet-async';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import SEO from './components/SEO';
import RouteSEO from './components/RouteSEO';
import { LanguageProvider } from './contexts/LanguageContext';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import { getRouteSeoPolicy } from './config/routeSeoPolicy';

globalThis.IS_REACT_ACT_ENVIRONMENT = true;

const resetHead = () => {
  document.title = '';
  document.documentElement.removeAttribute('lang');
  document.head
    .querySelectorAll(
      'meta[charset],meta[name="viewport"],meta[name="description"],meta[name="keywords"],meta[name="robots"],meta[property^="og:"],meta[name^="twitter:"],link[rel="canonical"]'
    )
    .forEach((node) => node.remove());
};

const readHeadState = () => ({
  title: document.title,
  robots: document.head.querySelector('meta[name="robots"]')?.getAttribute('content'),
  canonical: document.head.querySelector('link[rel="canonical"]')?.getAttribute('href'),
});

const waitForCondition = async (assertion, timeoutMs = 3000) => {
  const startedAt = Date.now();

  while (true) {
    try {
      assertion();
      return;
    } catch (error) {
      if (Date.now() - startedAt >= timeoutMs) {
        throw error;
      }
      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 25));
      });
    }
  }
};

const HomeShell = () => {
  const homePolicy = getRouteSeoPolicy('/');

  return (
    <>
      <SEO title={homePolicy.title} description={homePolicy.description} />
      <section>
        <h1>Transformo procesos complicados en soluciones que realmente funcionan.</h1>
      </section>
    </>
  );
};

const routeCases = {
  '/': {
    title: getRouteSeoPolicy('/').title,
    robots: 'index,follow',
    canonical: 'https://elelier.com/',
    visibleText: 'Transformo procesos complicados en soluciones que realmente funcionan.',
    element: <HomeShell />,
  },
  '/privacy-policy': {
    title: 'Política de Privacidad | Elier Loya',
    robots: 'index,follow',
    canonical: 'https://elelier.com/privacy-policy',
    visibleText: 'Política de Privacidad',
    element: <PrivacyPolicy />,
  },
  '/terms-of-service': {
    title: 'Condiciones del Servicio | Elier Loya',
    robots: 'index,follow',
    canonical: 'https://elelier.com/terms-of-service',
    visibleText: 'Condiciones del Servicio',
    element: <TermsOfService />,
  },
  '/portafolio': {
    title: 'Carrera profesional | Elier Loya',
    robots: 'noindex,follow',
    canonical: 'https://elelier.com/',
    visibleText: 'Carrera profesional',
    element: (
      <>
        <RouteSEO route="/portafolio" />
        <section>
          <h1>Carrera profesional</h1>
          <p>Trayectoria profesional visible.</p>
        </section>
      </>
    ),
  },
  '/sobre-mi': {
    title: 'Sobre Mí | Elier Loya',
    robots: 'noindex,follow',
    canonical: 'https://elelier.com/',
    visibleText: 'SOBRE MÍ',
    element: (
      <>
        <RouteSEO route="/sobre-mi" />
        <section>
          <h1>SOBRE MÍ</h1>
          <p>Perfil profesional visible.</p>
        </section>
      </>
    ),
  },
  '/servicios': {
    title: 'Cómo trabajo | Elier Loya',
    robots: 'noindex,follow',
    canonical: 'https://elelier.com/',
    visibleText: 'Cómo trabajo',
    element: (
      <>
        <RouteSEO route="/servicios" />
        <section>
          <h1>Cómo trabajo</h1>
          <p>Método de colaboración visible.</p>
        </section>
      </>
    ),
  },
  '/contacto': {
    title: 'Contacto | Elier Loya',
    robots: 'noindex,follow',
    canonical: 'https://elelier.com/',
    visibleText: 'Cuéntame qué quieres mejorar',
    element: (
      <>
        <RouteSEO route="/contacto" />
        <section>
          <h1>Cuéntame qué quieres mejorar</h1>
          <p>Contacto visible.</p>
        </section>
      </>
    ),
  },
  '/blog': {
    title: 'Blog | Elier Loya',
    robots: 'noindex,follow',
    canonical: 'https://elelier.com/',
    visibleText: 'Blog',
    element: (
      <>
        <RouteSEO route="/blog" />
        <section>
          <h1>Blog</h1>
          <p>Contenido editorial visible.</p>
        </section>
      </>
    ),
  },
  '/aionlabs': {
    title: 'Aion Labs | Aion × Elier',
    robots: 'noindex,follow',
    canonical: 'https://elelier.com/',
    visibleText: 'Aion',
    element: (
      <>
        <RouteSEO route="/aionlabs" />
        <section>
          <h1>Aion</h1>
          <p>Espacio experimental visible.</p>
        </section>
      </>
    ),
  },
};

const renderRouteTree = async (pathname) => {
  const container = document.createElement('div');
  document.body.appendChild(container);
  const root = createRoot(container);
  const route = routeCases[pathname];

  await act(async () => {
    root.render(
      <HelmetProvider>
        <LanguageProvider>
          <MemoryRouter initialEntries={[pathname]}>
            <Routes>
              <Route
                path="*"
                element={
                  <>
                    <SEO
                      title={getRouteSeoPolicy('/').title}
                      description={getRouteSeoPolicy('/').description}
                    />
                    {route.element}
                  </>
                }
              />
            </Routes>
          </MemoryRouter>
        </LanguageProvider>
      </HelmetProvider>
    );
  });

  const cleanup = async () => {
    await act(async () => {
      root.unmount();
    });
    container.remove();
    resetHead();
    document.body.innerHTML = '';
  };

  return { cleanup, route, container };
};

describe('App runtime head on real route tree', () => {
  afterEach(() => {
    resetHead();
    document.body.innerHTML = '';
  });

  it.each([
    '/',
    '/privacy-policy',
    '/terms-of-service',
    '/portafolio',
    '/sobre-mi',
    '/servicios',
    '/contacto',
    '/blog',
    '/aionlabs',
  ])('hydrates the expected head for %s', async (pathname) => {
    const { cleanup, route, container } = await renderRouteTree(pathname);

    try {
      await waitForCondition(() => {
        expect(readHeadState()).toEqual({
          title: route.title,
          robots: route.robots,
          canonical: route.canonical,
        });
      });
      expect(container.textContent).toContain(route.visibleText);
      expect(container.textContent).not.toContain('Esta vista no está disponible públicamente.');
    } finally {
      await cleanup();
    }
  });
});
