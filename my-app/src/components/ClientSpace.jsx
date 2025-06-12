import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import data from '../data/clientProjects.json';
import QuoteCard from './QuoteCard';
import UpdatesModal from './UpdatesModal';
import '../styles/components/ClientSpace.css';

const ClientSpace = () => {
  const { token } = useParams();
  const client = data[token];
  const [authorized, setAuthorized] = useState(false);
  const [showUpdatesModal, setShowUpdatesModal] = useState(false);

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

  const { project, cotizaciones, actualizaciones = [] } = client || {};

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

  const projectCategory =
    project?.estadoProyecto === 'terminado'
      ? 'Proyectos terminados'
      : activeQuotes.length > 0 
        ? 'Proyectos Activos'
        : 'Cotiza ahora';

  // Filtrar actualizaciones de los últimos 10 días
  const getRecentUpdates = () => {
    const tenDaysAgo = new Date();
    tenDaysAgo.setDate(today.getDate() - 10);
    
    return actualizaciones.filter(update => {
      const updateDate = new Date(update.fecha);
      return updateDate >= tenDaysAgo;
    });
  };

  const recentUpdates = getRecentUpdates();

  // Función para calcular la última modificación del proyecto
  const getLastModification = () => {
    const dates = [];
    const today = new Date();
    
    // Agregar fechas de actualizaciones
    if (actualizaciones && actualizaciones.length > 0) {
      actualizaciones.forEach(update => {
        if (update.fecha) {
          const updateDate = new Date(update.fecha);
          // Solo agregar si la fecha no es futura
          if (updateDate <= today) {
            dates.push(updateDate);
          }
        }
      });
    }
    
    // Agregar solo fechas de creación de cotizaciones (no expiración)
    if (cotizaciones && cotizaciones.length > 0) {
      cotizaciones.forEach(quote => {
        if (quote.fechaCreacion) {
          const creationDate = new Date(quote.fechaCreacion);
          // Solo agregar si la fecha no es futura
          if (creationDate <= today) {
            dates.push(creationDate);
          }
        }
      });
    }
    
    // Agregar fecha del proyecto si existe
    if (project?.fecha) {
      // Convertir formato "MM/YYYY" a fecha
      const [month, year] = project.fecha.split('/');
      if (month && year) {
        const projectDate = new Date(`${year}-${month.padStart(2, '0')}-01`);
        // Solo agregar si la fecha no es futura
        if (projectDate <= today) {
          dates.push(projectDate);
        }
      }
    }
    
    // Encontrar la fecha más reciente
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

  // Función para abrir el modal de actualizaciones
  const handleOpenUpdatesModal = () => {
    setShowUpdatesModal(true);
  };

  // Función para cerrar el modal de actualizaciones
  const handleCloseUpdatesModal = () => {
    setShowUpdatesModal(false);
  };

  // Función para hacer scroll suave a la sección de cotizaciones activas
  // Considera la altura de la barra de navegación para un posicionamiento óptimo
  const scrollToActiveQuotes = () => {
    const activeQuotesSection = document.getElementById('active-quotes-section');
    if (activeQuotesSection) {
      const navHeight = 90; // Altura de la barra de navegación + padding extra
      const elementPosition = activeQuotesSection.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // Función para manejar el click en el botón de estado/cotizar
  const handleStatusButtonClick = () => {
    if (activeQuotes.length > 0) {
      // Si hay cotizaciones activas, hacer scroll a la sección
      scrollToActiveQuotes();
    } else {
      // Si no hay cotizaciones activas, redirigir a contacto
      window.open('/contacto', '_blank');
    }
  };

  // Función para manejar el teclado en el botón de estado/cotizar
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
              onClick={() => {
                window.open('/contacto', '_blank');
              }}
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
              <span className="status-icon">{activeQuotes.length > 0 ? '🟢' : '💬'}</span>
              <span className="status-dot"></span>
              <span className="status-text-full">{projectCategory}</span>
              <span className="status-text-mobile">{activeQuotes.length > 0 ? 'Proyectos' : 'Cotizar'}</span>
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
                <span className="updates-text-mobile">Nuevas</span>
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
      
      {/* Modal de Actualizaciones */}
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
