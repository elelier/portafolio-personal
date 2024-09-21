import React, { useEffect } from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import { ThemeProvider } from './contexts/ThemeContext';
import './styles/App.css';
import SEO from './components/SEO';
import Navegacion from './components/Navegacion';
import HeroBanner from './components/HeroBanner';
import ArsenalHabilidades from './components/ArsenalHabilidades';
import Portafolio from './components/Portafolio';
import Servicios from './components/Servicios';
import Blog from './components/Blog';
import Contacto from './components/Contacto';
import Footer from './components/Footer';
import Entrada from './components/entradas/entrada1';
import SobreMi from './components/SobreMi';
import { initializeTheme } from './components/utils/themeUtils';
import { loadExternalScripts } from './components/utils/generalUtils';
import SettingsMenu from './components/SettingsMenu';

function App({ initialLanguage }) {
  useEffect(() => {
    initializeTheme();
    loadExternalScripts().then(() => {
    });
  }, [initialLanguage]);

  return (
    <LanguageProvider initialLanguage={initialLanguage}>
      <ThemeProvider>
        <Router>
          <div className="App">
          <SettingsMenu />
            <SEO 
              title="Elier Loya - Transformando Negocios con Tecnología e Innovación" 
              description="Portafolio de Elier Loya, especialista en transformación digital, e-commerce y optimización de operaciones."
            />
            <Navegacion />
            <Routes>
              <Route path="/" element={
                <>
                  <HeroBanner />
                  <SobreMi />
                  <ArsenalHabilidades />
                  <Portafolio />
                  <Servicios />
                  <Contacto />
                </>
              } />
              <Route path="/hero-banner" element={<HeroBanner />} />
              <Route path="/portafolio" element={<Portafolio />} />
              <Route path="/sobre-mi" element={<SobreMi />} />
              <Route path="/servicios" element={<Servicios />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/contacto" element={<Contacto />} />
              <Route path="/entradas/2408_IA_Transforma_ecommerce" element={<Entrada />} />
            </Routes>
            <Footer />
          </div>
        </Router>
      </ThemeProvider>
    </LanguageProvider>
  );
}

export default App;