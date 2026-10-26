const fs = require('fs');
const path = require('path');

const css = fs.readFileSync(path.join(__dirname, 'index.css'), 'utf8');

function getToken(name) {
  const match = css.match(new RegExp(`--${name}:\\s*([^;]+);`));
  expect(match).not.toBeNull();
  return match[1].trim();
}

describe('accent RGB theme tokens', () => {
  it.each(['light', 'dark'])('matches the active accent color in %s mode', (theme) => {
    const hex = getToken(`color-accent-${theme}`);
    const rgb = getToken(`color-accent-${theme}-rgb`);

    expect(hex).toMatch(/^#[0-9a-f]{6}$/i);
    const expectedRgb = [1, 3, 5]
      .map((offset) => parseInt(hex.slice(offset, offset + 2), 16))
      .join(', ');
    expect(rgb).toBe(expectedRgb);

    const themeBlock = css.match(
      new RegExp(`\\[data-theme="${theme}"\\] \\{([\\s\\S]*?)\\n\\}`)
    );
    expect(themeBlock).not.toBeNull();
    expect(themeBlock[1]).toContain(
      `--color-accent-rgb: var(--color-accent-${theme}-rgb);`
    );
  });
});
