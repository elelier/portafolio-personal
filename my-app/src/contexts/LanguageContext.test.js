import React, { act } from 'react';
import { createRoot } from 'react-dom/client';
import { MemoryRouter, useLocation } from 'react-router-dom';
import { LanguageProvider, useLanguage } from './LanguageContext';
import { ThemeContext } from './ThemeContext';

globalThis.IS_REACT_ACT_ENVIRONMENT = true;

const LangHarness = () => {
  const { toggleLanguage, setLanguage, language } = useLanguage();
  const location = useLocation();

  return (
    <div>
      <button type="button" onClick={toggleLanguage}>Toggle language</button>
      <button type="button" onClick={() => setLanguage('pt-br')}>Português</button>
      <span data-testid="language">{language}</span>
      <span data-testid="path">{location.pathname}</span>
    </div>
  );
};

describe('LanguageContext', () => {
  beforeEach(() => {
    document.documentElement.id = 'html-lang';
    document.documentElement.lang = 'es-MX';
    localStorage.clear();
    localStorage.setItem('language', 'es');
  });

  afterEach(() => {
    document.body.innerHTML = '';
    document.documentElement.id = '';
    document.documentElement.lang = 'en';
    localStorage.clear();
  });

  it('updates html lang to es-MX and en as language changes', () => {
    const container = document.createElement('div');
    document.body.appendChild(container);
    const root = createRoot(container);

    act(() => {
      root.render(
        <ThemeContext.Provider value={{ currentTheme: 'dark', setTheme: jest.fn() }}>
          <MemoryRouter initialEntries={['/']}>
            <LanguageProvider><LangHarness /></LanguageProvider>
          </MemoryRouter>
        </ThemeContext.Provider>
      );
    });

    expect(document.documentElement.lang).toBe('es-MX');

    const toggle = container.querySelector('button');
    act(() => {
      toggle.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    expect(document.documentElement.lang).toBe('en');
    expect(container.querySelector('[data-testid="path"]').textContent).toBe('/en/');

    act(() => container.querySelectorAll('button')[1].click());
    expect(document.documentElement.lang).toBe('pt-BR');
    expect(container.querySelector('[data-testid="path"]').textContent).toBe('/pt-br/');

    act(() => root.unmount());
    container.remove();
  });
});
