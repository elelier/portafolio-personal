# SEO-05 — Runbook de corte y prueba PT-BR exclusivamente en Preview

**Referencia:** PR [#84](https://github.com/elelier/portafolio-personal/pull/84), rama `feat/seo-05-trilingual-routes`.
**Fecha:** 30/10/2026. **Estado actualizado:** Apps Script Preview v6 publicado con URL e ID conservados; Production v4 verificado intacto. **E2E PT-BR aún pendiente.** No es un GO de Production.

## Topología y aislamiento

- Apps Script proyecto `elelier-contact-google-preview`, cuenta ejecutora `loya.elier@gmail.com`.
- **Mapeo comprobado por ID, no por etiqueta:** Production `AKfycbwPr31QbDh8jwrPAc1xpW8YH-5M7oefQvJK0FJ6LdNrn7z2AY_nReJxp4xkFe3eAyH8` **v4** (fuente: [corte histórico](contact-google-cutover.md)); Preview `AKfycbw0_G12EHqA1rGFKjpIJL9Oef2boiVA3CF5SYdcWZeetZbz3L58p_KSG9ZmevzBJy-w` **v6** (publicado 30/oct/2026). Ambos comparten el mismo proyecto; Production v4 quedó intacto tras publicar Preview. Guardar código en el editor no modifica por sí solo un deployment versionado existente.
- Ambos pueden escribir en el mismo archivo `Leads`, pestaña `contact_v2`; **Preview no se considera aislado a nivel de datos**.
- La Cloudflare Pages Function lee el secreto `CONTACT_APPS_SCRIPT_URL` correspondiente a su ambiente. El URL de Preview debe coincidir con el deployment que se edite; no modificar ni revelar el secreto aquí.
- Turnstile Preview usa widget `elelier-contact-preview`, independiente de Production.
- **NO editar el deployment Production, su versión, ni permisos. NO modificar la hoja ni los Script Properties. No usar Apps Script Head/`/dev` para el endpoint público.**

## Preparación reproducible

1. En GitHub abrir [`my-app/google-apps-script/Code.gs` del PR #84](https://github.com/elelier/portafolio-personal/blob/feat/seo-05-trilingual-routes/my-app/google-apps-script/Code.gs) y comprobar la versión: `validContact_` acepta exactamente `es`, `en`, `pt-br` y `sendAutoContact_` genera asunto `Recebi sua mensagem — Elier` para PT-BR.
2. En Apps Script del proyecto correcto, desde `loya.elier@gmail.com`, revisar **Deploy → Manage deployments**. Usar los IDs exactos de arriba; la etiqueta de Production aún es incorrecta. **El secret `CONTACT_APPS_SCRIPT_URL` de Pages Preview está cifrado y no se pudo leer:** el enrutamiento efectivo se valida en el E2E, no se infiere por la UI.
3. Tomar nota privada del número de versión vigente de Preview y Production, para poder regresar Preview a la anterior. Guardar en el editor Apps Script el `Code.gs` versionado; no cambiar propiedades ni manifest.
4. **Ejecutado 30/oct:** se guardó en el editor el `Code.gs` del PR #84 y se actualizó únicamente el deployment web de ID Preview mediante **Edit → New version → Implementar**. Resultado **v6**, descripción `SEO-05 PT-BR Preview QA — PR #84 — versionado; NO Production`, **misma URL `/exec` e ID**. Si se requiere nueva actualización, repetir sólo tras confirmar ID y obtener aprobación; no repetir este paso para el E2E.
5. Confirmar con una lectura que el deployment Preview sigue activo. No editar Cloudflare Production. Si la URL de Apps Script cambió inesperadamente, detenerse antes de cambiar ningún secreto.

## Protocolo E2E: un solo envío QA

**Sólo después del paso anterior**, en [Preview portugués](https://feat-seo-05-trilingual-route.elelier.pages.dev/pt-br/):

- **Nombre:** `QA SEO05 PTBR PR84`.
- **Correo:** `hola@elelier.com` (cuenta autorizada de pruebas).
- **Mensaje:** `Teste QA autorizado do formulário em português brasileiro. Não tratar como oportunidade comercial.`
- Completar Turnstile real; enviar **una sola vez**.
- Recibir éxito localizado en portugués y confirmar `POST /api/contact` con HTTP `201` y `notificationStatus=sent`, o `202`/`partial` cuando un correo haya fallado. Validar mismo `submissionId` en la respuesta sin publicarlo.
- Buscar exactamente **una nueva fila** en `Leads → contact_v2` con el identificador, comprobar envío a la bandeja del propietario y acuse PT-BR a `hola@elelier.com` (MailApp aceptar envío no demuestra entrega).
- No transmitir nombre/correo/mensaje/ID a GA4. No reintentar un POST sin investigar, por la idempotencia y posible correo duplicado.
- Si responde `400` `invalid_contact`, verificar que ambos componentes Cloudflare Function y Apps Script en Preview admiten `pt-br`. Si responde `502`, leer logs **sin exponer secretos** y evitar reenvío indiscriminado.

## Rollback

Si hay problemas, volver a **editar el deployment Preview** y elegir su **versión anterior** (manteniendo su URL). **No tocar Production v4.** Dejar constancia en PR #84 del resultado, timestamp, versión de Preview y si hubo registro de prueba; los registros QA se eliminan sólo mediante acción administrativa autorizada.

## Evidencia visual

La CI `visual-preview` del PR #84 genera capturas de hero/contacto para ES, EN y PT-BR, móvil (390×844) y desktop (1440×900), temas claro y oscuro, además de validar el hash de sección y navegación atrás/adelante. El reporte se sube como artifact `elelier-trilingual-visual-qa`. Estas capturas no sustituyen verificación visual humana ni el envío real del formulario.

## Criterios de aceptación

- [x] Preview v6 publicado; **Production v4 sin cambios**, constatado en Apps Script tras recarga.
- [ ] `POST /api/contact` real completado una vez, registro almacenado y correos observados.
- [ ] Respuesta visible localizada y sin duplicados.
- [x] 24 capturas hero/contacto revisadas; CI visual 13/13 PASS y ancla PT-BR inspeccionada en Chrome escritorio/móvil.
- [ ] PR #84 permanece draft; no merge ni deploy productivo sin autorización separada.
