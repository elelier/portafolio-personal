import React from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import RouteSEO from './RouteSEO';
import BlogBody from './BlogBody';
import { formatPostDate, getPostBySlug, getPostCopy } from '../data/blogPosts';
import '../styles/components/Blog.css';

const LABELS = {
  es: { back: 'Volver al blog', contact: 'Hablemos de tu reto' },
  en: { back: 'Back to the blog', contact: 'Let’s talk about your challenge' },
  'pt-br': { back: 'Voltar ao blog', contact: 'Vamos conversar sobre seu desafio' },
};

function BlogPost({ posts }) {
  const { slug } = useParams();
  const { language } = useLanguage();
  const post = getPostBySlug(slug, posts);

  if (!post) return <Navigate to="/blog" replace />;

  const copy = getPostCopy(post, language);
  const labels = LABELS[language] || LABELS.es;

  return (
    <article className="entrada">
      <RouteSEO
        route={`/blog/${post.slug}`}
        title={`${copy.title} | Elier Loya`}
        description={copy.summary}
        pathname={`/blog/${post.slug}`}
        robots="index,follow"
        type="article"
        image={post.cover ? `https://elelier.com${post.cover}` : undefined}
        imageAlt={post.cover ? copy.title : undefined}
      />
      <header className="entrada-header">
        <Link to="/blog" className="entrada-volver">← {labels.back}</Link>
        <h1>{copy.title}</h1>
        <p className="fecha"><time dateTime={post.date}>{formatPostDate(post.date, language)}</time></p>
        {post.tags?.length > 0 && (
          <div className="etiquetas">
            {post.tags.map((tag) => <span key={tag} className="etiqueta">{tag}</span>)}
          </div>
        )}
      </header>
      <div className="entrada-contenido">
        <BlogBody body={copy.body} />
      </div>
      <div className="cta-seccion">
        <Link to="/blog" className="cta-button">{labels.back}</Link>
        <Link to="/contacto" className="cta-button">{labels.contact}</Link>
      </div>
    </article>
  );
}

export default BlogPost;
