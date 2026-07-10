# Asset audit — visual-first landing

## Existing coverage

| Proyecto | Hero/thumb | Desktop/mobile | Galería dedicada | Acción recomendada |
|---|---:|---:|---:|---|
| Arqidia.mx | Sí | Sí, declarados en `sitesData` | Parcial: validar que existan las cuatro rutas | Capturar home, portafolio, mobile y contacto |
| Elelier.com | Sí | No declarados | Parcial | Capturar hero, proyectos, métricas y mobile |
| Monterrey Respira | Sí | No declarados | Parcial | Capturar dashboard, estado de aire y mobile |
| Jasso Tours | Sí | No declarados | Parcial | Capturar landing, mapa, destino y mobile |
| Wonderlabs Studio | Sí | No declarados | Parcial | Capturar creador, historia generada y resultado |
| Space People | Sí | No declarados | Parcial | Capturar contador, estado vacío y responsive |
| EL-QR Code Generator | Sí | No declarados | Parcial | Capturar formulario, QR generado y tracking |

## Regla de incorporación

La interfaz ya acepta una galería con cualquier número de imágenes y deduplica rutas repetidas. Mientras se capturan materiales adicionales, reutiliza `fullImage` y `thumbnail` sin mostrar espacios falsos.

## Tomas sugeridas por proyecto

1. Vista general desktop.
2. Vista mobile real.
3. Una interacción clave o flujo completo.
4. Un detalle de interfaz que explique el valor.
5. Estado final, métrica o resultado visible.

## Insumos externos pendientes

Las capturas de sitios publicados pueden agregarse cuando estén disponibles en el navegador o mediante archivos locales autorizados. No se bloquea la implementación por su ausencia; los proyectos muestran el material local existente y quedan listos para ampliar el arreglo `gallery` en `src/data/sites.js`.
