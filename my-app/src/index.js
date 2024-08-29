import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';

// Obtén el contenedor del DOM donde se montará la aplicación
const container = document.getElementById('root');

// Crea una raíz para tu aplicación utilizando createRoot en lugar de ReactDOM.render
const root = createRoot(container);

// Renderiza la aplicación en la raíz
root.render(
  //<React.StrictMode>
    <App />
  //</React.StrictMode>
);