// my-app/src/components/FeaturedCarousel.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; // Import framer-motion
import { useSwipeable } from 'react-swipeable'; // Import useSwipeable
import { useLanguage } from '../contexts/LanguageContext';
import projectsData from '../data/projects.json'; // Make sure this path is correct
import '../styles/components/FeaturedCarousel.css'; // Ensure this path is correct
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

// TEMPORARY: Assume all featured projects use this banner
// Note: The actual path in projects.json is `../assets/images/projects/image-compressor-banner.png`
// For direct import in JSX, the path needs to be relative to *this* file.
// If images are in `my-app/src/assets/images/projects/`, then the path from `my-app/src/components/` would be `../assets/images/projects/...`
import imagePlaceholder from '../assets/images/projects/image-compressor-banner.png'; // Ensure this path is correct

const FeaturedCarousel = ({ onProjectSelect }) => { // Accept onProjectSelect prop
  const { language } = useLanguage();
  const [featuredProjects, setFeaturedProjects] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // For animation direction
  const [isHovering, setIsHovering] = useState(false); // For auto-rotation pause

  // Localization for CTAs - needs to be inside the component function
  const ctaTexts = {
    es: { viewCode: "Ver código", tryDemo: "Probar demo" },
    en: { viewCode: "View Code", tryDemo: "Try Demo" }
  };

  useEffect(() => {
    const langProjects = projectsData[language] || [];
    const filtered = langProjects.filter(p => p.featured);
    setFeaturedProjects(filtered);
    setCurrentIndex(0); 
    setDirection(0); 
  }, [language]);

  const slideVariants = {
    hidden: (direction) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 0.95
    }),
    visible: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: { duration: 0.3, ease: "easeInOut" }
    },
    exit: (direction) => ({
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 0.95,
      transition: { duration: 0.3, ease: "easeInOut" }
    })
  };

  const goToPrevious = () => {
    if (!featuredProjects.length) return;
    setDirection(-1);
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? featuredProjects.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    if (!featuredProjects.length) return;
    setDirection(1);
    const isLastSlide = currentIndex === featuredProjects.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  // Auto-rotation useEffect
  useEffect(() => {
    if (isHovering || featuredProjects.length <= 1) return;

    const timer = setTimeout(() => {
      goToNext(); 
    }, 5000); // Change slide every 5 seconds

    return () => clearTimeout(timer);
    // Add goToNext to dependencies if it's memoized with useCallback,
    // but here it's redefined on each render. For this simple case,
    // including it or not might not change behavior if it's stable.
    // To be safe, if goToNext were complex, it should be memoized.
  }, [currentIndex, isHovering, featuredProjects.length, goToNext]); // Added goToNext as it's used

  // Swipe handlers
  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => goToNext(),
    onSwipedRight: () => goToPrevious(),
    preventScrollOnSwipe: true,
    trackMouse: true 
  });

  if (!featuredProjects.length) {
    // Consistent with prompt's example, but could return null or a more styled placeholder
    return <p>No featured projects to display.</p>; 
  }

  const currentProject = featuredProjects[currentIndex];

  // Defensive check in case currentProject is undefined (e.g., if featuredProjects is empty after filtering)
  if (!currentProject) {
    return <p>Loading project...</p>; // Or handle more gracefully
  }

  return (
    <div 
      className="featured-carousel"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <button onClick={goToPrevious} className="carousel-arrow left-arrow" aria-label="Previous project">
        <FaChevronLeft />
      </button>
      {/* This div will act as the viewport for the animation and swipe gestures. */}
      <div className="carousel-viewport" {...swipeHandlers}> 
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex} // Important for AnimatePresence to detect changes
            custom={direction}
            variants={slideVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="carousel-slide" // Existing class for slide content styling
            onClick={() => onProjectSelect(currentProject)}
            role="button"
            tabIndex="0"
            onKeyPress={(e) => { if (e.key === 'Enter' || e.key === ' ') onProjectSelect(currentProject); }}
            aria-label={`View details for ${currentProject.name}`}
          >
            <img src={imagePlaceholder} alt={currentProject.name} className="carousel-image" />
            <div className="carousel-caption">
              <h3>{currentProject.name}</h3>
              <p>{currentProject.shortDescription}</p>
              <div className="carousel-actions">
                {currentProject.repository && (
                  <a 
                    href={currentProject.repository} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="cta-link-carousel" 
                    onClick={(e) => e.stopPropagation()}
                    aria-label={`View source code for ${currentProject.name}`}
                  >
                    {ctaTexts[language].viewCode}
                  </a>
                )}
                {currentProject.website && (
                  <a 
                    href={currentProject.website} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="cta-link-carousel" 
                    onClick={(e) => e.stopPropagation()}
                    aria-label={`Try demo for ${currentProject.name}`}
                  >
                    {ctaTexts[language].tryDemo}
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      <button onClick={goToNext} className="carousel-arrow right-arrow" aria-label="Next project">
        <FaChevronRight />
      </button>
    </div>
  );
};

export default FeaturedCarousel;
