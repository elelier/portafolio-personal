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
    return <div className="client-space">Cliente no encontrado</div>;
  }

  if (!authorized) {
    return <div className="client-space">Acceso denegado</div>;
  }

  const { project, cotizaciones } = client;

  return (
    <div className="client-space">
      <Helmet>
        <meta name="robots" content="noindex,nofollow" />
        <link rel="canonical" href="https://www.elelier.com/" />
      </Helmet>
      <header className="client-header">
        <h1>{project.nombre}</h1>
        <p>{project.descripcion}</p>
        <p>
          <strong>{project.cliente}</strong> - {project.fecha}
        </p>
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
