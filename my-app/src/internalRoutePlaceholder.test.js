import React from 'react';
import { createRoot } from 'react-dom/client';
import { act } from 'react';
import { MemoryRouter } from 'react-router-dom';
import InternalRoutePlaceholder from './components/InternalRoutePlaceholder';

globalThis.IS_REACT_ACT_ENVIRONMENT = true;

it('renders the generic unavailable placeholder without sensitive or utility content', async () => {
  const container = document.createElement('div');
  document.body.appendChild(container);
  const root = createRoot(container);

  await act(async () => {
    root.render(
      <MemoryRouter>
        <InternalRoutePlaceholder />
      </MemoryRouter>
    );
  });

  try {
    expect(container.textContent).toContain('Espacio no disponible');
    expect(container.textContent).toContain('Esta vista no está disponible públicamente.');
    expect(container.textContent).toContain('Volver al inicio');
    expect(container.textContent).not.toContain('Credenciales de acceso');
    expect(container.textContent).not.toContain('95%');
    expect(container.textContent).not.toContain('Cómo la IA está Transformando el E-commerce');
    expect(container.querySelector('a[href="/"]')).not.toBeNull();
    expect(container.querySelector('a[target="_blank"]')).toBeNull();
  } finally {
    await act(async () => {
      root.unmount();
    });
    container.remove();
  }
});
