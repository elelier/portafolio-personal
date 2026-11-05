# SEO-05 — Correctivo final del PR #84

Alcance: cambios exclusivamente en `elelier/portafolio-personal`, rama del PR #84. No se modifica `elelier-core-db`, el contrato de contacto ni los despliegues Apps Script / Cloudflare Production.

## Incidencias corregidas

1. **Imagen social:** el HTML inicial, `SEO`/Helmet y las páginas legales ahora utilizan el recurso estable `https://elelier.com/images/sites/cover-desktop.jpg`, incluido en el build. Se evita una referencia a un nombre de archivo con hash inexistente.
2. **Enlaces legales por idioma:** se mantienen `/privacy-policy` y `/terms-of-service` en ES, y se añaden `/en/{privacy-policy,terms-of-service}` y `/pt-br/{privacy-policy,terms-of-service}`. El footer conserva el idioma; el contenido de PT-BR se traduce del texto legal español actual sin introducir nuevas condiciones.
3. **Accesibilidad:** la lista de trayectoria profesional tiene un `aria-label` en PT-BR.
4. **Scroll:** al pasar a otra ruta sin fragmento se vuelve al inicio; la navegación con `#ancla` conserva el desplazamiento a la sección.

## Criterio SEO de páginas legales

- Las páginas legales españolas conservan `index,follow`, sus URLs y su lugar en el sitemap.
- Las versiones legales EN/PT-BR tienen URL y canonical propios, pero `noindex,follow` por ahora: sus títulos y enlaces funcionan con JavaScript, y las páginas legales no están completamente prerenderizadas antes de hidratarse. Por esta razón tampoco se agregan al sitemap ni al grupo `hreflang` de la portada.
- El generador crea archivos HTML para las cuatro URLs nuevas, con `lang`, título, canonical y `robots=noindex,follow`, evitando depender del fallback 404 en el acceso directo.
- Si se decide indexar las políticas traducidas, realizar primero una iteración independiente de prerenderizado completo y revisión del contenido legal.

## Validación

- `npm test -- --runInBand --watchAll=false`: 37 suites y 153 pruebas PASS.
- `npm run build`: PASS; 13 rutas estáticas previas y cuatro legales localizadas generadas.
- `node --test scripts/serve-built-pages.test.cjs`: PASS, incluido acceso HTTP directo a los cuatro documentos y MIME JPEG de la imagen social.
- `git diff --check`: PASS.
- QA visual del PR incorpora seis recorridos de enlaces legales. Su ejecución en CI y la revisión del Preview actualizado son pendientes del push.

La revisión de traducciones legales por el propietario del sitio es recomendable antes de integrar. Este documento es evidencia técnica, no asesoría jurídica.
