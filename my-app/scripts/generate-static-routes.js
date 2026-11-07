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

const root404Path = path.join(buildDir, '404.html');
if (!fs.existsSync(root404Path)) {
  fs.writeFileSync(root404Path, indexHtml);
}

console.log(`Generated static route entries for ${staticRoutes.length} legacy routes and ${localizedLegalRoutes.length} localized legal routes.`);
