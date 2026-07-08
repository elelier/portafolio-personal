import React from 'react';
jest.mock('react-helmet-async');
import PrivateRouteSEO from './components/PrivateRouteSEO';
import { expectPrivateHead, renderRoute } from './seoHeadRouteTestUtils';

it('applies private metadata to /tarifas-2024', async () => {
  const cleanup = await renderRoute({
    pathname: '/tarifas-2024',
    routePath: '/tarifas-2024',
    element: (
      <>
        <PrivateRouteSEO
          title="Ruta utilitaria | Elier Loya"
          description="Ruta utilitaria con acceso controlado y sin indexacion publica."
        />
        <section>Tarifario</section>
      </>
    ),
  });

  try {
    expectPrivateHead('Ruta utilitaria | Elier Loya');
  } finally {
    await cleanup();
  }
});
