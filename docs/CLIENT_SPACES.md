# Client Spaces

Este proyecto soporta p\u00e1ginas privadas para clientes en la ruta `/proyecto/:token`.
Cada cliente se define en `src/data/clientProjects.json` con la siguiente estructura:

```json
{
  "token_unico": {
    "passcode": "codigo",
    "project": { "nombre": "...", "descripcion": "..." },
    "cotizaciones": [ { "id": "#001", "titulo": "..." } ]
  }
}
```

Para agregar un nuevo cliente:
1. A\u00f1ade una entrada en `src/data/clientProjects.json` con un `token` y `passcode`.
2. Incluye los datos del proyecto y las cotizaciones asociadas.
3. Comparte la URL `https://www.elelier.com/proyecto/<token>` y el c\u00f3digo de acceso con el cliente.

Las p\u00e1ginas de cliente incluyen etiquetas `noindex` para evitar que aparezcan en buscadores.
