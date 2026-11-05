/* Serve the build from the current checkout for deterministic HTTP/visual CI QA.
 * This is a loopback-only test server, not a Production deployment. */
const fs = require('node:fs');
const http = require('node:http');
const path = require('node:path');

const root = path.resolve(__dirname, '../build');
const port = Number(process.env.ELELIER_QA_PORT || 4173);
const types = {
  '.css': 'text/css', '.html': 'text/html', '.ico': 'image/x-icon',
  '.js': 'text/javascript', '.json': 'application/json', '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg', '.png': 'image/png', '.svg': 'image/svg+xml',
  '.txt': 'text/plain', '.webp': 'image/webp', '.woff': 'font/woff',
  '.woff2': 'font/woff2', '.xml': 'application/xml',
};

if (!fs.existsSync(path.join(root, 'index.html'))) {
  throw new Error(`Build missing: ${root}. Run npm run build first.`);
}

http.createServer((req, res) => {
  let pathname;
  try {
    pathname = decodeURIComponent(new URL(req.url, `http://127.0.0.1:${port}`).pathname);
  } catch {
    res.writeHead(400).end('Invalid URL');
    return;
  }

  const filename = pathname.endsWith('/') ? `${pathname}index.html` : pathname;
  let target = path.resolve(root, `.${filename}`);
  if (!target.startsWith(`${root}${path.sep}`)) {
    res.writeHead(403).end('Forbidden');
    return;
  }

  if (!fs.existsSync(target) || !fs.statSync(target).isFile()) {
    if (path.extname(filename)) {
      res.writeHead(404).end('Not found');
      return;
    }
    target = path.join(root, '404.html');
  }

  res.writeHead(200, {
    'Content-Type': `${types[path.extname(target)] || 'application/octet-stream'}; charset=utf-8`,
    'Cache-Control': 'no-store',
  });
  fs.createReadStream(target).pipe(res);
}).listen(port, '127.0.0.1', () => {
  console.log(`Serving checked-out build on http://127.0.0.1:${port}`);
});
