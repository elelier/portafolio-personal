import React from 'react';
jest.mock('react-helmet-async');
import SEO from './components/SEO';
import { readHeadState, renderRoute } from './seoHeadRouteTestUtils';

it('keeps / indexable at runtime', async () => {
  const cleanup = await renderRoute({
    pathname: '/',
    routePath: '/',
    element: (
      <>
        <SEO
          title="Transformo procesos complicados en soluciones que realmente funcionan. | Elier Loya"
          description="Transformo procesos complicados en soluciones que realmente funcionan. Especialista en operaciones, producto digital e IA aplicada."
        />
        <section>Home</section>
      </>
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
