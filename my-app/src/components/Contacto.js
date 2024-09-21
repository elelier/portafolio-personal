// Contacto.js

import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import CV from '../assets/files/2409_CV_EL.pdf';
import { motion } from 'framer-motion';
import '../styles/components/Contacto.css';
import perfilImg from '../assets/images/profile-picture-elier2.png';

const texts = {
  es: {
    contactTitle: 'Contáctame',
    contactPhrase: '¡Estoy aquí para ayudarte! No dudes en ponerte en contacto.',
    successMessage: 'Tu mensaje ha sido enviado correctamente, gracias por tu interés.',
    errorMessage: 'Hubo un problema al enviar tu mensaje. Por favor, intenta nuevamente.',
    networkError: 'Error en la red. Por favor, intenta nuevamente.',
    contactInfo: 'Información de contacto',
    email: 'loya.elier@gmail.com',
    whatsapp: '(+52) 811 780 1157',
    location: 'Monterrey, México',
    professionalLinks: 'Enlaces Profesionales',
    agenda: 'Agenda 30 minutos',
    downloadCV: 'Descargar CV',
    linkedin: 'LinkedIn',
    github: 'GitHub',
    namePlaceholder: 'Nombre',
    emailPlaceholder: 'Correo electrónico',
    messagePlaceholder: 'Mensaje'
  },
  en: {
    contactTitle: 'Contact Me',
    contactPhrase: 'I’m here to help! Feel free to get in touch.',
    successMessage: 'Your message has been sent successfully, thank you for your interest.',
    errorMessage: 'There was a problem sending your message. Please try again.',
    networkError: 'Network error. Please try again.',
    contactInfo: 'Contact Information',
    email: 'loya.elier@gmail.com',
    whatsapp: '(+52) 811 780 1157',
    location: 'Monterrey, Mexico',
    professionalLinks: 'Professional Links',
    agenda: 'Schedule 30 minutes',
    downloadCV: 'Download CV',
    linkedin: 'LinkedIn',
    github: 'GitHub',
    namePlaceholder: 'Name',
    emailPlaceholder: 'Email',
    messagePlaceholder: 'Message'
  }
};

function Contacto() {
  const { language } = useLanguage();
  const t = texts[language] || texts.en; // Default to English if language is not found

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
        setSuccessMessage(t.successMessage);
        setName('');
        setMail('');
        setMessage('');
      } else {
        setErrorMessage(t.errorMessage);
      }
    } catch (error) {
      setErrorMessage(t.networkError);
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
            <h2>{t.contactTitle}</h2>
            <p className="contacto-frase">{t.contactPhrase}</p>
          </div>
        </div>
        <div className="contacto-contenido">
          <form className="formulario-contacto" onSubmit={handleSubmit}>
            <AnimatedInput
              placeholder={t.namePlaceholder}
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={255}
            />
            <AnimatedInput
              placeholder={t.emailPlaceholder}
              type="email"
              value={mail}
              onChange={(e) => setMail(e.target.value)}
              maxLength={255}
            />
            <AnimatedInput
              placeholder={t.messagePlaceholder}
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
              {language === 'es' ? 'Enviar mensaje' : 'Send Message'}
            </motion.button>
            <div className='buttonmessage'>
              {successMessage && <p className="success-message">{successMessage}</p>}
              {errorMessage && <p className="error-message">{errorMessage}</p>}
            </div>
          </form>
          <div className="info-contacto">
            <h3>{t.contactInfo}</h3>
            <div className="info-contacto-links">
              <a href={`mailto:${t.email}`} className="info-contacto-link">
                <i className="fas fa-envelope"></i>
                {t.email}
              </a>
              <a href="https://wa.me/528117801157" target="_blank" rel="noopener noreferrer" className="info-contacto-link">
                <i className="fab fa-whatsapp"></i>
                {t.whatsapp}
              </a>
              <a href="https://www.google.com/maps/search/?api=1&query=Monterrey,+México" target="_blank" rel="noopener noreferrer" className="info-contacto-link">
                <i className="fas fa-map-marker-alt"></i>
                {t.location}
              </a>
            </div>
            <div className="redes-sociales">
              <h3>{t.professionalLinks}</h3>
              <div className="redes-sociales-links">
                <a href="https://linkedin.com/in/elier/" target="_blank" rel="noopener noreferrer" className="redes-sociales-link">
                  <i className="fab fa-linkedin"></i>
                  {t.linkedin}
                </a>
                <a href="https://github.com/elelier" target="_blank" rel="noopener noreferrer" className="redes-sociales-link">
                  <i className="fab fa-github"></i>
                  {t.github}
                </a>
              </div>
              <h3>Agenda y Documentos</h3>
              <div className="agenda-documentos-links">
                <a href="https://calendly.com/loya-elier/30min" target="_blank" rel="noopener noreferrer" className="agenda-documentos-link">
                  <i className="fas fa-calendar-check"></i>
                  {t.agenda}
                </a>
                <a href={CV} download className="agenda-documentos-link">
                  <i className="fas fa-file-download"></i>
                  {t.downloadCV}
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
