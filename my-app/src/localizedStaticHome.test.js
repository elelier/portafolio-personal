const fs = require('fs');
const os = require('os');
const path = require('path');
const { spawnSync } = require('child_process');
const { HOME_COPY, HOME_PATHS, localeFromPath, homePathFor } = require('./i18n/locales');

describe('trilingual public routes and initial HTML', () => {
  it('uses explicit routes, never a browser locale redirect', () => {
    expect(HOME_PATHS).toEqual({ es: '/', en: '/en/', 'pt-br': '/pt-br/' });
    expect(localeFromPath('/')).toBe('es');
    expect(localeFromPath('/en/')).toBe('en');
    expect(localeFromPath('/pt-br/')).toBe('pt-br');
    expect(localeFromPath('/contacto')).toBe('es');
    expect(homePathFor('pt-br')).toBe('/pt-br/');
  });

  it.each(['en', 'pt-br'])('generates accessible indexable HTML for %s before hydration', (lang) => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'elelier-i18n-'));
    try {
      fs.copyFileSync(path.resolve(__dirname, '../public/index.html'), path.join(dir, 'index.html'));
      const processResult = spawnSync(process.execPath, [path.resolve(__dirname, '../scripts/generate-localized-home.js')], {
        env: { ...process.env, STATIC_ROUTE_BUILD_DIR: dir },
        encoding: 'utf8'
      });
      expect(processResult.status).toBe(0);
      const html = fs.readFileSync(path.join(dir, lang, 'index.html'), 'utf8');
      expect(html).toContain('<title>' + HOME_COPY[lang].title + '</title>');
      expect(html).toContain('content="' + HOME_COPY[lang].description + '"');
      expect(html).toContain('<link rel="canonical" href="https://elelier.com' + HOME_PATHS[lang] + '">');
      expect(html).toContain('hreflang="pt-BR" href="https://elelier.com/pt-br/"');
      expect(html).toContain('hreflang="en" href="https://elelier.com/en/"');
      expect(html).toContain('hreflang="x-default" href="https://elelier.com/"');
      expect(html).toContain('<meta name="robots" content="index,follow">');
      expect(html).toContain('<main lang="' + (lang === 'en' ? 'en' : 'pt-BR') + '"');
      expect(html).toContain('mailto:hola@elelier.com');
      expect(html).not.toContain('static/media/eleliercom.');
    } finally {
      fs.rmSync(dir, { recursive: true, force: true });
    }
  });
});
