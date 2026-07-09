import React from 'react';
jest.mock('react-helmet-async');
import RouteSEO from './components/RouteSEO';
import SEO from './components/SEO';
import { getRouteSeoPolicy, INDEXABLE_SITEMAP_PATHS } from './config/routeSeoPolicy';
import { readHeadState, renderRoute } from './seoHeadRouteTestUtils';

describe('route SEO policy', () => {
  it('keeps the sitemap limited to the approved indexable paths', () => {
    expect(INDEXABLE_SITEMAP_PATHS).toEqual(['/', '/privacy-policy', '/terms-of-service']);
    expect(getRouteSeoPolicy('/portafolio')).toMatchObject({
      canonicalPath: '/',
      robots: 'noindex,follow',
    });
    expect(getRouteSeoPolicy('/privacy-policy')).toMatchObject({
      canonicalPath: '/privacy-policy',
      robots: 'index,follow',
    });
  });

  it.each([
    ['/portafolio', 'Carrera profesional | Elier Loya'],
    ['/sobre-mi', 'Sobre Mí | Elier Loya'],
    ['/servicios', 'Cómo trabajo | Elier Loya'],
    ['/contacto', 'Contacto | Elier Loya'],
    ['/blog', 'Blog | Elier Loya'],
    ['/aionlabs', 'Aion Labs | Aion × Elier'],
  ])('renders %s as a noindex alias with canonical home', async (route, title) => {
    const cleanup = await renderRoute({
      pathname: route,
      routePath: route,
      element: (
        <>
          <RouteSEO route={route} />
          <section>{route}</section>
        </>
      ),
    });

    try {
      expect(readHeadState()).toEqual({
        title,
        robots: 'noindex,follow',
        canonical: 'https://elelier.com/',
      });
    } finally {
      await cleanup();
    }
  });

  it.each([
    ['/privacy-policy', 'Política de Privacidad | Elier Loya', 'index,follow'],
    ['/terms-of-service', 'Condiciones del Servicio | Elier Loya', 'index,follow'],
  ])('keeps %s indexable with its own canonical path', async (route, title, robots) => {
    const cleanup = await renderRoute({
      pathname: route,
      routePath: route,
      element: (
        <SEO
          title={title}
          description={`${route} page`}
          pathname={route}
          canonicalPath={route}
          robots={robots}
        />
      ),
    });

    try {
      expect(readHeadState()).toEqual({
        title,
        robots,
        canonical: `https://elelier.com${route}`,
      });
    } finally {
      await cleanup();
    }
  });

  it('keeps home indexable with canonical https://elelier.com/', async () => {
    const cleanup = await renderRoute({
      pathname: '/',
      routePath: '/',
      element: (
        <SEO
          title="Transformo procesos complicados en soluciones que realmente funcionan. | Elier Loya"
          description="Transformo procesos complicados en soluciones que realmente funcionan. Especialista en operaciones, producto digital e IA aplicada."
        />
      ),
    });

    try {
      expect(readHeadState()).toEqual({
        title: 'Transformo procesos complicados en soluciones que realmente funcionan. | Elier Loya',
        robots: 'index,follow',
        canonical: 'https://elelier.com/',
      });
    } finally {
      await cleanup();
    }
  });
});
