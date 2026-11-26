import React, { useEffect, useRef, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../contexts/LanguageContext';
import { homePathFor, OG_LOCALES } from '../i18n/locales';
import RouteSEO from './RouteSEO';
import BlogBody, { getBlogHeadings, parseBlogBody } from './BlogBody';
import { getBlogCopy } from './blog/blogCopy';
import ProductCallout from './blog/ProductCallout';
import {
  blogPath,
  formatPostDate,
  getPostBySlug,
  getPostCopy,
  getPublishedPosts,
  postContentLanguage,
  postLanguages,
  readingMinutes,
} from '../data/blogPosts';
import '../styles/components/Blog.css';

function useReadingProgress(ref) {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const value = total > 0 ? Math.min(1, Math.max(0, -rect.top / total)) : 1;
      setProgress(value);
    };
    const onScroll = () => { if (!frame) frame = window.requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [ref]);
  return progress;
}

function ShareButton({ title, url, t }) {
  const [copied, setCopied] = useState(false);
  const onShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({ title, url });
        return;
      }
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    } catch (error) {
      // El usuario canceló o el navegador no lo permite: no hay nada que mostrar.
    }
  };
  return (
    <button type="button" className="blog-button blog-button--ghost" onClick={onShare}>
      <i className="fas fa-share-alt" aria-hidden="true" /> {copied ? t.copied : t.share}
      <span className="visually-hidden" aria-live="polite">{copied ? t.copied : ''}</span>
    </button>
  );
}

function BlogPost({ posts }) {
  const { slug } = useParams();
  const { language } = useLanguage();
  const articleRef = useRef(null);
  const progress = useReadingProgress(articleRef);
  const post = getPostBySlug(slug, posts);
  const t = getBlogCopy(language);

  if (!post) return <Navigate to={blogPath(language)} replace />;

  const copy = getPostCopy(post, language);
  const contentLang = postContentLanguage(post, language);
  const headings = getBlogHeadings(copy.body);
  const coverInBody = parseBlogBody(copy.body)
    .filter((block) => block.type === 'images')
    .flatMap((block) => block.items)
    .find((item) => item.src === post.cover);
  const translated = contentLang === language;
  const canonicalPath = blogPath(translated ? language : 'es', post.slug);
  const alternates = postLanguages(post);
  const url = `https://elelier.com${blogPath(language, post.slug)}`;
  const more = getPublishedPosts(posts).filter((p) => p.slug !== post.slug).slice(0, 2);
  const home = homePathFor(language);

  return (
    <main className="post-page">
      <div className="post-progress" role="presentation" aria-label={t.progress}>
        <span style={{ transform: `scaleX(${progress})` }} />
      </div>
      <RouteSEO
        route={canonicalPath}
        title={`${copy.title} | Elier Loya`}
        description={copy.summary}
        pathname={canonicalPath}
        robots={translated ? 'index,follow' : 'noindex,follow'}
        type="article"
        locale={OG_LOCALES[language]}
        image={post.ogImage || post.cover ? `https://elelier.com${post.ogImage || post.cover}` : undefined}
        imageAlt={post.ogImage || post.cover ? copy.title : undefined}
      />

      {alternates.length > 1 && (
        <Helmet>
          {alternates.map((lang) => (
            <link key={lang} rel="alternate" hrefLang={lang === 'es' ? 'es' : lang === 'en' ? 'en' : 'pt-BR'} href={`https://elelier.com${blogPath(lang, post.slug)}`} />
          ))}
          <link rel="alternate" hrefLang="x-default" href={`https://elelier.com${blogPath('es', post.slug)}`} />
        </Helmet>
      )}

      <article ref={articleRef} className="post" lang={contentLang === language ? undefined : contentLang}>
        <header className="post-header">
          <Link to={blogPath(language)} className="post-back" lang={language}>← {t.back}</Link>
          {(copy.tags || post.tags)?.length > 0 && (
            <ul className="blog-tags" aria-label="Tags">
              {(copy.tags || post.tags).map((tag) => <li key={tag}>{tag}</li>)}
            </ul>
          )}
          <h1>{copy.title}</h1>
          <p className="post-dek">{copy.summary}</p>
          <p className="post-meta" lang={language}>
            <span>{t.by} <strong>Elier Loya</strong></span>
            <span aria-hidden="true">·</span>
            <time dateTime={post.date}>{formatPostDate(post.date, language)}</time>
            <span aria-hidden="true">·</span>
            <span>{t.minutes(readingMinutes(post, language))}</span>
          </p>
          {contentLang !== language && t.spanishNotice && (
            <p className="post-notice" lang={language}>{t.spanishNotice}</p>
          )}
        </header>

        {post.product && <ProductCallout product={post.product} t={t} language={language} />}

        {post.cover && (
          <figure className="post-cover">
            <img src={post.cover} alt={coverInBody?.alt || ''} decoding="async" fetchpriority="high" />
            {coverInBody?.caption && <figcaption lang={contentLang}>{coverInBody.caption}</figcaption>}
          </figure>
        )}

        {headings.length > 1 && (
          <nav className="post-toc" aria-label={t.toc} lang={language}>
            <p>{t.toc}</p>
            <ol>
              {headings.map((h) => (
                <li key={h.id}><a href={`#${h.id}`} lang={contentLang}>{h.text}</a></li>
              ))}
            </ol>
          </nav>
        )}

        <BlogBody body={copy.body} skipSrc={post.cover} />

        <footer className="post-footer" lang={language}>
          <div className="post-author">
            <img src="/images/blog/autor-elier.webp" alt="" width="56" height="56" loading="lazy" />
            <div>
              <p className="post-author__name">Elier Loya</p>
              <p className="post-author__role">{t.authorRole}</p>
            </div>
          </div>
          <div className="post-end">
            <h2>{t.endTitle}</h2>
            <p>{t.endText}</p>
            <div className="post-end__actions">
              <Link to={`${home}#contacto`} className="blog-button blog-button--primary">{t.contactCta}</Link>
              {post.product && (
                <a href={post.product.url} target="_blank" rel="noopener noreferrer" className="blog-button blog-button--app">
                  {t.openApp(post.product.name)} <span aria-hidden="true">↗</span>
                </a>
              )}
              <ShareButton title={copy.title} url={url} t={t} />
            </div>
          </div>
          {more.length > 0 && (
            <nav className="post-more" aria-label={t.more}>
              <h2>{t.more}</h2>
              <ul>
                {more.map((p) => (
                  <li key={p.slug}><Link to={blogPath(language, p.slug)}>{getPostCopy(p, language).title}</Link></li>
                ))}
              </ul>
            </nav>
          )}
          <Link to={blogPath(language)} className="post-back">← {t.back}</Link>
        </footer>
      </article>
    </main>
  );
}

export default BlogPost;
