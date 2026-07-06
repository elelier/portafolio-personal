import React, { act } from 'react';
import { createRoot } from 'react-dom/client';
import SettingsMenu from './SettingsMenu';
import { LanguageContext } from '../contexts/LanguageContext';
import { ThemeContext } from '../contexts/ThemeContext';

globalThis.IS_REACT_ACT_ENVIRONMENT = true;

const renderSettingsMenu = ({
  language = 'es',
  currentTheme = 'dark',
  toggleLanguage = jest.fn(),
  setTheme = jest.fn()
} = {}) => {
  const container = document.createElement('div');
  document.body.appendChild(container);
  const root = createRoot(container);

  act(() => {
    root.render(
      <LanguageContext.Provider value={{ language, toggleLanguage }}>
        <ThemeContext.Provider value={{ currentTheme, setTheme }}>
          <SettingsMenu />
        </ThemeContext.Provider>
      </LanguageContext.Provider>
    );
  });

  return {
    container,
    toggleLanguage,
    setTheme,
    cleanup: () => {
      act(() => root.unmount());
      container.remove();
    }
  };
};

describe('SettingsMenu', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('exposes the settings button with localized aria attributes and native controls', () => {
    const { container, cleanup } = renderSettingsMenu({ language: 'es', currentTheme: 'dark' });

    const toggle = container.querySelector('.settings-toggle');
    expect(toggle.tagName).toBe('BUTTON');
    expect(toggle.getAttribute('type')).toBe('button');
    expect(toggle.getAttribute('aria-expanded')).toBe('false');
    expect(toggle.getAttribute('aria-controls')).toBe('settings-menu');
    expect(toggle.getAttribute('aria-label')).toBe('Abrir configuración');

    act(() => {
      toggle.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    expect(toggle.getAttribute('aria-expanded')).toBe('true');

    const themeButtons = container.querySelectorAll('[data-settings-theme]');
    expect(themeButtons).toHaveLength(3);
    themeButtons.forEach((button) => {
      expect(button.tagName).toBe('BUTTON');
      expect(button.getAttribute('type')).toBe('button');
    });

    expect(container.querySelector('[data-settings-theme="light"]').getAttribute('aria-pressed')).toBe('false');
    expect(container.querySelector('[data-settings-theme="dark"]').getAttribute('aria-pressed')).toBe('true');
    expect(container.querySelector('[data-settings-theme="system"]').getAttribute('aria-pressed')).toBe('false');
    expect(container.querySelector('[data-settings-theme="light"]').getAttribute('aria-label')).toBe('Modo claro');
    expect(container.querySelector('[data-settings-theme="dark"]').getAttribute('aria-label')).toBe('Modo oscuro');
    expect(container.querySelector('[data-settings-theme="system"]').getAttribute('aria-label')).toBe('Tema del sistema');

    const languageButton = container.querySelector('[data-settings-language]');
    expect(languageButton.tagName).toBe('BUTTON');
    expect(languageButton.getAttribute('type')).toBe('button');
    expect(languageButton.getAttribute('aria-label')).toBe('Cambiar idioma a English');
    expect(languageButton.querySelector('img').getAttribute('aria-hidden')).toBe('true');

    cleanup();
  });

  it('keeps the closed menu hidden from assistive tech and exposes it when open', () => {
    const { container, cleanup } = renderSettingsMenu({ language: 'es', currentTheme: 'dark' });

    const toggle = container.querySelector('.settings-toggle');
    const panel = container.querySelector('#settings-menu');

    expect(panel.getAttribute('aria-hidden')).toBe('true');
    expect(panel.getAttribute('inert')).toBe('');
    expect(panel.classList.contains('open')).toBe(false);

    act(() => {
      toggle.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    expect(panel.getAttribute('aria-hidden')).toBe('false');
    expect(panel.hasAttribute('inert')).toBe(false);
    expect(panel.classList.contains('open')).toBe(true);

    cleanup();
  });

  it('switches language with an accessible destination label in English', () => {
    const { container, cleanup, toggleLanguage } = renderSettingsMenu({ language: 'en', currentTheme: 'light' });

    const languageButton = container.querySelector('[data-settings-language]');
    expect(languageButton.getAttribute('aria-label')).toBe('Switch language to Español');

    act(() => {
      languageButton.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    expect(toggleLanguage).toHaveBeenCalled();

    cleanup();
  });
});
