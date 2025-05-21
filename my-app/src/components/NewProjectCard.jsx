// my-app/src/components/NewProjectCard.jsx
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext'; // Import useLanguage
import '../styles/components/NewProjectCard.css'; // Ensure this path is correct
import placeholderThumbnail from '../assets/images/projects/image-compressor-banner.png'; // Placeholder

const NewProjectCard = ({ project, onClick }) => {
  const { language } = useLanguage(); // Initialize language context
  if (!project) return null;

  const ctaTexts = {
    es: { viewCode: "Ver código", tryDemo: "Probar demo" },
    en: { viewCode: "View Code", tryDemo: "Try Demo" }
  };

  // Stop propagation for link clicks to prevent card click
  const handleLinkClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div 
      className="new-project-card" 
      onClick={onClick} 
      role="button" 
      tabIndex="0" 
      onKeyPress={(e) => { if (e.key === 'Enter' || e.key === ' ') onClick(); }} // Added spacebar for activation
      aria-label={`View details for ${project.name}`} // Accessibility: label for screen readers
    >
      <div className="card-thumbnail-wrapper">
        <img src={placeholderThumbnail} alt={project.name} className="card-thumbnail" />
      </div>
      <div className="card-content">
        <h3>{project.name}</h3>
        <p className="card-short-description">{project.shortDescription}</p>
        <div className="card-tech-tags">
          {project.tech && project.tech.map((techName, index) => (
            <span key={index} className="tech-tag">{techName}</span>
          ))}
        </div>
        {(project.repository || project.website) && ( // Only show actions area if there's something to show
            <div className="card-actions">
            {project.repository && (
                <a 
                href={project.repository} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="cta-link" 
                onClick={handleLinkClick}
                aria-label={`View source code for ${project.name}`} // Accessibility
                >
                {ctaTexts[language].viewCode}
                </a>
            )}
            {project.website && (
                <a 
                href={project.website} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="cta-link" 
                onClick={handleLinkClick}
                aria-label={`Try demo for ${project.name}`} // Accessibility
                >
                {ctaTexts[language].tryDemo}
                </a>
            )}
            </div>
        )}
      </div>
    </div>
  );
};

export default NewProjectCard;
