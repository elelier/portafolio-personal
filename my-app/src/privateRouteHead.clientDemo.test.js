import React from 'react';
jest.mock('react-helmet-async');
import PrivateRouteSEO from './components/PrivateRouteSEO';
import { expectPrivateHead, renderRoute } from './seoHeadRouteTestUtils';

it('applies private metadata to /client-demo', async () => {
  const cleanup = await renderRoute({
    pathname: '/client-demo',
    routePath: '/client-demo',
    element: (
      <>
        <PrivateRouteSEO
          title="Ruta de demostracion | Elier Loya"
          description="Demostracion interna con acceso controlado y sin indexacion publica."
        />
        <section>ClientDemo</section>
      </>
    ),
  });

  try {
    expectPrivateHead('Ruta de demostracion | Elier Loya');
  } finally {
    await cleanup();
  }
});
