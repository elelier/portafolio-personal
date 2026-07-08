import React from 'react';
jest.mock('react-helmet-async');
import PrivateRouteSEO from './components/PrivateRouteSEO';
import { expectPrivateHead, renderRoute } from './seoHeadRouteTestUtils';

it('applies private metadata to /mockup/:id', async () => {
  const cleanup = await renderRoute({
    pathname: '/mockup/00132',
    routePath: '/mockup/:id',
    element: (
      <>
        <PrivateRouteSEO
          title="Ruta privada | Elier Loya"
          description="Ruta privada con acceso controlado y sin indexacion publica."
        />
        <section>Mockup</section>
      </>
    ),
  });

  try {
    expectPrivateHead('Ruta privada | Elier Loya');
  } finally {
    await cleanup();
  }
});
