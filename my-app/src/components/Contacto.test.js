import React, { act } from 'react';
import { createRoot } from 'react-dom/client';
import { MemoryRouter } from 'react-router-dom';
import Contacto from './Contacto';
import { LanguageContext } from '../contexts/LanguageContext';

globalThis.IS_REACT_ACT_ENVIRONMENT = true;

const CONTACT_ENDPOINT = 'https://81ocg9.buildship.run/contact_me';
const WHATSAPP_URL = 'https://wa.me/528117801157';
const EMAIL = 'hola@elelier.com';

function createDeferred() {
  let resolve;
  let reject;
  const promise = new Promise((promiseResolve, promiseReject) => {
    resolve = promiseResolve;
    reject = promiseReject;
  });

  return { promise, resolve, reject };
}

const renderContacto = (language = 'es', initialRoute = '/') => {
  const container = document.createElement('div');
  document.body.appendChild(container);
  const root = createRoot(container);

  act(() => {
    root.render(
      <MemoryRouter initialEntries={[initialRoute]}>
        <LanguageContext.Provider value={{ language }}>
          <Contacto />
        </LanguageContext.Provider>
      </MemoryRouter>
    );
  });

  return {
    container,
    cleanup: () => {
      act(() => root.unmount());
      container.remove();
    }
  };
};

const getFieldByLabel = (container, labelText) => {
  const label = Array.from(container.querySelectorAll('label')).find((item) => item.textContent === labelText);
  if (!label) {
    throw new Error(`Missing label: ${labelText}`);
  }

  const control = container.querySelector(`#${label.getAttribute('for')}`);
  if (!control) {
    throw new Error(`Missing control for label: ${labelText}`);
  }

  return control;
};

const setFieldValue = (field, value) => {
  act(() => {
    const prototype = field.tagName === 'TEXTAREA' ? window.HTMLTextAreaElement.prototype : window.HTMLInputElement.prototype;
    const valueSetter = Object.getOwnPropertyDescriptor(prototype, 'value').set;
    valueSetter.call(field, value);
    field.dispatchEvent(new Event('input', { bubbles: true }));
  });
};

const submitForm = (container) => {
  act(() => {
    container.querySelector('form').dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
  });
};

describe('Contacto', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.restoreAllMocks();
    document.body.innerHTML = '';
  });

  it('renders the full approved Spanish conversation copy', () => {
    const { container, cleanup } = renderContacto('es');

    expect(container.textContent).toContain('Hablemos');
    expect(container.textContent).toContain('Hablemos de tu próxima oportunidad o reto');
    expect(container.textContent).toContain(
      '¿Tienes una oportunidad profesional, una colaboración o un proceso que quieres mejorar? Cuéntame el contexto y te responderé con el siguiente paso más útil.'
    );
    expect(container.textContent).toContain('Ruta directa');
    expect(container.textContent).toContain('Escríbeme por WhatsApp');
    expect(container.textContent).toContain('Si prefieres, empieza con un resumen breve del reto.');
    expect(container.textContent).toContain('O comparte un poco más de contexto');
    expect(container.textContent).toContain('No necesitas un brief perfecto. Con el contexto suficiente para entender el reto basta.');
    expect(container.textContent).toContain('También puedes encontrarme en');
    expect(container.textContent).toContain('MTY, MX');
    expect(container.textContent).toContain('Mudanza a São Paulo, BR · 2027');

    cleanup();
  });

  it('renders the full approved English conversation copy', () => {
    const { container, cleanup } = renderContacto('en');

    expect(container.textContent).toContain('Let’s talk');
    expect(container.textContent).toContain('Let’s talk about your next opportunity or challenge');
    expect(container.textContent).toContain(
      'Have a professional opportunity, a collaboration or a process to improve? Share the context and I will reply with the most useful next step.'
    );
    expect(container.textContent).toContain('Direct route');
    expect(container.textContent).toContain('Message me on WhatsApp');
    expect(container.textContent).toContain('If you prefer, start with a short summary of the challenge.');
    expect(container.textContent).toContain('Or share a little more context');
    expect(container.textContent).toContain('You do not need a perfect brief. Just enough context to understand the challenge.');
    expect(container.textContent).toContain('You can also find me on');
    expect(container.textContent).toContain('MTY, MX');
    expect(container.textContent).toContain('Moving to São Paulo, BR · 2027');

    cleanup();
  });

  it.each([
    ['es', 'Mudanza a São Paulo, BR · 2027', 'CV en español (PDF)', 'Ver CV en español (PDF, abre en una pestaña nueva)', '/cv/es'],
    ['en', 'Moving to São Paulo, BR · 2027', 'English CV (PDF)', 'View CV in English (PDF, opens in a new tab)', '/cv/en']
  ])('shows a compact current/future location and localized CV link in %s', (language, move, label, accessibleLabel, cvPath) => {
    const { container, cleanup } = renderContacto(language);
    const location = container.querySelector('.contacto-location');
    const cv = container.querySelector(`.contacto-secondary a[href="${cvPath}"]`);

    expect(location.querySelector('.contacto-location__now').textContent).toBe('MTY, MX');
    expect(location.querySelector('.contacto-location__move').textContent).toBe(move);
    expect(cv).not.toBeNull();
    expect(cv.textContent).toBe(label);
    expect(cv.getAttribute('aria-label')).toBe(accessibleLabel);
    expect(cv.getAttribute('target')).toBe('_blank');
    expect(cv.getAttribute('rel')).toBe('noopener noreferrer');
    expect(container.querySelectorAll('.contacto-secondary a[href^="/cv"]')).toHaveLength(1);
    expect(container.querySelector('a[href="/cv"]')).toBeNull();
    expect(container.querySelector('a[href="/cv/pt-br"]')).toBeNull();

    cleanup();
  });

  it.each(['es', 'en'])('shows the professional email as the only public email in %s', (language) => {
    const { container, cleanup } = renderContacto(language);
    const links = Array.from(container.querySelectorAll('.contacto-secondary a[href^="mailto:"]'));

    expect(links).toHaveLength(1);
    expect(links[0].getAttribute('href')).toBe('mailto:hola@elelier.com');
    expect(links[0].textContent).toBe('hola@elelier.com');
    expect(container.innerHTML).not.toContain('loya.elier@gmail.com');

    cleanup();
  });

  it('renders the discreet auto insurance CTA with the local route in both languages', () => {
    const cases = [
      { language: 'es', label: '¿Buscas seguro de auto? Cotiza con Chubb →' },
      { language: 'en', label: 'Looking for auto insurance? Get a quote with Chubb →' }
    ];

    for (const { language, label } of cases) {
      const { container, cleanup } = renderContacto(language);
      const cta = container.querySelector('.contacto-auto-cta a');

      expect(cta).toBeTruthy();
      expect(cta.textContent).toBe(label);
      expect(cta.getAttribute('href')).toBe('/seguro-auto');

      cleanup();
    }
  });

  it('keeps the published WhatsApp link', () => {
    const { container, cleanup } = renderContacto('es');
    const whatsapp = Array.from(container.querySelectorAll('a')).find((link) =>
      link.textContent.includes('Escríbeme por WhatsApp')
    );

    expect(whatsapp).toBeTruthy();
    expect(whatsapp.getAttribute('href')).toBe(WHATSAPP_URL);
    expect(whatsapp.getAttribute('target')).toBe('_blank');
    expect(whatsapp.getAttribute('rel')).toBe('noopener noreferrer');

    cleanup();
  });

  it('uses accessible labels and expected required fields', () => {
    const { container, cleanup } = renderContacto('es');
    const name = getFieldByLabel(container, 'Tu nombre');
    const mail = getFieldByLabel(container, 'Tu correo');
    const message = getFieldByLabel(container, 'Cuéntame sobre la oportunidad profesional o el reto que quieres resolver');

    expect(name.getAttribute('id')).toBe('contact-name');
    expect(name.getAttribute('name')).toBe('name');
    expect(name.required).toBe(true);
    expect(name.getAttribute('autocomplete')).toBe('name');
    expect(mail.getAttribute('id')).toBe('contact-mail');
    expect(mail.getAttribute('name')).toBe('mail');
    expect(mail.required).toBe(true);
    expect(mail.type).toBe('email');
    expect(mail.getAttribute('autocomplete')).toBe('email');
    expect(message.getAttribute('id')).toBe('contact-message');
    expect(message.getAttribute('name')).toBe('message');
    expect(message.required).toBe(true);
    expect(message.getAttribute('autocomplete')).toBe('off');

    cleanup();
  });

  it('submits the exact current endpoint payload on success', async () => {
    global.fetch.mockResolvedValue({ ok: true });
    const { container, cleanup } = renderContacto('es');

    setFieldValue(getFieldByLabel(container, 'Tu nombre'), 'Ana');
    setFieldValue(getFieldByLabel(container, 'Tu correo'), 'ana@example.com');
    setFieldValue(
      getFieldByLabel(container, 'Cuéntame sobre la oportunidad profesional o el reto que quieres resolver'),
      'Quiero simplificar un proceso interno.'
    );

    submitForm(container);
    await act(async () => {});

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(CONTACT_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Ana',
        mail: 'ana@example.com',
        message: 'Quiero simplificar un proceso interno.'
      })
    });

    cleanup();
  });

  it('disables the submit button while sending and prevents double submit', () => {
    const pending = createDeferred();
    global.fetch.mockReturnValue(pending.promise);
    const { container, cleanup } = renderContacto('es');

    setFieldValue(getFieldByLabel(container, 'Tu nombre'), 'Ana');
    setFieldValue(getFieldByLabel(container, 'Tu correo'), 'ana@example.com');
    setFieldValue(
      getFieldByLabel(container, 'Cuéntame sobre la oportunidad profesional o el reto que quieres resolver'),
      'Necesito automatizar seguimiento.'
    );

    submitForm(container);
    const button = container.querySelector('button[type="submit"]');
    expect(button.disabled).toBe(true);
    expect(button.textContent).toContain('Enviando mensaje…');

    submitForm(container);
    expect(global.fetch).toHaveBeenCalledTimes(1);

    act(() => {
      pending.resolve({ ok: true });
    });

    cleanup();
  });

  it('shows the approved success message', async () => {
    global.fetch.mockResolvedValue({ ok: true });
    const { container, cleanup } = renderContacto('es');

    setFieldValue(getFieldByLabel(container, 'Tu nombre'), 'Ana');
    setFieldValue(getFieldByLabel(container, 'Tu correo'), 'ana@example.com');
    setFieldValue(
      getFieldByLabel(container, 'Cuéntame sobre la oportunidad profesional o el reto que quieres resolver'),
      'Quiero crear una herramienta.'
    );

    submitForm(container);
    await act(async () => {});

    expect(container.querySelector('[aria-live="polite"]').textContent).toContain(
      'Gracias, ya recibí tu mensaje. Revisaré el contexto y te responderé con el siguiente paso más útil.'
    );

    cleanup();
  });

  it('shows WhatsApp and email fallbacks for HTTP errors and network errors', async () => {
    const cases = [
      () => Promise.resolve({ ok: false }),
      () => Promise.reject(new Error('network'))
    ];

    for (const createResponse of cases) {
      global.fetch.mockReset();
      global.fetch.mockImplementation(createResponse);
      const { container, cleanup } = renderContacto('es');

      setFieldValue(getFieldByLabel(container, 'Tu nombre'), 'Ana');
      setFieldValue(getFieldByLabel(container, 'Tu correo'), 'ana@example.com');
      setFieldValue(
        getFieldByLabel(container, 'Cuéntame sobre la oportunidad profesional o el reto que quieres resolver'),
        'Quiero digitalizar atención.'
      );

      submitForm(container);
      await act(async () => {});

      expect(container.querySelector('[aria-live="polite"]').textContent).toContain(
        'No pude enviar tu mensaje en este momento. Puedes escribirme por WhatsApp o correo.'
      );
      expect(container.querySelector(`a[href="${WHATSAPP_URL}"]`)).toBeTruthy();
      expect(container.querySelectorAll(`a[href="mailto:${EMAIL}"]`)).toHaveLength(2);
      expect(container.innerHTML).not.toContain('loya.elier@gmail.com');

      cleanup();
    }
  });

  it('does not render removed legacy routes, assets or scheduling copy', () => {
    const { container, cleanup } = renderContacto('en');
    const html = container.innerHTML;

    expect(container.textContent).not.toContain('Diagnóstico');
    expect(container.textContent).not.toContain('Calendly');
    expect(container.textContent).not.toContain('Cal.com');
    expect(container.textContent).not.toContain('Google Maps');
    expect(html).not.toContain('calendly');
    expect(html).not.toContain('google.com/maps');
    expect(container.querySelector('a[href$=".pdf"]')).toBeNull();
    expect(html).not.toContain('diagnosis/');

    cleanup();
  });

  it('keeps the quote subject prefill', () => {
    const { container, cleanup } = renderContacto('en', '/contacto?subject=quote');
    const message = getFieldByLabel(container, 'Tell me about the professional opportunity or challenge you want to solve');

    expect(message.value).toBe('Hi, I would like to request a quote.');

    cleanup();
  });
});
