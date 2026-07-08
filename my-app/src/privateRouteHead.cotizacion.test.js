import React from 'react';
jest.mock('react-helmet-async');
import PrivateRouteSEO from './components/PrivateRouteSEO';
import { expectPrivateHead, renderRoute } from './seoHeadRouteTestUtils';

it('applies private metadata to /cotizacion/:id', async () => {
  const cleanup = await renderRoute({
    pathname: '/cotizacion/00132',
    routePath: '/cotizacion/:id',
    element: (
      <>
        <PrivateRouteSEO
          title="Ruta privada | Elier Loya"
          description="Ruta privada con acceso controlado y sin indexacion publica."
        />
        <section>Cotizacion</section>
      </>
    ),
  });

  try {
    expectPrivateHead('Ruta privada | Elier Loya');
  } finally {
    await cleanup();
  }
});
