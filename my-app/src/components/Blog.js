import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/components/Blog.css'; // Importa los estilos del blog desde la carpeta css dentro de components

function Blog() {
  const articulos = [
    
  ];

  return (
    <div className="blog">
      <div className="blog-intro">
        <h1>Blog</h1>
        <p className="intro">
          Bienvenido a nuestro blog, donde compartimos artículos sobre las últimas tendencias y avances en tecnología, digitalización y más.
        </p>
        <div className="cta-seccion">
          <Link to="/servicios" className="cta-button">Mis Servicios</Link>
          <Link to="/contacto" className="cta-button">Contáctame</Link>
        </div>
      </div>
      <div className="articulos-list">
        {articulos.map((articulo, index) => (
          <div key={index} className="articulo">
            <img src={articulo.imagen} alt={`Imagen de ${articulo.titulo}`} className="articulo-imagen" />
            <div className="articulo-contenido">
              <h2>{articulo.titulo}</h2>
              <div className="etiquetas">
                {articulo.etiquetas.map((etiqueta, i) => (
                  <span key={i} className="etiqueta">{etiqueta}</span>
                ))}
              </div>
              <p className="fecha">{articulo.fecha}</p>
              <p>{articulo.resumen}</p>
              <Link to={articulo.link} className="leer-mas">Leer más</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Blog;
/* {
      titulo: "Cómo la IA está Transformando el E-commerce",
      fecha: "15 de Mayo, 2024",
      resumen: "Exploramos las diversas formas en que la Inteligencia Artificial está revolucionando la industria del comercio electrónico, desde la personalización hasta la optimización de inventarios.",
      link: "/entradas/entrada1", // Enlace a la entrada
      etiquetas: ["IA", "E-commerce", "Tecnología"],
      imagen: "https://via.placeholder.com/400x250?text=IA+en+E-commerce"
    },
    {
      titulo: "5 Estrategias Clave para la Transformación Digital en 2024",
      fecha: "3 de Abril, 2024",
      resumen: "Analizamos las tendencias más importantes en transformación digital y cómo las empresas pueden implementarlas para mantenerse competitivas.",
      link: "/entradas/entrada2", // Enlace a otra entrada de blog
      etiquetas: ["Transformación Digital", "Estrategias", "2024"],
      imagen: "https://via.placeholder.com/400x250?text=Transformación+Digital"
    },
    {
      titulo: "Optimización de la Cadena de Suministro con Machine Learning",
      fecha: "20 de Marzo, 2024",
      resumen: "Descubre cómo el aprendizaje automático está mejorando la eficiencia y reduciendo costos en la gestión de la cadena de suministro.",
      link: "/entradas/entrada3", // Enlace a otra entrada de blog
      etiquetas: ["Machine Learning", "Cadena de Suministro", "Optimización"],
      imagen: "https://via.placeholder.com/400x250?text=Machine+Learning"
    },
    {
      titulo: "Innovaciones en Salud Digital: Lo Que Nos Traerá el Futuro",
      fecha: "12 de Febrero, 2024",
      resumen: "Explora las últimas innovaciones en tecnología de salud digital y cómo están cambiando la manera en que se brinda atención médica.",
      link: "/entradas/entrada4", // Enlace a otra entrada de blog
      etiquetas: ["Salud Digital", "Innovaciones", "Tecnología"],
      imagen: "https://via.placeholder.com/400x250?text=Salud+Digital"
    },
    {
      titulo: "Automatización en el Logística: Más Allá del Simple Transporte",
      fecha: "5 de Enero, 2024",
      resumen: "Analizamos cómo la automatización está revolucionando la logística, desde el almacenamiento hasta la entrega final.",
      link: "/entradas/entrada5", // Enlace a otra entrada de blog
      etiquetas: ["Automatización", "Logística", "Transporte"],
      imagen: "https://via.placeholder.com/400x250?text=Automatización+Logística"
    } */