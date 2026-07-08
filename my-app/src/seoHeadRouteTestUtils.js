import React, { act } from 'react';
import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

globalThis.IS_REACT_ACT_ENVIRONMENT = true;

export const readHeadState = () => ({
  title: document.title,
  robots: document.head.querySelector('meta[name="robots"]')?.getAttribute('content'),
  canonical: document.head.querySelector('link[rel="canonical"]')?.getAttribute('href'),
});

export const resetHead = () => {
  document.title = '';
  document.documentElement.removeAttribute('lang');
  document.head
    .querySelectorAll(
      'meta[charset],meta[name="viewport"],meta[name="description"],meta[name="keywords"],meta[name="robots"],meta[property^="og:"],meta[name^="twitter:"],link[rel="canonical"]'
    )
    .forEach((node) => node.remove());
};

export const expectPrivateHead = (expectedTitle) => {
  expect(readHeadState()).toEqual({
    title: expectedTitle,
    robots: 'noindex,nofollow,noarchive',
    canonical: 'https://elelier.com/',
  });
  expect(document.title.toLowerCase()).not.toContain('token');
  expect(document.title.toLowerCase()).not.toContain('proyecto');
  expect(document.title.toLowerCase()).not.toContain('documento');
  expect(document.title).not.toContain('00132');
};

export const renderRoute = async ({ pathname, routePath, element }) => {
  const container = document.createElement('div');
  document.body.appendChild(container);
  const root = createRoot(container);
  const helmetContext = {};

  await act(async () => {
    root.render(
      <HelmetProvider context={helmetContext}>
        <MemoryRouter initialEntries={[pathname]}>
          <Routes>
            <Route path={routePath} element={element} />
          </Routes>
        </MemoryRouter>
      </HelmetProvider>
    );
  });

  await act(async () => {
    await Promise.resolve();
    await new Promise((resolve) => {
      setTimeout(resolve, 0);
    });
  });

  if (!document.head.querySelector('meta[name="robots"]') || !document.title) {
    const helmet = helmetContext.helmet;

    if (helmet) {
      resetHead();

      const fragments = [
        helmet.title?.toString() || '',
        helmet.meta?.toString() || '',
        helmet.link?.toString() || '',
      ].join('');

      const parser = document.createElement('div');
      parser.innerHTML = fragments;

      Array.from(parser.children).forEach((node) => {
        if (node.tagName === 'TITLE') {
          document.title = node.textContent || '';
          return;
        }

        document.head.appendChild(node.cloneNode(true));
      });
    }
  }

  return async () => {
    await act(async () => {
      root.unmount();
    });
    container.remove();
    resetHead();
    document.body.innerHTML = '';
  };
};
