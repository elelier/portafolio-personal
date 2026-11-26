const fs = require('fs');
const path = require('path');

const buildDir = process.env.STATIC_ROUTE_BUILD_DIR
  ? path.resolve(process.env.STATIC_ROUTE_BUILD_DIR)
  : path.resolve(__dirname, '..', 'build');
const indexPath = path.join(buildDir, 'index.html');

const staticRoutes = [
  'portafolio',
  'sobre-mi',
  'servicios',
  'contacto',
  'blog',
  'aionlabs',
  'privacy-policy',
  'terms-of-service',
  'hero-banner',
  'tarifas-2024',
  'sites',
  'gracias-agenda',
  'client-demo',
];

const spanishLegalMetadata = {
  'privacy-policy': {
    title: 'Política de Privacidad | Elier Loya',
    description: 'Política de privacidad de elelier.com sobre datos personales, cookies, Google Analytics 4, Google Tag Manager, formularios de contacto y derechos de privacidad.',
  },
  'terms-of-service': {
    title: 'Condiciones del Servicio | Elier Loya',
    description: 'Condiciones del servicio y términos de uso aplicables a elelier.com, su contenido, formularios y posibles contrataciones.',
  },
};

function replaceOrInsertHeadTag(html, pattern, markup) {
  return pattern.test(html)
    ? html.replace(pattern, markup)
    : html.replace('</head>', `    ${markup}\n</head>`);
}

function buildSpanishLegalHtml(sourceHtml, route) {
  const { title, description } = spanishLegalMetadata[route];
  const canonical = `https://elelier.com/${route}/`;
  const headTags = [
    [/<meta\b(?=[^>]*\bname=["']description["'])[^>]*>/i, `<meta name="description" content="${description}" data-rh="true">`],
    [/<meta\b(?=[^>]*\bproperty=["']og:title["'])[^>]*>/i, `<meta property="og:title" content="${title}" data-rh="true">`],
    [/<meta\b(?=[^>]*\bproperty=["']og:description["'])[^>]*>/i, `<meta property="og:description" content="${description}" data-rh="true">`],
    [/<meta\b(?=[^>]*\bproperty=["']og:url["'])[^>]*>/i, `<meta property="og:url" content="${canonical}" data-rh="true">`],
    [/<meta\b(?=[^>]*\bname=["']robots["'])[^>]*>/i, '<meta name="robots" content="index,follow" data-rh="true">'],
    [/<link\b(?=[^>]*\brel=["']canonical["'])[^>]*>/i, `<link rel="canonical" href="${canonical}" data-rh="true">`],
  ];

  return headTags.reduce(
    (html, [pattern, markup]) => replaceOrInsertHeadTag(html, pattern, markup),
    sourceHtml.replace(/<title>[^<]*<\/title>/i, `<title>${title}</title>`)
  );
}

// Translated legal pages serve real direct URLs, but remain out of the sitemap
// until their complete pre-rendered content is available to search crawlers.
const localizedLegalRoutes = [
  { locale: 'en', tag: 'en', path: 'privacy-policy', title: 'Privacy Policy | Elier Loya' },
  { locale: 'en', tag: 'en', path: 'terms-of-service', title: 'Terms of Service | Elier Loya' },
  { locale: 'pt-br', tag: 'pt-BR', path: 'privacy-policy', title: 'Política de Privacidade | Elier Loya' },
  { locale: 'pt-br', tag: 'pt-BR', path: 'terms-of-service', title: 'Termos de Serviço | Elier Loya' },
];

function buildLegalHtml(sourceHtml, { locale, tag, path: route, title }) {
  const canonical = `https://elelier.com/${locale}/${route}`;
  return sourceHtml
    .replace(/<html lang="[^"]*"/i, `<html lang="${tag}"`)
    .replace(/<title>[^<]*<\/title>/i, `<title>${title}</title>`)
    .replace(/<meta\s+property="og:title"[^>]*>/i, `<meta property="og:title" content="${title}" data-rh="true">`)
    .replace(/<meta\s+property="og:url"[^>]*>/i, `<meta property="og:url" content="${canonical}" data-rh="true">`)
    .replace(/<meta\s+name="description"[^>]*>/i, '')
    .replace(/<meta\s+property="og:description"[^>]*>/i, '')
    .replace(/<meta\s+name="keywords"[^>]*>/i, '')
    .replace(/<meta\s+property="og:image:alt"[^>]*>/i, '')
    .replace(/<meta\s+property="og:image"[^>]*>/i, '<meta property="og:image" content="https://elelier.com/images/sites/cover-desktop.jpg" data-rh="true">')
    .replace('</head>', `    <meta name="robots" content="noindex,follow" data-rh="true">\n    <link rel="canonical" href="${canonical}" data-rh="true">\n</head>`);
}

// Blog: /blog y cada artículo publicado llevan sus propias meta etiquetas en el HTML
// estático, para que buscadores y vistas previas al compartir (WhatsApp, LinkedIn) las vean.
function loadPublishedPosts() {
  const babel = require('@babel/core');
  const source = fs.readFileSync(path.resolve(__dirname, '..', 'src', 'data', 'blogPosts.js'), 'utf8');
  const { code } = babel.transformSync(source, {
    babelrc: false,
    configFile: false,
    presets: [[require.resolve('@babel/preset-env'), { targets: { node: 'current' } }]],
  });
  const mod = { exports: {} };
  new Function('module', 'exports', 'require', code)(mod, mod.exports, require);
  return mod.exports.getPublishedPosts();
}

function escapeAttr(value) {
  return String(value).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
}

function buildBlogHtml(sourceHtml, { title, description, canonical, url = canonical, image, imageAlt, type, robots = 'index,follow', lang }) {
  const t = escapeAttr(title);
  const d = escapeAttr(description);
  const tags = [
    [/<meta\b(?=[^>]*\bname=["']description["'])[^>]*>/i, `<meta name="description" content="${d}" data-rh="true">`],
    [/<meta\b(?=[^>]*\bproperty=["']og:title["'])[^>]*>/i, `<meta property="og:title" content="${t}" data-rh="true">`],
    [/<meta\b(?=[^>]*\bproperty=["']og:description["'])[^>]*>/i, `<meta property="og:description" content="${d}" data-rh="true">`],
    [/<meta\b(?=[^>]*\bproperty=["']og:url["'])[^>]*>/i, `<meta property="og:url" content="${url}" data-rh="true">`],
    [/<meta\b(?=[^>]*\bproperty=["']og:type["'])[^>]*>/i, `<meta property="og:type" content="${type}" data-rh="true">`],
    [/<meta\b(?=[^>]*\bname=["']robots["'])[^>]*>/i, `<meta name="robots" content="${robots}" data-rh="true">`],
    [/<link\b(?=[^>]*\brel=["']canonical["'])[^>]*>/i, `<link rel="canonical" href="${canonical}" data-rh="true">`],
  ];
  if (image) {
    tags.push(
      [/<meta\b(?=[^>]*\bproperty=["']og:image["'])[^>]*>/i, `<meta property="og:image" content="${image}" data-rh="true">`],
      [/<meta\b(?=[^>]*\bproperty=["']og:image:alt["'])[^>]*>/i, `<meta property="og:image:alt" content="${escapeAttr(imageAlt || title)}" data-rh="true">`],
      [/<meta\b(?=[^>]*\bname=["']twitter:image["'])[^>]*>/i, `<meta name="twitter:image" content="${image}" data-rh="true">`]
    );
  }
  const base = sourceHtml.replace(/<title>[^<]*<\/title>/i, `<title>${t}</title>`);
  return tags.reduce(
    (html, [pattern, markup]) => replaceOrInsertHeadTag(html, pattern, markup),
    lang ? base.replace(/<html lang="[^"]*"/i, `<html lang="${lang}"`) : base
  );
}

if (!fs.existsSync(indexPath)) {
  throw new Error(`Missing build/index.html at ${indexPath}`);
}

const indexHtml = fs.readFileSync(indexPath, 'utf8');

for (const route of staticRoutes) {
  const routeDir = path.join(buildDir, route);
  fs.mkdirSync(routeDir, { recursive: true });
  fs.writeFileSync(path.join(routeDir, 'index.html'), spanishLegalMetadata[route]
    ? buildSpanishLegalHtml(indexHtml, route)
    : indexHtml);
}

for (const route of localizedLegalRoutes) {
  const routeDir = path.join(buildDir, route.locale, route.path);
  fs.mkdirSync(routeDir, { recursive: true });
  fs.writeFileSync(path.join(routeDir, 'index.html'), buildLegalHtml(indexHtml, route));
}

const publishedPosts = loadPublishedPosts();
const blogLocales = [
  { prefix: '', lang: null, robots: 'index,follow' },
  { prefix: 'en', lang: 'en', robots: 'noindex,follow' },
  { prefix: 'pt-br', lang: 'pt-BR', robots: 'noindex,follow' },
];
const blogDescriptions = {
  '': 'Cómo pienso cuando un proceso se atora, cómo decido qué vale la pena construir y qué aprendo cuando alguien usa lo que hice.',
  en: 'How I think when a process gets stuck, how I decide what is worth building, and what I learn when someone uses what I made.',
  'pt-br': 'Como penso quando um processo trava, como decido o que vale a pena construir e o que aprendo quando alguém usa o que eu fiz.',
};
for (const { prefix, lang, robots } of blogLocales) {
  const urlBase = prefix ? `https://elelier.com/${prefix}/blog/` : 'https://elelier.com/blog/';
  const listDir = path.join(buildDir, prefix, 'blog');
  fs.mkdirSync(listDir, { recursive: true });
  fs.writeFileSync(path.join(listDir, 'index.html'), buildBlogHtml(indexHtml, {
    title: 'Blog | Elier Loya',
    description: blogDescriptions[prefix],
    canonical: 'https://elelier.com/blog/',
    url: urlBase,
    type: 'website',
    robots,
    lang,
  }));
  for (const post of publishedPosts) {
    const copy = (prefix && post[prefix]) || post.es;
    const routeDir = path.join(listDir, post.slug);
    fs.mkdirSync(routeDir, { recursive: true });
    const image = post.ogImage || post.cover;
    fs.writeFileSync(path.join(routeDir, 'index.html'), buildBlogHtml(indexHtml, {
      title: `${copy.title} | Elier Loya`,
      description: copy.summary,
      canonical: `https://elelier.com/blog/${post.slug}/`,
      url: `${urlBase}${post.slug}/`,
      image: image ? `https://elelier.com${image}` : undefined,
      imageAlt: copy.title,
      type: 'article',
      robots,
      lang,
    }));
  }
}

const root404Path = path.join(buildDir, '404.html');
if (!fs.existsSync(root404Path)) {
  fs.writeFileSync(root404Path, indexHtml);
}

console.log(`Generated static route entries for ${staticRoutes.length} legacy routes, ${localizedLegalRoutes.length} localized legal routes and ${publishedPosts.length} blog posts.`);
