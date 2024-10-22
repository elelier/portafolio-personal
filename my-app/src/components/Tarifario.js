import React, { useEffect } from 'react';
import '../styles/components/Tarifario.css'; // Importamos el archivo de estilos

const Tarifario = () => {
  useEffect(() => {
    // Redirige al enlace externo de Canva
    setTimeout(() => {
      window.location.href = 'https://www.canva.com/design/DAGUOWwcH9A/1l0E9k6Yf7lnAlDff2B4PA/view?utm_content=DAGUOWwcH9A&utm_campaign=designshare&utm_medium=link&utm_source=editor#5';
    }, 3000); // Añadimos un pequeño delay de 3 segundos para mostrar el mensaje
  }, []);

  return (
    <div className="redirect-container">
      <h2 className="redirect-text">...Redirigiendo a Tarifas Octubre 2024...</h2>
    </div>
  );
};

export default Tarifario;
