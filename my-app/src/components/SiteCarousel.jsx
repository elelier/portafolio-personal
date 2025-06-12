import React, { useState, useEffect } from 'react';
import { useSwipeable } from 'react-swipeable';
import '../styles/components/SiteCarousel.css';

const SiteCarousel = ({ sites, onSelect }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Navegación manual y automática
  const navigate = (direction) => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setCurrentIndex(prev => {
      const total = sites.length;
      if (direction === 'next') return (prev + 1) % total;
      return (prev - 1 + total) % total;
    });
    
    setTimeout(() => setIsTransitioning(false), 300);
  };

  // Auto-rotación
  useEffect(() => {
    const timer = setInterval(() => navigate('next'), 5000);
    return () => clearInterval(timer);
  }, [navigate]);

  // Gestos touch
  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => navigate('next'),
    onSwipedRight: () => navigate('prev'),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true
  });

  const currentSite = sites[currentIndex];

  return (
    <div className="site-carousel" {...swipeHandlers}>
      <div className={`carousel-content ${isTransitioning ? 'transitioning' : ''}`}>
        <img 
          src={window.innerWidth <= 768 ? currentSite.thumbnail : currentSite.fullImage}
          alt={currentSite.name}
          loading="lazy"
          onClick={() => onSelect(currentSite)}
        />
        <div className="carousel-info">
          <h3>{currentSite.name}</h3>
          <p>{currentSite.shortDescription}</p>
        </div>
      </div>
      
      <button 
        className="carousel-nav prev" 
        onClick={() => navigate('prev')}
        aria-label="Previous project"
      >‹</button>
      <button 
        className="carousel-nav next" 
        onClick={() => navigate('next')}
        aria-label="Next project"
      >›</button>

      <div className="carousel-indicators">
        {sites.map((_, idx) => (
          <button
            key={idx}
            className={`indicator ${idx === currentIndex ? 'active' : ''}`}
            onClick={() => setCurrentIndex(idx)}
            aria-label={`Go to project ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default SiteCarousel;
