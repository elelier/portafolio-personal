# elelier.com — Estado operativo del formulario de contacto

> **Fuente canónica de operación · revisada el 30 de octubre de 2026.** Este documento describe el flujo aprobado y distingue el estado productivo de la implementación en revisión. Los registros de corte anteriores se conservan como evidencia histórica, no como instrucciones vigentes. No sustituye la verificación periódica de Cloudflare, Google y GitHub.

## Arquitectura y propietarios

- **Sitio:** https://elelier.com/ (y su variante `www`).
- **Hosting único aprobado:** Cloudflare Pages, proyecto `elelier`, rama productiva `main`, directorio `my-app`, compilación `npm run build` y salida `build`. **GitHub Pages no es alternativa ni mecanismo de rollback autorizado.**
- **Formulario público activo:** frontend React → `POST /api/contact` en Cloudflare Pages Functions → Google Apps Script → hoja de Google **Leads**, pestaña `contact_v2`. Las notificaciones se generan desde Apps Script mediante MailApp; la aceptación del envío no garantiza entrega en la bandeja.
- **Protección:** Cloudflare Turnstile, con widgets independientes de Preview y Production. La Pages Function valida Turnstile antes de delegar.
- **Fuente de verdad para contactos del sitio:** registro persistido en `contact_v2`; ni GA4 ni el estado visual de envío sustituyen esa confirmación.
- **BuildShip:** integración anterior conservada en partes del código como referencia/fallback técnico histórico; **no debe describirse como el proveedor productivo actual** ni reactivarse por documentación antigua. El proveedor vigente es el flujo propio Cloudflare + Google aprobado en el corte de octubre de 2026.
- **No se utiliza Elelier Core DB para este flujo.** Cualquier integración futura sería un proyecto distinto y requeriría aprobación expresa.

## Contrato del endpoint de contacto

La ruta está en `my-app/functions/_lib/contact.mjs`. El backend sólo procesa el flujo Google cuando `REACT_APP_CONTACT_PROVIDER=google` está configurado en el entorno desplegado; la configuración del repo por sí sola no prueba la configuración vigente de Cloudflare.

| Resultado | Significado | Tratamiento |
| --- | --- | --- |
| HTTP `201`, `ok: true` | Google confirmó almacenamiento, notificaciones aceptadas | Mostrar recepción; lead almacenado |
| HTTP `202`, `ok: true` | Google confirmó almacenamiento, una o más notificaciones parciales | Mostrar recepción con advertencia; lead almacenado |
| HTTP distinto, red fallida o recibo inconsistente | No hay confirmación válida | No declarar almacenamiento ni registrar una conversión |

El recibo incluye un `submissionId` que debe coincidir con la solicitud, y un `notificationStatus` coherente con `201/202`. El ID sirve para idempotencia operativa; no se envía a GA4.

## Analítica de contacto (SEO-02, issue #65)

- **GA4:** `G-J0EFBPH9P1`; **GTM:** `GTM-5KBGG57T`.
- **`generate_lead`:** evento del PR draft [#80](https://github.com/elelier/portafolio-personal/pull/80). Debe salir una sola vez tras recibo verificado `201/202`; no cuenta errores, clics de enlaces ni notificaciones sin almacenamiento.
- **`contact_click`:** eventos auxiliares de WhatsApp y `mailto:`; no equivalen a leads confirmados.
- **Privacidad:** no transmitir a GA4 nombre, email, teléfono, mensaje, token de Turnstile ni `submissionId`.
- **Estado de despliegue al documentar:** PR #80 en **draft**, con pruebas en Preview y recepción observada de `generate_lead` y `contact_click` en GA4. **Eso no implica que esta instrumentación ya esté publicada en Production.** La activación como evento clave en GA4 debe verificarse por separado.

Evidencias: [PR #80 — QA independiente](https://github.com/elelier/portafolio-personal/pull/80#issuecomment-6504595786) y [issue #65 — aceptación](https://github.com/elelier/portafolio-personal/issues/65#issuecomment-6504595315).

## Identidad de deployments Google Apps Script (reconciliación 30/oct/2026)

**Identificación verificable; no confundir la etiqueta visible con el destino.** Google Apps Script utiliza **un solo proyecto** `elelier-contact-google-preview` ejecutado como `loya.elier@gmail.com`, con dos implementaciones web activas. Durante la auditoría de PR #84 ambas estaban mal etiquetadas como Preview; la identidad de Production se reconstruyó desde el [corte histórico del 27/oct](contact-google-cutover.md) y se contrastó con el ID/versionado vigente de la consola.

| Ambiente de Apps Script | ID exacto del deployment web activo | Versión constatada el 30/oct | Observación |
| --- | --- | --- | --- |
| **Production — NO TOCAR** | `AKfycbwPr31QbDh8jwrPAc1xpW8YH-5M7oefQvJK0FJ6LdNrn7z2AY_nReJxp4xkFe3eAyH8` | **v4**, sin cambios | ID citado en el corte histórico y confirmado activo v4 después de actualizar Preview. Su descripción visible sigue siendo ambigua: **el ID manda**. |
| **Preview SEO-05 — PR #84** | `AKfycbw0_G12EHqA1rGFKjpIJL9Oef2boiVA3CF5SYdcWZeetZbz3L58p_KSG9ZmevzBJy-w` | **v6**, actualizada 30/oct/2026 | Conservó ID/URL `/exec` y permisos. Descripción diferenciada: `SEO-05 PT-BR Preview QA — PR #84 — versionado; NO Production`. Versión anterior del deployment web: v4. |

Estos IDs identifican endpoints, **no son secretos de autenticación**; no publicar el secreto compartido ni Script Properties. En Google, guardar el editor de código (HEAD) no cambia la versión v4 fija de Production. **Los dos endpoints comparten Script Properties y la misma hoja `Leads/contact_v2`**: nunca tratar Preview como aislado en datos.

**Verificación de enrutamiento Cloudflare pendiente:** `CONTACT_APPS_SCRIPT_URL` de Pages Preview se muestra cifrado y su valor no es recuperable en el dashboard. La publicación del deployment Preview v6 no prueba por sí sola que Pages Preview lo invoque. Se requiere un solo E2E identificado y verificación de respuesta/filas/correos antes de declarar PASS, sin rotar secretos ni alterar Production. Véase [runbook PR #84](qa-seo05-ptbr-apps-script-preview.md) y [evidencia de QA](https://github.com/elelier/portafolio-personal/pull/84#issuecomment-6528261137).

**Gate permanente para cualquier cambio Apps Script:** contrastar ID activo contra esta tabla e historial, revisar versiones de **ambos** deployments antes/después y preservar URL/permisos/Script Properties. No publicar usando sólo el nombre visible. Si el destino de Pages Preview no está probado, realizar únicamente una prueba controlada aprobada y revisar el resultado antes de más cambios. No eliminar registros QA sin una orden separada.

## Ambientes y operación

- **Production:** hosting Cloudflare Pages; frontend del formulario Google y las funciones gestionadas por el proyecto `elelier`.
- **Preview:** deployments por rama/commit, con `REACT_APP_CONTACT_PROVIDER=google` y widget `elelier-contact-preview`. El hostname base `elelier.pages.dev` se añadió a los permitidos para resolver Turnstile `110200` durante QA de #80. El widget `elelier-contact-production` no fue cambiado.
- **Configuración/secretos:** `CONTACT_APPS_SCRIPT_URL`, `CONTACT_SHARED_SECRET`, `TURNSTILE_SECRET_KEY` se administran del lado servidor; `REACT_APP_CONTACT_PROVIDER` y `REACT_APP_TURNSTILE_SITE_KEY` son variables visibles en frontend. Nunca documentar valores de secretos, copiar propiedades del script ni introducir credenciales en repositorio.
- **Despliegues:** branch → PR draft → revisión → merge y despliegue únicamente con autorización explícita. No se infiere un deploy de Production por el éxito de Preview.
- **Rollback:** revertir el cambio de aplicación o configuración dentro de Cloudflare Pages con un despliegue autorizado y verificar el flujo; **no usar GitHub Pages**. No asumir que BuildShip es el procedimiento vigente de recuperación.

## Verificación segura

1. Confirmar la rama y commit de `main`, el despliegue de Cloudflare y la configuración del ambiente (sin revelar secretos).
2. Validar formulario con Turnstile y casos de error mediante pruebas automatizadas sin enviar registros reales.
3. Para un envío E2E, obtener autorización expresa y usar un contacto QA identificable; puede guardarse en la hoja y disparar correos.
4. Verificar el registro persistido, el resultado 201/202 cuando sea observable, y **una sola** recepción de `generate_lead` en la propiedad correcta de GA4 cuando esa versión esté desplegada.
5. Revisar UX en ES/EN y, cuando esté implementado, PT-BR; el cambio de idioma no debe alterar el backend ni el contrato de analítica.

## Documentos relacionados

- [Histórico de corte a Google](contact-google-cutover.md) — evidencia de la transición, **no** una instrucción para volver a BuildShip.
- [Runbook de Cloudflare Pages](../my-app/CLOUDFLARE_PAGES.md).
- [Manual de Apps Script](../my-app/google-apps-script/README.md).
- [PR SEO-02 #80](https://github.com/elelier/portafolio-personal/pull/80).
