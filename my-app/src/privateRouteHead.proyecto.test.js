import React from 'react';
jest.mock('react-helmet-async');
import PrivateRouteSEO from './components/PrivateRouteSEO';
import { LanguageContext } from './contexts/LanguageContext';
import { expectPrivateHead, renderRoute } from './seoHeadRouteTestUtils';

jest.mock('./components/utils/generalUtils', () => ({
  getMotionAwareScrollBehavior: jest.fn(() => 'auto'),
  loadExternalScripts: jest.fn(() => Promise.resolve()),
}));

const ClientSpace = require('./components/ClientSpace').default;

it('applies private metadata to /proyecto/:token when mounted as a real wrapped route', async () => {
  const cleanup = await renderRoute({
    pathname: '/proyecto/token-inexistente',
    routePath: '/proyecto/:token',
    element: (
      <>
        <PrivateRouteSEO
          title="Espacio de cliente | Elier Loya"
          description="Espacio de cliente con acceso controlado y sin indexacion publica."
        />
        <LanguageContext.Provider value={{ language: 'es' }}>
          <ClientSpace />
        </LanguageContext.Provider>
      </>
    ),
  });

  try {
    expectPrivateHead('Espacio de cliente | Elier Loya');
  } finally {
    await cleanup();
  }
});
