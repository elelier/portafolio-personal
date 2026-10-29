// Contacto.js

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { usePrefersReducedMotion } from './utils/generalUtils';
import { getCvRoute } from '../config/cvRoutes';
import { trackDirectContactClick, trackStoredContactLead } from './utils/contactAnalytics';
import perfilImg from '../assets/images/profile-picture-elier2.png';
import '../styles/components/Contacto.css';

const CONTACT_ENDPOINT = 'https://81ocg9.buildship.run/contact_me';
const GOOGLE_CONTACT_ENDPOINT = '/api/contact';
const EMAIL = 'hola@elelier.com';
const WHATSAPP_URL = 'https://wa.me/528117801157';
const LINKEDIN_URL = 'https://linkedin.com/in/elier/';
const GITHUB_URL = 'https://github.com/elelier';

const texts = {
  es: {
    eyebrow: 'Hablemos',
    title: 'Hablemos de tu próxima oportunidad o reto',
    description:
      '¿Tienes una oportunidad profesional, una colaboración o un proceso que quieres mejorar? Cuéntame el contexto y te responderé con el siguiente paso más útil.',
    directLabel: 'Ruta directa',
    whatsappButton: 'Escríbeme por WhatsApp',
    whatsappHelper: 'Si prefieres, empieza con un resumen breve del reto.',
    formTitle: 'O comparte un poco más de contexto',
    nameLabel: 'Tu nombre',
    emailLabel: 'Tu correo',
    messageLabel: 'Cuéntame sobre la oportunidad profesional o el reto que quieres resolver',
    submitButton: 'Enviar mensaje',
    submittingButton: 'Enviando mensaje…',
    microcopy: 'No necesitas un brief perfecto. Con el contexto suficiente para entender el reto basta.',
    successMessage: 'Gracias, ya recibí tu mensaje. Revisaré el contexto y te responderé con el siguiente paso más útil.',
    errorMessage: 'No pude enviar tu mensaje en este momento. Puedes escribirme por WhatsApp o correo.',
    partialMessage: 'Tu mensaje quedó registrado, pero hubo un problema con la notificación por correo. Si es urgente, escríbeme directamente.',
    securityError: 'Necesitamos completar la verificación de seguridad para enviar el mensaje.',
    securityLabel: 'Verificación de seguridad',
    findMeTitle: 'También puedes encontrarme en',
    locationNow: 'MTY, MX',
    locationMove: 'Mudanza a São Paulo, BR · 2027',
    cvLabel: 'CV en español (PDF)',
    cvAccessibleLabel: 'Ver CV en español (PDF, abre en una pestaña nueva)',
    linkedin: 'LinkedIn',
    github: 'GitHub',
    autoInsuranceCta: '¿Buscas seguro de auto? Cotiza con Chubb →',
    quotePrefill: 'Hola, me gustaría solicitar una cotización.'
  },
  en: {
    eyebrow: 'Let’s talk',
    title: 'Let’s talk about your next opportunity or challenge',
    description:
      'Have a professional opportunity, a collaboration or a process to improve? Share the context and I will reply with the most useful next step.',
    directLabel: 'Direct route',
    whatsappButton: 'Message me on WhatsApp',
    whatsappHelper: 'If you prefer, start with a short summary of the challenge.',
    formTitle: 'Or share a little more context',
    nameLabel: 'Your name',
    emailLabel: 'Your email',
    messageLabel: 'Tell me about the professional opportunity or challenge you want to solve',
    submitButton: 'Send message',
    submittingButton: 'Sending message…',
    microcopy: 'You do not need a perfect brief. Just enough context to understand the challenge.',
    successMessage: "Thanks, I received your message. I'll review the context and reply with the most useful next step.",
    errorMessage: 'I could not send your message right now. You can reach me through WhatsApp or email.',
    partialMessage: 'Your message was saved, but there was an issue with an email notification. If it is urgent, please reach out directly.',
    securityError: 'Please complete the security verification before sending your message.',
    securityLabel: 'Security verification',
    findMeTitle: 'You can also find me on',
    locationNow: 'MTY, MX',
    locationMove: 'Moving to São Paulo, BR · 2027',
    cvLabel: 'English CV (PDF)',
    cvAccessibleLabel: 'View CV in English (PDF, opens in a new tab)',
    linkedin: 'LinkedIn',
    github: 'GitHub',
    autoInsuranceCta: 'Looking for auto insurance? Get a quote with Chubb →',
    quotePrefill: 'Hi, I would like to request a quote.'
  }
};

function newContactSubmissionId() {
  if (typeof window.crypto.randomUUID === 'function') {
    return window.crypto.randomUUID();
  }
  const bytes = new Uint8Array(16);
  window.crypto.getRandomValues(bytes);
  bytes[6] = (bytes[6] & 0x0f) | 0x40;
  bytes[8] = (bytes[8] & 0x3f) | 0x80;
  const hex = Array.from(bytes, (byte) => byte.toString(16).padStart(2, '0')).join('');
  return [hex.slice(0, 8), hex.slice(8, 12), hex.slice(12, 16), hex.slice(16, 20), hex.slice(20)].join('-');
}

function Contacto({ style }) {
  const { language } = useLanguage();
  const t = texts[language] || texts.en;
  const location = useLocation();
  const prefersReducedMotion = usePrefersReducedMotion();
  const AnimatedSection = prefersReducedMotion ? 'section' : motion.section;
  // The default remains BuildShip in every build without an explicit Preview flag.
  const useGoogleContact = process.env.REACT_APP_CONTACT_PROVIDER === 'google';
  const turnstileSiteKey = process.env.REACT_APP_TURNSTILE_SITE_KEY;

  const [name, setName] = useState('');
  const [mail, setMail] = useState('');
  const [message, setMessage] = useState('');
  const [feedback, setFeedback] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState('');
  const turnstileContainerRef = useRef(null);
  const turnstileWidgetRef = useRef(null);
  const pendingContactRef = useRef(null);
  const submittingRef = useRef(false);
  const trackedSubmissionIdsRef = useRef(new Set());

  useEffect(() => {
    if (!useGoogleContact || !turnstileSiteKey) return undefined;
    let disposed = false;
    const renderTurnstile = () => {
      if (disposed || !window.turnstile || !turnstileContainerRef.current || turnstileWidgetRef.current !== null) return;
      turnstileWidgetRef.current = window.turnstile.render(turnstileContainerRef.current, {
        sitekey: turnstileSiteKey,
        callback: (token) => setTurnstileToken(token),
        'expired-callback': () => setTurnstileToken(''),
        'error-callback': () => setTurnstileToken('')
      });
    };
    let script = document.querySelector('script[data-elelier-turnstile]');
    if (!script) {
      script = document.createElement('script');
      script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
      script.async = true;
      script.dataset.elelierTurnstile = 'true';
      document.head.appendChild(script);
    }
    script.addEventListener('load', renderTurnstile);
    renderTurnstile();
    return () => {
      disposed = true;
      script.removeEventListener('load', renderTurnstile);
      if (window.turnstile && turnstileWidgetRef.current !== null) {
        window.turnstile.remove(turnstileWidgetRef.current);
        turnstileWidgetRef.current = null;
      }
    };
  }, [useGoogleContact, turnstileSiteKey]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('subject') === 'quote' && message === '') {
      setMessage(t.quotePrefill);
    }
  }, [location.search, message, t.quotePrefill]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isSubmitting || submittingRef.current) {
      return;
    }

    setFeedback({ type: '', message: '' });
    if (useGoogleContact && (!turnstileSiteKey || !turnstileToken)) {
      setFeedback({ type: 'error', message: t.securityError });
      return;
    }
    submittingRef.current = true;
    setIsSubmitting(true);

    try {
      const body = { name, mail, message };
      if (useGoogleContact) {
        const fingerprint = JSON.stringify({ name, mail, message });
        const submissionId = pendingContactRef.current?.fingerprint === fingerprint
          ? pendingContactRef.current.submissionId
          : newContactSubmissionId();
        pendingContactRef.current = { fingerprint, submissionId };
        Object.assign(body, {
          submissionId,
          website: event.currentTarget.elements.namedItem('website')?.value || '',
          turnstileToken,
          language
        });
      }
      const response = await fetch(useGoogleContact ? GOOGLE_CONTACT_ENDPOINT : CONTACT_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });

      if (!response.ok) {
        throw new Error('Contact request failed');
      }

      if (useGoogleContact) {
        const receipt = await response.json();
        const expectedNotification = response.status === 201 ? 'sent' : 'partial';
        if ((response.status !== 201 && response.status !== 202) || receipt.ok !== true ||
          receipt.submissionId !== body.submissionId || receipt.notificationStatus !== expectedNotification) {
          throw new Error('Invalid contact receipt');
        }
        if (!trackedSubmissionIdsRef.current.has(body.submissionId) &&
            trackStoredContactLead(receipt.notificationStatus, language)) {
          trackedSubmissionIdsRef.current.add(body.submissionId);
        }
        pendingContactRef.current = null;
        setFeedback({
          type: response.status === 202 ? 'warning' : 'success',
          message: response.status === 202 ? t.partialMessage : t.successMessage
        });
      } else {
        setFeedback({ type: 'success', message: t.successMessage });
      }
      setName('');
      setMail('');
      setMessage('');
    } catch (error) {
      setFeedback({ type: 'error', message: t.errorMessage });
    } finally {
      if (useGoogleContact) {
        setTurnstileToken('');
        if (window.turnstile && turnstileWidgetRef.current !== null) {
          window.turnstile.reset(turnstileWidgetRef.current);
        }
      }
      submittingRef.current = false;
      setIsSubmitting(false);
    }
  };

  const feedbackClassName = feedback.type ? `contacto-feedback contacto-feedback--${feedback.type}` : 'contacto-feedback';

  return (
    <AnimatedSection
      id="contacto"
      className="contacto"
      style={style}
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
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="contacto-whatsapp"
                  onClick={() => trackDirectContactClick('whatsapp', 'contact_primary', language)}>
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
                  <a href={`mailto:${EMAIL}`}
                    onClick={() => trackDirectContactClick('email', 'contact_secondary', language)}>
                    <i className="fas fa-envelope" aria-hidden="true"></i>
                    <span>{EMAIL}</span>
                  </a>
                </li>
                <li className="contacto-location">
                  <i className="fas fa-location-dot" aria-hidden="true"></i>
                  <span className="contacto-location__details">
                    <span className="contacto-location__now">{t.locationNow}</span>
                    <span className="contacto-location__move">{t.locationMove}</span>
                  </span>
                </li>
                <li>
                  <a href={getCvRoute(language)} target="_blank" rel="noopener noreferrer" aria-label={t.cvAccessibleLabel}>
                    <i className="fas fa-file-pdf" aria-hidden="true"></i>
                    <span>{t.cvLabel}</span>
                  </a>
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

            {useGoogleContact && (
              <>
                <input
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="contacto-honeypot"
                />
                <div className="contacto-turnstile" ref={turnstileContainerRef} aria-label={t.securityLabel} />
                {!turnstileSiteKey && <p className="contacto-security-unavailable">{t.securityError}</p>}
              </>
            )}

            <button className="contacto-submit" type="submit" disabled={isSubmitting || (useGoogleContact && !turnstileToken)}>
              {isSubmitting ? t.submittingButton : t.submitButton}
            </button>

            <div className={feedbackClassName} aria-live="polite">
              {feedback.message && (
                <>
                  <p>{feedback.message}</p>
                  {(feedback.type === 'error' || feedback.type === 'warning') && (
                    <div className="contacto-feedback-links">
                      <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
                        onClick={() => trackDirectContactClick('whatsapp', 'contact_fallback', language)}>
                        WhatsApp
                      </a>
                      <a href={`mailto:${EMAIL}`}
                        onClick={() => trackDirectContactClick('email', 'contact_fallback', language)}>{EMAIL}</a>
                    </div>
                  )}
                </>
              )}
            </div>
          </form>
        </div>

        <p className="contacto-auto-cta">
          <a href="/seguro-auto">{t.autoInsuranceCta}</a>
        </p>
      </div>
    </AnimatedSection>
  );
}

export default Contacto;
