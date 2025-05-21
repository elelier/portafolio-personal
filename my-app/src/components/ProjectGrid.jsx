// my-app/src/components/ProjectGrid.jsx
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import projectsData from '../data/projects.json';
import NewProjectCard from './NewProjectCard';
import '../styles/components/ProjectGrid.css'; // Ensure this path is correct

const ProjectGrid = ({ onProjectSelect }) => { // Accept onProjectSelect prop
  const { language } = useLanguage();
  const [displayProjects, setDisplayProjects] = React.useState([]);

  React.useEffect(() => {
    const langProjects = projectsData[language] || [];
    // Ensure that we only try to filter if langProjects is an array and p.status exists
    const published = langProjects.filter(p => p && p.status === 'published');
    setDisplayProjects(published);
  }, [language]);

  // Removed handleCardClick as it's now directly handled by onProjectSelect

  if (!displayProjects.length) {
    return <p className="project-grid-placeholder-message">No projects to display at the moment. Please check back later!</p>;
  }

  return (
    <div className="project-grid">
      {displayProjects.map((project, index) => ( // Using index as key is okay if list is static or no reordering
        <NewProjectCard 
          key={project.name || index} // Prefer a unique ID like project.id if available, or project.name
          project={project} 
          onClick={() => onProjectSelect(project)} // Use onProjectSelect here
        />
      ))}
    </div>
  );
};

export default ProjectGrid;
