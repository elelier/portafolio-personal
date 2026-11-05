# Banderas del selector trilingüe — diseño aprobado

Objetivo: restituir las banderas circulares de México y Estados Unidos del selector previo, añadiendo Brasil en el menú de ajustes de PR #84.

- Mantener exactamente tres botones para `es`, `en`, `pt-br`, con `aria-label`, `aria-pressed`, títulos, selección de ruta y retorno de foco existentes.
- Reutilizar `public/assets/files/flag-mx.png` y `flag-us.png`; incorporar un recurso circular local para Brasil con dimensiones visuales equivalentes (24 × 24 px).
- Conservar el menú vertical, dimensiones y estados visuales, escritorio/móvil, tema claro/oscuro; no introducir dependencias.
- Fuera de alcance: SEO, traducciones, formulario, Apps Script, Core DB, Production, merge.
- Alternativas consideradas: emojis (representación variable según plataforma), reemplazar las tres imágenes por SVG (cambia innecesariamente recursos existentes), imágenes originales + icono nuevo (seleccionada por continuidad visual y alcance mínimo).
- Aceptación: las tres banderas renderizan desde recursos locales; navegación y accesibilidad se conservan; pruebas, build y CI verdes; PR #84 continúa draft.
