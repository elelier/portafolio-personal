import React, { useState } from 'react';
import './css/Portafolio.css'; // Importa los estilos del portafolio desde la carpeta css

function Portafolio() {
  const proyectos = [
    {
      nombre: "Wonderlabs",
      rol: "Líder de Desarrollo y Marketing Digital",
      descripcion: "Lideré el desarrollo de un plan integral de medios digitales y marketing para Wonderlabs, una app que genera cuentos personalizados con moralejas para niños.",
      logros: [
        "Creación de una página web dinámica y API de backend robusta",
        "Implementación de campañas para distintas redes sociales",
        "Integración de IA para generar cuentos personalizados"
      ],
      tecnologias: ["React", "Node.js", "API development", "IA generativa", "Marketing digital"],
      link: "https://wonderlabs.studio",
      link_u: "wonderlabs.studio"
    },
    {
      nombre: "Asistentes Virtuales",
      rol: "Desarrollador de IA",
      descripcion: "Desarrollé asistentes de IA enfocados en marketing y gestión de proyectos, mejorando la eficacia de estrategias de marca y la planificación de proyectos.",
      logros: [
        "Creación de un asistente para generar ideas innovadoras de campañas publicitarias",
        "Desarrollo de un asistente para planificar, actualizar y evaluar proyectos",
        "Implementación de funciones para mantener la motivación y el enfoque en los logros"
      ],
      tecnologias: ["HuggingFace", "Procesamiento de Lenguaje Natural", "Machine Learning", "Python"],
      link: "https://huggingface.co/chat/assistants?user=Elelier",
      link_u: "huggingface.co"
    },
    {
      nombre: "GoFarma",
      rol: "Co-fundador y Director de Operaciones",
      descripcion: "Diseñé e implementé el modelo operativo de la compañía, logrando una precisión de inventario del 99.8% y tiempos de entrega competitivos.",
      logros: [
        "Precisión del inventario del 99.8%",
        "Tiempo de procesamiento por pedido de 2 minutos",
        "Optimización de envíos locales y nacionales"
      ],
      tecnologias: ["ERP Olimpo", "Automatización de procesos", "Gestión de inventarios"],
      link: "http://www.gofarma.com",
      link_u: "gofarma.com"
    },
    {
      nombre: "Farmalisto",
      rol: "Director de Ventas en Marketplaces",
      descripcion: "Gestioné la presencia en línea en diversos marketplaces, aumentando la visibilidad y conversión de clientes.",
      logros: [
        "Reducción del 50% en reclamos y cancelaciones",
        "Incremento del 144% en ventas",
        "Aumento del 58% en ticket promedio"
      ],
      tecnologias: ["Mercado Libre", "Amazon", "Shopify", "NetSuite ERP", "IA para atención al cliente"],
      link: "https://www.farmalisto.com.mx/",
      link_u: "farmalisto.com.mx"
    },
    {
      nombre: "PepsiCo",
      rol: "Coordinador de Proyectos de Productividad",
      descripcion: "Lideré proyectos de mejora en 8 plantas de Gamesa-Quaker, optimizando procesos y aumentando la eficiencia.",
      logros: [
        "Incremento del rendimiento de materia prima en un 0.4% a nivel nacional",
        "Implementación de KPIs y gestión de proyectos de aumento de capacidad"
      ],
      tecnologias: ["SAP", "Metodología DMAIC", "Lean Six Sigma"]
    }
  ];

  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleCollapse = (e) => {
    e.preventDefault();
    setIsCollapsed(!isCollapsed);
  };

  return (
    <section id="portafolio" className="portafolio">
      <div className="portafolio-header">
        <h2>Portafolio de Proyectos</h2>
      </div>
      <p className="introduccion shinyh">
        En mi trayectoria profesional, he liderado proyectos transformadores que han redefinido el éxito para diversas organizaciones.
        <br></br>
        <button className="leer-mas" onClick={toggleCollapse}>Leer más</button>
      </p>
      <div className={`contenido-colapsable ${isCollapsed ? 'collapsed' : ''}`}>
        <p>
        Desde aplicaciones innovadoras hasta la optimización de operaciones, mi portafolio combina estrategia, tecnología y una ejecución apasionada. Cada proyecto aborda desafíos complejos con soluciones escalables y automatizadas, ayudando a personas y organizaciones a superar obstáculos y crecer. Explora cómo estas experiencias han impulsado la transformación en cada caso.
        </p>
      </div>
      <div className="proyectos-grid">
        {proyectos.map((proyecto, index) => (
          <div 
            key={index} 
            className={`proyecto-card ${proyecto.nombre === 'Wonderlabs' || proyecto.nombre === 'Asistentes Virtuales' ? 'destacado ia' : ''}`}
          >
            <h3>{proyecto.nombre}</h3>
            <p className="proyecto-rol">{proyecto.rol}</p>
            <p className="proyecto-descripcion">{proyecto.descripcion}</p>
            <div className="proyecto-logros">
              <h4>Logros Destacados:</h4>
              <ul>
                {proyecto.logros.map((logro, i) => (
                  <li key={i}>{logro}</li>
                ))}
              </ul>
            </div>
            <div class="contenedor-tecnologias">
              <div className="proyecto-tecnologias">
                <h4>Tecnologías:</h4>
                <ul>
                  {proyecto.tecnologias.map((tech, i) => (
                    <li key={i}>{tech}</li>
                  ))}
                </ul>
              </div>
            </div>
            {proyecto.link && (
              <div className="proyecto-cta">
                <a href={proyecto.link} className="cta-button-3" target="_blank" rel="noopener noreferrer">
                  {proyecto.link_u}
                </a>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

export default Portafolio;
