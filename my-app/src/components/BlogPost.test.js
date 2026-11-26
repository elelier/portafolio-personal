import React, { act } from 'react';
import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Blog from './Blog';
import BlogPost from './BlogPost';
import { parseBlogBody } from './BlogBody';
import { LanguageContext } from '../contexts/LanguageContext';
import { blogPath, getPublishedPosts, readingMinutes } from '../data/blogPosts';

globalThis.IS_REACT_ACT_ENVIRONMENT = true;

const posts = [
  {
    slug: 'primero',
    date: '2026-12-01',
    tags: ['Producto'],
    cover: '/images/blog/portada.webp',
    product: { name: 'MiApp', url: 'https://miapp.example.com/', icon: '/images/blog/icono.svg' },
    es: {
      title: 'Primer artículo',
      summary: 'Resumen del primero.',
      body: [
        '![Portada](/images/blog/portada.webp "Pie")',
        'Un párrafo con **negritas** y [un enlace](https://miapp.example.com/).',
        '## Un subtítulo',
        '- uno\n- dos',
        '![Galería](/images/blog/app-galeria.webp "Galería")\n![Compartir](/images/blog/app-compartir.webp "Compartir")',
        '![Sola](/images/blog/potrero.webp "Sola")',
        '## Otro subtítulo',
        'Cierre.',
      ].join('\n\n'),
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
    en: { title: 'Second article', summary: 'Second summary.', body: 'Text.' },
  },
];

const render = (path, language = 'es') => {
  const container = document.createElement('div');
  document.body.appendChild(container);
  const root = createRoot(container);
  act(() => {
    root.render(
      <HelmetProvider>
        <MemoryRouter initialEntries={[path]}>
          <LanguageContext.Provider value={{ language }}>
            <Routes>
              {['', '/en', '/pt-br'].map((prefix) => (
                <React.Fragment key={prefix}>
                  <Route path={`${prefix}/blog`} element={<Blog posts={posts} />} />
                  <Route path={`${prefix}/blog/:slug`} element={<BlogPost posts={posts} />} />
                </React.Fragment>
              ))}
            </Routes>
          </LanguageContext.Provider>
        </MemoryRouter>
      </HelmetProvider>
    );
  });
  return { container, cleanup: () => { act(() => root.unmount()); container.remove(); } };
};

describe('blog', () => {
  afterEach(() => { document.body.innerHTML = ''; });

  it('lists published posts newest first, featured first, and hides drafts', () => {
    expect(getPublishedPosts(posts).map((p) => p.slug)).toEqual(['segundo', 'primero']);
    const { container, cleanup } = render('/blog');
    const titles = [...container.querySelectorAll('.blog-card__title')].map((h) => h.textContent);
    expect(titles).toEqual(['Segundo artículo', 'Primer artículo']);
    expect(container.querySelector('.blog-card--featured .blog-card__title').textContent).toBe('Segundo artículo');
    expect(container.textContent).not.toContain('Borrador oculto');
    cleanup();
  });

  it('makes each card a single link to its article', () => {
    const { container, cleanup } = render('/blog');
    const cards = [...container.querySelectorAll('.blog-card')];
    cards.forEach((card) => expect(card.querySelectorAll('a.blog-card__link')).toHaveLength(1));
    const withApp = container.querySelector('a.blog-card__link[href="/blog/primero/"]').closest('.blog-card');
    expect(withApp.querySelector('a.blog-card__app').getAttribute('href')).toBe('https://miapp.example.com/');
    expect(container.querySelector('a.blog-card__link[href="/blog/primero/"]')).not.toBeNull();
    cleanup();
  });

  it('keeps the language in links and falls back to Spanish content', () => {
    const { container, cleanup } = render('/en/blog', 'en');
    expect(container.textContent).toContain('Notes from real work');
    expect(container.querySelector('a[href="/en/blog/segundo/"]').textContent).toBe('Second article');
    const spanish = container.querySelector('a[href="/en/blog/primero/"]');
    expect(spanish.textContent).toBe('Primer artículo');
    expect(spanish.closest('h2').getAttribute('lang')).toBe('es');
    expect(container.textContent).toContain('In Spanish');
    cleanup();
  });

  it('shows an empty state when there are no posts', () => {
    const container = document.createElement('div');
    const root = createRoot(container);
    act(() => {
      root.render(
        <MemoryRouter>
          <LanguageContext.Provider value={{ language: 'pt-br' }}>
            <Blog posts={[]} />
          </LanguageContext.Provider>
        </MemoryRouter>
      );
    });
    expect(container.textContent).toContain('Estou preparando os primeiros artigos');
    act(() => root.unmount());
  });

  it('renders an article with cover, table of contents, grouped images and no duplicated cover', () => {
    const { container, cleanup } = render('/blog/primero');
    expect(container.querySelector('h1').textContent).toBe('Primer artículo');
    expect(container.querySelector('.post-cover img').getAttribute('src')).toBe('/images/blog/portada.webp');
    expect(container.querySelectorAll('.post img[src="/images/blog/portada.webp"]')).toHaveLength(1);
    expect(container.querySelector('.post-cover figcaption').textContent).toBe('Pie');
    const toc = [...container.querySelectorAll('.post-toc a')].map((a) => a.getAttribute('href'));
    expect(toc).toEqual(['#un-subtitulo', '#otro-subtitulo']);
    expect(container.querySelector('#un-subtitulo').tagName).toBe('H2');
    expect(container.querySelectorAll('.entrada-galeria--2 figure')).toHaveLength(2);
    expect(container.querySelector('.entrada-figura--celular')).not.toBeNull();
    expect(container.querySelector('.post > p strong').textContent).toBe('negritas');
    expect(container.querySelectorAll('.post > ul li')).toHaveLength(2);
    expect(container.textContent).toContain('min de lectura');
    cleanup();
  });

  it('links to the app of the article from the top card, the text and the closing actions', () => {
    const { container, cleanup } = render('/blog/primero/');
    const callout = container.querySelector('.post-app');
    expect(callout).not.toBeNull();
    expect(callout.textContent).toContain('MiApp');
    expect(callout.querySelector('a').getAttribute('href')).toBe('https://miapp.example.com/');
    const inline = [...container.querySelectorAll('.post > p a')].find((a) => a.textContent === 'un enlace');
    expect(inline.getAttribute('target')).toBe('_blank');
    expect(container.querySelector('.post-end a.blog-button--app').textContent).toContain('Abrir MiApp');
    cleanup();
  });

  it('tells non-Spanish readers when the article is only in Spanish', () => {
    const { container, cleanup } = render('/pt-br/blog/primero/', 'pt-br');
    expect(container.textContent).toContain('apenas em espanhol');
    expect(container.querySelector('.post').getAttribute('lang')).toBe('es');
    expect(container.querySelector('.post-back').getAttribute('href')).toBe('/pt-br/blog/');
    cleanup();
  });

  it('sends unknown or draft slugs back to the blog list of the same language', () => {
    const { container, cleanup } = render('/en/blog/borrador', 'en');
    expect(container.querySelector('.blog-page')).not.toBeNull();
    expect(container.textContent).toContain('Notes from real work');
    cleanup();
  });

  it('builds paths and reading time', () => {
    expect(blogPath('es')).toBe('/blog/');
    expect(blogPath('pt-br', 'x')).toBe('/pt-br/blog/x/');
    expect(readingMinutes(posts[0])).toBe(1);
    expect(parseBlogBody('![a](/x.webp)\n\n![b](/y.webp)')).toHaveLength(2);
    expect(parseBlogBody('![a](/x.webp)\n![b](/y.webp)')).toHaveLength(1);
  });
});
