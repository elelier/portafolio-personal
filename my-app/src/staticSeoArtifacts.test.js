const fs = require('fs');
const path = require('path');
const { INDEXABLE_SITEMAP_PATHS } = require('./config/routeSeoPolicy');

const publicDir = path.resolve(__dirname, '../public');
const robotsPath = path.join(publicDir, 'robots.txt');
const sitemapPath = path.join(publicDir, 'sitemap.xml');
const redirectsPath = path.join(publicDir, '_redirects');
const expectedDynamicRedirects = [
  '/proyecto/:token /index.html 200',
  '/proyecto/:token/ /index.html 200',
  '/cotizacion/:id /index.html 200',
  '/cotizacion/:id/ /index.html 200',
  '/mockup/:id /index.html 200',
  '/mockup/:id/ /index.html 200',
  '/admin/leads /index.html 200',
  '/admin/leads/ /index.html 200',
  '/entradas/:slug /index.html 200',
  '/entradas/:slug/ /index.html 200',
];

function read(filePath) {
  return fs.readFileSync(filePath, 'utf8');
}

function extractSitemapPaths(sitemap) {
  return [...sitemap.matchAll(/<loc>https:\/\/[^/]+([^<]*)<\/loc>/g)].map(([, pathname]) =>
    pathname || '/'
  );
}

describe('static SEO artifacts', () => {
  it('keeps the approved sitemap authority and legacy path set coherent', () => {
    const robots = read(robotsPath);
    const sitemap = read(sitemapPath);

    expect(robots).toContain('Sitemap: https://elelier.com/sitemap.xml');
    expect(robots).not.toContain('https://www.elelier.com/sitemap.xml');

    expect(sitemap).not.toContain('https://www.elelier.com');
    expect(sitemap).not.toContain('<lastmod>');
    expect(extractSitemapPaths(sitemap)).toEqual(INDEXABLE_SITEMAP_PATHS);
    expect(sitemap).not.toContain('/proyecto/');
    expect(sitemap).not.toContain('/admin/leads');
    expect(sitemap).not.toContain('/client-demo');
    expect(sitemap).not.toContain('/cotizacion/');
    expect(sitemap).not.toContain('/mockup/');
    expect(sitemap).not.toContain('/sites');
    expect(sitemap).not.toContain('/tarifas-2024');
    expect(sitemap).not.toContain('/hero-banner');
    expect(sitemap).not.toContain('/entradas/2408_IA_Transforma_ecommerce');
  });

  it('keeps Cloudflare Pages SPA rewrites narrowly scoped to dynamic routes', () => {
    expect(fs.existsSync(redirectsPath)).toBe(true);

    const redirects = read(redirectsPath);

    expect(redirects).not.toMatch(/^\/\* \/index\.html 200$/m);

    for (const rule of expectedDynamicRedirects) {
      expect(redirects).toContain(rule);
    }

    expect(redirects).not.toContain('/proyecto/* /index.html 200');
    expect(redirects).not.toContain('/cotizacion/* /index.html 200');
    expect(redirects).not.toContain('/mockup/* /index.html 200');
    expect(redirects).not.toContain('/admin/* /index.html 200');
    expect(redirects).not.toContain('/entradas/* /index.html 200');
    expect(redirects).not.toContain('/portafolio/* /index.html 200');
    expect(redirects).not.toContain('/sobre-mi/* /index.html 200');
    expect(redirects).not.toContain('/servicios/* /index.html 200');
    expect(redirects).not.toContain('/contacto/* /index.html 200');
    expect(redirects).not.toContain('/blog/* /index.html 200');
    expect(redirects).not.toContain('/aionlabs/* /index.html 200');
    expect(redirects).not.toContain('/privacy-policy/* /index.html 200');
    expect(redirects).not.toContain('/terms-of-service/* /index.html 200');

    const robots = read(robotsPath);
    const sitemap = read(sitemapPath);

    expect(robots).toContain('Sitemap: https://elelier.com/sitemap.xml');
    expect(sitemap).toContain('https://elelier.com/');
  });
});
