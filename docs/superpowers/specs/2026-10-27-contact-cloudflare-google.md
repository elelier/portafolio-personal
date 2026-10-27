# Contacto: reemplazo paralelo de BuildShip — diseño aprobado

**Fecha:** 2026-10-27  
**Proyecto:** elelier.com / `elelier/portafolio-personal`  
**Decisión:** ruta B, Cloudflare Pages Function + Google Apps Script + Google Sheets + Gmail.  
**Restricción de release:** BuildShip continúa activo en producción hasta QA E2E aprobado y autorización explícita de corte.

## Evidencia de partida

- `my-app/src/components/Contacto.js` usa `POST https://81ocg9.buildship.run/contact_me` con `{name,mail,message}`; la UI considera exitoso cualquier HTTP 2xx.
- Producción aloja el CRA en Cloudflare Pages, proyecto `elelier`, raíz `my-app`, salida `build`, rama `main`.
- QA previa: BuildShip HTTP 200 y notificación recibida; Google Sheet `Leads` / `elelier01` guarda erróneamente `message` en `Phone`. El asunto presentó problemas de acentos y una imagen de email devuelve 404.
- `workers/lead-worker.js` es otro sistema de calificación con Supabase/Telegram; no se modifica ni se reutiliza para contacto simple.
- No había PRs abiertos al revisar este diseño.

## Arquitectura mínima

`Contacto (React)` → `POST /api/contact` (Cloudflare Pages Function) → `POST Google Apps Script web app` → hoja `contact_v2` en el archivo existente `Leads` + `MailApp` a propietario/visitante → resultado JSON a React.

**Contratos:**

1. En modo `buildship` (predeterminado) el formulario conserva literalmente endpoint/payload/UX productivos.
2. En modo `google` (`REACT_APP_CONTACT_PROVIDER=google`) React remite `{name,mail,message,submissionId,website,turnstileToken,language}` al endpoint relativo `/api/contact`. `submissionId` es UUID por intento lógico, estable durante reintentos. La bandera se establece **solo en Preview** para QA, nunca en Production antes del GO de corte.
3. Pages Function acepta solamente POST JSON, valida tipos/longitudes (nombre y mail 1–255; mensaje 1–500), correo, tamaño máximo de body, honeypot vacío y token Turnstile verificado en Cloudflare. Exige secrets `CONTACT_APPS_SCRIPT_URL`, `CONTACT_SHARED_SECRET`, `TURNSTILE_SECRET_KEY`; sin secrets retorna error, nunca cambia silenciosamente a BuildShip.
4. La función envía a Apps Script, por HTTPS, JSON con secreto compartido incorporado en el **body**. Apps Script verifica contra Script Properties; no contiene credenciales en código público ni expone el mail destinatario configurable desde el cliente. `CONTACT_SHARED_SECRET` y la property `CONTACT_API_SHARED_SECRET` contienen el mismo valor.
5. Apps Script crea o usa la pestaña `contact_v2` del Sheet existente (no reordena ni edita `elelier01`). Columnas: `submission_id, created_at_utc, name, email, message, internal_mail_status, autoreply_status, source`. Escritura por encabezado nombrado, no índices heredados. Destinatario interno fijo por Script Property `CONTACT_NOTIFY_EMAIL` (propuesta: la cuenta que ya recibe notificaciones, por confirmar).
6. Bajo `LockService.getScriptLock()`, Apps Script busca `submissionId` y evita un segundo registro o correos repetidos. El envío interno y el acuse se solicitan por `MailApp`, con cuerpos text/plain + HTML correctamente escapado, asuntos Unicode y sin la URL de banner rota. Un duplicado responde con su estado existente. No se prometen garantías exactamente-una-vez ante interrupción entre envío y actualización de estado.
7. Apps Script responde JSON `{ok,submissionId,stored,internalMailSent,autoReplySent,duplicate}` usando ContentService; Cloudflare sigue la redirección de ContentService y valida explícitamente el JSON, sin tomar HTTP 200 upstream como prueba suficiente.
8. Cloudflare responde `201 {ok:true,submissionId,notificationStatus:"sent"}` cuando Sheet y dos envíos fueron aceptados por MailApp; `202 {ok:true,submissionId,notificationStatus:"partial"}` cuando el lead quedó registrado pero una notificación falló; `400/405/413/415/502/503` para errores aplicables sin filtrar secretos. La UI muestra éxito en 201, aviso de recepción parcial en 202 y error con WhatsApp/mail de respaldo ante fallos. Recibir confirmación del proveedor no prueba entrega real en bandeja; QA revisa los dos Gmail.
9. Cloudflare `_routes.json` incluye **solo** `/api/contact` para no invocar Pages Functions en páginas o archivos estáticos.
10. La bandera frontend en Production permanece `buildship` hasta aprobación explícita; ningún PR draft se fusiona ni se despliega a producción durante esta fase.

## Seguridad y privacidad

- Solo `CONTACT_SHARED_SECRET` en bindings cifrados Cloudflare y Script Properties Google; nunca en `REACT_APP_*`, Git, logs ni links.
- Turnstile validado en servidor; honeypot, comprobación de tamaño, validación de email y destinatario interno fijo. No agregar KV/D1, proveedor de emails, newsletters ni workers ajenos. Si se requiere rate limiting adicional, registrar como follow-up de infraestructura, sin debilitar el mínimo antispam.
- No guardar IP, User-Agent ni tokens Turnstile en Sheets; no incluir contenido de mensajes en logs. Referencia visible a privacidad si ya existe en el sitio.
- `MailApp` confirma aceptación de envío, no entrega final. Registrar statuses sin afirmar entrega verificada.

## Criterios de aceptación y pruebas de corte

- Test unitario del handler: payload válido/inválido, método, JSON corrupto, honeypot, Turnstile rechazado, secrets ausentes, backend malformado, timeout/error, `201` y `202`.
- Test unitario de GAS: autenticación, esquema de hoja, entradas con UTF-8, render seguro, dedupe por submissionId, estados parciales y cuota/fallo de MailApp.
- React ES/EN: BuildShip por defecto sin cambios, modo Google solo activable en Preview, deshabilita doble submit, 201/202/errores coherentes; apariencia sin rediseño.
- Ejecutar `npm test -- --runInBand --watchAll=false`, `npm run build`, `git diff --check` y `git status --short` desde `my-app` cuando corresponda; conservar `my-app/src/config/hashedPasscodes.js` sin mutaciones generadas.
- Preview E2E **una sola** solicitud identificada QA, comprobando HTTP real, fila `contact_v2`, notificación interna y acuse en Gmail, acentos y UI. No tocar `elelier01`.
- Revisar controles de Cloudflare Pages: secrets aislados Preview/Production, build `_routes.json`, endpoint activo en Preview, y que Production sigue consumiendo BuildShip.
- PR draft sin merge. Solo después del GO: habilitar `google` en Production, verificar QA de corte, dejar mecanismo reversible a `buildship`, y retirar BuildShip únicamente tras aceptación posterior explícita.

## Pendientes que requieren interacción de Elier

1. Confirmar la cuenta Google propietaria del Apps Script y remitente de los correos (`loya.elier@gmail.com` u otra).
2. Autorizar permisos de Google Apps Script para Sheets y MailApp; publicar web app ejecutada como propietario y con URL oculta protegida por secreto compartido.
3. Configurar los secrets de Cloudflare en Preview y el site/secret de Turnstile; el asistente puede acompañar sin pedir exponer secretos.
4. Validar Gmail real en QA; decidir GO de corte posteriormente.

**Fuera de alcance:** reemplazar el sistema `lead-worker.js`, crear nueva base de datos, modificar otros formularios, editar hoja histórica, automatizar newsletters, desplegar Production o apagar BuildShip.
