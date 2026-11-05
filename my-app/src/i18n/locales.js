// Stable, explicit locale URLs. No IP/browser-language redirects.
export const HOME_PATHS = Object.freeze({
  es: '/',
  en: '/en/',
  'pt-br': '/pt-br/',
});

export const LANGUAGE_TAGS = Object.freeze({
  es: 'es-MX',
  en: 'en',
  'pt-br': 'pt-BR',
});

export const OG_LOCALES = Object.freeze({
  es: 'es_MX',
  en: 'en_US',
  'pt-br': 'pt_BR',
});

export const HOME_COPY = Object.freeze({
  es: {
    title: 'Transformo procesos complicados en soluciones que realmente funcionan. | Elier Loya',
    description: 'Transformo procesos complicados en soluciones que realmente funcionan. Especialista en operaciones, producto digital e IA aplicada.',
  },
  en: {
    title: 'I turn complex processes into solutions that actually work | Elier Loya',
    description: 'Digital product, operations, automation and applied AI. I turn complex business challenges into practical solutions.',
  },
  'pt-br': {
    title: 'Transformo processos complexos em soluções que realmente funcionam | Elier Loya',
    description: 'Produto digital, operações, automação e IA aplicada. Transformo desafios de negócios em soluções práticas.',
  },
});

export function localeFromPath(pathname = '/') {
  const path = String(pathname).toLowerCase();
  if (path === '/en' || path.startsWith('/en/')) return 'en';
  if (path === '/pt-br' || path.startsWith('/pt-br/')) return 'pt-br';
  return 'es';
}

export function homePathFor(locale) {
  return HOME_PATHS[locale] || HOME_PATHS.es;
}

export function isLocalizedHome(pathname = '/') {
  return ['/', '/en', '/en/', '/pt-br', '/pt-br/'].includes(pathname);
}
