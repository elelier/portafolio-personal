import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

const SITE_URL = 'https://elelier.com';
const DEFAULT_OG_IMAGE = 'https://elelier.com/static/media/eleliercom.ced5bb90383175580555.png';

export function buildUrl(pathname = '/') {
  const sanitizedPath = `${pathname || '/'}`.split('?')[0].split('#')[0];
  const normalizedPath = sanitizedPath.startsWith('/') ? sanitizedPath : `/${sanitizedPath}`;
  return `${SITE_URL}${normalizedPath}`;
}

function SEO({
  title,
  description,
  pathname,
  image = DEFAULT_OG_IMAGE,
  type = 'website',
  robots = 'index,follow',
  keywords,
  imageAlt,
  locale = 'es_MX'
}) {
  const location = useLocation();
  const currentPath = pathname || location.pathname || '/';
  const canonicalUrl = buildUrl(currentPath);

  return (
    <Helmet>
      <html lang={locale.startsWith('es') ? 'es' : 'en'} />
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="description" content={description} />
      {keywords ? <meta name="keywords" content={keywords} /> : null}
      <meta name="robots" content={robots} />

      <link rel="canonical" href={canonicalUrl} />

      <meta property="og:locale" content={locale} />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content="Elier Loya" />
      <meta property="og:image" content={image} />
      {imageAlt ? <meta property="og:image:alt" content={imageAlt} /> : null}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      {imageAlt ? <meta name="twitter:image:alt" content={imageAlt} /> : null}
    </Helmet>
  );
}

export default SEO;
