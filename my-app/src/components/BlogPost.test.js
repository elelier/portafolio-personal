import React, { act } from 'react';
import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Blog from './Blog';
import BlogPost from './BlogPost';
import { LanguageContext } from '../contexts/LanguageContext';
import { getPublishedPosts } from '../data/blogPosts';

globalThis.IS_REACT_ACT_ENVIRONMENT = true;

const posts = [
  {
    slug: 'primero',
    date: '2026-12-01',
    tags: ['Producto'],
    es: {
      title: 'Primer artículo',
      summary: 'Resumen del primero.',
      body: 'Un párrafo con **negritas**.\n\n## Un subtítulo\n\n- uno\n- dos\n\n![Una vaca](/images/blog/vaca.webp "Pie de foto")',
    },
  },
  {
    slug: 'borrador',
    date: '2026-12-05',
    draft: true,
    es: { title: 'Borrador oculto', summary: 'No debe verse.', body: 'x' },
  },
  {
    slug: 'segundo',
    date: '2026-12-03',
    es: { title: 'Segundo artículo', summary: 'Resumen del segundo.', body: 'Texto.' },
  },
];

const render = (path) => {
  const container = document.createElement('div');
  document.body.appendChild(container);
  const root = createRoot(container);
  act(() => {
    root.render(
      <HelmetProvider>
        <MemoryRouter initialEntries={[path]}>
          <LanguageContext.Provider value={{ language: 'es' }}>
            <Routes>
              <Route path="/blog" element={<Blog posts={posts} />} />
              <Route path="/blog/:slug" element={<BlogPost posts={posts} />} />
            </Routes>
          </LanguageContext.Provider>
        </MemoryRouter>
      </HelmetProvider>
    );
  });
  return { container, cleanup: () => { act(() => root.unmount()); container.remove(); } };
};

describe('blog posts', () => {
  it('lists published posts newest first and hides drafts', () => {
    expect(getPublishedPosts(posts).map((p) => p.slug)).toEqual(['segundo', 'primero']);
    const { container, cleanup } = render('/blog');
    const titles = [...container.querySelectorAll('.articulo h2')].map((h) => h.textContent);
    expect(titles).toEqual(['Segundo artículo', 'Primer artículo']);
    expect(container.textContent).not.toContain('Borrador oculto');
    expect(container.querySelector('a[href="/blog/primero"]')).not.toBeNull();
    cleanup();
  });

  it('shows an empty state when there are no posts', () => {
    const container = document.createElement('div');
    const root = createRoot(container);
    act(() => {
      root.render(
        <MemoryRouter>
          <LanguageContext.Provider value={{ language: 'es' }}>
            <Blog posts={[]} />
          </LanguageContext.Provider>
        </MemoryRouter>
      );
    });
    expect(container.textContent).toContain('Estoy preparando los primeros artículos');
    act(() => root.unmount());
  });

  it('renders a post body with headings, lists and bold text', () => {
    const { container, cleanup } = render('/blog/primero');
    expect(container.querySelector('h1').textContent).toBe('Primer artículo');
    expect(container.querySelector('.entrada-contenido h2').textContent).toBe('Un subtítulo');
    expect(container.querySelectorAll('.entrada-contenido li')).toHaveLength(2);
    expect(container.querySelector('.entrada-contenido strong').textContent).toBe('negritas');
    expect(container.querySelector('figure img').getAttribute('src')).toBe('/images/blog/vaca.webp');
    expect(container.querySelector('figcaption').textContent).toBe('Pie de foto');
    cleanup();
  });

  it('sends unknown or draft slugs back to the blog list', () => {
    const { container, cleanup } = render('/blog/borrador');
    expect(container.querySelector('.blog')).not.toBeNull();
    cleanup();
  });
});
