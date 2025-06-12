// src/components/utils/languageUtils.js

import { translations } from './translations';

export function getTranslation(key, language) {
  if (translations[language] && translations[language][key]) {
    return translations[language][key];
  }
  console.warn(`Translation not found for key "${key}" in language "${language}"`);
  return key; // Return the key itself if translation is not found
}

export function getCurrentLanguage() {
  const storedLang = localStorage.getItem('language');
  if (storedLang) {
    return storedLang;
  }
  // Verifica el idioma del navegador, si es 'es-XX' o 'es', usa español.
  const browserLang = navigator.language || navigator.userLanguage; 
  if (browserLang.startsWith('es')) {
    return 'es';
  }
  return 'es'; // Default general a español
}

export function changeLanguage(newLanguage) {
  localStorage.setItem('language', newLanguage);
  // You might want to trigger a re-render or update of your app here
}

export function getBrowserLanguage() {
  return navigator.language.startsWith('es') ? 'es' : 'en';
}

export function updateDynamicContent(language) {
  // Implement this function to update dynamic content based on the language
}