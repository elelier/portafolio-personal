import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { getProjects } from '../data/projects';
import '../styles/pages/ProjectsPage.css';

function ProjectsPage() {
  const { language } = useLanguage();
  const projects = getProjects(language);
  const copy = language === 'es'
    ? { eyebrow: 'ARCHIVO DE TRABAJO', title: 'Proyectos que puedes explorar', intro: 'Una selección de productos, sitios y sistemas construidos para resolver retos concretos.', back: 'Volver a la home' }
    : { eyebrow: 'WORK ARCHIVE', title: 'Projects you can explore', intro: 'A selection of products, sites and systems built to solve concrete challenges.', back: 'Back home' };

  return (
    <main className="projects-page">
      <header className="projects-page__header">
        <Link to="/" className="projects-page__back">← {copy.back}</Link>
        <span>{copy.eyebrow}</span>
        <h1>{copy.title}</h1>
        <p>{copy.intro}</p>
      </header>
      <div className="projects-page__grid">
        {projects.map((project) => (
          <Link className="project-index-card" to={`/proyectos/${project.id}`} key={project.id}>
            <div className="project-index-card__media">{project.featuredImage ? <img src={project.featuredImage} alt={project.title} loading="lazy" /> : <div className="project-index-card__placeholder"><span>{project.title}</span><small>{language === 'es' ? 'Imagen en preparación' : 'Image in progress'}</small></div>}</div>
            <div className="project-index-card__body">
              <span>{project.category}</span>
              <h2>{project.title}</h2>
              <p>{project.summary}</p>
              <b>↗</b>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}

export default ProjectsPage;
