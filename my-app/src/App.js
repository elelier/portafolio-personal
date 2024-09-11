import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
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
import Entrada from './components/entradas/entrada1'; // Importa el componente de entrada
import SobeMi from './components/SobreMi';

function App() {
  return (
    <Router>
      <div className="App">
        <SEO 
          title="Elier Loya - Transformando negocios con tecnología e innovación" 
          description="Portafolio de Elier Loya, especialista en transformación digital, e-commerce y optimización de operaciones."
        />
        <Navegacion />
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
          <Route path="/hero-banner" element={<HeroBanner />} />
          <Route path="/portafolio" element={<Portafolio />} />
          <Route path="/sobre-mi" element={<SobeMi />} />
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
