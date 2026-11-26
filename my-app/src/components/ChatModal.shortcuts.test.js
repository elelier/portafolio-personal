import { getSectionShortcuts } from './ChatModal';

describe('accesos rápidos del chat', () => {
  it.each([
    ['es', ['Soluciones', 'Casos reales', 'Cómo trabajo', 'Sobre Mí', 'Carrera', 'Contacto']],
    ['en', ['Solutions', 'Case studies', 'How I work', 'About Me', 'Career', 'Contact']],
    ['pt-br', ['Soluções', 'Casos reais', 'Como trabalho', 'Sobre mim', 'Carreira', 'Contato']]
  ])('usan los nombres y secciones actuales del sitio (%s)', (language, labels) => {
    const shortcuts = getSectionShortcuts(language);
    expect(shortcuts.map((s) => s.label)).toEqual(labels);
    expect(shortcuts.map((s) => s.target)).toEqual(['soluciones', 'casos-reales', 'como-trabajo', 'sobre-mi', 'portafolio', 'contacto']);
  });
});
