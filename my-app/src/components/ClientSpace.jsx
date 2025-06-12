import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import data from '../data/clientProjects.json';
import QuoteCard from './QuoteCard';
import '../styles/components/ClientSpace.css';

const ClientSpace = () => {
  const { token } = useParams();
  const client = data[token];
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    if (!client) return;
    const stored = localStorage.getItem(`client_${token}`);
    if (stored === client.passcode) {
      setAuthorized(true);
      return;
    }
    const pass = window.prompt('Ingresa tu c\u00f3digo de acceso');
    if (pass === client.passcode) {
      localStorage.setItem(`client_${token}`, pass);
      setAuthorized(true);
    }
  }, [token, client]);

  if (!client) {
    return (
      <div className="client-space">
        <Helmet>
          <title>Cliente no encontrado - Elelier</title>
          <meta name="robots" content="noindex,nofollow" />
        </Helmet>
        <div className="error-message">
          <h2>🔍 Cliente no encontrado</h2>
          <p>El token proporcionado no corresponde a ningún proyecto activo.</p>
          <p>Verifica la URL o contacta con el equipo de soporte.</p>
        </div>
      </div>
    );
  }

  if (!authorized) {
    return (
      <div className="client-space">
        <Helmet>
          <title>Acceso restringido - {client?.project?.nombre || 'Proyecto'}</title>
          <meta name="robots" content="noindex,nofollow" />
        </Helmet>
        <div className="access-denied">
          <h2>🔒 Acceso restringido</h2>
          <p>Este es un espacio privado para clientes.</p>
          <p>Se requiere un código de acceso válido para continuar.</p>
        </div>
      </div>
    );
  }

  const { project, cotizaciones } = client;

  return (
    <div className="client-space">
      <Helmet>
        <title>{project.nombre} - Espacio Cliente</title>
        <meta name="robots" content="noindex,nofollow" />
        <link rel="canonical" href="https://www.elelier.com/" />
      </Helmet>
      <header className="client-header">
        <h1>{project.nombre}</h1>
        <p>{project.descripcion}</p>
        <p>
          <strong>{project.cliente}</strong> - {project.fecha}
        </p>
        {project.estudio && (
          <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>
            {project.estudio} | {project.industria} | {project.ubicacion}
          </p>
        )}
      </header>
      <div className="quote-list">
        {cotizaciones.map((q) => (
          <QuoteCard key={q.id} quote={q} />
        ))}
      </div>
    </div>
  );
};

export default ClientSpace;
