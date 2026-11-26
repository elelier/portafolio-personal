import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { formatPostDate, getPostCopy, getPublishedPosts } from '../data/blogPosts';
import '../styles/components/Blog.css';

const content = {
  es: {
    title: 'Blog',
    intro: 'Bienvenido a nuestro blog, donde compartimos artículos sobre las últimas tendencias y avances en tecnología, digitalización y más.',
    servicesCta: 'Mis Servicios',
    contactCta: 'Hablemos de tu reto',
    readMore: 'Leer artículo',
    empty: 'Estoy preparando los primeros artículos. Vuelve pronto.',
  },
  en: {
    title: 'Blog',
    intro: 'Welcome to the blog, where I share articles about technology, digitalization and practical product thinking.',
    servicesCta: 'My Services',
    contactCta: 'Let’s talk about your challenge',
    readMore: 'Read article',
    empty: 'The first articles are on their way. Check back soon.',
  },
};

function Blog({ posts }) {
  const { language } = useLanguage();
  const t = content[language] || content.es;
  const articulos = getPublishedPosts(posts);

  return (
    <div className="blog">
      <div className="blog-intro">
        <h1>{t.title}</h1>
        <p className="intro">{t.intro}</p>
        <div className="cta-seccion">
          <Link to="/servicios" className="cta-button">{t.servicesCta}</Link>
          <Link to="/contacto" className="cta-button">{t.contactCta}</Link>
        </div>
      </div>
      {articulos.length === 0 ? (
        <p className="blog-vacio">{t.empty}</p>
      ) : (
        <div className="articulos-list">
          {articulos.map((post) => {
            const copy = getPostCopy(post, language);
            return (
              <article key={post.slug} className="articulo">
                <div className="articulo-contenido">
                  <h2>
                    <Link to={`/blog/${post.slug}`}>{copy.title}</Link>
                  </h2>
                  {post.tags?.length > 0 && (
                    <div className="etiquetas">
                      {post.tags.map((tag) => <span key={tag} className="etiqueta">{tag}</span>)}
                    </div>
                  )}
                  <p className="fecha"><time dateTime={post.date}>{formatPostDate(post.date, language)}</time></p>
                  <p>{copy.summary}</p>
                  <Link to={`/blog/${post.slug}`} className="leer-mas">{t.readMore}</Link>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Blog;
