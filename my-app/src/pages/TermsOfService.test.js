import React from 'react';
import { LanguageContext } from '../contexts/LanguageContext';
import { renderRoute } from '../seoHeadRouteTestUtils';
import TermsOfService from './TermsOfService';

globalThis.IS_REACT_ACT_ENVIRONMENT = true;

it.each([
  ['es', '/terms-of-service', 'Condiciones del Servicio', 'index,follow'],
  ['en', '/en/terms-of-service', 'Terms of Service', 'noindex,follow'],
  ['pt-br', '/pt-br/terms-of-service', 'Termos de Serviço', 'noindex,follow'],
  ['pt-br', '/pt-br/terms-of-service/', 'Termos de Serviço', 'noindex,follow'],
])('renders the %s terms with a consistent canonical and language', async (language, pathname, heading, robots) => {
  const cleanup = await renderRoute({
    pathname,
    routePath: pathname.replace(/\/$/, ''),
    element: (
      <LanguageContext.Provider value={{ language }}>
        <TermsOfService />
      </LanguageContext.Provider>
    ),
  });

  expect(document.querySelector('.legal-page h1')?.textContent).toBe(heading);
  expect(document.head.querySelector('link[rel="canonical"]')?.getAttribute('href'))
    .toBe(`https://elelier.com${pathname.replace(/\/$/, '')}`);
  expect(document.head.querySelector('meta[name="robots"]')?.getAttribute('content')).toBe(robots);
  expect(document.head.querySelector('meta[property="og:image"]')?.getAttribute('content'))
    .toBe('https://elelier.com/images/social/elier-loya-og-2026-v2.jpg');

  await cleanup();
});
