const fs = require('fs');
const path = require('path');

const buildDir = path.resolve(__dirname, '..', 'build');
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

if (!fs.existsSync(indexPath)) {
  throw new Error(`Missing build/index.html at ${indexPath}`);
}

const indexHtml = fs.readFileSync(indexPath, 'utf8');

for (const route of staticRoutes) {
  const routeDir = path.join(buildDir, route);
  fs.mkdirSync(routeDir, { recursive: true });
  fs.writeFileSync(path.join(routeDir, 'index.html'), indexHtml);
}

const root404Path = path.join(buildDir, '404.html');
if (!fs.existsSync(root404Path)) {
  fs.writeFileSync(root404Path, indexHtml);
}

console.log(`Generated static route entries for ${staticRoutes.length} routes.`);
