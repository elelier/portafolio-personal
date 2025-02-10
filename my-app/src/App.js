import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { HelmetProvider } from 'react-helmet-async';
import './styles/App.css';
import SEO from './components/SEO';
import Navegacion from './components/Navegacion';
import HeroBanner from './components/HeroBanner';
import ArsenalHabilidades from './components/ArsenalHabilidades';
import Portafolio from './components/Portafolio';
import Proyectos from './components/Proyectos';
import Servicios from './components/Servicios';
import Contacto from './components/Contacto';
import Footer from './components/Footer';
import SobreMi from './components/SobreMi';
import { initializeTheme } from './components/utils/themeUtils';
import { loadExternalScripts } from './components/utils/generalUtils';
import SettingsMenu from './components/SettingsMenu';
import React, { useEffect, lazy, Suspense } from 'react';
import Tarifario from './components/Tarifario';
import FloatingButton from './components/FloatingButton';
import ChatModal from './components/ChatModal';
import { FaArrowUp } from 'react-icons/fa';
import ExternalRedirect from './components/ExternalRedirect';
import MockupRedirect from './components/MockupRedirect';

// Lazy load components
const Blog = lazy(() => import('./components/Blog'));
const Entrada = lazy(() => import('./components/entradas/entrada1'));

// Importa el componente de Tarifario para la redirección

function App({ initialLanguage }) {
  useEffect(() => {
    initializeTheme();
    loadExternalScripts().then(() => {});
  }, [initialLanguage]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <HelmetProvider>
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
              <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                  <Route path="/" element={
                    <>
                      <HeroBanner />
                      <SobreMi />
                      <ArsenalHabilidades />
                      <Portafolio />
                      <Proyectos />
                      <Servicios />
                      <Contacto />
                    </>
                  } />
                  {/* Ruta para la redirección del tarifario */}
                  <Route path="/tarifas-2024" element={<Tarifario />} />
                  <Route path="/hero-banner" element={<HeroBanner />} />
                  <Route path="/portafolio" element={<Portafolio />} />
                  <Route path="/sobre-mi" element={<SobreMi />} />
                  <Route path="/servicios" element={<Servicios />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/entradas/2408_IA_Transforma_ecommerce" element={<Entrada />} />
                  <Route path="/contacto" element={<Contacto />} />
                  <Route path="/cotizacion/:id" element={<ExternalRedirect />} />
                  <Route path="/mockup/:id" element={<MockupRedirect />} />
                </Routes>
              </Suspense>
              <Footer />
              <FloatingButton 
                icon={<FaArrowUp />} 
                onClick={scrollToTop}
                ariaLabel="Volver arriba"
              />
              <ChatModal />
            </div>
          </Router>
        </ThemeProvider>
      </LanguageProvider>
    </HelmetProvider>
  );
}

export default App;
