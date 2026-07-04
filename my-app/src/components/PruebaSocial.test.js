import React, { act } from 'react';
import { createRoot } from 'react-dom/client';
import PruebaSocial from './PruebaSocial';

globalThis.IS_REACT_ACT_ENVIRONMENT = true;

describe('PruebaSocial', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('does not render the diagnosis CTA', () => {
    const container = document.createElement('div');
    document.body.appendChild(container);
    const root = createRoot(container);

    act(() => {
      root.render(<PruebaSocial />);
    });

    expect(container.textContent).not.toContain('Iniciar diagnóstico');
    expect(container.querySelector('button')).toBeNull();

    act(() => root.unmount());
  });
});
