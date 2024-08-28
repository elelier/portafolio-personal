import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './css/Navegacion.css';


function Navegacion() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="navegacion" role="navigation" aria-label="Navegación principal">
      <div className="nav-content">
        <div className="logo">EL</div>
        <button className="menu-toggle" onClick={toggleMenu} aria-label="Toggle menu">
          {menuOpen ? '✖' : '☰'} {/* Iconos para abrir (☰) y cerrar (✖) */}
        </button>
        <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
          <li><Link to="/" onClick={toggleMenu}>Inicio</Link></li>
          <li><Link to="/portafolio" onClick={toggleMenu}>Portafolio</Link></li>
          <li><Link to="/servicios" onClick={toggleMenu}>Servicios</Link></li>
          <li><Link to="/blog" onClick={toggleMenu}>Blog</Link></li>
          <li><Link to="/contacto" onClick={toggleMenu}>Contacto</Link></li>
        </ul>
      </div>
    </nav>
  );
}

export default Navegacion;
