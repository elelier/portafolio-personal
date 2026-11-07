const fs = require('fs');
const os = require('os');
const path = require('path');
const { spawnSync } = require('child_process');

const sourceIndexPath = path.resolve(__dirname, '../public/index.html');
const generatorPath = path.resolve(__dirname, '../scripts/generate-static-routes.js');

const spanishLegalPages = [
  {
    route: 'privacy-policy',
    title: 'Política de Privacidad | Elier Loya',
    description: 'Política de privacidad de elelier.com sobre datos personales, cookies, Google Analytics 4, Google Tag Manager, formularios de contacto y derechos de privacidad.',
  },
  {
    route: 'terms-of-service',
    title: 'Condiciones del Servicio | Elier Loya',
    description: 'Condiciones del servicio y términos de uso aplicables a elelier.com, su contenido, formularios y posibles contrataciones.',
  },
];

describe('server-delivered Spanish legal head', () => {
  let temporaryBuildDir;
  let originalHtml;

  beforeEach(() => {
    temporaryBuildDir = fs.mkdtempSync(path.join(os.tmpdir(), 'elelier-legal-static-'));
    originalHtml = fs.readFileSync(sourceIndexPath, 'utf8');
    fs.writeFileSync(path.join(temporaryBuildDir, 'index.html'), originalHtml);
    const generated = spawnSync(process.execPath, [generatorPath], {
      env: { ...process.env, STATIC_ROUTE_BUILD_DIR: temporaryBuildDir },
      encoding: 'utf8',
    });
    expect(generated.status).toBe(0);
  });

  afterEach(() => {
    fs.rmSync(temporaryBuildDir, { recursive: true, force: true });
  });

  it.each(spanishLegalPages)('generates specific initial metadata for /$route/', ({ route, title, description }) => {
    const html = fs.readFileSync(path.join(temporaryBuildDir, route, 'index.html'), 'utf8');
    const head = new DOMParser().parseFromString(html, 'text/html').head;
    const attr = (selector, name) => head.querySelector(selector)?.getAttribute(name);
    const canonical = `https://elelier.com/${route}/`;

    expect(head.querySelectorAll('title')).toHaveLength(1);
    expect(head.querySelector('title').textContent).toBe(title);
    expect(head.querySelectorAll('meta[name="description"]')).toHaveLength(1);
    expect(attr('meta[name="description"]', 'content')).toBe(description);
    expect(attr('meta[property="og:title"]', 'content')).toBe(title);
    expect(attr('meta[property="og:description"]', 'content')).toBe(description);
    expect(attr('meta[property="og:url"]', 'content')).toBe(canonical);
    expect(head.querySelectorAll('link[rel="canonical"]')).toHaveLength(1);
    expect(attr('link[rel="canonical"]', 'href')).toBe(canonical);
    expect(head.querySelectorAll('meta[name="robots"]')).toHaveLength(1);
    expect(attr('meta[name="robots"]', 'content')).toBe('index,follow');
    expect(attr('meta[property="og:image"]', 'content'))
      .toBe('https://elelier.com/images/social/elier-loya-og-2026-v2.jpg');
    expect(attr('meta[name="twitter:image"]', 'content'))
      .toBe('https://elelier.com/images/social/elier-loya-og-2026-v2.jpg');
  });

  it('preserves root and other legacy route HTML, and leaves translated legal pages noindex', () => {
    expect(fs.readFileSync(path.join(temporaryBuildDir, 'index.html'), 'utf8')).toBe(originalHtml);
    expect(fs.readFileSync(path.join(temporaryBuildDir, 'portafolio', 'index.html'), 'utf8'))
      .toBe(originalHtml);

    for (const language of ['en', 'pt-br']) {
      for (const { route } of spanishLegalPages) {
        const html = fs.readFileSync(path.join(temporaryBuildDir, language, route, 'index.html'), 'utf8');
        const head = new DOMParser().parseFromString(html, 'text/html').head;
        expect(head.querySelector('meta[name="robots"]')?.getAttribute('content')).toBe('noindex,follow');
      }
    }
  });
});
