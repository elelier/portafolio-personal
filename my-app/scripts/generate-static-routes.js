const fs = require('fs');
const path = require('path');

// The production build uses ./build. An override allows an isolated fixture in Jest.
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

const nonPublicRoutes = new Set(['hero-banner', 'tarifas-2024', 'sites', 'client-demo', 'gracias-agenda']);
const indexableRoutes = {
  'privacy-policy': {
    title: 'Política de Privacidad | Elier Loya',
    description: 'Política de privacidad de elelier.com sobre datos personales, cookies, Google Analytics 4, Google Tag Manager, formularios de contacto y derechos de privacidad.',
  },
  'terms-of-service': {
    title: 'Condiciones del Servicio | Elier Loya',
    description: 'Condiciones del servicio y términos de uso aplicables a elelier.com, su contenido, formularios y posibles contrataciones.',
  },
};
const origin = 'https://elelier.com';

function escapeHtml(value) {
  return String(value).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
}

function replaceOrInsertMeta(html, attribute, key, value) {
  const safeValue = escapeHtml(value);
  const replacement = `<meta ${attribute}="${key}" content="${safeValue}">`;
  const pattern = new RegExp(`<meta\\s+${attribute}="${key}"\\s+content="[^"]*"\\s*\\/?>`, 'i');
  return pattern.test(html)
    ? html.replace(pattern, replacement)
    : html.replace('<head>', `<head>\n    ${replacement}`);
}

function buildRouteHtml(indexHtml, route) {
  const policy = indexableRoutes[route];
  const canonical = policy ? `${origin}/${route}` : `${origin}/`;
  let html = indexHtml.replace(
    /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?\s*>/i,
    `<link rel="canonical" href="${canonical}">`
  );

  if (policy) {
    html = html.replace(/<title>[^<]*<\/title>/i, `<title>${escapeHtml(policy.title)}</title>`);
    html = replaceOrInsertMeta(html, 'name', 'description', policy.description);
    html = replaceOrInsertMeta(html, 'property', 'og:title', policy.title);
    html = replaceOrInsertMeta(html, 'property', 'og:description', policy.description);
    html = replaceOrInsertMeta(html, 'property', 'og:url', canonical);
    html = replaceOrInsertMeta(html, 'name', 'twitter:title', policy.title);
    html = replaceOrInsertMeta(html, 'name', 'twitter:description', policy.description);
    html = replaceOrInsertMeta(html, 'name', 'robots', 'index,follow');
  } else {
    // These aliases all point to the homepage, not independent indexable pages.
    // Private and demo routes must not be indexed even before React hydrates.
    const robots = nonPublicRoutes.has(route) ? 'noindex,nofollow,noarchive' : 'noindex,follow';
    html = replaceOrInsertMeta(html, 'name', 'robots', robots);
    html = replaceOrInsertMeta(html, 'property', 'og:url', `${origin}/`);
  }

  return html;
}

if (!fs.existsSync(indexPath)) {
  throw new Error(`Missing build/index.html at ${indexPath}`);
}

const indexHtml = fs.readFileSync(indexPath, 'utf8');
if (!indexHtml.includes('<link rel="canonical" href="https://elelier.com/">')) {
  throw new Error('Missing canonical in build/index.html; refusing to generate incorrect route metadata');
}

for (const route of staticRoutes) {
  const routeDir = path.join(buildDir, route);
  fs.mkdirSync(routeDir, { recursive: true });
  fs.writeFileSync(path.join(routeDir, 'index.html'), buildRouteHtml(indexHtml, route));
}

const root404Path = path.join(buildDir, '404.html');
if (!fs.existsSync(root404Path)) {
  fs.writeFileSync(root404Path, indexHtml);
}

console.log(`Generated static route entries for ${staticRoutes.length} routes.`);
