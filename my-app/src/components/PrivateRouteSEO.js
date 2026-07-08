import React from 'react';
import SEO from './SEO';

const DEFAULT_TITLE = 'Ruta privada | Elier Loya';
const DEFAULT_DESCRIPTION =
  'Ruta interna o utilitaria con acceso controlado y sin indexacion publica.';

function PrivateRouteSEO({ title = DEFAULT_TITLE, description = DEFAULT_DESCRIPTION }) {
  return (
    <SEO
      title={title}
      description={description}
      pathname="/"
      robots="noindex,nofollow,noarchive"
    />
  );
}

export default PrivateRouteSEO;
