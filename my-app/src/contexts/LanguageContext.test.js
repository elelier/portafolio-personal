import React, { act } from 'react';
import { createRoot } from 'react-dom/client';
import { LanguageProvider, useLanguage } from './LanguageContext';
import { ThemeContext } from './ThemeContext';

globalThis.IS_REACT_ACT_ENVIRONMENT = true;

const LangHarness = () => {
  const { toggleLanguage } = useLanguage();

  return (
    <button type="button" onClick={toggleLanguage}>
      Toggle language
    </button>
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
          <LanguageProvider>
            <LangHarness />
          </LanguageProvider>
        </ThemeContext.Provider>
      );
    });

    expect(document.documentElement.lang).toBe('es-MX');

    const toggle = container.querySelector('button');
    act(() => {
      toggle.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    expect(document.documentElement.lang).toBe('en');

    act(() => root.unmount());
    container.remove();
  });
});
