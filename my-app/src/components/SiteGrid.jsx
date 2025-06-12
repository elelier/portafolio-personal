import React from 'react';
import '../styles/components/SiteGrid.css';

const SiteGrid = ({ sites, onSelect }) => {
  return (
    <div className="sites-grid">
      {sites.map(site => (
        <article 
          key={site.id} 
          className="site-card"
          onClick={() => onSelect(site)}
        >
          <img 
            src={site.thumbnail}
            alt={site.name}
            loading="lazy"
          />
          <div className="site-info">
            <h3>{site.name}</h3>
            <p>{site.shortDescription}</p>
            <div className="tech-tags">
              {site.tech.slice(0, 3).map((tech, index) => (
                <span key={index} className="tech-tag">{tech}</span>
              ))}
            </div>
          </div>
        </article>
      ))}
    </div>
  );
};

export default SiteGrid;
