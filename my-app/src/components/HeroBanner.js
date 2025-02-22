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
        title: "Transformación Digital & E-Commerce Revolucionaria",
        subtitle: "Moderniza y potencia tus ventas online",
        description: "Consultorías y workshops para digitalizar procesos y optimizar la presencia online en plataformas líderes. Da el salto a la innovación y transforma tu negocio hoy.",
        icon: "💻",
        cta: "Digitaliza tu Negocio",
      },
      {
        title: "Estrategias Basadas en Datos para Decisiones Inteligentes",
        subtitle: "Convierte datos en crecimiento real",
        description: "Sesiones de análisis y asesoría para interpretar métricas y tomar decisiones estratégicas que impulsen tu negocio.",
        icon: "🗃️",
        cta: "Potencia tus Datos",
      },
      {
        title: "Desarrollo Web y Soluciones a Medida",
        subtitle: "Construye la presencia digital perfecta",
        description: "Creación de páginas web, aplicaciones personalizadas, APIs y web scraping para optimizar procesos.",
        icon: "📱",
        cta: "Desarrolla tu Solución",
      },
      {
        title: "Soluciones de IA para Innovación",
        subtitle: "Impulsa la eficiencia con inteligencia artificial",
        description: "Integración de chatbots y automatización para transformar tus operaciones y ganar competitividad.",
        icon: "🧠",
        cta: "Innova con IA",
      }
    ],
    en: [
      {
        title: "Revolutionary Digital Transformation & E-Commerce",
        subtitle: "Modernize and boost your online sales",
        description: "Consulting and workshops to digitize processes and optimize your online presence.",
        icon: "💻",
        cta: "Digitize Your Business",
      },
      {
        title: "Data-Driven Strategies for Smart Decisions",
        subtitle: "Turn data into real growth",
        description: "Analytical sessions and advisory to interpret metrics and drive your business forward.",
        icon: "🗃️",
        cta: "Leverage Your Data",
      },
      {
        title: "Custom Web & App Development Solutions",
        subtitle: "Build the perfect digital presence",
        description: "Creation of websites, APIs, and web scraping to improve user experience.",
        icon: "📱",
        cta: "Develop Your Solution",
      },
      {
        title: "AI Solutions for Innovation",
        subtitle: "Boost efficiency with artificial intelligence",
        description: "Integration of chatbots, automation, and AI solutions to enhance your operations.",
        icon: "🧠",
        cta: "Innovate with AI",
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
