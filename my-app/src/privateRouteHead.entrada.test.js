import React from 'react';
jest.mock('react-helmet-async');
import PrivateRouteSEO from './components/PrivateRouteSEO';
import { expectPrivateHead, renderRoute } from './seoHeadRouteTestUtils';

it('applies private metadata to /entradas/2408_IA_Transforma_ecommerce', async () => {
  const cleanup = await renderRoute({
    pathname: '/entradas/2408_IA_Transforma_ecommerce',
    routePath: '/entradas/2408_IA_Transforma_ecommerce',
    element: (
      <>
        <PrivateRouteSEO
          title="Contenido privado | Elier Loya"
          description="Contenido interno con acceso controlado y sin indexacion publica."
        />
        <section>Entrada</section>
      </>
    ),
  });

  try {
    expectPrivateHead('Contenido privado | Elier Loya');
  } finally {
    await cleanup();
  }
});
