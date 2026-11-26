// Artículos del blog. Cada post vive aquí como datos para que publicar uno nuevo
// sea agregar un objeto, sin tocar componentes.
//
// Formato del cuerpo (`body`): texto plano con párrafos separados por una línea en blanco.
//   "## Subtítulo"   -> subtítulo
//   "- elemento"     -> lista (líneas consecutivas)
//   "> cita"         -> cita
//   ![texto alternativo](/images/blog/foto.webp "Pie de foto")  -> imagen (sola en su párrafo)
//   **negritas**     -> negritas dentro del texto
//
// `draft: true` oculta el post del listado y de su URL pública.

const blogPosts = [
  // {
  //   slug: 'mi-primer-articulo',
  //   date: '2026-12-01',
  //   tags: ['Producto', 'IA'],
  //   draft: true,
  //   es: {
  //     title: 'Título del artículo',
  //     summary: 'Resumen de una o dos líneas para el listado y la meta descripción.',
  //     body: `Primer párrafo.\n\n## Subtítulo\n\nOtro párrafo.`,
  //   },
  // },
];

export function getPublishedPosts(posts = blogPosts) {
  return posts
    .filter((post) => !post.draft)
    .slice()
    .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
}

export function getPostBySlug(slug, posts = blogPosts) {
  return getPublishedPosts(posts).find((post) => post.slug === slug) || null;
}

export function getPostCopy(post, language = 'es') {
  return post[language] || post.es;
}

export function formatPostDate(isoDate, language = 'es') {
  const tag = { es: 'es-MX', en: 'en-US', 'pt-br': 'pt-BR' }[language] || 'es-MX';
  const date = new Date(`${isoDate}T12:00:00Z`);
  return new Intl.DateTimeFormat(tag, { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(date);
}

export default blogPosts;
