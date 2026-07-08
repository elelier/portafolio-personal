import React from 'react';
jest.mock('react-helmet-async');
import PrivateRouteSEO from './components/PrivateRouteSEO';
import { expectPrivateHead, renderRoute } from './seoHeadRouteTestUtils';

it('applies private metadata to /hero-banner', async () => {
  const cleanup = await renderRoute({
    pathname: '/hero-banner',
    routePath: '/hero-banner',
    element: (
      <>
        <PrivateRouteSEO
          title="Vista privada | Elier Loya"
          description="Vista interna con acceso controlado y sin indexacion publica."
        />
        <section>HeroBanner</section>
      </>
    ),
  });

  try {
    expectPrivateHead('Vista privada | Elier Loya');
  } finally {
    await cleanup();
  }
});
