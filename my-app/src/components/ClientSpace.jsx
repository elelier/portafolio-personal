import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/components/AccessForm.css';
import { Helmet } from 'react-helmet-async';
import data from '../data/clientProjects.json';
import QuoteCard from './QuoteCard';
import UpdatesModal from './UpdatesModal';
import clientAuthService from '../services/clientAuthService';
import { hashedPasscodes } from '../config/hashedPasscodes';
import '../styles/components/ClientSpace.css';

const ClientSpace = () => {
  const { token } = useParams();
  const client = data[token];
  const [authorized, setAuthorized] = useState(false);
  const [showUpdatesModal, setShowUpdatesModal] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState('');

  const handleSubmitPasscode = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!passcode.trim()) {
      setError('Por favor ingresa un código de acceso');
      return;
    }

    if (!hashedPasscodes[token]) {
      setError('Error de configuración del espacio cliente');
      console.error('No hay código hash configurado para el token:', token);
      return;
    }

    try {
      const isValid = await clientAuthService.verifyPasscode(passcode, hashedPasscodes[token]);
      if (isValid) {
        localStorage.setItem(`client_${token}`, passcode);
        setAuthorized(true);
      } else {
        setError('Código de acceso incorrecto');
      }
    } catch (err) {
      console.error('Error al verificar el código:', err);
      setError('Error al verificar el código de acceso');
    }
  };

  useEffect(() => {
    const verifyStoredAccess = async () => {
      if (!client || !hashedPasscodes[token]) return;

      const stored = localStorage.getItem(`client_${token}`);
      if (stored) {
        const isValid = await clientAuthService.verifyPasscode(stored, hashedPasscodes[token]);
        if (isValid) {
          setAuthorized(true);
          return;
        }
        localStorage.removeItem(`client_${token}`);
      }
    };

    verifyStoredAccess().catch(console.error);
  }, [token, client]);

  if (!client) {
    return (
      <div className="client-space">
        <Helmet>
          <title>Cliente no encontrado - Elelier</title>
          <meta name="robots" content="noindex,nofollow" />
        </Helmet>
        <div className="error-message">
          <h2> Cliente no encontrado</h2>
          <p>El token proporcionado no corresponde a ningún proyecto activo.</p>
          <p>Verifica la URL o contacta con el equipo de soporte.</p>
        </div>
      </div>
    );
  }

  if (!authorized) {
    return (
      <div className="access-form-container">
        <form onSubmit={handleSubmitPasscode} className="access-form">
          <h2>Acceso Restringido</h2>
          <p>Esta área es exclusiva para <strong>{client.project.nombre}</strong></p>
          <div className="form-group">
            <label htmlFor="passcode" className="form-label">
              Ingresa tu código de acceso
            </label>
            <input
              type="password"
              id="passcode"
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              className="form-input"
            />
          </div>
          {error && <div className="error-message">{error}</div>}
          <button type="submit" className="submit-button">
            Acceder
          </button>
        </form>
      </div>
    );
  }

  const { project, cotizaciones, actualizaciones = [] } = client;
  const today = new Date();
  const activeQuotes = [];
  const expiredQuotes = [];
  const approvedQuotes = [];

  if (cotizaciones) {
    cotizaciones.forEach((q) => {
      const exp = q.fechaExpiracion ? new Date(q.fechaExpiracion) : null;
      const isExpired = exp && exp < today;
      
      if (q.estado === 'aprobada') {
        approvedQuotes.push(q);
      } else if (isExpired) {
        expiredQuotes.push(q);
      } else if (q.estado !== 'cerrada') {
        activeQuotes.push(q);
      }
    });
  }

  const projectCategory = project?.estadoProyecto === 'terminado'
    ? 'Proyectos terminados'
    : activeQuotes.length > 0 
      ? 'Proyectos Activos'
      : 'Cotiza ahora';

  const getRecentUpdates = () => {
    const tenDaysAgo = new Date();
    tenDaysAgo.setDate(today.getDate() - 10);
    
    return actualizaciones.filter(update => {
      const updateDate = new Date(update.fecha);
      return updateDate >= tenDaysAgo;
    });
  };

  const recentUpdates = getRecentUpdates();

  const getLastModification = () => {
    const dates = [];
    
    if (actualizaciones?.length > 0) {
      actualizaciones.forEach(update => {
        if (update.fecha) {
          const updateDate = new Date(update.fecha);
          if (updateDate <= today) {
            dates.push(updateDate);
          }
        }
      });
    }
    
    if (cotizaciones?.length > 0) {
      cotizaciones.forEach(quote => {
        if (quote.fechaCreacion) {
          const creationDate = new Date(quote.fechaCreacion);
          if (creationDate <= today) {
            dates.push(creationDate);
          }
        }
      });
    }
    
    if (project?.fecha) {
      const [month, year] = project.fecha.split('/');
      if (month && year) {
        const projectDate = new Date(`${year}-${month.padStart(2, '0')}-01`);
        if (projectDate <= today) {
          dates.push(projectDate);
        }
      }
    }
    
    if (dates.length > 0) {
      const latestDate = new Date(Math.max(...dates));
      return latestDate.toLocaleDateString('es-ES', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      });
    }
    
    return null;
  };

  const lastModification = getLastModification();

  const handleOpenUpdatesModal = () => {
    setShowUpdatesModal(true);
  };

  const handleCloseUpdatesModal = () => {
    setShowUpdatesModal(false);
  };

  const scrollToActiveQuotes = () => {
    const activeQuotesSection = document.getElementById('active-quotes-section');
    if (activeQuotesSection) {
      const navHeight = 90;
      const elementPosition = activeQuotesSection.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleStatusButtonClick = () => {
    if (activeQuotes.length > 0) {
      scrollToActiveQuotes();
    } else {
      window.open('/contacto', '_blank');
    }
  };

  const handleStatusButtonKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleStatusButtonClick();
    }
  };

  return (
    <div className="client-space">
      <Helmet>
        <title>{project.nombre} - Espacio Cliente</title>
        <meta name="robots" content="noindex,nofollow" />
        <link rel="canonical" href="https://www.elelier.com/" />
      </Helmet>
      <div className="client-space-container">
        <header className="client-header">
          <div className="welcome-section">
            <h1>{project.nombre}</h1>
            <p className="welcome-message">
              Gracias por confiar en nosotros para hacer realidad este proyecto. 
              Aquí puedes revisar el progreso, detalles y cotizaciones de tu colaboración con nosotros.
            </p>
          </div>
          
          <div className="project-info-compact">
            <div className="info-row">
              <div className="info-item">
                <span className="info-label">Cliente</span>
                <span className="info-value">{project.cliente}</span>
              </div>
              
              <div 
                className="info-item contact-item"
                onClick={() => window.open('/contacto', '_blank')}
              >
                <span className="info-label">Contacto</span>
                <span className="contact-link">Elier Loya</span>
              </div>
            </div>
          </div>
          
          <div className="project-status-section">
            <div className="status-updates-row">
              <div 
                className={`status-badge ${project.estadoProyecto} clickable`}
                onClick={handleStatusButtonClick}
                role="button"
                tabIndex={0}
                onKeyDown={handleStatusButtonKeyDown}
                title={activeQuotes.length > 0 ? 'Click para ir a las cotizaciones activas' : 'Click para cotizar ahora'}
              >
                <span className="status-icon">📋</span>
                <span className="status-dot"></span>
                <span className="status-text-full">{projectCategory}</span>
                <span className="status-text-mobile">{activeQuotes.length > 0 ? 'Proyectos Activos' : 'Cotizar'}</span>
                {activeQuotes.length > 0 && (
                  <span className="status-count">{activeQuotes.length}</span>
                )}
              </div>
              
              {recentUpdates.length > 0 && (
                <button 
                  className="updates-button"
                  onClick={handleOpenUpdatesModal}
                >
                  <span className="updates-icon">🔔</span>
                  <span className="updates-text-full">Actualizaciones nuevas</span>
                  <span className="updates-text-mobile">Actualizaciones nuevas</span>
                  <span className="updates-count">{recentUpdates.length}</span>
                </button>
              )}
            </div>
          </div>
          
          {lastModification && (
            <div className="last-modification">
              <span className="last-modification-label">Última modificación:</span>
              <span className="last-modification-date">{lastModification}</span>
            </div>
          )}
        </header>

        {approvedQuotes.length > 0 && (
          <section className="quote-section">
            <h3>Proyectos Aprobados</h3>
            <div className="quote-list">
              {approvedQuotes.map((q) => (
                <QuoteCard 
                  key={q.id} 
                  quote={q} 
                  recentUpdates={recentUpdates.filter(update => 
                    update.relacionadoCon === q.id
                  )}
                  onNotificationClick={handleOpenUpdatesModal}
                />
              ))}
            </div>
          </section>
        )}

        {activeQuotes.length > 0 && (
          <section id="active-quotes-section" className="quote-section">
            <h3>Cotizaciones Activas</h3>
            <div className="quote-list">
              {activeQuotes.map((q) => (
                <QuoteCard 
                  key={q.id} 
                  quote={q} 
                  recentUpdates={recentUpdates.filter(update => 
                    update.relacionadoCon === q.id
                  )}
                  onNotificationClick={handleOpenUpdatesModal}
                />
              ))}
            </div>
          </section>
        )}

        {expiredQuotes.length > 0 && (
          <section className="quote-section">
            <h3>Cotizaciones Expiradas</h3>
            <div className="quote-list">
              {expiredQuotes.map((q) => (
                <QuoteCard 
                  key={q.id} 
                  quote={q} 
                  recentUpdates={recentUpdates.filter(update => 
                    update.relacionadoCon === q.id
                  )}
                  onNotificationClick={handleOpenUpdatesModal}
                />
              ))}
            </div>
          </section>
        )}
        
        <UpdatesModal
          isOpen={showUpdatesModal}
          onClose={handleCloseUpdatesModal}
          updates={recentUpdates}
        />
      </div>
    </div>
  );
};

export default ClientSpace;
