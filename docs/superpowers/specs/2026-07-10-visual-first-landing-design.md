# Landing visual-first — Especificación de experiencia

## Objetivo

Convertir la landing de Elier en una experiencia que comunique valor principalmente con imágenes, métricas, proyectos y acciones claras. El usuario debe poder entender qué hace Elier y explorar evidencia real sin leer bloques largos.

## Principios

- Una idea principal por viewport.
- Texto breve; la evidencia visual lleva el peso.
- Cada proyecto se entiende primero por su imagen, luego por una frase y finalmente por su detalle.
- La navegación debe funcionar igual de bien con mouse, teclado, touch y scroll.
- La experiencia debe crecer de forma aditiva al agregar proyectos nuevos.
- Las animaciones decoran y orientan; nunca bloquean la lectura ni la interacción.
- `prefers-reduced-motion`, alt text, foco visible y targets táctiles son requisitos.

## Arquitectura de la landing

1. Hero: propuesta de valor, retrato, CTA primario y acceso a proyectos.
2. Resultados: métricas cortas y verificables.
3. Proyectos seleccionados: tarjetas visuales, filtros mínimos y acceso a detalle.
4. Casos reales: reto, solución y resultado en una línea cada uno.
5. Cómo ayudo: tres rutas visuales por necesidad.
6. Trayectoria: respaldo compacto, expandible.
7. Testimonios.
8. Contacto directo y formulario.

## Navegación

Desktop: barra sticky, logo, cuatro destinos (`Proyectos`, `Resultados`, `Cómo trabajo`, `Contacto`) y CTA persistente. Mobile: menú compacto con los mismos destinos, cierre al navegar, overlay accesible y CTA fijo de contacto sin cubrir contenido.

Los anchors deben coincidir con las secciones visibles. Las rutas dedicadas no deben depender del scroll de la home.

## Proyectos y páginas dedicadas

El modelo de proyecto tendrá `id`, `title`, `category`, `summary`, `featuredImage`, `gallery`, `metrics`, `role`, `stack`, `url` y `status`. La home muestra una selección; `/sites` será una vista pública de catálogo; `/proyecto/:id` mostrará detalle visual. Cada galería admite 5–8 imágenes con formatos y situaciones distintas: desktop, mobile, flujo, detalle, antes/después y contexto.

Si un proyecto todavía no tiene galería completa, la interfaz conserva una sola imagen y muestra el estado sin inventar resultados.

## Movimiento e interacción

- Entrada por sección con IntersectionObserver y fallback estático.
- Hover/focus en tarjetas con elevación y CTA visible.
- Galería con controles, swipe, teclado y pausa cuando no está visible.
- Scroll suave únicamente cuando el usuario no pidió reducir movimiento.
- No se agregan loops ni parallax que impidan leer o consumir la página.

## Criterios de éxito

- El orden de la home sigue la arquitectura anterior en desktop y mobile.
- El menú mobile se abre, cierra, tiene foco y no deja scroll de fondo accidental.
- Un proyecto se puede descubrir desde la home, el catálogo y una página dedicada.
- Agregar un proyecto nuevo requiere editar datos, no duplicar layout.
- Tests y build pasan; no hay errores nuevos de consola ni rutas rotas.

## Insumos visuales

Se reutilizan primero los assets locales y las capturas ya disponibles. Se pueden incorporar capturas de sitios públicos propios o de proyectos enlazados cuando sean accesibles; cualquier material faltante queda registrado por proyecto, sin bloquear la primera entrega.
