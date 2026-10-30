const fs = require('fs');
const os = require('os');
const path = require('path');
const { spawnSync } = require('child_process');

const publicDir = path.resolve(__dirname, '../public');
const script = path.resolve(__dirname, '../scripts/generate-static-routes.js');
const imageRelativePath = 'images/sites/cover-desktop.jpg';
const imageUrl = `https://elelier.com/${imageRelativePath}`;

describe('SEO static route generation', () => {
  let tempDir;

  beforeAll(() => {
    tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'elelier-static-seo-'));
    fs.copyFileSync(path.join(publicDir, 'index.html'), path.join(tempDir, 'index.html'));
    const result = spawnSync(process.execPath, [script], {
      encoding: 'utf8',
      env: { ...process.env, STATIC_ROUTE_BUILD_DIR: tempDir },
    });
    if (result.status !== 0) {
      throw new Error(`generate-static-routes failed: ${result.stderr || result.stdout}`);
    }
  });

  afterAll(() => {
    if (tempDir) fs.rmSync(tempDir, { recursive: true, force: true });
  });

  const read = (route) => fs.readFileSync(path.join(tempDir, route, 'index.html'), 'utf8');

  it('uses a stable public OG image and canonical host in the initial HTML', () => {
    const html = fs.readFileSync(path.join(publicDir, 'index.html'), 'utf8');
    expect(fs.existsSync(path.join(publicDir, imageRelativePath))).toBe(true);
    expect(html).toContain(`<meta property="og:image" content="${imageUrl}">`);
    expect(html).toContain(`<meta name="twitter:image" content="${imageUrl}">`);
    expect(html).toContain('<link rel="canonical" href="https://elelier.com/">');
    expect(html).toContain('href="/favicon.ico"');
    expect(html).not.toContain('static/media/eleliercom.');
  });

  it.each([
    ['privacy-policy', 'Política de Privacidad | Elier Loya'],
    ['terms-of-service', 'Condiciones del Servicio | Elier Loya'],
  ])('provides legal route %s with an indexable canonical and unique title', (route, title) => {
    const html = read(route);
    expect(html).toContain(`<title>${title}</title>`);
    expect(html).toContain(`<link rel="canonical" href="https://elelier.com/${route}">`);
    expect(html).toContain('<meta name="robots" content="index,follow">');
    expect(html).toContain(`<meta property="og:url" content="https://elelier.com/${route}">`);
    expect(html).toContain(`<meta property="og:title" content="${title}">`);
  });

  it.each(['portafolio', 'sobre-mi', 'servicios', 'contacto', 'blog', 'aionlabs'])(
    'prevents duplicate indexing of alias %s before JS',
    (route) => {
      const html = read(route);
      expect(html).toContain('<meta name="robots" content="noindex,follow">');
      expect(html).toContain('<link rel="canonical" href="https://elelier.com/">');
      expect(html).toContain('<meta property="og:url" content="https://elelier.com/">');
    }
  );

  it.each(['hero-banner', 'tarifas-2024', 'sites', 'client-demo', 'gracias-agenda'])(
    'protects non-public route %s from indexing even without hydration',
    (route) => {
      expect(read(route)).toContain('<meta name="robots" content="noindex,nofollow,noarchive">');
    }
  );

  it('does not modify the root build HTML', () => {
    expect(fs.readFileSync(path.join(tempDir, 'index.html'), 'utf8')).toBe(
      fs.readFileSync(path.join(publicDir, 'index.html'), 'utf8')
    );
  });
});
