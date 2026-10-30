/* Read-only visual/functional Preview QA. Never submits a contact form. */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { chromium } = require('playwright');

// Default to the checked-out build served locally; remote Preview is opt-in only.
const BASE = (process.env.ELELIER_PREVIEW_URL || 'http://127.0.0.1:4173').replace(/\/$/, '');
const OUT = process.env.ELELIER_VISUAL_ARTIFACTS || path.resolve(__dirname, '../../qa-visual-artifacts');
const cases = [
  { locale: 'es', route: '/', expectedLang: 'es-MX', headline: 'Transformo procesos complicados', contact: 'Enviar mensaje' },
  { locale: 'en', route: '/en/', expectedLang: 'en', headline: 'I turn complex', contact: 'Send message' },
  { locale: 'pt-br', route: '/pt-br/', expectedLang: 'pt-BR', headline: 'Transformo processos complexos', contact: 'Enviar mensagem' },
];

async function run() {
  fs.mkdirSync(OUT, { recursive: true });
  const browser = await chromium.launch({ headless: true });
  const results = [];
  const failures = [];

  try {
    for (const item of cases) {
      for (const viewport of [{ name: 'mobile', width: 390, height: 844 }, { name: 'desktop', width: 1440, height: 900 }]) {
        for (const theme of ['light', 'dark']) {
          const context = await browser.newContext({
            viewport: { width: viewport.width, height: viewport.height },
            deviceScaleFactor: 1,
            reducedMotion: 'reduce',
          });
          const page = await context.newPage();
          const errors = [];
          page.on('pageerror', err => errors.push(err.message));
          const name = `${item.locale}-${viewport.name}-${theme}`;
          try {
            const response = await page.goto(BASE + item.route, { waitUntil: 'domcontentloaded', timeout: 45000 });
            assert.equal(response.status(), 200, `${name}: HTTP response`);
            await page.locator('#contacto').waitFor({ timeout: 30000 });
            assert.equal(await page.locator('html').getAttribute('lang'), item.expectedLang, `${name}: html lang`);
            assert.equal(await page.locator('[data-settings-language="' + item.locale + '"]').count(), 1, `${name}: selector`);
            assert.equal(await page.locator('#contacto button[type="submit"]').count(), 1, `${name}: form submit control`);
            assert.match(await page.locator('#contacto').innerText(), new RegExp(item.contact, 'i'), `${name}: contact label`);
            assert.match(await page.locator('#hero-banner').innerText(), new RegExp(item.headline, 'i'), `${name}: headline`);
            await page.waitForFunction((canonical) =>
              document.head.querySelectorAll('link[rel="canonical"]').length === 1 &&
              document.head.querySelector('link[rel="canonical"]')?.href === canonical,
              'https://elelier.com' + item.route);
            assert.equal(await page.locator('link[rel="alternate"][hreflang]').count(), 4, `${name}: hreflang count`);
            assert.equal(await page.locator('meta[property="og:url"]').count(), 1, `${name}: og:url count`);
            await page.locator('.settings-toggle').click();
            await page.locator('[data-settings-theme="' + theme + '"]').click();
            assert.equal(await page.locator('[data-settings-theme="' + theme + '"]').getAttribute('aria-pressed'), 'true', `${name}: theme toggle`);
            await page.locator('.settings-toggle').click();
            await page.waitForTimeout(250);
            const geometry = await page.evaluate(() => ({
              documentWidth: document.documentElement.scrollWidth,
              viewportWidth: document.documentElement.clientWidth,
              contactWidth: document.getElementById('contacto').getBoundingClientRect().width,
            }));
            assert.ok(geometry.documentWidth <= geometry.viewportWidth + 4,
              `${name}: horizontal overflow ${JSON.stringify(geometry)}`);
            await page.screenshot({ path: path.join(OUT, `${name}-top.png`), animations: 'disabled', fullPage: false });
            await page.locator('#contacto').screenshot({ path: path.join(OUT, `${name}-contact.png`), animations: 'disabled', timeout: 20000 });
            results.push({ name, status: 'PASS', geometry, pageErrors: errors.slice(0, 5) });
          } catch (error) {
            failures.push({ name, message: String(error.message).slice(0, 500) });
            results.push({ name, status: 'FAIL', message: String(error.message).slice(0, 500) });
          } finally {
            await context.close();
          }
        }
      }
    }

    // The selector must switch the actual URL, preserve section context and handle browser history.
    const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
    const page = await context.newPage();
    try {
      await page.goto(BASE + '/pt-br/#casos-reales', { waitUntil: 'domcontentloaded' });
      await page.locator('#casos-reales').waitFor();
      await page.locator('.settings-toggle').click();
      await page.locator('[data-settings-language="en"]').click();
      await page.waitForURL('**/en/#casos-reales');
      assert.equal(await page.locator('.settings-toggle').evaluate((el) => el === document.activeElement), true,
        'locale-switch: focus returns to settings toggle');
      await page.waitForFunction(() =>
        document.head.querySelectorAll('link[rel="canonical"]').length === 1 &&
        document.head.querySelector('link[rel="canonical"]')?.href === 'https://elelier.com/en/');
      assert.equal(await page.locator('meta[property="og:url"]').count(), 1, 'locale-switch: og:url remains unique');
      assert.equal(await page.locator('html').getAttribute('lang'), 'en');
      await page.goBack();
      await page.waitForURL('**/pt-br/#casos-reales');
      assert.equal(await page.locator('html').getAttribute('lang'), 'pt-BR');
      results.push({ name: 'locale-switch-history-section', status: 'PASS' });
    } catch (error) {
      failures.push({ name: 'locale-switch-history-section', message: String(error.message).slice(0, 500) });
      results.push({ name: 'locale-switch-history-section', status: 'FAIL' });
    } finally {
      await context.close();
    }
  } finally {
    await browser.close();
    fs.writeFileSync(path.join(OUT, 'qa-results.json'), JSON.stringify({
      target: BASE, commit: process.env.ELELIER_QA_SHA || process.env.GITHUB_SHA || 'local', createdAt: new Date().toISOString(), results,
    }, null, 2));
  }
  console.log(JSON.stringify({ total: results.length, passed: results.filter(r => r.status === 'PASS').length, failures }, null, 2));
  if (failures.length) process.exitCode = 1;
}

run().catch(error => { console.error(error); process.exitCode = 1; });
