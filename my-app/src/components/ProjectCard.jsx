import React from 'react';
import '../styles/components/ProjectCard.css';

const ProjectCard = ({ project }) => {
  return (
    <div className="project-card">
      <div className="project-header">
        <h3>{project.nombre}</h3>
        <div className="project-tags">
          {project.tecnologias.map((tech, index) => (
            <span key={index} className="tag">{tech}</span>
          ))}
        </div>
      </div>
      
      <p className="project-description">{project.descripcion}</p>
      
      <div className="project-features">
        <h4>Características principales:</h4>
        <ul>
          {project.caracteristicas.map((caracteristica, index) => (
            <li key={index}>{caracteristica}</li>
          ))}
        </ul>
      </div>
      
      <div className="project-links">
        {project.link && (
          <a 
            href={project.link} 
            target="_blank" 
            rel="noopener noreferrer"
            className="github-link"
          >
            Ver en GitHub
          </a>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;
