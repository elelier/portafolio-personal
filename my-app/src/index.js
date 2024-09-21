import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles/index.css';
import App from './App';
import { initializeTheme } from './components/utils/themeUtils';
import { getCurrentLanguage } from './components/utils/languageUtils';
import { loadExternalScripts } from './components/utils/generalUtils';

// Obtén el contenedor del DOM donde se montará la aplicación
const container = document.getElementById('root');

// Crea una raíz para tu aplicación utilizando createRoot
const root = createRoot(container);

// Inicializa el tema
initializeTheme();

// Obtén el idioma actual
const currentLanguage = getCurrentLanguage();

// Renderiza la aplicación en la raíz
root.render(
  <React.StrictMode>
    <App initialLanguage={currentLanguage} />
  </React.StrictMode>
);

// Inicializa el manejo del chat y la configuración
window.addEventListener("load", async () => {
  // Carga scripts externos
  await loadExternalScripts();


});