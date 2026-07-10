import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { getProjectById, getProjects } from '../data/projects';
import '../styles/pages/ProjectDetailPage.css';

function ProjectDetailPage() {
  const { id } = useParams();
  const { language } = useLanguage();
  const project = getProjectById(id, language);
  const [activeImage, setActiveImage] = useState(0);

  if (!project) {
    return <main className="project-detail project-detail--empty"><h1>{language === 'es' ? 'Proyecto no encontrado' : 'Project not found'}</h1><Link to="/sites">← {language === 'es' ? 'Ver proyectos' : 'See projects'}</Link></main>;
  }

  const related = getProjects(language).filter((candidate) => candidate.id !== project.id).slice(0, 2);
  const gallery = project.gallery.length ? project.gallery : [];
  const copy = language === 'es'
    ? { back: 'Todos los proyectos', overview: 'En una frase', role: 'Mi papel', stack: 'Construido con', visit: 'Visitar proyecto ↗', related: 'También puedes ver' }
    : { back: 'All projects', overview: 'In one sentence', role: 'My role', stack: 'Built with', visit: 'Visit project ↗', related: 'You may also like' };

  return (
    <main className="project-detail">
      <Link to="/sites" className="project-detail__back">← {copy.back}</Link>
      <header className="project-detail__hero">
        <span>{project.category}</span>
        <h1>{project.title}</h1>
        <p>{project.summary}</p>
      </header>

      <section className="project-gallery" aria-label={language === 'es' ? 'Galería del proyecto' : 'Project gallery'}>
        <div className="project-gallery__main">{gallery.length ? <img src={gallery[activeImage]} alt={`${project.title} ${activeImage + 1}`} /> : <div className="project-gallery__placeholder"><strong>{project.title}</strong><span>{language === 'es' ? 'Galería visual en preparación' : 'Visual gallery in progress'}</span></div>}</div>
        {gallery.length > 0 && <div className="project-gallery__thumbs">
          {gallery.map((image, index) => (
            <button type="button" className={index === activeImage ? 'active' : ''} onClick={() => setActiveImage(index)} key={image} aria-label={`${project.title} ${index + 1}`}>
              <img src={image} alt="" />
            </button>
          ))}
        </div>}
      </section>

      <section className="project-detail__facts">
        <div><span>{copy.overview}</span><p>{project.longDescription || project.summary}</p></div>
        <div><span>{copy.role}</span><p>{project.role}</p></div>
        <div><span>{copy.stack}</span><p>{project.tech?.join(' · ')}</p></div>
        <div>{project.url && <a href={project.url} target="_blank" rel="noopener noreferrer">{copy.visit}</a>}</div>
      </section>

      {project.metrics.length > 0 && <ul className="project-detail__metrics">{project.metrics.map((metric) => <li key={metric}>{metric}</li>)}</ul>}

      <section className="project-detail__related" aria-labelledby="related-projects-title">
        <h2 id="related-projects-title">{copy.related}</h2>
        <div>{related.map((candidate) => <Link to={`/proyectos/${candidate.id}`} key={candidate.id}>{candidate.featuredImage ? <img src={candidate.featuredImage} alt={candidate.title} /> : <div className="project-detail__related-placeholder">{candidate.title}</div>}<span>{candidate.title} ↗</span></Link>)}</div>
      </section>
    </main>
  );
}

export default ProjectDetailPage;
