// Generate locale-specific HTML that is meaningful before JavaScript loads.
// CRA remains the runtime; Cloudflare Pages serves these files for direct visits.
const fs = require('fs');
const path = require('path');

const outputDir = process.env.STATIC_ROUTE_BUILD_DIR
  ? path.resolve(process.env.STATIC_ROUTE_BUILD_DIR)
  : path.resolve(__dirname, '..', 'build');
const source = path.join(outputDir, 'index.html');
const origin = 'https://elelier.com';

const localized = {
  en: {
    tag: 'en',
    ogLocale: 'en_US',
    title: 'I turn complex processes into solutions that actually work | Elier Loya',
    description: 'Digital product, operations, automation and applied AI. I turn complex business challenges into practical solutions.',
    headline: 'I turn complex processes into solutions that actually work.',
    introduction: 'I combine operations, digital product and applied AI to solve real business challenges.',
    sections: ['Digital products and websites', 'Automation and process improvement', 'Real projects and professional experience'],
    contact: 'Contact Elier',
  },
  'pt-br': {
    tag: 'pt-BR',
    ogLocale: 'pt_BR',
    title: 'Transformo processos complexos em soluções que realmente funcionam | Elier Loya',
    description: 'Produto digital, operações, automação e IA aplicada. Transformo desafios de negócios em soluções práticas.',
    headline: 'Transformo processos complexos em soluções que realmente funcionam.',
    introduction: 'Uno operações, produto digital e IA aplicada para resolver desafios reais dos negócios.',
    sections: ['Produtos digitais e sites', 'Automação e melhoria de processos', 'Projetos reais e trajetória profissional'],
    contact: 'Entre em contato com Elier',
  }
};

const homePaths = ['/', '/en/', '/pt-br/'];
const localeHreflang = ['es', 'en', 'pt-BR'];

function escapeHtml(text) {
  return String(text).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
}

function setMeta(html, attribute, key, value) {
  const tag = `<meta ${attribute}="${key}" content="${escapeHtml(value)}">`;
  const pattern = new RegExp(`<meta\\s+${attribute}="${key}"\\s+content="[^"]*"\\s*\\/?>`, 'i');
  return pattern.test(html) ? html.replace(pattern, tag) : html.replace('</head>', `    ${tag}\n</head>`);
}

function generateLocaleHtml(sourceHtml, lang, info) {
  const canonical = origin + (lang === 'en' ? '/en/' : '/pt-br/');
  let html = sourceHtml.replace(/<html lang="[^"]*"/i, `<html lang="${info.tag}"`);
  html = html.replace(/<title>[^<]*<\/title>/i, `<title>${escapeHtml(info.title)}</title>`);
  html = setMeta(html, 'name', 'description', info.description);
  html = setMeta(html, 'property', 'og:title', info.title);
  html = setMeta(html, 'property', 'og:description', info.description);
  html = setMeta(html, 'property', 'og:url', canonical);
  html = setMeta(html, 'property', 'og:locale', info.ogLocale);
  html = setMeta(html, 'property', 'og:image', origin + '/images/sites/cover-desktop.jpg');
  html = setMeta(html, 'name', 'twitter:image', origin + '/images/sites/cover-desktop.jpg');
  html = setMeta(html, 'name', 'twitter:title', info.title);
  html = setMeta(html, 'name', 'twitter:description', info.description);
  html = setMeta(html, 'name', 'robots', 'index,follow');
  // Keep the JSON-LD image stable as well as the social card image.
  html = html.replace(/https:\/\/elelier\.com\/static\/media\/eleliercom\.[a-z0-9]+\.png/g, origin + '/images/sites/cover-desktop.jpg');
  html = html.replace(/<link\s+rel="canonical"[^>]*>/gi, '');
  html = html.replace(/<link\s+rel="alternate"\s+hreflang="[^"]+"[^>]*>/gi, '');
  const alternateTags = homePaths.map((route, i) => `<link rel="alternate" hreflang="${localeHreflang[i]}" href="${origin + route}">`).join('\n    ');
  html = html.replace('</head>', `    <link rel="canonical" href="${canonical}">\n    ${alternateTags}\n    <link rel="alternate" hreflang="x-default" href="${origin}/">\n</head>`);
  const preview = `<main lang="${info.tag}" aria-label="Portfolio introduction">
      <h1>${escapeHtml(info.headline)}</h1>
      <p>${escapeHtml(info.introduction)}</p>
      <ul>${info.sections.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul>
      <p><a href="mailto:hola@elelier.com">${escapeHtml(info.contact)}</a></p>
    </main>`;
  if (!html.includes('<div id="root"></div>')) {
    throw new Error('Cannot find CRA root in localized HTML source');
  }
  return html.replace('<div id="root"></div>', `<div id="root">${preview}</div>`);
}

if (!fs.existsSync(source)) throw new Error(`Missing build/index.html: ${source}`);
const sourceHtml = fs.readFileSync(source, 'utf8');
for (const [lang, info] of Object.entries(localized)) {
  const directory = path.join(outputDir, lang);
  fs.mkdirSync(directory, { recursive: true });
  fs.writeFileSync(path.join(directory, 'index.html'), generateLocaleHtml(sourceHtml, lang, info));
}
console.log('Generated localized homepage HTML for en and pt-br.');
