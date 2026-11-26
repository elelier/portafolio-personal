import geminiService from './geminiService';
import { SystemMessage, UserMessage } from '../utils/MessageSystem';

describe('geminiService (cliente de /api/chat)', () => {
  afterEach(() => {
    delete global.fetch;
  });

  it('envía el mensaje y el historial al endpoint del servidor, sin API key en el cliente', async () => {
    global.fetch = jest.fn().mockResolvedValue({ ok: true, json: async () => ({ ok: true, text: 'Hola <b>visitante</b>' }) });
    const history = [new SystemMessage('¡Hola! Soy el asistente de <b>Elier</b>'), new UserMessage('¿Qué hace?')];

    const text = await geminiService.sendMessage('¿Cómo lo contacto?', 'es', history);

    expect(global.fetch).toHaveBeenCalledWith('/api/chat', expect.objectContaining({ method: 'POST' }));
    const body = JSON.parse(global.fetch.mock.calls[0][1].body);
    expect(body).toEqual({
      message: '¿Cómo lo contacto?',
      language: 'es',
      history: [
        { text: '¡Hola! Soy el asistente de Elier', isUser: false },
        { text: '¿Qué hace?', isUser: true }
      ]
    });
    expect(JSON.stringify(global.fetch.mock.calls)).not.toMatch(/key/i);
    expect(text).toBe('Hola &lt;b&gt;visitante&lt;/b&gt;');
    expect(geminiService.isGeminiAvailable()).toBe(true);
  });

  it('usa respuestas locales si la función falla', async () => {
    global.fetch = jest.fn().mockResolvedValue({ ok: false, json: async () => ({ ok: false }) });
    const text = await geminiService.sendMessage('hola', 'es', []);
    expect(text).toMatch(/asistente de Elier/);
    expect(geminiService.isGeminiAvailable()).toBe(false);
  });

  it('consulta la disponibilidad con GET', async () => {
    global.fetch = jest.fn().mockResolvedValue({ ok: true, json: async () => ({ ok: true, available: true }) });
    await expect(geminiService.initialize()).resolves.toBe(true);
    expect(global.fetch).toHaveBeenCalledWith('/api/chat', expect.objectContaining({ method: 'GET' }));
  });
});

describe('respuestas de contacto', () => {
  afterEach(() => {
    delete global.fetch;
  });

  it.each([
    ['es', '¿Cuál es su correo?'],
    ['en', 'What is his email?'],
    ['pt-br', 'Qual é o e-mail de contato?']
  ])('sin IA da hola@elelier.com (%s)', async (language, question) => {
    global.fetch = jest.fn().mockRejectedValue(new Error('offline'));
    const text = await geminiService.sendMessage(question, language, []);
    expect(text).toContain('mailto:hola@elelier.com');
  });

  it('enlaza el correo oficial cuando la IA lo menciona, sin permitir HTML del modelo', async () => {
    global.fetch = jest.fn().mockResolvedValue({ ok: true, json: async () => ({ ok: true, text: 'Escribe a hola@elelier.com <img src=x>' }) });
    const text = await geminiService.sendMessage('correo', 'es', []);
    expect(text).toBe('Escribe a <a href="mailto:hola@elelier.com">hola@elelier.com</a> &lt;img src=x&gt;');
  });
});
