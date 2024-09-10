// Contacto.js

import React, { useState } from 'react';
import CV from './assets/files/2409_CV_EL.pdf';
import { motion } from 'framer-motion';
import './css/Contacto.css';
import perfilImg from './assets/files/profile-picture-elier2.png';

function Contacto() {
  const [name, setName] = useState('');
  const [mail, setMail] = useState('');
  const [message, setMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://81ocg9.buildship.run/contact_me', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, mail, message }),
      });

      if (response.ok) {
        setSuccessMessage('Tu mensaje ha sido enviado correctamente, gracias por tu interés.');
        setName('');
        setMail('');
        setMessage('');
      } else {
        setErrorMessage('Hubo un problema al enviar tu mensaje. Por favor, intenta nuevamente.');
      }
    } catch (error) {
      setErrorMessage('Error en la red. Por favor, intenta nuevamente.');
    }
  };

  return (
    <motion.section
      id="contacto"
      className="contacto"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="contacto">
        <div className="contacto-header">
          <img src={perfilImg} alt="Perfil" className="contacto-imagen" />
          <div className="contacto-titulo">
            <h2>Contáctame</h2>
            <p className="contacto-frase">¡Estoy aquí para ayudarte! No dudes en ponerte en contacto.</p>
          </div>
        </div>
        <div className="contacto-contenido">
          <form className="formulario-contacto" onSubmit={handleSubmit}>
            <AnimatedInput
              placeholder="Nombre"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={255}
            />
            <AnimatedInput
              placeholder="Correo electrónico"
              type="email"
              value={mail}
              onChange={(e) => setMail(e.target.value)}
              maxLength={255}
            />
            <AnimatedInput
              placeholder="Mensaje"
              type="textarea"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              special
              maxLength={500}
            />
            <motion.button
              type="submit"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              Enviar mensaje
            </motion.button>
            <div className='buttonmessage'>
            {successMessage && <p className="success-message">{successMessage}</p>}
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            </div>
          </form>
          <div className="info-contacto">
            <h3>Información de contacto</h3>
            <div className="info-contacto-links">
              <a href="mailto:loya.elier@gmail.com" className="info-contacto-link">
                <i className="fas fa-envelope"></i>
                loya.elier@gmail.com
              </a>
              <a href="https://wa.me/528117801157" target="_blank" rel="noopener noreferrer" className="info-contacto-link">
                <i className="fab fa-whatsapp"></i>
                (+52) 811 780 1157
              </a>
              <a href="https://www.google.com/maps/search/?api=1&query=Monterrey,+México" target="_blank" rel="noopener noreferrer" className="info-contacto-link">
                <i className="fas fa-map-marker-alt"></i>
                Monterrey, México
              </a>
            </div>
            <div className="redes-sociales">
              <h3>Enlaces Profesionales</h3>
              <div className="redes-sociales-links">
                <a href="https://linkedin.com/in/elier/" target="_blank" rel="noopener noreferrer" className="redes-sociales-link">
                  <i className="fab fa-linkedin"></i>
                  LinkedIn
                </a>
                <a href="https://github.com/elelier" target="_blank" rel="noopener noreferrer" className="redes-sociales-link">
                  <i className="fab fa-github"></i>
                  GitHub
                </a>
              </div>
              <h3>Agenda y Documentos</h3>
              <div className="agenda-documentos-links">
                <a href="https://calendly.com/loya-elier/30min" target="_blank" rel="noopener noreferrer" className="agenda-documentos-link">
                  <i className="fas fa-calendar-check"></i>
                  Agenda 30 minutos
                </a>
                <a href={CV} download className="agenda-documentos-link">
                  <i className="fas fa-file-download"></i>
                  Descargar CV
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

function AnimatedInput({ placeholder, type, special, value, onChange, maxLength }) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className={`input-container ${special ? 'special' : ''}`}>
      <motion.label
        className="input-placeholder"
        initial={false}
        animate={{
          scale: isFocused ? 0.8 : 1,
          x: 10,
          y: isFocused ? (special ? -60 : -20) : 0,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        {placeholder}
      </motion.label>
      {type === 'textarea' ? (
        <motion.textarea
          className="input-field textarea-field"
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={(e) => !e.target.value && setIsFocused(false)}
          rows="4" // Define el número de filas visibles
          maxLength={maxLength} // Limita la cantidad de caracteres
        />
      ) : (
        <motion.input
          type={type}
          className="input-field"
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={(e) => !e.target.value && setIsFocused(false)}
          maxLength={maxLength} // Limita la cantidad de caracteres
        />
      )}
    </div>
  );
}

export default Contacto;
