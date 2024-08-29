import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './css/Navegacion.css';

function Navegacion() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const navigate = useNavigate(); // Usa useNavigate en lugar de useHistory

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleScrollToHero = () => {
    navigate('/'); // Navega a la página principal
    setTimeout(() => {
      const element = document.getElementById('hero-banner');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' }); // Desplaza suavemente a la sección
      }
    }, 100); // Pequeño retraso para asegurar que la navegación se complete
  };

  useEffect(() => {
    let timeoutId;

    const handleScroll = () => {
      setIsScrolling(true);

      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setIsScrolling(false);
      }, 1000); // 1 segundo después de detener el scroll, el menú reaparece
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className={`navegacion ${isScrolling ? 'fade-out' : 'fade-in'}`} role="navigation" aria-label="Navegación principal">
      <div className="nav-content">
        <div className="logo">Elier Loya Mata</div>
        <button className="menu-toggle" onClick={toggleMenu} aria-label="Toggle menu">
          {menuOpen ? '✖' : '☰'}
        </button>
        <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
          <li><Link to="/" onClick={handleScrollToHero}>Inicio</Link></li>
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
