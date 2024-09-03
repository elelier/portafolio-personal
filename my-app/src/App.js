import React, { useEffect } from 'react';
import { HashRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
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
import SobeMi from './components/SobreMi';
import { initGA, logPageView } from './components/analytics';

// Hook para registrar cambios de ruta
const usePageViews = () => {
  const location = useLocation();

  useEffect(() => {
    logPageView();
  }, [location]);
};

function App() {
  useEffect(() => {
    initGA('YOUR_TRACKING_ID'); // Reemplaza 'YOUR_TRACKING_ID' con tu ID de seguimiento
  }, []);

  return (
    <Router>
      <div className="App">
        <SEO 
          title="Elier Loya - Transformando negocios con tecnología e innovación" 
          description="Portafolio de Elier Loya, especialista en transformación digital, e-commerce y optimización de operaciones."
        />
        <Navegacion />
        <usePageViews />
        <Routes>
          <Route path="/" element={
            <>
              <HeroBanner />
              <SobeMi/>
              <ArsenalHabilidades />
              <Portafolio />
              <Contacto />
            </>
          } />
          <Route path="/portafolio" element={<Portafolio />} />
          <Route path="/servicios" element={<Servicios />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/entradas/2408_IA_Transforma_ecommerce" element={<Entrada />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
