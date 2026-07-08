const fs = require('fs');
const path = require('path');
const { INDEXABLE_SITEMAP_PATHS } = require('./config/routeSeoPolicy');

const publicDir = path.resolve(__dirname, '../public');
const robotsPath = path.join(publicDir, 'robots.txt');
const sitemapPath = path.join(publicDir, 'sitemap.xml');

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
});
