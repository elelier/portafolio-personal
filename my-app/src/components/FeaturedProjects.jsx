import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import '../styles/components/FeaturedProjects.css';

function FeaturedProjects({ projects = [] }) {
  const { language } = useLanguage();
  const visibleProjects = projects.filter((project) => project.featured).slice(0, 4);

  return (
    <section id="proyectos" className="featured-projects" aria-labelledby="featured-projects-title">
      <div className="featured-projects__heading">
        <div>
          <span>{language === 'es' ? 'TRABAJO SELECCIONADO' : 'SELECTED WORK'}</span>
          <h2 id="featured-projects-title">{language === 'es' ? 'Lo que ya está funcionando' : 'What is already working'}</h2>
        </div>
        <Link className="featured-projects__all" to="/sites">
          {language === 'es' ? 'Ver todos ↗' : 'See all ↗'}
        </Link>
      </div>

      <div className="featured-projects__grid">
        {visibleProjects.map((project, index) => (
          <Link className={`featured-project featured-project--${index + 1}`} to={`/proyectos/${project.id}`} key={project.id}>
            <div className="featured-project__media">
              <img src={project.featuredImage} alt={project.title} loading={index === 0 ? 'eager' : 'lazy'} />
              <span className="featured-project__open" aria-hidden="true">↗</span>
            </div>
            <div className="featured-project__body">
              <span>{project.category}</span>
              <h3>{project.title}</h3>
              <p>{project.summary}</p>
              <div className="featured-project__metrics" aria-label={language === 'es' ? 'Aspectos destacados' : 'Highlights'}>
                {project.metrics.slice(0, 3).map((metric) => <small key={metric}>{metric}</small>)}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default FeaturedProjects;
