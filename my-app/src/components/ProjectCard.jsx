import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import '../styles/components/ProjectCard.css';

const ProjectCard = ({ project }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { language } = useLanguage();

  const content = {
    es: {
      features: "Características principales"
    },
    en: {
      features: "Main features"
    }
  };

  return (
    <div className="project-card">
      {project.banner && (
        <div className="project-banner">
          <img src={project.banner} alt={project.nombre} />
        </div>
      )}
      <div className={`project-content ${isExpanded ? 'expanded' : ''}`}>
        <div 
          className="project-main-content"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="project-header">
            <h3>{project.nombre}</h3>
            <h4>{project.version}</h4>
            <div className="project-tags">
              {project.tecnologias.map((tech, index) => (
                <span key={index} className="tag">{tech}</span>
              ))}
            </div>
          </div>
          
          <p className="project-description">{project.descripcion}</p>
          
          <div className={`project-features ${isExpanded ? 'show' : ''}`}>
            <h4>{content[language].features}:</h4>
            <ul>
              {project.caracteristicas.map((caracteristica, index) => (
                <li key={index}>{caracteristica}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="project-links">
          {project.link && (
            <a 
              href={project.link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="github-link"
              onClick={(e) => e.stopPropagation()}
            >
              <project.icon className="github-icon" />
              {project.link_u}
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
