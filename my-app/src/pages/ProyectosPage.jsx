import React, { useState } from 'react'; // Import useState
import { useLanguage } from '../../contexts/LanguageContext'; // Import useLanguage
import '../../styles/pages/ProyectosPage.css'; // Import the new CSS file
import FeaturedCarousel from '../../components/FeaturedCarousel'; // Add this import
import ProjectGrid from '../../components/ProjectGrid'; // Add this import
import ProjectDetailModal from '../../components/ProjectDetailModal'; // Add this import

const ProyectosPage = () => {
  const { language } = useLanguage(); // Initialize language context
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const openModal = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  const heroContent = {
    es: {
      title: "Proyectos destacados",
      subtitle: "Explora cómo diseño experiencias digitales que combinan estética y funcionalidad para impulsar resultados."
    },
    en: {
      title: "Featured Projects",
      subtitle: "Explore how I design digital experiences that combine aesthetics and functionality to drive results."
    }
  };

  return (
    <div className="proyectos-page-container">
      <section className="proyectos-hero">
        {/* The prompt shows a <div class="container"> here. I'll omit it for now as it's not in the CSS and might be an unused pattern. If it's standard, it can be added later. */}
        <h1>{heroContent[language].title}</h1>
        <p className="section-subtitle">{heroContent[language].subtitle}</p>
      </section>

      <FeaturedCarousel onProjectSelect={openModal} /> {/* Pass openModal */}

      <ProjectGrid onProjectSelect={openModal} /> {/* Pass openModal */}

      {/* Project Detail Modal will be triggered from carousel/grid items */}
      {isModalOpen && selectedProject && (
        <ProjectDetailModal project={selectedProject} onClose={closeModal} />
      )}
    </div>
  );
};

export default ProyectosPage;
