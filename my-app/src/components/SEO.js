import React from 'react';
import { Helmet } from 'react-helmet-async';

function SEO({ title, description }) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charset="utf-8" />
    </Helmet>
  );
}

export default SEO;