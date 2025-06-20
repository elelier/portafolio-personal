import React, { useState } from 'react';
import Modal from './common/Modal';
import '../styles/components/UpdatesModal.css';

const UpdatesModal = ({ isOpen, onClose, updates }) => {
  const [expandedCard, setExpandedCard] = useState(null);

  if (!updates || updates.length === 0) return null;

  // Ordenar actualizaciones de más nueva a más antigua
  const sortedUpdates = [...updates].sort((a, b) => {
    return new Date(b.fecha) - new Date(a.fecha);
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  const getTypeIcon = (type) => {
    switch (type) {
      case 'completado':
        return '✅';
      case 'documento':
        return '📄';
      case 'cotizacion':
        return '💰';
      case 'recordatorio':
        return '⚠️';
      case 'tecnico':
        return '⚙️';
      case 'mejora':
        return '📈';
      case 'diseno':
        return '�';
      case 'aprobacion':
        return '✅';
      default:
        return '📢';
    }
  };

  const getTypeLabel = (type) => {
    switch (type) {
      case 'completado':
        return 'Completado';
      case 'documento':
        return 'Documento';
      case 'cotizacion':
        return 'Cotización';
      case 'recordatorio':
        return 'Recordatorio';
      case 'tecnico':
        return 'Técnico';
      case 'mejora':
        return 'Mejora';
      case 'diseno':
        return 'Diseño';
      case 'aprobacion':
        return 'Aprobación';
      default:
        return 'Actualización';
    }
  };
  // Obtener la fecha de la actualización más antigua (para mostrar el rango)
  const oldestUpdate = sortedUpdates.reduce((oldest, current) => {
    return new Date(current.fecha) < new Date(oldest.fecha) ? current : oldest;
  }, sortedUpdates[0]);
  const daysSinceOldest = Math.ceil((new Date() - new Date(oldestUpdate.fecha)) / (1000 * 60 * 60 * 24));

  const unreadCount = sortedUpdates.length;
  // Manejar click en card para expandir/contraer
  const handleCardClick = (updateId, event) => {
    // Prevenir que se cierre el modal
    event.stopPropagation();
    
    if (expandedCard === updateId) {
      setExpandedCard(null); // Contraer si ya está expandida
    } else {
      setExpandedCard(updateId); // Expandir nueva card
    }
  };

  // Manejar click fuera de las cards para contraer todas
  const handleContainerClick = (event) => {
    // Solo contraer si se hace click directamente en el contenedor de la lista
    if (event.target.classList.contains('updates-list')) {
      setExpandedCard(null);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Actualizaciones Recientes"
    >
      <div className="updates-modal-content">
        <div className="updates-header">
          <p className="updates-summary">
            {unreadCount > 0 
              ? `${unreadCount} actualización${unreadCount > 1 ? 'es' : ''} de los últimos ${daysSinceOldest} días`
              : 'No hay actualizaciones recientes'
            }
          </p>
        </div>        <div className="updates-list" onClick={handleContainerClick}>
          {sortedUpdates.map((update) => (
            <div 
              key={update.id} 
              className={`update-item ${expandedCard === update.id ? 'expanded' : ''}`}
              onClick={(e) => handleCardClick(update.id, e)}
            >
              <div className="update-icon">
                {getTypeIcon(update.tipo)}
              </div>
              
              <div className="update-content">
                <div className="update-header-info">
                  <h4 className="update-title">{update.titulo}</h4>
                  <div className="update-meta">
                    <span className={`update-type ${update.tipo}`}>{getTypeLabel(update.tipo)}</span>
                    <span className="update-date">{formatDate(update.fecha)}</span>
                  </div>
                </div>
                
                <p className="update-description">{update.descripcion}</p>
                
                {update.relacionadoCon && (
                  <div className="update-related">
                    <span className="related-label">Relacionado con:</span>
                    <span className="related-quote">{update.relacionadoCon}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
};

export default UpdatesModal;
