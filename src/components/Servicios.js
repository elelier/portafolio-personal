import React from 'react';
import '../components/css/Servicios.css'; // Asegúrate de que este archivo CSS esté en la misma carpeta

function Servicios() {
  const servicios = [
    {
      nombre: "Consultoría en Transformación Digital",
      descripcion: "Asesoramiento estratégico para la implementación de tecnologías digitales que optimicen procesos y mejoren la eficiencia operativa.",
      beneficios: [
        "Identificación de oportunidades de digitalización",
        "Desarrollo de estrategias de transformación a medida",
        "Implementación y seguimiento de proyectos digitales"
      ]
    },
    {
      nombre: "Optimización de Operaciones y Logística",
      descripcion: "Mejora de procesos operativos y logísticos para aumentar la eficiencia y reducir costos.",
      beneficios: [
        "Análisis y rediseño de procesos",
        "Implementación de sistemas de gestión de inventario",
        "Optimización de rutas y tiempos de entrega"
      ]
    },
    {
      nombre: "Implementación de Soluciones IA",
      descripcion: "Desarrollo e integración de soluciones de Inteligencia Artificial para automatizar tareas y mejorar la toma de decisiones.",
      beneficios: [
        "Chatbots y asistentes virtuales personalizados",
        "Sistemas de predicción y análisis avanzado",
        "Automatización de procesos mediante IA"
      ]
    },
    {
      nombre: "Desarrollo de Aplicaciones Personalizadas",
      descripcion: "Creación de aplicaciones a medida para satisfacer necesidades específicas de negocio.",
      beneficios: [
        "Soluciones adaptadas a requerimientos únicos",
        "Integración con sistemas existentes",
        "Mejora de la eficiencia y productividad"
      ]
    },
    {
      nombre: "Estrategias de E-commerce y Marketplaces",
      descripcion: "Diseño e implementación de estrategias para optimizar la presencia y ventas en plataformas de comercio electrónico.",
      beneficios: [
        "Optimización de listings y contenido",
        "Estrategias de pricing y promociones",
        "Gestión de reputación y servicio al cliente"
      ]
    }
  ];

  return (
    <div className="servicios">
      <h1>Servicios</h1>
      {servicios.map((servicio, index) => (
        <div key={index} className={`servicio servicio-${index}`}>
          <h2>{servicio.nombre}</h2>
          <p>{servicio.descripcion}</p>
          <h3>Beneficios:</h3>
          <ul>
            {servicio.beneficios.map((beneficio, i) => (
              <li key={i}>{beneficio}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default Servicios;
