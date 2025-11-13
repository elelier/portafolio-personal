import React, { useState, useEffect, useCallback, useMemo, useContext } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { ThemeContext } from '../contexts/ThemeContext';
import '../styles/components/HeroBanner.css';

const DynamicHeroBanner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const { language } = useLanguage();
  const { currentTheme } = useContext(ThemeContext);

  // Contenido del banner
  const heroContent = useMemo(() => ({
    es: [
      {
        title: "Digital Product Owner & Creador de Side Projects",
        subtitle: "Construyo productos web experimentales",
        description: "Empleado tiempo completo en CHUBB. Disponible 10-20h/semana para proyectos pequeños: landing pages, prototipos y asesorías técnicas ligeras (sin presión de tiempo).",
        icon: "🧪",
        cta: "Ver Disponibilidad",
      },
      {
        title: "Proyectos Pequeños. Sin Prisa. Alto Cuidado.",
        subtitle: "Iteraciones simples que avanzan tu idea",
        description: "No hago consultorías profundas ni proyectos urgentes. Si tu idea puede crecer poco a poco y quieres alguien que experimente con ella, hablemos.",
        icon: "🌱",
        cta: "Hablemos",
      }
    ],
    en: [
      {
        title: "Digital Product Owner & Side Project Builder",
        subtitle: "I craft experimental web products",
        description: "Full-time employee at CHUBB. Available 10–20h/week for small scope work: landing pages, prototypes and light technical advisory (no hard deadlines).",
        icon: "🧪",
        cta: "View Availability",
      },
      {
        title: "Small, Calm, Craft-Oriented Work",
        subtitle: "Light iterations that move ideas forward",
        description: "I don't take on deep consulting or urgent large builds. If your idea can evolve gradually and you value thoughtful execution, let's talk.",
        icon: "🌱",
        cta: "Let's Talk",
      }
    ]
  }), []);

  const moreAboutMeText = useMemo(() => ({ es: "Más sobre mí", en: "More about me" }), []);
  const currentHeroContent = useMemo(() => heroContent[language], [heroContent, language]);
  const currentContent = currentHeroContent[currentIndex];

  // Cambiar banner automáticamente cada 10 segundos
  useEffect(() => {
    const timer = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % currentHeroContent.length);
        setIsTransitioning(false);
      }, 500);
    }, 10000);

    return () => clearInterval(timer);
  }, [currentHeroContent.length]);

  // Manejar scroll para animaciones
  useEffect(() => {
    const handleScroll = () => setScrollPosition(window.pageYOffset);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Efecto de estrellas en tema oscuro
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
    <header id="hero-banner" className={`hero-banner ${scrollPosition ? 'zoom' : ''} ${currentTheme}-theme`}>
      <canvas id="star-canvas"></canvas>

      <div className={`info-container ${isTransitioning ? 'fade-out-content' : 'fade-in-content'} ${getFadeClass()}`}>
        <h2 className="hero-title shiny">{currentContent?.title}</h2>
        <h3 className="hero-subtitle">{currentContent?.subtitle}</h3>
        <p className="hero-description">{currentContent?.description}</p>
        <button className="hero-button" onClick={() => scrollToSection('servicios')}>
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
