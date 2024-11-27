import React from 'react';
import Modal from './common/Modal';
import { useTechDetails } from './TechDetails';
import { useLanguage } from '../contexts/LanguageContext';
import '../styles/components/TechDetailsModal.css';

const TechDetailsModal = ({ isOpen, onClose, techKey }) => {
  const { techCategories } = useTechDetails();
  const { language } = useLanguage();
  
  // Find the tech details in any category
  const findTechDetails = (key) => {
    if (!key) return null;
    
    for (const category in techCategories) {
      const tech = techCategories[category][key];
      if (tech) {
        return tech;
      }
    }
    return null;
  };

  const techDetails = findTechDetails(techKey);

  if (!techDetails || !isOpen) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={techDetails.name?.[language] || techDetails.name?.es || 'Technology Details'}
    >
      <div className="tech-details-content">
        {techDetails.icon && <div className="tech-icon">{techDetails.icon}</div>}
        
        <div className="tech-info">
          <p className="tech-description">{techDetails.description}</p>
          
          <div className="tech-metadata">
            {techDetails.year && (
              <div className="meta-item">
                <span className="meta-label">{language === 'es' ? 'Año:' : 'Year:'}</span>
                <span>{techDetails.year}</span>
              </div>
            )}
            {techDetails.creator && (
              <div className="meta-item">
                <span className="meta-label">{language === 'es' ? 'Creador:' : 'Creator:'}</span>
                <span>{techDetails.creator}</span>
              </div>
            )}
            {techDetails.popularity && (
              <div className="meta-item">
                <span className="meta-label">{language === 'es' ? 'Popularidad:' : 'Popularity:'}</span>
                <span>{techDetails.popularity}</span>
              </div>
            )}
          </div>

          {techDetails.features && techDetails.features.length > 0 && (
            <div className="tech-features">
              <h3>{language === 'es' ? 'Características Principales:' : 'Main Features:'}</h3>
              <ul>
                {techDetails.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          )}

          {techDetails.tools && techDetails.tools.length > 0 && (
            <div className="tech-tools">
              <h3>{language === 'es' ? 'Herramientas Relacionadas:' : 'Related Tools:'}</h3>
              <ul>
                {techDetails.tools.map((tool, index) => (
                  <li key={index}>{tool}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default TechDetailsModal;
