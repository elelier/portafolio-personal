import React from 'react';
import Modal from './common/Modal';
import '../styles/components/UpdatesModal.css';

const UpdatesModal = ({ isOpen, onClose, updates }) => {
  if (!updates || updates.length === 0) return null;

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
      case 'aprobacion':
        return '✅';
      case 'documento':
        return '📄';
      case 'recordatorio':
        return '⏰';
      case 'completado':
        return '🎉';
      default:
        return '📢';
    }
  };

  const getTypeLabel = (type) => {
    switch (type) {
      case 'aprobacion':
        return 'Aprobación';
      case 'documento':
        return 'Documento';
      case 'recordatorio':
        return 'Recordatorio';
      case 'completado':
        return 'Completado';
      default:
        return 'Actualización';
    }
  };

  // Obtener la fecha de la actualización más antigua (para mostrar el rango)
  const oldestUpdate = updates.reduce((oldest, current) => {
    return new Date(current.fecha) < new Date(oldest.fecha) ? current : oldest;
  }, updates[0]);
  const daysSinceOldest = Math.ceil((new Date() - new Date(oldestUpdate.fecha)) / (1000 * 60 * 60 * 24));

  const unreadCount = updates.length;

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
        </div>

        <div className="updates-list">
          {updates.map((update) => (
            <div 
              key={update.id} 
              className="update-item"
            >
              <div className="update-icon">
                {getTypeIcon(update.tipo)}
              </div>
              
              <div className="update-content">
                <div className="update-header-info">
                  <h4 className="update-title">{update.titulo}</h4>
                  <div className="update-meta">
                    <span className="update-type">{getTypeLabel(update.tipo)}</span>
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
