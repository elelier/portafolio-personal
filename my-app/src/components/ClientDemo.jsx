import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/components/ClientDemo.css';

const ClientDemo = () => {
  const clientExamples = [
    {
      token: "token123",
      passcode: "demo123",
      clientName: "Empresa Constructora S.A.",
      projectName: "Andamios Modulares",
      description: "Rediseño Web B2B para empresa de construcción"
    },
    {
      token: "tech456",
      passcode: "tech2024",
      clientName: "TechStore Solutions",
      projectName: "E-commerce TechStore",
      description: "Plataforma completa de comercio electrónico"
    }
  ];

  return (
    <div className="client-demo">
      <div className="container">
        <header className="demo-header">
          <h1>🔐 Demo: Espacios de Cliente</h1>
          <p>Prueba el sistema de espacios privados para clientes</p>
        </header>

        <div className="demo-grid">
          {clientExamples.map((client, index) => (
            <div key={index} className="demo-card">
              <div className="demo-card-header">
                <h3>{client.projectName}</h3>
                <span className="demo-badge">Demo {index + 1}</span>
              </div>
              
              <div className="demo-details">
                <p><strong>Cliente:</strong> {client.clientName}</p>
                <p><strong>Descripción:</strong> {client.description}</p>
                
                <div className="demo-credentials">
                  <h4>Credenciales de acceso:</h4>
                  <div className="credential-item">
                    <span className="label">Token:</span>
                    <code>{client.token}</code>
                  </div>
                  <div className="credential-item">
                    <span className="label">Código:</span>
                    <code>{client.passcode}</code>
                  </div>
                </div>
              </div>

              <div className="demo-actions">
                <Link 
                  to={`/proyecto/${client.token}`} 
                  className="demo-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  🚀 Probar Espacio Cliente
                </Link>
                
                <div className="demo-url">
                  <small>URL: /proyecto/{client.token}</small>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="demo-info">
          <h3>ℹ️ Cómo funciona</h3>
          <ol>
            <li>Haz clic en "Probar Espacio Cliente" para acceder</li>
            <li>Introduce el código de acceso cuando se solicite</li>
            <li>Explora las cotizaciones y documentos del proyecto</li>
            <li>Las páginas incluyen protección SEO (noindex)</li>
          </ol>
        </div>

        <div className="demo-documentation">
          <h3>📚 Para desarrolladores</h3>
          <p>Para agregar nuevos clientes, edita: <code>src/data/clientProjects.json</code></p>
          <p>Documentación completa en: <code>docs/CLIENT_SPACES.md</code></p>
        </div>
      </div>
    </div>
  );
};

export default ClientDemo;
