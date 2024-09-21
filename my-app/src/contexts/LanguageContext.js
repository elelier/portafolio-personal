// src/contexts/LanguageContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';
import { getCurrentLanguage, changeLanguage, updateDynamicContent, getTranslation } from '../components/utils/languageUtils';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(getCurrentLanguage());

  useEffect(() => {
    updateDynamicContent(language);
  }, [language]);

  const toggleLanguage = () => {
    const newLanguage = language === 'es' ? 'en' : 'es';
    setLanguage(newLanguage);
    changeLanguage(newLanguage);
  };

  const translate = (key) => getTranslation(key, language);

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, translate }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);

export { LanguageContext };  // Añade esta línea