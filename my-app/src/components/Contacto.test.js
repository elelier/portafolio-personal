import React, { act } from 'react';
import { createRoot } from 'react-dom/client';
import { MemoryRouter } from 'react-router-dom';
import Contacto from './Contacto';
import { LanguageContext } from '../contexts/LanguageContext';

globalThis.IS_REACT_ACT_ENVIRONMENT = true;

const CONTACT_ENDPOINT = 'https://81ocg9.buildship.run/contact_me';
const WHATSAPP_URL = 'https://wa.me/528117801157';
const EMAIL = 'loya.elier@gmail.com';

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
    expect(container.textContent).toContain('Cuéntame qué quieres mejorar');
    expect(container.textContent).toContain(
      'Comparte el reto, proceso o idea que quieres mover. Te responderé personalmente para entender el contexto y ver si hace sentido trabajar juntos.'
    );
    expect(container.textContent).toContain('Ruta directa');
    expect(container.textContent).toContain('Escríbeme por WhatsApp');
    expect(container.textContent).toContain('Ideal para una primera conversación rápida.');
    expect(container.textContent).toContain('O déjame un poco de contexto');
    expect(container.textContent).toContain('Sin diagnóstico automático ni agenda obligatoria. Empezamos por el reto.');
    expect(container.textContent).toContain('También puedes encontrarme en');
    expect(container.textContent).toContain('Monterrey, México · Trabajo remoto');

    cleanup();
  });

  it('renders the full approved English conversation copy', () => {
    const { container, cleanup } = renderContacto('en');

    expect(container.textContent).toContain('Let’s talk');
    expect(container.textContent).toContain('Tell me what you want to improve');
    expect(container.textContent).toContain(
      'Share the challenge, process or idea you want to move forward. I will reply personally to understand the context and see whether it makes sense to work together.'
    );
    expect(container.textContent).toContain('Direct route');
    expect(container.textContent).toContain('Message me on WhatsApp');
    expect(container.textContent).toContain('Best for a quick first conversation.');
    expect(container.textContent).toContain('Or send me some context');
    expect(container.textContent).toContain('No automatic diagnosis or mandatory scheduling. We start with the challenge.');
    expect(container.textContent).toContain('You can also find me on');
    expect(container.textContent).toContain('Monterrey, Mexico · Remote work');

    cleanup();
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
    const message = getFieldByLabel(container, '¿Qué quieres mejorar, automatizar, simplificar, digitalizar o crear?');

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
      getFieldByLabel(container, '¿Qué quieres mejorar, automatizar, simplificar, digitalizar o crear?'),
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
      getFieldByLabel(container, '¿Qué quieres mejorar, automatizar, simplificar, digitalizar o crear?'),
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
      getFieldByLabel(container, '¿Qué quieres mejorar, automatizar, simplificar, digitalizar o crear?'),
      'Quiero crear una herramienta.'
    );

    submitForm(container);
    await act(async () => {});

    expect(container.querySelector('[aria-live="polite"]').textContent).toContain(
      'Gracias, ya recibí tu mensaje. Te responderé personalmente.'
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
        getFieldByLabel(container, '¿Qué quieres mejorar, automatizar, simplificar, digitalizar o crear?'),
        'Quiero digitalizar atención.'
      );

      submitForm(container);
      await act(async () => {});

      expect(container.querySelector('[aria-live="polite"]').textContent).toContain(
        'No pude enviar tu mensaje en este momento. Puedes escribirme por WhatsApp o correo.'
      );
      expect(container.querySelector(`a[href="${WHATSAPP_URL}"]`)).toBeTruthy();
      expect(container.querySelector(`a[href="mailto:${EMAIL}"]`)).toBeTruthy();

      cleanup();
    }
  });

  it('does not render removed legacy routes, assets or scheduling copy', () => {
    const { container, cleanup } = renderContacto('en');
    const html = container.innerHTML;

    expect(container.textContent).not.toContain('Diagnóstico');
    expect(container.textContent).not.toContain('Calendly');
    expect(container.textContent).not.toContain('Cal.com');
    expect(container.textContent).not.toContain('View resume');
    expect(container.textContent).not.toContain('Ver CV');
    expect(container.textContent).not.toContain('Google Maps');
    expect(html).not.toContain('calendly');
    expect(html).not.toContain('google.com/maps');
    expect(html).not.toContain('.pdf');
    expect(html).not.toContain('diagnosis/');

    cleanup();
  });

  it('keeps the quote subject prefill', () => {
    const { container, cleanup } = renderContacto('en', '/contacto?subject=quote');
    const message = getFieldByLabel(container, 'What do you want to improve, automate, simplify, digitize or create?');

    expect(message.value).toBe('Hi, I would like to request a quote.');

    cleanup();
  });
});
