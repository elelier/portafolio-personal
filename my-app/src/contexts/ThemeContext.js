// ThemeContext.js
import React, { createContext, useState, useEffect } from 'react';
import { getCurrentTheme, setTheme, getSystemTheme } from '../components/utils/themeUtils';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState(getCurrentTheme());

  useEffect(() => {
    if (currentTheme === 'system') {
      const systemTheme = getSystemTheme();
      setTheme(systemTheme);
      document.body.setAttribute('data-theme', systemTheme);
    } else {
      setTheme(currentTheme);
      document.body.setAttribute('data-theme', currentTheme);
    }
  }, [currentTheme]);

  const handleSetTheme = (newTheme) => {
    setCurrentTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <ThemeContext.Provider value={{ currentTheme, setTheme: handleSetTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};