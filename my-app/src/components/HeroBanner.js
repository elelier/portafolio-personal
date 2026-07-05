import React, { useState, useEffect, useCallback, useMemo, useContext } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { ThemeContext } from '../contexts/ThemeContext';
import heroPortrait from '../assets/images/profile-picture-elier2.png';
import '../styles/components/HeroBanner.css';

const DynamicHeroBanner = ({ style }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const { language } = useLanguage();
  const { currentTheme } = useContext(ThemeContext);

  const heroContent = useMemo(() => ({
    es: [
      {
        title: 'Transformo procesos complicados en soluciones que realmente funcionan.',
        subtitle: 'Ex-COO de GoFarma y Digital Product Owner en CHUBB.',
        description: 'Estrategia, prototipo y métricas reales para validar, automatizar o destrabar un reto operativo con claridad y ejecución visible.',
        icon: '🧪',
        cta: 'Hablemos de tu reto',
        secondaryCta: 'Ver casos reales'
      }
    ],
    en: [
      {
        title: 'I turn complex business processes into digital solutions that actually work',
        subtitle: 'Ex-COO at GoFarma and Digital Product Owner at CHUBB.',
        description: 'I combine operations, product thinking and practical technology to help teams move faster, make better decisions and solve real business problems.',
        icon: '🧪',
        cta: 'Let’s talk about your challenge',
        secondaryCta: 'Explore real projects'
      }
    ]
  }), []);

  const scrollHintText = useMemo(() => ({ es: 'Ver soluciones', en: 'See solutions' }), []);
  const currentHeroContent = useMemo(() => heroContent[language], [heroContent, language]);
  const currentContent = currentHeroContent[currentIndex];

  useEffect(() => {
    if (currentHeroContent.length <= 1) return;
    const timer = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % currentHeroContent.length);
        setIsTransitioning(false);
      }, 500);
    }, 25000);
    return () => clearInterval(timer);
  }, [currentHeroContent.length]);

  useEffect(() => {
    const handleScroll = () => setScrollPosition(window.pageYOffset);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const canvas = document.getElementById('star-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    let animationFrameId;
    const stars = Array.from({ length: 500 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      radius: Math.random() * 1.5,
      speed: Math.random() * 0.1 + 0.05,
    }));

    const drawStars = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach((star) => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, 2 * Math.PI);
        ctx.fillStyle = 'white';
        ctx.fill();
        star.x -= star.speed;
        if (star.x < 0) {
          star.x = canvas.width;
          star.y = Math.random() * canvas.height;
        }
      });
      animationFrameId = requestAnimationFrame(drawStars);
    };

    if (currentTheme === 'dark') {
      resizeCanvas();
      drawStars();
      window.addEventListener('resize', resizeCanvas);
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    };
  }, [currentTheme]);

  const getFadeClass = useCallback(() => (scrollPosition > 100 ? 'fade-out' : 'fade-in'), [scrollPosition]);

  const scrollToSection = useCallback((id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <header id="hero-banner" className={`hero-banner ${scrollPosition ? 'zoom' : ''} ${currentTheme}-theme`} style={style}>
      <canvas id="star-canvas"></canvas>

      <div className={`hero-layout ${isTransitioning ? 'fade-out-content' : 'fade-in-content'}`}>
        <figure className="hero-portrait-card" aria-label="Elier Loya">
          <img src={heroPortrait} alt="Elier Loya" className="hero-portrait" />
          <figcaption>
            <strong>Elier Loya</strong>
            <span>Digital Product Owner · Ex-COO startup</span>
          </figcaption>
        </figure>

        <div className="info-container">
          <span className="hero-eyebrow">
            {language === 'es' ? 'Producto digital · Operaciones · IA aplicada' : 'Digital product · Operations · Applied AI'}
          </span>
          <h2 className="hero-title shiny">{currentContent?.title}</h2>
          <h3 className="hero-subtitle">{currentContent?.subtitle}</h3>
          <p className="hero-description">{currentContent?.description}</p>
          <div className="hero-actions" aria-label="Acciones principales">
            <button className="hero-button" onClick={() => scrollToSection('contacto')}>
              {currentContent?.cta}
            </button>
            <button className="hero-button-secondary" onClick={() => scrollToSection('casos-reales')}>
              {currentContent?.secondaryCta}
            </button>
          </div>
        </div>
      </div>

      <div className={`scroll-indicator scroll-indicator--secondary ${getFadeClass()}`} onClick={() => scrollToSection('soluciones')}>
        {scrollHintText[language]} <div className="scroll-arrow">▼</div>
      </div>
    </header>
  );
};

export default DynamicHeroBanner;
