import React, { useState, useEffect, useCallback, useMemo, useContext } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { ThemeContext } from '../contexts/ThemeContext'; // Importamos ThemeContext directamente
import '../styles/components/HeroBanner.css';
import brilloImage from '../assets/images/brillo.webp';

const DynamicHeroBanner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const { language } = useLanguage();
  const { currentTheme } = useContext(ThemeContext);
  const heroContent = useMemo(() => ({
    es: [
      {
        title: "Especialista en Optimización de Operaciones",
        subtitle: "Transformando operaciones para un crecimiento exponencial",
        description: "Con una experiencia sólida en la creación e implementación de estrategias para maximizar la eficiencia y rentabilidad, ofrezco soluciones innovadoras que potencian el éxito empresarial.",
        icon: "📊",
        cta: "Potencia tu Empresa",
        target: "CEO's, COO's"
      },
      {
        title: "Líder en Transformación Digital & E-Commerce",
        subtitle: "Revolucionando negocios para la era digital",
        description: "Experto en digitalización y gestión de plataformas como Mercado Libre, Amazon y Shopify.",
        icon: "💻",
        cta: "Digitaliza tu Negocio",
        target: "CTO's, Emprendedores"
      },
      {
        title: "Estratega de Soluciones AI Avanzadas",
        subtitle: "Resolviendo desafíos complejos con inteligencia artificial",
        description: "Implementación de IA y chatbots personalizados para potenciar la eficiencia operativa.",
        icon: "🧠",
        cta: "Innova con IA",
        target: "CTO's, Innovadores"
      },
      {
        title: "Consultor en Logística y Almacenes",
        subtitle: "Optimizando operaciones para una mejora continua",
        description: "Soluciones integrales para la gestión eficiente de almacenes y cadenas de suministro.",
        icon: "🚚",
        cta: "Mejora tu Logística",
        target: "COO's, Gerentes de Operaciones"
      },
      {
        title: "Experto en Estrategias Basadas en Datos",
        subtitle: "Tomando decisiones informadas para el éxito empresarial",
        description: "Análisis avanzado de datos para impulsar estrategias de negocio efectivas y medibles.",
        icon: "🗃️",
        cta: "Potencia tus Datos",
        target: "CEO's, Analistas de Datos"
      },
      {
        title: "Estrategias Avanzadas para E-Commerce",
        subtitle: "Optimiza tus ventas online con soluciones innovadoras",
        description: "Asesoramiento y estrategias para mejorar la presencia y efectividad en plataformas de comercio electrónico.",
        icon: "🛒",
        cta: "Potencia tu E-Commerce",
        target: "CTO's, Emprendedores, Gerentes de E-Commerce",
      },
      {
        title: "Desarrollo de Aplicaciones a Medida",
        subtitle: "Construye soluciones digitales personalizadas para tu negocio",
        description: "Desarrollo de aplicaciones a medida para resolver necesidades específicas de tu empresa.",
        icon: "📱",
        cta: "Desarrolla tu Aplicación",
        target: "CTO's, Gerentes de IT, Emprendedores",
      }
      
    ],
    en: [
      {
        title: "Operations Optimization Specialist",
        subtitle: "Transforming operations for exponential growth",
        description: "With solid experience in creating and implementing strategies to maximize efficiency and profitability, I offer innovative solutions that drive business success.",
        icon: "📊",
        cta: "Boost Your Business",
        target: "CEO's, COO's"
      },
      {
        title: "Digital Transformation & E-Commerce Leader",
        subtitle: "Revolutionizing businesses for the digital age",
        description: "Expert in digitalization and management of platforms like Mercado Libre, Amazon, and Shopify.",
        icon: "💻",
        cta: "Digitize Your Business",
        target: "CTO's, Entrepreneurs"
      },
      {
        title: "Advanced AI Solutions Strategist",
        subtitle: "Solving complex challenges with artificial intelligence",
        description: "Implementation of AI and customized chatbots to enhance operational efficiency.",
        icon: "🧠",
        cta: "Innovate with AI",
        target: "CTO's, Innovators"
      },
      {
        title: "Logistics and Warehouse Consultant",
        subtitle: "Optimizing operations for continuous improvement",
        description: "Comprehensive solutions for efficient warehouse and supply chain management.",
        icon: "🚚",
        cta: "Improve Your Logistics",
        target: "COO's, Operations Managers"
      },
      {
        title: "Data-Driven Strategy Expert",
        subtitle: "Making informed decisions for business success",
        description: "Advanced data analysis to drive effective and measurable business strategies.",
        icon: "🗃️",
        cta: "Leverage Your Data",
        target: "CEO's, Data Analysts"
      },
      {
        title: "Advanced E-Commerce Strategies",
        subtitle: "Optimize your online sales with innovative solutions",
        description: "Consulting and strategies to enhance your presence and effectiveness on e-commerce platforms.",
        icon: "🛒",
        cta: "Boost Your E-Commerce",
        target: "CTO's, Entrepreneurs, E-Commerce Managers",
      },
      {
        title: "Custom Application Development",
        subtitle: "Build tailored digital solutions for your business",
        description: "Development of custom applications to address your company's specific needs.",
        icon: "📱",
        cta: "Develop Your App",
        target: "CTO's, IT Managers, Entrepreneurs",
      }
      
    ]
  }), []);

  const moreAboutMeText = useMemo(() => ({
    es: "Más sobre mí",
    en: "More about me"
  }), []);

  const currentHeroContent = useMemo(() => heroContent[language] || [], [heroContent, language]);
  const heroContentLength = currentHeroContent.length;

  useEffect(() => {
    const timer = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % heroContentLength);
        setIsTransitioning(false);
      }, 500);
    }, 8000);

    return () => clearInterval(timer);
  }, [heroContentLength]);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.pageYOffset);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const canvas = document.getElementById('star-canvas');
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createStars = () => {
      const stars = [];
      const numStars = 500;
      for (let i = 0; i < numStars; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 1.5,
          speed: Math.random() * 0.05 + 0.05,
        });
      }
      return stars;
    };

    const drawStars = (stars) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach(star => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'white';
        ctx.fill();
        star.x -= star.speed;
        if (star.x < 0) {
          star.x = canvas.width;
          star.y = Math.random() * canvas.height;
        }
      });
      animationFrameId = requestAnimationFrame(() => drawStars(stars));
    };

    const initStarEffect = () => {
      resizeCanvas();
      const stars = createStars();
      drawStars(stars);
    };

    if (currentTheme === 'dark') {
      initStarEffect();
      window.addEventListener('resize', resizeCanvas);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      cancelAnimationFrame(animationFrameId);
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [currentTheme]);

  const getFadeClass = useCallback((position) => {
    return position > 100 ? 'fade-out' : 'fade-in';
  }, []);

  const scrollToSection = useCallback((sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const currentContent = currentHeroContent[currentIndex] || {};

  return (
    <header id="hero-banner" className={`hero-banner ${scrollPosition > 0 ? 'zoom' : ''} ${currentTheme}-theme`}>
      <canvas id="star-canvas"></canvas>
      <div className={`info-container ${isTransitioning ? 'fade-out-content' : 'fade-in-content'} ${getFadeClass(scrollPosition)}`}>
        <h2 className="hero-title shiny">{currentContent.title}</h2>
        
        <h3 className="hero-subtitle">{currentContent.subtitle}</h3>
        <p className="hero-description">{currentContent.description}</p>
        <button className="hero-button" onClick={() => scrollToSection('servicios')}>
          {currentContent.cta} →
        </button>
      </div>

      <div className={`scroll-indicator ${getFadeClass(scrollPosition)}`} onClick={() => scrollToSection('sobre-mi')}>
        {moreAboutMeText[language]}
        <div className="scroll-arrow">▼</div>
      </div>
    </header>
  );
};

export default DynamicHeroBanner;