import React, { createContext, useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getTranslation, updateDynamicContent, changeLanguage } from '../components/utils/languageUtils';
import { homePathFor, isLocalizedHome, LANGUAGE_TAGS, localeFromPath } from '../i18n/locales';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  // URL is authoritative: stored preferences never redirect visitors automatically.
  const language = localeFromPath(location.pathname);

  useEffect(() => {
    updateDynamicContent(language);
    document.documentElement.lang = LANGUAGE_TAGS[language];
    changeLanguage(language);
    window.dispatchEvent(new Event('languagechange'));
  }, [language]);

  const setLanguage = (nextLanguage) => {
    const target = homePathFor(nextLanguage);
    // Preserve the section hash only when switching between equivalent home pages.
    navigate(target + (isLocalizedHome(location.pathname) ? location.hash : ''));
  };

  const toggleLanguage = () => {
    const locales = ['es', 'en', 'pt-br'];
    setLanguage(locales[(locales.indexOf(language) + 1) % locales.length]);
  };

  const translate = (key) => getTranslation(key, language);
  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, translate }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
export { LanguageContext };
