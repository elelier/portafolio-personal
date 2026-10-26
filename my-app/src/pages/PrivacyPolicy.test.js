import React from 'react';
import { LanguageContext } from '../contexts/LanguageContext';
import { renderRoute } from '../seoHeadRouteTestUtils';
import PrivacyPolicy from './PrivacyPolicy';

globalThis.IS_REACT_ACT_ENVIRONMENT = true;

describe('PrivacyPolicy contact channels', () => {
  it.each([
    ['es', '14. Contacto', 'Si tienes dudas sobre esta política'],
    ['en', '14. Contact', 'For questions about this policy']
  ])('provides a dedicated privacy mailto link in %s', async (language, heading, copy) => {
    const cleanup = await renderRoute({
      pathname: '/privacy-policy',
      routePath: '/privacy-policy',
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

    await cleanup();
  });
});
