import React, { useState, useEffect, useCallback, useMemo, useContext } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { ThemeContext } from '../contexts/ThemeContext';
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
        title: 'Llevo tu idea de negocio a un producto digital funcional en semanas, no meses',
        subtitle: 'Ex-COO de GoFarma y Digital Product Owner en CHUBB. Solo tomo proyectos con foco.',
        description: 'Estrategia, prototipo y métricas reales para validar, automatizar o destrabar un reto operativo sin humo.',
        icon: '🧪',
        cta: 'Recibe diagnóstico exprés'
      }
    ],
    en: [
      {
        title: 'I turn your business idea into a working digital product in weeks, not months',
        subtitle: 'Ex-COO at GoFarma and Digital Product Owner at CHUBB. I only take focused projects.',
        description: 'Strategy, prototype and real metrics to validate, automate or unblock an operational challenge without fluff.',
        icon: '🧪',
        cta: 'Get an express diagnosis'
      }
    ]
  }), []);

  const moreAboutMeText = useMemo(() => ({ es: 'Más sobre mí', en: 'More about me' }), []);
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

      <div className={`info-container ${isTransitioning ? 'fade-out-content' : 'fade-in-content'} ${getFadeClass()}`}>
        <h2 className="hero-title shiny">{currentContent?.title}</h2>
        <h3 className="hero-subtitle">{currentContent?.subtitle}</h3>
        <p className="hero-description">{currentContent?.description}</p>
        <button className="hero-button" onClick={() => scrollToSection('diagnostico')}>
          {currentContent?.cta} →
        </button>
      </div>

      <div className={`scroll-indicator ${getFadeClass()}`} onClick={() => scrollToSection('sobre-mi')}>
        {moreAboutMeText[language]} <div className="scroll-arrow">▼</div>
      </div>
    </header>
  );
};

export default DynamicHeroBanner;
