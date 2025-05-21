// my-app/src/components/ProjectDetailModal.jsx
import React, { useEffect } from 'react';
import { FaTimes } from 'react-icons/fa'; // react-icons should already be installed
import '../styles/components/ProjectDetailModal.css'; 

const ProjectDetailModal = ({ project, onClose }) => {
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  if (!project) {
    return null;
  }

  // Process longDescription for line breaks.
  // The project data uses `\n` for newlines.
  const processedLongDescription = project.longDescription
    ? project.longDescription.replace(/\n/g, '<br />')
    : '';

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()} 
        role="dialog" 
        aria-modal="true" 
        aria-labelledby="modal-project-title"
      >
        <button 
          onClick={onClose} 
          className="modal-close-button" 
          aria-label="Close modal"
        >
          <FaTimes />
        </button>
        <h2 id="modal-project-title">{project.name}</h2>
        <div className="modal-body">
          {/* Use dangerouslySetInnerHTML for the processed description */}
          <div className="long-description" dangerouslySetInnerHTML={{ __html: processedLongDescription }} />
          
          {project.tech && project.tech.length > 0 && (
            <>
              <h4>Tech Stack:</h4>
              <div className="tech-tags">
                {project.tech.map((techName, index) => (
                  <span key={index} className="tech-tag">{techName}</span>
                ))}
              </div>
            </>
          )}

          {(project.website || project.repository) && <h4>Links:</h4>}
          <div className="project-links-modal">
            {project.website && (
              <a 
                href={project.website} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="cta-link-modal"
                aria-label={`Visit website for ${project.name}`}
              >
                Visit Website
              </a>
            )}
            {project.repository && (
              <a 
                href={project.repository} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="cta-link-modal"
                aria-label={`View repository for ${project.name}`}
              >
                View Repository
              </a>
            )}
          </div>
          {/* Future placeholders:
          <h4>Screenshots:</h4>
          <p>(Placeholder for screenshots gallery)</p>
          <h4>Metrics & Impact:</h4>
          <p>(Placeholder for metrics)</p> 
          */}
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailModal;
