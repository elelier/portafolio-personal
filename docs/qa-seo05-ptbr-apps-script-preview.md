# SEO-05 — Runbook de corte y prueba PT-BR exclusivamente en Preview

**Referencia:** PR [#84](https://github.com/elelier/portafolio-personal/pull/84), rama `feat/seo-05-trilingual-routes`.
**Fecha:** 30/10/2026. **Fase Preview (histórica):** Apps Script Preview v6 publicado con URL e ID conservados; Production permaneció v4 durante esa prueba. **E2E PT-BR completado con 1 envío, 1 fila y 2 mensajes aceptados.** El código HTTP exacto no quedó capturado en Network. **Promoción posterior separada, con GO expreso:** Apps Script Production v4 → v6 el 30/oct/2026, sin cambiar su URL ni ID. No se aprobó merge ni despliegue del sitio Cloudflare Production. Ver el [estado operativo vigente](contact-current-state.md).

## Topología y aislamiento

- Apps Script proyecto `elelier-contact-google-preview`, cuenta ejecutora `loya.elier@gmail.com`.
- **Mapeo comprobado por ID, no por etiqueta:** Production `AKfycbwPr31QbDh8jwrPAc1xpW8YH-5M7oefQvJK0FJ6LdNrn7z2AY_nReJxp4xkFe3eAyH8` **v6 actual** (v4 durante la QA Preview; fuente histórica: [corte de octubre](contact-google-cutover.md)); Preview `AKfycbw0_G12EHqA1rGFKjpIJL9Oef2boiVA3CF5SYdcWZeetZbz3L58p_KSG9ZmevzBJy-w` **v6** (publicado 30/oct/2026). Ambos comparten el mismo proyecto; Production v4 quedó intacto al publicar Preview y se promovió por separado a v6 con GO expreso después. Guardar código en el editor no modifica por sí solo un deployment versionado existente.
- Ambos pueden escribir en el mismo archivo `Leads`, pestaña `contact_v2`; **Preview no se considera aislado a nivel de datos**.
- La Cloudflare Pages Function lee el secreto `CONTACT_APPS_SCRIPT_URL` correspondiente a su ambiente. El URL de Preview debe coincidir con el deployment que se edite; no modificar ni revelar el secreto aquí.
- Turnstile Preview usa widget `elelier-contact-preview`, independiente de Production.
- **Restricción aplicada durante esta QA Preview:** no editar Production, la hoja ni Script Properties. **El cambio posterior autorizado fue exclusivamente la versión del deployment Production (v4 → v6) y su descripción**, conservando ID, URL `/exec`, ejecutor y permisos; no se modificaron propiedades, secretos ni hoja. No usar Apps Script Head/`/dev` para el endpoint público.

## Preparación reproducible

1. En GitHub abrir [`my-app/google-apps-script/Code.gs` del PR #84](https://github.com/elelier/portafolio-personal/blob/feat/seo-05-trilingual-routes/my-app/google-apps-script/Code.gs) y comprobar la versión: `validContact_` acepta exactamente `es`, `en`, `pt-br` y `sendAutoContact_` genera asunto `Recebi sua mensagem — Elier` para PT-BR.
2. En Apps Script del proyecto correcto, desde `loya.elier@gmail.com`, revisar **Deploy → Manage deployments**. Usar los IDs exactos de arriba; la etiqueta de Production era incorrecta durante esta fase y fue corregida en la promoción autorizada posterior. **El secret `CONTACT_APPS_SCRIPT_URL` de Pages Preview está cifrado y no se pudo leer:** el enrutamiento efectivo se valida en el E2E, no se infiere por la UI.
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

## Evidencia de ejecución real — 30/oct/2026

- **Origen:** `https://feat-seo-05-trilingual-route.elelier.pages.dev/pt-br/#contacto` (Cloudflare Pages Preview). **Una sola pulsación** de `Enviar mensagem` con el contacto QA autorizado; no se realizó reintento.
- **Datos:** `QA SEO05 PTBR PR84` / `hola@elelier.com` / `Teste QA autorizado do formulário em português brasileiro. Não tratar como oportunidade comercial.`
- **Frontend:** tras el envío mostró el mensaje localizado `Obrigado! Recebi sua mensagem. Vou analisar o contexto e responder com o próximo passo mais útil.`; los tres campos se reiniciaron. Turnstile mostró estado válido.
- **Persistencia:** archivo Google `Leads`, pestaña `contact_v2`, **fila 7**, `created_at_utc=2026-10-30T17:08:32.817Z` y **una sola coincidencia** de ese nombre dentro de `A1:M1000`. `internal_mail_status=sent`, `autoreply_status=sent`, `source=elelier.com`. El identificador interno de envío coincide entre la fila y el cuerpo del aviso al propietario; no se reproduce en esta documentación.
- **Notificación interna:** Gmail `loya.elier@gmail.com` mostró el correo **recibido** `Nuevo contacto desde elelier.com — QA SEO05 PTBR PR84` a las `17:08:33 UTC`, con nombre, email, mensaje e ID coincidentes. [Abrir evidencia en Gmail](https://mail.google.com/mail/u/?authuser=loya.elier%40gmail.com#all/1a18dc8dcf095e80).
- **Acuse PT-BR:** Gmail mostró mensaje **enviado a** `hola@elelier.com` con asunto `Recebi sua mensagem — Elier`, saludo `Olá QA SEO05 PTBR PR84` y contenido portugués correcto, a las `17:08:33 UTC`. [Abrir evidencia en Gmail](https://mail.google.com/mail/u/?authuser=loya.elier%40gmail.com#all/1a18dc8db16c6ee4). **Limitación:** se verificó envío en Gmail y estado `sent` de Apps Script, no lectura/recepción final en una sesión independiente de `hola@elelier.com`.
- **HTTP:** la petición fue ejecutada y la UI alcanzó éxito con persistencia y notificaciones comprobadas. **El status HTTP exacto (`201` o `202`), el JSON de respuesta y cabeceras no se capturaron directamente** durante esta única solicitud; no declararlos probados. No se repetirá el POST para obtenerlos sin nueva autorización. Según el contrato documentado, la UI de éxito requiere un recibo aceptado, pero esto es evidencia indirecta.
- **Enrutamiento:** el E2E de `pt-br` corroboró funcionalidad de la ruta Cloudflare Preview y del backend con soporte portugués. El valor cifrado de `CONTACT_APPS_SCRIPT_URL` no pudo compararse literalmente con el ID de Apps Script Preview; mantener esa limitación explícita y el gate de identidad para futuros cambios.

## Rollback

Si hay problemas específicos de la fase Preview, volver a **editar el deployment Preview** y elegir su **versión anterior** (manteniendo su URL), solamente con autorización y previa comprobación del ID exacto. **Production ya está en v6; cualquier rollback productivo requerirá una autorización separada y no debe inferirse de este runbook Preview.** Dejar constancia en PR #84 del resultado, timestamp y versión; los registros QA se eliminan sólo mediante acción administrativa autorizada.

## Evidencia visual

La CI `visual-preview` del PR #84 genera capturas de hero/contacto para ES, EN y PT-BR, móvil (390×844) y desktop (1440×900), temas claro y oscuro, además de validar el hash de sección y navegación atrás/adelante. El reporte se sube como artifact `elelier-trilingual-visual-qa`. Estas capturas no sustituyen verificación visual humana ni el envío real del formulario.

**Corrección de la revisión final de #84:** la QA HTTP y `visual-preview` ahora construyen y sirven en `127.0.0.1:4173` los archivos del checkout fijado expresamente a `github.event.pull_request.head.sha`; ambos jobs comprueban el SHA antes de las pruebas. Ya no usan como prueba bloqueante la URL fija de Cloudflare Pages Preview, cuyo despliegue podría corresponder a otro commit. El JSON del artifact conserva el SHA explícito del PR en `commit` y su `target` (no el merge commit temporal de GitHub Actions). La inspección del hostname público de Pages Preview **sigue siendo una verificación independiente** y, antes de dar GO a integración, debe cotejarse con el SHA desplegado; un PASS local no acredita que Cloudflare ya haya publicado el commit. Esta corrección no requiere otro envío de contacto QA.

## Criterios de aceptación

- [x] Durante la fase Preview, v6 publicado; **Production v4 sin cambios en ese momento**, constatado en Apps Script tras recarga.
- [x] Promoción posterior y expresamente autorizada de Apps Script **Production v4 → v6**; consola confirmó `Se actualizó correctamente la implementación`, misma URL `/exec`, ID, ejecutor y acceso `Cualquiera`. Preview permaneció v6 e independiente por ID.
- [ ] POST E2E de formulario en Production **no ejecutado**; la promoción se verificó por configuración y versión, sin contacto real adicional.
- [x] Un único `POST /api/contact` real iniciado, registro almacenado y ambos correos aceptados/observados en Gmail.
- [x] Respuesta visible localizada; una sola fila QA (sin duplicados observados).
- [ ] Captura directa del código HTTP exacto y JSON del `POST` (no quedó disponible tras el único envío; **no reintentar sin autorización**).
- [x] 24 capturas hero/contacto revisadas; CI visual 13/13 PASS y ancla PT-BR inspeccionada en Chrome escritorio/móvil.
- [x] PR #84 permanece draft; no merge ni despliegue de **Cloudflare Pages Production**. La promoción de **Apps Script Production** fue autorizada por separado y ya se efectuó.
