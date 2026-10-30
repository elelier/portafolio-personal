import React, { act } from 'react';
import { createRoot } from 'react-dom/client';
jest.unmock('react-helmet-async');
import { HelmetProvider } from 'react-helmet-async';
import { MemoryRouter } from 'react-router-dom';
import fs from 'fs';
import os from 'os';
import path from 'path';
import { spawnSync } from 'child_process';
import SEO from './components/SEO';
import { HOME_COPY } from './i18n/locales';

globalThis.IS_REACT_ACT_ENVIRONMENT = true;

it('owns the statically generated SEO head, leaving no conflicting tags after a locale change', async () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'elelier-head-'));
  const container = document.createElement('div');
  document.body.appendChild(container);
  const root = createRoot(container);
  const tracked = 'link[rel="canonical"],link[rel="alternate"],meta[name="description"],meta[property="og:url"],meta[property="og:locale"]';

  try {
    fs.copyFileSync(path.resolve(__dirname, '../public/index.html'), path.join(dir, 'index.html'));
    const built = spawnSync(process.execPath, [path.resolve(__dirname, '../scripts/generate-localized-home.js')], {
      env: { ...process.env, STATIC_ROUTE_BUILD_DIR: dir }, encoding: 'utf8'
    });
    expect(built.status).toBe(0);
    const initial = new DOMParser().parseFromString(fs.readFileSync(path.join(dir, 'pt-br/index.html'), 'utf8'), 'text/html');
    initial.head.querySelectorAll(tracked).forEach((tag) => document.head.appendChild(tag.cloneNode(true)));

    const renderLocale = async (lang, route, locale) => {
      await act(async () => {
        root.render(
          <HelmetProvider>
            <MemoryRouter initialEntries={[route]}>
              <SEO title={HOME_COPY[lang].title} description={HOME_COPY[lang].description}
                pathname={route} canonicalPath={route} locale={locale} />
            </MemoryRouter>
          </HelmetProvider>
        );
      });
      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 75));
      });
    };

    await renderLocale('pt-br', '/pt-br/', 'pt_BR');
    await renderLocale('en', '/en/', 'en_US');

    expect([...document.head.querySelectorAll('link[rel="canonical"]')].map((tag) => tag.href))
      .toEqual(['https://elelier.com/en/']);
    expect([...document.head.querySelectorAll('meta[property="og:url"]')].map((tag) => tag.content))
      .toEqual(['https://elelier.com/en/']);
    expect([...document.head.querySelectorAll('meta[property="og:locale"]')].map((tag) => tag.content))
      .toEqual(['en_US']);
    expect([...document.head.querySelectorAll('meta[name="description"]')].map((tag) => tag.content))
      .toEqual([HOME_COPY.en.description]);
    expect(document.head.querySelectorAll('link[rel="alternate"][hreflang]')).toHaveLength(4);
  } finally {
    await act(async () => root.unmount());
    container.remove();
    document.head.querySelectorAll(tracked).forEach((tag) => tag.remove());
    fs.rmSync(dir, { recursive: true, force: true });
  }
});
