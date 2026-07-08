import React, { act } from 'react';
import { createRoot } from 'react-dom/client';
import fs from 'fs';
import path from 'path';
import { HelmetProvider } from 'react-helmet-async';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { LanguageContext } from './contexts/LanguageContext';

const ClientSpace = require('./components/ClientSpace').default;

globalThis.IS_REACT_ACT_ENVIRONMENT = true;

const renderClientSpace = async (pathname) => {
  localStorage.clear();

  const container = document.createElement('div');
  document.body.appendChild(container);
  const root = createRoot(container);

  await act(async () => {
    root.render(
      <HelmetProvider>
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

  return {
    container,
    cleanup: async () => {
      await act(async () => {
        root.unmount();
      });
      container.remove();
    }
  };
};

describe('private route exposure hardening', () => {
  afterEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
    document.head.innerHTML = '';
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
    expect(source).not.toContain('<Route path="/" element={<><PrivateRouteSEO');
    expect(source).not.toContain('<Route path="/portafolio" element={<><PrivateRouteSEO');
    expect(source).not.toContain('<Route path="/sobre-mi" element={<><PrivateRouteSEO');
    expect(source).not.toContain('<Route path="/servicios" element={<><PrivateRouteSEO');
    expect(source).not.toContain('<Route path="/contacto" element={<><PrivateRouteSEO');
    expect(source).not.toContain('HeroBanner><PrivateRouteSEO');
  });

  it('keeps the unauthorized client space gate generic and preserves the access form', async () => {
    const { container, cleanup } = await renderClientSpace('/proyecto/arqidia');

    expect(container.textContent).toContain('Espacio de cliente');
    expect(container.textContent).toContain('Ingresa tu código de acceso para continuar.');
    expect(container.textContent).not.toContain('Acceso Restringido');
    expect(container.textContent).not.toContain('Esta área es exclusiva para');
    expect(container.querySelector('form.access-form')).not.toBeNull();
    expect(container.querySelector('strong')).toBeNull();

    await cleanup();
  });

  it('keeps the missing-token state generic', async () => {
    const { container, cleanup } = await renderClientSpace('/proyecto/token-inexistente');

    expect(container.textContent).toContain('Espacio de cliente');
    expect(container.textContent).toContain('El enlace no está disponible o ya no es válido.');
    expect(container.textContent).not.toContain('Cliente no encontrado');

    await cleanup();
  });

  it('removes sensitive console logs from AdminLeads source', () => {
    const source = fs.readFileSync(path.join(__dirname, 'pages/AdminLeads.jsx'), 'utf8');

    expect(source).not.toContain('console.log(');
    expect(source).not.toContain('Fetching leads URL:');
    expect(source).not.toContain('Response status:');
  });
});
