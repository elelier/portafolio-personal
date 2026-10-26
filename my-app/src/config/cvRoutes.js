// Stable public CV routes; /cv remains an English alias for existing links.
export const CV_ROUTES = Object.freeze({
  es: '/cv/es',
  en: '/cv/en',
  'pt-br': '/cv/pt-br'
});

export function getCvRoute(language) {
  return CV_ROUTES[language] || CV_ROUTES.en;
}
