import React, { useEffect } from 'react';
import '../styles/components/SiteModal.css';

const SiteModal = ({ site, onClose }) => {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return (
    <div className="site-modal-overlay" onClick={onClose}>
      <div className="site-modal" onClick={e => e.stopPropagation()}>
        <button className="close-button" onClick={onClose} aria-label="Close modal">×</button>
        
        <img src={site.fullImage} alt={site.name} className="modal-image" />
        
        <div className="modal-content">
          <h2>{site.name}</h2>
          <p className="modal-description">{site.longDescription}</p>
          
          <div className="tech-stack">
            <h3>Tech Stack</h3>
            <div className="tech-tags">
              {site.tech.map((tech, index) => (
                <span key={index} className="tech-tag">{tech}</span>
              ))}
            </div>
          </div>

          <div className="modal-links">
            {site.website && (
              <a href={site.website} target="_blank" rel="noopener noreferrer" className="site-link">
                Ver Sitio →
              </a>
            )}
            {site.repository && (
              <a href={site.repository} target="_blank" rel="noopener noreferrer" className="repo-link">
                Ver Código →
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SiteModal;
