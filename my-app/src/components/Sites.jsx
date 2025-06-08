import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { sitesData } from '../data/sites';
import SiteCarousel from './SiteCarousel';
import SiteGrid from './SiteGrid';
import SiteModal from './SiteModal';
import '../styles/components/Sites.css';
import { Link } from 'react-router-dom';

const Sites = ({ simplified = false }) => {
  const { language } = useLanguage();
  const [selectedSite, setSelectedSite] = useState(null);
  const sites = sitesData[language];
  const featuredSites = sites.filter(site => site.featured);

  const content = {
    es: {
      title: "Proyectos Destacados",
      subtitle: "Explora cómo diseño experiencias digitales que impulsan resultados",
      viewMore: "Ver más proyectos"
    },
    en: {
      title: "Featured Projects",
      subtitle: "Explore how I design digital experiences that drive results",
      viewMore: "View more projects"
    }
  };

  return (
    <section className="sites-section" aria-label={content[language].title}>
      <div className="sites-hero">
        <h1>{content[language].title}</h1>
        <p className="sites-subtitle">{content[language].subtitle}</p>
      </div>

      <SiteCarousel sites={featuredSites} onSelect={setSelectedSite} />
      
      {simplified ? (
        <div className="view-more-container">
          <Link to="/sites" className="view-more-button">
            {content[language].viewMore}
          </Link>
        </div>
      ) : (
        <SiteGrid sites={sites} onSelect={setSelectedSite} />
      )}
      
      {selectedSite && (
        <SiteModal 
          site={selectedSite} 
          onClose={() => setSelectedSite(null)} 
        />
      )}
    </section>
  );
};

export default Sites;
