import React from 'react';
jest.mock('react-helmet-async');
import PrivateRouteSEO from './components/PrivateRouteSEO';
import { expectPrivateHead, renderRoute } from './seoHeadRouteTestUtils';

it('applies private metadata to /sites', async () => {
  const cleanup = await renderRoute({
    pathname: '/sites',
    routePath: '/sites',
    element: (
      <>
        <PrivateRouteSEO
          title="Vista utilitaria | Elier Loya"
          description="Vista interna con acceso controlado y sin indexacion publica."
        />
        <section>Sites</section>
      </>
    ),
  });

  try {
    expectPrivateHead('Vista utilitaria | Elier Loya');
  } finally {
    await cleanup();
  }
});
