import React from 'react';

function renderInline(text) {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith('**') && part.endsWith('**') ? <strong key={i}>{part.slice(2, -2)}</strong> : part
  );
}

// Renderiza el formato simple documentado en src/data/blogPosts.js.
function BlogBody({ body = '' }) {
  const blocks = body.trim().split(/\n\s*\n/);
  return (
    <>
      {blocks.map((block, index) => {
        const lines = block.split('\n').map((line) => line.trim()).filter(Boolean);
        if (lines.length === 0) return null;
        const image = lines.length === 1 && lines[0].match(/^!\[([^\]]*)\]\((\S+?)(?:\s+"([^"]*)")?\)$/);
        if (image) {
          const [, alt, src, caption] = image;
          return (
            <figure key={index} className="entrada-figura">
              <img src={src} alt={alt} loading="lazy" decoding="async" />
              {caption && <figcaption>{caption}</figcaption>}
            </figure>
          );
        }
        if (lines[0].startsWith('## ')) {
          return <h2 key={index}>{renderInline(lines.join(' ').slice(3))}</h2>;
        }
        if (lines.every((line) => line.startsWith('- '))) {
          return (
            <ul key={index}>
              {lines.map((line, i) => <li key={i}>{renderInline(line.slice(2))}</li>)}
            </ul>
          );
        }
        if (lines.every((line) => line.startsWith('>'))) {
          return <blockquote key={index}>{renderInline(lines.map((l) => l.replace(/^>\s?/, '')).join(' '))}</blockquote>;
        }
        return <p key={index}>{renderInline(lines.join(' '))}</p>;
      })}
    </>
  );
}

export default BlogBody;
