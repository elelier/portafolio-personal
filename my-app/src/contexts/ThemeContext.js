import React, { createContext, useState, useEffect } from 'react';
import { getCurrentTheme, setTheme, toggleTheme } from '../components/utils/themeUtils';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState(getCurrentTheme());

  useEffect(() => {
    setTheme(currentTheme);
    document.body.setAttribute('data-theme', currentTheme);
  }, [currentTheme]);

  const handleToggleTheme = () => {
    const newTheme = toggleTheme(); // Llama a la función toggleTheme
    setCurrentTheme(newTheme); // Actualiza el estado con el nuevo tema
  };

  return (
    <ThemeContext.Provider value={{ currentTheme, toggleTheme: handleToggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
