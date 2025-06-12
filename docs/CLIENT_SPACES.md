# Client Spaces

Este proyecto soporta p\u00e1ginas privadas para clientes en la ruta `/proyecto/:token`.
Cada cliente se define en `src/data/clientProjects.json` con la siguiente estructura:

```json
{
  "token_unico": {
    "passcode": "codigo",
    "project": { "nombre": "...", "descripcion": "..." },
    "cotizaciones": [
      { "id": "#001", "titulo": "...", "resumen": "Objetivo de la cotización" }
    ]
  }
}
```

Para agregar un nuevo cliente:
1. A\u00f1ade una entrada en `src/data/clientProjects.json` con un `token` y `passcode`.
2. Incluye los datos del proyecto y las cotizaciones asociadas.
3. Comparte la URL `https://www.elelier.com/proyecto/<token>` y el c\u00f3digo de acceso con el cliente.

Las p\u00e1ginas de cliente incluyen etiquetas `noindex` para evitar que aparezcan en buscadores.


## Categorías de proyectos y cotizaciones

Los espacios de cliente muestran la información agrupada según el estado del proyecto y de sus cotizaciones:

- **Proyectos Activos**: proyectos cuyo campo `estadoProyecto` es `"activo"`.
- **Proyectos terminados**: proyectos con `estadoProyecto` igual a `"terminado"`.
- **Cotizaciones Activas**: cotizaciones vigentes (no expiradas) y sin estado `aprobada` o `cerrada`.
- **Cotizaciones expiradas**: cotizaciones cuya `fechaExpiracion` ya pasó.

Estas categorías facilitan consultar rápidamente el avance del proyecto y el estado de cada cotización.

## Estilos compartidos
Los componentes de Client Space usan las mismas variables CSS definidas en `src/styles/index.css`.
Al crear nuevas vistas para un cliente procura reutilizar `var(--color-bg-solid)`,
`var(--color-border)` y `var(--color-shadow)` para que coincidan con módulos como
`MockupRedirect` y `ProjectProgress`.

