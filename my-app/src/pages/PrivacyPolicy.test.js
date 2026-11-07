import React from 'react';
import { LanguageContext } from '../contexts/LanguageContext';
import { renderRoute } from '../seoHeadRouteTestUtils';
import PrivacyPolicy from './PrivacyPolicy';

globalThis.IS_REACT_ACT_ENVIRONMENT = true;

describe('PrivacyPolicy contact channels', () => {
  it.each([
    ['es', '14. Contacto', 'Si tienes dudas sobre esta política'],
    ['en', '14. Contact', 'For questions about this policy'],
    ['pt-br', '14. Contato', 'Se você tiver dúvidas sobre esta política'],
  ])('provides a dedicated privacy mailto link in %s', async (language, heading, copy) => {
    const cleanup = await renderRoute({
      pathname: language === 'es' ? '/privacy-policy' : `/${language}/privacy-policy`,
      routePath: language === 'es' ? '/privacy-policy' : `/${language}/privacy-policy`,
      element: (
        <LanguageContext.Provider value={{ language }}>
          <PrivacyPolicy />
        </LanguageContext.Provider>
      )
    });

    const sections = Array.from(document.querySelectorAll('.legal-page__section'));
    const contact = sections.find((section) => section.querySelector('h2')?.textContent === heading);
    const emailLinks = document.querySelectorAll('.legal-page a[href^="mailto:"]');

    expect(contact).toBeTruthy();
    expect(contact.textContent).toContain(copy);
    expect(emailLinks).toHaveLength(1);
    expect(emailLinks[0].getAttribute('href')).toBe('mailto:privacidad@elelier.com');
    expect(emailLinks[0].textContent).toBe('privacidad@elelier.com');
    expect(document.querySelector('.legal-page').textContent).not.toContain('loya.elier@gmail.com');
    expect(document.head.querySelector('link[rel="canonical"]')?.getAttribute('href'))
      .toBe(`https://elelier.com${language === 'es' ? '/privacy-policy' : `/${language}/privacy-policy`}`);
    expect(document.head.querySelector('meta[name="robots"]')?.getAttribute('content'))
      .toBe(language === 'es' ? 'index,follow' : 'noindex,follow');
    expect(document.head.querySelector('meta[property="og:image"]')?.getAttribute('content'))
      .toBe('https://elelier.com/images/social/elier-loya-og-2026-v2.jpg');

    await cleanup();
  });

  it('uses a stable canonical even for a direct localized URL with a trailing slash', async () => {
    const cleanup = await renderRoute({
      pathname: '/en/privacy-policy/',
      routePath: '/en/privacy-policy',
      element: (
        <LanguageContext.Provider value={{ language: 'en' }}>
          <PrivacyPolicy />
        </LanguageContext.Provider>
      ),
    });
    expect(document.head.querySelector('link[rel="canonical"]')?.getAttribute('href'))
      .toBe('https://elelier.com/en/privacy-policy');
    await cleanup();
  });
});
