import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import SEO from './components/SEO';
import Navegacion from './components/Navegacion';
import HeroBanner from './components/HeroBanner';
import SobreMi from './components/SobreMi';
import ArsenalHabilidades from './components/ArsenalHabilidades';
import Portafolio from './components/Portafolio';
import PortafolioDetallado from './components/PortafolioDetallado';
import Servicios from './components/Servicios';
import Blog from './components/Blog';
import Contacto from './components/Contacto';
import Footer from './components/Footer';
import Entrada from './components/Entradas/2408_IA_Transforma_ecommerce'; // Importa el componente de entrada

function App() {
  return (
    <Router>
      <div className="App">
        <SEO 
          title="Elier Loya - Transformando negocios con tecnología e innovación" 
          description="Portafolio de Elier Loya, especialista en transformación digital, e-commerce y optimización de operaciones."
        />
        <p>Hello World</p> {/* Mensaje de prueba */}
        <Navegacion />
        <Routes>
          <Route path="/" element={
            <>
              <HeroBanner />
              <SobreMi />
              <ArsenalHabilidades />
              <Portafolio />
              <Contacto />
            </>
          } />
          <Route path="/portafolio" element={<PortafolioDetallado />} />
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
