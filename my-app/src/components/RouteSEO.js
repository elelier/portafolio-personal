import React from 'react';
import SEO from './SEO';
import { getRouteSeoPolicy } from '../config/routeSeoPolicy';

function RouteSEO({
  route,
  title,
  description,
  pathname,
  robots,
  keywords,
  image,
  imageAlt,
  locale,
  type,
}) {
  const policy = getRouteSeoPolicy(route) || {};

  return (
    <SEO
      title={title || policy.title}
      description={description || policy.description}
      pathname={pathname || policy.canonicalPath || route}
      robots={robots || policy.robots}
      keywords={keywords}
      image={image}
      imageAlt={imageAlt}
      locale={locale}
      type={type}
    />
  );
}

export default RouteSEO;
