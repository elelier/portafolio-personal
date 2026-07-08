import React, { act } from 'react';
import { createRoot } from 'react-dom/client';
import fs from 'fs';
import path from 'path';
import { HelmetProvider } from 'react-helmet-async';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { LanguageContext } from './contexts/LanguageContext';

jest.mock('./components/utils/generalUtils', () => ({
  getMotionAwareScrollBehavior: jest.fn(() => 'auto'),
  loadExternalScripts: jest.fn(() => Promise.resolve()),
}));

const ClientSpace = require('./components/ClientSpace').default;
const generalUtils = require('./components/utils/generalUtils');

globalThis.IS_REACT_ACT_ENVIRONMENT = true;

const mountedCleanups = new Set();

const registerCleanup = (cleanup) => {
  mountedCleanups.add(cleanup);

  return async () => {
    if (!mountedCleanups.has(cleanup)) {
      return;
    }

    mountedCleanups.delete(cleanup);
    await cleanup();
  };
};

const cleanupMounted = async () => {
  for (const cleanup of Array.from(mountedCleanups)) {
    await cleanup();
  }
};

const resetHead = () => {
  document.title = '';
  document.documentElement.removeAttribute('lang');
  document.head
    .querySelectorAll(
      'meta[charset],meta[name="viewport"],meta[name="description"],meta[name="keywords"],meta[name="robots"],meta[property^="og:"],meta[name^="twitter:"],link[rel="canonical"]'
    )
    .forEach((node) => node.remove());
};

const renderClientSpace = async (pathname) => {
  localStorage.clear();

  const container = document.createElement('div');
  document.body.appendChild(container);
  const root = createRoot(container);
  const helmetContext = {};

  await act(async () => {
    root.render(
      <HelmetProvider context={helmetContext}>
        <MemoryRouter initialEntries={[pathname]}>
          <Routes>
            <Route
              path="/proyecto/:token"
              element={
                <LanguageContext.Provider value={{ language: 'es' }}>
                  <ClientSpace />
                </LanguageContext.Provider>
              }
            />
          </Routes>
        </MemoryRouter>
      </HelmetProvider>
    );
  });

  await act(async () => {
    await Promise.resolve();
  });

  return {
    container,
    cleanup: registerCleanup(async () => {
      await act(async () => {
        root.unmount();
      });
      container.remove();
    })
  };
};

describe('private route exposure hardening', () => {
  beforeEach(() => {
    generalUtils.getMotionAwareScrollBehavior.mockReturnValue('auto');
    generalUtils.loadExternalScripts.mockResolvedValue(undefined);
  });

  afterEach(async () => {
    await cleanupMounted();
    jest.clearAllMocks();
    localStorage.clear();
    resetHead();
    document.body.innerHTML = '';
  });

  it('declares a private-route SEO helper with the approved generic metadata policy', () => {
    const helperPath = path.join(__dirname, 'components/PrivateRouteSEO.js');

    expect(fs.existsSync(helperPath)).toBe(true);

    const source = fs.readFileSync(helperPath, 'utf8');
    expect(source).toContain('noindex,nofollow,noarchive');
    expect(source).toContain('pathname="/"');
    expect(source).not.toContain('www.elelier.com');
  });

  it('declares a reusable placeholder for visually closed private and utilitarian routes', () => {
    const placeholderPath = path.join(__dirname, 'components/InternalRoutePlaceholder.jsx');

    expect(fs.existsSync(placeholderPath)).toBe(true);

    const source = fs.readFileSync(placeholderPath, 'utf8');
    expect(source).toContain('Espacio no disponible');
    expect(source).toContain('Esta vista no está disponible públicamente.');
    expect(source).toContain('Volver al inicio');
  });

  it('wraps every approved private route from App.js without touching core public routes', () => {
    const source = fs.readFileSync(path.join(__dirname, 'App.js'), 'utf8');

    expect(source).toContain('path="/proyecto/:token"');
    expect(source).toContain('path="/admin/leads"');
    expect(source).toContain('path="/client-demo"');
    expect(source).toContain('path="/cotizacion/:id"');
    expect(source).toContain('path="/mockup/:id"');
    expect(source).toContain('path="/sites"');
    expect(source).toContain('path="/tarifas-2024"');
    expect(source).toContain('path="/hero-banner"');
    expect(source).toContain('path="/entradas/2408_IA_Transforma_ecommerce"');
    expect(source).toContain('PrivateRouteSEO');
    expect(source).toContain('InternalRoutePlaceholder');
    expect(source).not.toContain('renderPrivateRoute(<ClientDemo />');
    expect(source).not.toContain('renderPrivateRoute(<MockupRedirect />');
    expect(source).not.toContain('renderPrivateRoute(<Sites simplified={false} />');
    expect(source).not.toContain('renderPrivateRoute(<Entrada />');
    expect(source).not.toContain('<Route path="/" element={<><PrivateRouteSEO');
    expect(source).not.toContain('<Route path="/portafolio" element={<><PrivateRouteSEO');
    expect(source).not.toContain('<Route path="/sobre-mi" element={<><PrivateRouteSEO');
    expect(source).not.toContain('<Route path="/servicios" element={<><PrivateRouteSEO');
    expect(source).not.toContain('<Route path="/contacto" element={<><PrivateRouteSEO');
    expect(source).not.toContain('HeroBanner><PrivateRouteSEO');
  });

  it('keeps the unauthorized client space gate generic and preserves the access form', async () => {
    const { container } = await renderClientSpace('/proyecto/arqidia');

    expect(container.textContent).toContain('Espacio de cliente');
    expect(container.textContent).toContain('Ingresa tu código de acceso para continuar.');
    expect(container.textContent).not.toContain('Acceso Restringido');
    expect(container.textContent).not.toContain('Esta área es exclusiva para');
    expect(container.querySelector('form.access-form')).not.toBeNull();
    expect(container.querySelector('strong')).toBeNull();
  });

  it('keeps the missing-token state generic', async () => {
    const { container } = await renderClientSpace('/proyecto/token-inexistente');

    expect(container.textContent).toContain('Espacio de cliente');
    expect(container.textContent).toContain('El enlace no está disponible o ya no es válido.');
    expect(container.textContent).not.toContain('Cliente no encontrado');
  });

  it('removes sensitive console logs from AdminLeads source', () => {
    const source = fs.readFileSync(path.join(__dirname, 'pages/AdminLeads.jsx'), 'utf8');

    expect(source).not.toContain('console.log(');
    expect(source).not.toContain('Fetching leads URL:');
    expect(source).not.toContain('Response status:');
  });
});
