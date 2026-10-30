const assert = require('node:assert/strict');
const { spawn } = require('node:child_process');
const { test } = require('node:test');

test('serves the ES/EN/PT-BR HTML and assets from this checkout over HTTP', async () => {
  const port = 4187;
  const server = spawn(process.execPath, [require.resolve('./serve-built-pages.cjs')], {
    env: { ...process.env, ELELIER_QA_PORT: String(port) },
    stdio: 'ignore',
  });

  try {
    let ready = false;
    for (let attempt = 0; attempt < 30; attempt++) {
      try {
        const response = await fetch(`http://127.0.0.1:${port}/`);
        ready = response.ok;
        if (ready) break;
      } catch { /* Server is starting. */ }
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
    assert.equal(ready, true, 'local build server started');

    for (const [route, htmlLang, canonical] of [
      ['/', 'es-MX', 'https://elelier.com/'],
      ['/en/', 'en', 'https://elelier.com/en/'],
      ['/pt-br/', 'pt-BR', 'https://elelier.com/pt-br/'],
    ]) {
      const response = await fetch(`http://127.0.0.1:${port}${route}`);
      assert.equal(response.status, 200, route);
      assert.match(response.headers.get('content-type'), /text\/html/, route);
      const html = await response.text();
      assert.ok(html.includes(`<html lang="${htmlLang}"`), `${route}: locale`);
      assert.ok(html.includes(`rel="canonical" href="${canonical}"`), `${route}: canonical`);
      assert.ok(html.includes('<main lang="'), `${route}: initial content`);
      const script = html.match(/src="(\/static\/js\/main\.[^"]+\.js)"/);
      assert.ok(script, `${route}: built JS entry`);
      const asset = await fetch(`http://127.0.0.1:${port}${script[1]}`);
      assert.equal(asset.status, 200, `${route}: JS entry HTTP`);
      assert.match(asset.headers.get('content-type'), /text\/javascript/, `${route}: JS MIME`);
    }
  } finally {
    server.kill();
  }
});
