// Contacto.js

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { usePrefersReducedMotion } from './utils/generalUtils';
import perfilImg from '../assets/images/profile-picture-elier2.png';
import '../styles/components/Contacto.css';

const CONTACT_ENDPOINT = 'https://81ocg9.buildship.run/contact_me';
const EMAIL = 'loya.elier@gmail.com';
const WHATSAPP_URL = 'https://wa.me/528117801157';
const LINKEDIN_URL = 'https://linkedin.com/in/elier/';
const GITHUB_URL = 'https://github.com/elelier';

const texts = {
  es: {
    eyebrow: 'Hablemos',
    title: 'Cuéntame qué proceso quieres mejorar',
    description:
      'Cuéntame qué quieres automatizar, simplificar o convertir en producto. Reviso el contexto y te respondo con el siguiente paso más útil.',
    directLabel: 'Ruta directa',
    whatsappButton: 'Escríbeme por WhatsApp',
    whatsappHelper: 'Si prefieres, empieza con un resumen breve del reto.',
    formTitle: 'O comparte un poco más de contexto',
    nameLabel: 'Tu nombre',
    emailLabel: 'Tu correo',
    messageLabel: '¿Qué proceso quieres mejorar, automatizar, simplificar o convertir en producto?',
    submitButton: 'Enviar mensaje',
    submittingButton: 'Enviando mensaje…',
    microcopy: 'No necesitas un brief perfecto. Con el contexto suficiente para entender el reto basta.',
    successMessage: 'Gracias, ya recibí tu mensaje. Revisaré el contexto y te responderé con el siguiente paso más útil.',
    errorMessage: 'No pude enviar tu mensaje en este momento. Puedes escribirme por WhatsApp o correo.',
    findMeTitle: 'También puedes encontrarme en',
    location: 'Monterrey, México · Trabajo remoto',
    linkedin: 'LinkedIn',
    github: 'GitHub',
    quotePrefill: 'Hola, me gustaría solicitar una cotización.'
  },
  en: {
    eyebrow: 'Let’s talk',
    title: 'Tell me what process you want to improve',
    description:
      'Share what you want to automate, simplify or turn into a product. I review the context and reply with the most useful next step.',
    directLabel: 'Direct route',
    whatsappButton: 'Message me on WhatsApp',
    whatsappHelper: 'If you prefer, start with a short summary of the challenge.',
    formTitle: 'Or share a little more context',
    nameLabel: 'Your name',
    emailLabel: 'Your email',
    messageLabel: 'What process do you want to improve, automate, simplify or turn into a product?',
    submitButton: 'Send message',
    submittingButton: 'Sending message…',
    microcopy: 'You do not need a perfect brief. Just enough context to understand the challenge.',
    successMessage: "Thanks, I received your message. I'll review the context and reply with the most useful next step.",
    errorMessage: 'I could not send your message right now. You can reach me through WhatsApp or email.',
    findMeTitle: 'You can also find me on',
    location: 'Monterrey, Mexico · Remote work',
    linkedin: 'LinkedIn',
    github: 'GitHub',
    quotePrefill: 'Hi, I would like to request a quote.'
  }
};

function Contacto({ style }) {
  const { language } = useLanguage();
  const t = texts[language] || texts.en;
  const location = useLocation();
  const prefersReducedMotion = usePrefersReducedMotion();
  const AnimatedSection = prefersReducedMotion ? 'section' : motion.section;

  const [name, setName] = useState('');
  const [mail, setMail] = useState('');
  const [message, setMessage] = useState('');
  const [feedback, setFeedback] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('subject') === 'quote' && message === '') {
      setMessage(t.quotePrefill);
    }
  }, [location.search, message, t.quotePrefill]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    setFeedback({ type: '', message: '' });
    setIsSubmitting(true);

    try {
      const response = await fetch(CONTACT_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, mail, message })
      });

      if (!response.ok) {
        throw new Error('Contact request failed');
      }

      setFeedback({ type: 'success', message: t.successMessage });
      setName('');
      setMail('');
      setMessage('');
    } catch (error) {
      setFeedback({ type: 'error', message: t.errorMessage });
    } finally {
      setIsSubmitting(false);
    }
  };

  const feedbackClassName = feedback.type ? `contacto-feedback contacto-feedback--${feedback.type}` : 'contacto-feedback';

  return (
    <AnimatedSection
      id="contacto"
      className="contacto"
      style={{ scrollMarginTop: '96px', ...style }}
      {...(prefersReducedMotion
        ? {}
        : {
            initial: { opacity: 0, y: 32 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.5, ease: 'easeOut' }
          })}
    >
      <div className="contacto-shell">
        <div className="contacto-heading">
          <div>
            <p className="contacto-eyebrow">{t.eyebrow}</p>
            <h2>{t.title}</h2>
          </div>
          <p>{t.description}</p>
        </div>

        <div className="contacto-layout">
          <aside className="contacto-conversation" aria-label={t.directLabel}>
            <div className="contacto-profile">
              <img src={perfilImg} alt="Elier Loya" className="contacto-imagen" />
              <div>
                <p className="contacto-route-label">{t.directLabel}</p>
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="contacto-whatsapp">
                  <i className="fab fa-whatsapp" aria-hidden="true"></i>
                  <span>{t.whatsappButton}</span>
                </a>
                <p className="contacto-helper">{t.whatsappHelper}</p>
              </div>
            </div>

            <div className="contacto-secondary">
              <h3>{t.findMeTitle}</h3>
              <ul>
                <li>
                  <a href={`mailto:${EMAIL}`}>
                    <i className="fas fa-envelope" aria-hidden="true"></i>
                    <span>{EMAIL}</span>
                  </a>
                </li>
                <li className="contacto-location">
                  <i className="fas fa-location-dot" aria-hidden="true"></i>
                  <span>{t.location}</span>
                </li>
                <li>
                  <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-linkedin" aria-hidden="true"></i>
                    <span>{t.linkedin}</span>
                  </a>
                </li>
                <li>
                  <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-github" aria-hidden="true"></i>
                    <span>{t.github}</span>
                  </a>
                </li>
              </ul>
            </div>
          </aside>

          <form className="formulario-contacto" onSubmit={handleSubmit}>
            <div className="contacto-form-heading">
              <h3>{t.formTitle}</h3>
              <p>{t.microcopy}</p>
            </div>

            <div className="contacto-field">
              <label htmlFor="contact-name">{t.nameLabel}</label>
              <input
                id="contact-name"
                name="name"
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
                autoComplete="name"
                maxLength={255}
              />
            </div>

            <div className="contacto-field">
              <label htmlFor="contact-mail">{t.emailLabel}</label>
              <input
                id="contact-mail"
                name="mail"
                type="email"
                value={mail}
                onChange={(event) => setMail(event.target.value)}
                required
                autoComplete="email"
                maxLength={255}
              />
            </div>

            <div className="contacto-field">
              <label htmlFor="contact-message">{t.messageLabel}</label>
              <textarea
                id="contact-message"
                name="message"
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                required
                autoComplete="off"
                rows="5"
                maxLength={500}
              />
            </div>

            <button className="contacto-submit" type="submit" disabled={isSubmitting}>
              {isSubmitting ? t.submittingButton : t.submitButton}
            </button>

            <div className={feedbackClassName} aria-live="polite">
              {feedback.message && (
                <>
                  <p>{feedback.message}</p>
                  {feedback.type === 'error' && (
                    <div className="contacto-feedback-links">
                      <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                        WhatsApp
                      </a>
                      <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
                    </div>
                  )}
                </>
              )}
            </div>
          </form>
        </div>
      </div>
    </AnimatedSection>
  );
}

export default Contacto;
