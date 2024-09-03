import React from 'react';
import './css/Footer.css'; // Asegúrate de importar el archivo CSS correspondiente

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; 2024 Elier Loya. Todos los derechos reservados.</p>
        <div className="footer-links">
          <a href="#inicio">Inicio</a>
          <a href="#habilidades">Habilidades</a>
          <a href="#portafolio">Portafolio</a>
          <a href="#contacto">Contacto</a>
        </div>
      </div>
      <div></div>
    </footer>
  );
}

export default Footer;