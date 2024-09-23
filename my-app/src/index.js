import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles/index.css';
import App from './App';
import { getCurrentLanguage } from './components/utils/languageUtils';

const container = document.getElementById('root');
const root = createRoot(container);
const currentLanguage = getCurrentLanguage();

root.render(
  <React.StrictMode>
    <App initialLanguage={currentLanguage} />
  </React.StrictMode>
);