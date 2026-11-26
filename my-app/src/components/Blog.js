import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { homePathFor } from '../i18n/locales';
import {
  blogPath,
  formatPostDate,
  getPostCopy,
  getPublishedPosts,
  postContentLanguage,
  readingMinutes,
} from '../data/blogPosts';
import { getBlogCopy } from './blog/blogCopy';
import '../styles/components/Blog.css';

function BlogCard({ post, language, t, featured = false }) {
  const copy = getPostCopy(post, language);
  const contentLang = postContentLanguage(post, language);
  const href = blogPath(language, post.slug);
  const titleId = `blog-card-${post.slug}`;

  return (
    <article className={`blog-card${featured ? ' blog-card--featured' : ''}`} aria-labelledby={titleId}>
      {post.cover && (
        <div className="blog-card__media">
          <img src={post.cover} alt="" loading={featured ? 'eager' : 'lazy'} decoding="async" />
        </div>
      )}
      <div className="blog-card__body">
        <p className="blog-card__meta">
          {featured && <span className="blog-card__badge">{t.featured}</span>}
          <time dateTime={post.date}>{formatPostDate(post.date, language)}</time>
          <span aria-hidden="true">·</span>
          <span>{t.minutes(readingMinutes(post, language))}</span>
          {contentLang !== language && <span className="blog-card__lang">{t.onlySpanish}</span>}
        </p>
        <h2 className="blog-card__title" id={titleId} lang={contentLang === language ? undefined : contentLang}>
          <Link to={href} className="blog-card__link">{copy.title}</Link>
        </h2>
        <p className="blog-card__summary" lang={contentLang === language ? undefined : contentLang}>{copy.summary}</p>
        {(copy.tags || post.tags)?.length > 0 && (
          <ul className="blog-tags" aria-label="Tags">
            {(copy.tags || post.tags).map((tag) => <li key={tag}>{tag}</li>)}
          </ul>
        )}
        <div className="blog-card__footer">
          <span className="blog-card__cta" aria-hidden="true">{t.readArticle} →</span>
          {post.product && (
            <a className="blog-card__app" href={post.product.url} target="_blank" rel="noopener noreferrer">
              {post.product.icon && <img src={post.product.icon} alt="" width="20" height="20" />}
              {post.product.url.replace(/^https?:\/\//, '').replace(/\/$/, '')} <span aria-hidden="true">↗</span>
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

function Blog({ posts }) {
  const { language } = useLanguage();
  const t = getBlogCopy(language);
  const home = homePathFor(language);
  const [featured, ...rest] = getPublishedPosts(posts);

  return (
    <main className="blog-page">
      <header className="blog-hero">
        <p className="blog-eyebrow">{t.eyebrow}</p>
        <h1>{t.title}</h1>
        <p className="blog-hero__intro">{t.intro}</p>
        <div className="blog-hero__actions">
          <Link to={`${home}#contacto`} className="blog-button blog-button--primary">{t.contactCta}</Link>
          <Link to={`${home}#como-trabajo`} className="blog-button">{t.howIWorkCta}</Link>
        </div>
      </header>

      {!featured ? (
        <p className="blog-empty">{t.empty}</p>
      ) : (
        <section className="blog-list" aria-label={t.eyebrow}>
          <BlogCard post={featured} language={language} t={t} featured />
          {rest.length > 0 && (
            <div className="blog-grid">
              {rest.map((post) => <BlogCard key={post.slug} post={post} language={language} t={t} />)}
            </div>
          )}
        </section>
      )}
    </main>
  );
}

export default Blog;
