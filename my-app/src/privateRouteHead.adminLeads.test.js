import React from 'react';
jest.mock('react-helmet-async');
import PrivateRouteSEO from './components/PrivateRouteSEO';
import { expectPrivateHead, renderRoute } from './seoHeadRouteTestUtils';

it('applies private metadata to /admin/leads', async () => {
  const cleanup = await renderRoute({
    pathname: '/admin/leads',
    routePath: '/admin/leads',
    element: (
      <>
        <PrivateRouteSEO
          title="Panel interno | Elier Loya"
          description="Panel interno con acceso controlado y sin indexacion publica."
        />
        <section>AdminLeads</section>
      </>
    ),
  });

  try {
    expectPrivateHead('Panel interno | Elier Loya');
  } finally {
    await cleanup();
  }
});
