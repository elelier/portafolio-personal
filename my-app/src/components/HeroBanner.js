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
        title: "Construyo cosas web por curiosidad",
        subtitle: "Digital Product Owner @ CHUBB (tiempo completo)",
        description: "En mi tiempo libre exploro ideas pequeñas: landing pages, micro herramientas, prototipos y ajustes a proyectos existentes. Ritmo calmado (10–20h/semana), foco en aprender y dejar algo útil.",
        icon: "🧪",
        cta: "Ver disponibilidad",
      },
      {
        title: "¿Tienes una idea pequeña?",
        subtitle: "Podemos iterarla sin presión",
        description: "No tomo proyectos urgentes ni consultorías largas. Si quieres validar algo simple, mejorar una página o experimentar con una función nueva, mándame un mensaje.",
        icon: "🌱",
        cta: "Iniciar conversación",
      }
    ],
    en: [
      {
        title: "I build web things out of curiosity",
        subtitle: "Digital Product Owner @ CHUBB (full-time)",
        description: "In my spare time I explore small ideas: landing pages, tiny tools, prototypes, incremental improvements. Calm pace (10–20h/week), learning‑driven, craft‑minded.",
        icon: "🧪",
        cta: "View availability",
      },
      {
        title: "Got a small idea?",
        subtitle: "We can explore it gently",
        description: "I don't take urgent or heavy consulting work. If you want to validate something simple, polish an existing page or try a small feature, just reach out.",
        icon: "🌱",
        cta: "Start a chat",
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
