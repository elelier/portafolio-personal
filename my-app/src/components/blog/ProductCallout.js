import React from 'react';

// Tarjeta que invita a abrir la app de la que habla un artículo (post.product).
function ProductCallout({ product, t, language }) {
  const host = product.url.replace(/^https?:\/\//, '').replace(/\/$/, '');

  return (
    <aside className="post-app" lang={language} aria-label={t.tryEyebrow}>
      {product.icon && <img className="post-app__icon" src={product.icon} alt="" width="56" height="56" />}
      <div className="post-app__text">
        <p className="post-app__eyebrow">{t.tryEyebrow}</p>
        <p className="post-app__lead">{t.tryText(product.name)}</p>
      </div>
      <a className="blog-button blog-button--app post-app__button" href={product.url} target="_blank" rel="noopener noreferrer">
        {host} <span aria-hidden="true">↗</span>
      </a>
    </aside>
  );
}

export default ProductCallout;
