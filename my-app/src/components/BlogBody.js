import React from 'react';

const IMAGE_RE = /^!\[([^\]]*)\]\((\S+?)(?:\s+"([^"]*)")?\)$/;

export function slugifyHeading(text) {
  return String(text)
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/\*\*/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Convierte el texto de un artículo (formato en src/data/blogPosts.js) en bloques.
// Las imágenes seguidas se agrupan para mostrarse lado a lado en pantallas grandes.
export function parseBlogBody(body = '') {
  const blocks = [];
  String(body)
    .trim()
    .split(/\n\s*\n/)
    .forEach((raw) => {
      const lines = raw.split('\n').map((line) => line.trim()).filter(Boolean);
      if (lines.length === 0) return;
      const image = lines.length === 1 && lines[0].match(IMAGE_RE);
      if (image) {
        const figure = { alt: image[1], src: image[2], caption: image[3] || '' };
        const last = blocks[blocks.length - 1];
        if (last && last.type === 'images') last.items.push(figure);
        else blocks.push({ type: 'images', items: [figure] });
      } else if (lines[0].startsWith('## ')) {
        const text = lines.join(' ').slice(3);
        blocks.push({ type: 'h2', text, id: slugifyHeading(text) });
      } else if (lines.every((line) => line.startsWith('- '))) {
        blocks.push({ type: 'ul', items: lines.map((line) => line.slice(2)) });
      } else if (lines.every((line) => line.startsWith('>'))) {
        blocks.push({ type: 'quote', text: lines.map((l) => l.replace(/^>\s?/, '')).join(' ') });
      } else {
        blocks.push({ type: 'p', text: lines.join(' ') });
      }
    });
  return blocks;
}

export function getBlogHeadings(body) {
  return parseBlogBody(body).filter((block) => block.type === 'h2');
}

function renderInline(text) {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith('**') && part.endsWith('**') ? <strong key={i}>{part.slice(2, -2)}</strong> : part
  );
}

const isPhoneShot = (src) => /\/app-[^/]+$/.test(src);

function Figure({ item }) {
  return (
    <figure className={`entrada-figura${isPhoneShot(item.src) ? ' entrada-figura--celular' : ''}`}>
      <img src={item.src} alt={item.alt} loading="lazy" decoding="async" />
      {item.caption && <figcaption>{item.caption}</figcaption>}
    </figure>
  );
}

// `skipSrc` evita repetir la portada si el texto también empieza con ella.
function BlogBody({ body = '', skipSrc }) {
  const blocks = parseBlogBody(body)
    .map((block) => (block.type === 'images' && skipSrc
      ? { ...block, items: block.items.filter((item) => item.src !== skipSrc) }
      : block))
    .filter((block) => block.type !== 'images' || block.items.length > 0);

  return (
    <>
      {blocks.map((block, index) => {
        switch (block.type) {
          case 'images':
            if (block.items.length === 1) return <Figure key={index} item={block.items[0]} />;
            return (
              <div key={index} className={`entrada-galeria entrada-galeria--${Math.min(block.items.length, 3)}`}>
                {block.items.map((item) => <Figure key={item.src} item={item} />)}
              </div>
            );
          case 'h2':
            return <h2 key={index} id={block.id}>{renderInline(block.text)}</h2>;
          case 'ul':
            return <ul key={index}>{block.items.map((item, i) => <li key={i}>{renderInline(item)}</li>)}</ul>;
          case 'quote':
            return <blockquote key={index}>{renderInline(block.text)}</blockquote>;
          default:
            return <p key={index}>{renderInline(block.text)}</p>;
        }
      })}
    </>
  );
}

export default BlogBody;
