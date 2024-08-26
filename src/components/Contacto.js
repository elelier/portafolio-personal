import React from 'react';

function Contacto() {
  return (
    <section id="contacto" className="contacto">
      <h2>Contáctame</h2>
      <div className="contacto-contenido">
        <form className="formulario-contacto">
          <input type="text" placeholder="Nombre" required />
          <input type="email" placeholder="Correo electrónico" required />
          <textarea placeholder="Mensaje" required></textarea>
          <button type="submit">Enviar mensaje</button>
        </form>
        <div className="info-contacto">
          <h3>Información de contacto</h3>
          <p>📧 loya.elier@gmail.com</p>
          <p>📱 (+52) 811 780 1157</p>
          <p>📍 Monterrey, México</p>
          <div className="redes-sociales">
            <a href="https://linkedin.com/in/elier/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href="https://github.com/elelier" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href="/public/assets/files/file_1.pdf" download>Descargar CV</a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contacto;