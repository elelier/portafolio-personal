import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './css/HeroBanner.css';

const DynamicHeroBanner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  const heroContent = [
    {
      title: "Director de Optimización de Operaciones",
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
    }

  ];

  useEffect(() => {
    // Cambia el contenido de manera rotativa
    const timer = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % heroContent.length);
        setIsTransitioning(false);
      }, 500);
    }, 8000);

    // Maneja el desplazamiento para ajustar el estilo del banner
    const handleScroll = () => {
      const position = window.pageYOffset;
      setScrollPosition(position);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      clearInterval(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [heroContent.length]);

  const currentContent = heroContent[currentIndex];
  
  // Define las clases para ocultar o mostrar elementos
  const getFadeClass = (position) => {
    return position > 100 ? 'fade-out' : 'fade-in'; // Ajusta el valor según sea necesario
  };

  return (
    <header className={`hero-banner ${scrollPosition > 0 ? 'zoom' : ''}`}>
        <div className={`info-container ${isTransitioning ? 'fade-out-content' : 'fade-in-content'} ${getFadeClass(scrollPosition)}`}>
        <h2 className="hero-title shiny">{currentContent.title}</h2>
        <h3 className="hero-subtitle">{currentContent.subtitle}</h3>
        <p className="hero-description">{currentContent.description}</p>
        <Link to="/servicios">
          <button className="hero-button">
            {currentContent.cta} →
          </button>
        </Link>
      </div>

      <div className={`scroll-indicator ${getFadeClass(scrollPosition)}`}>
        Más sobre mi
        <div className="scroll-arrow">▼</div>
      </div>
    </header>
  );
};

export default DynamicHeroBanner;
