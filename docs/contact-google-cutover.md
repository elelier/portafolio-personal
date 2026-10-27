# elelier.com — QA y corte controlado de contacto

**Estado:** implementación preparada para Preview; **NO-GO** para Production hasta QA E2E y aprobación explícita.

## Fuente de verdad

- Repo: elelier/portafolio-personal, rama feat/contact-cloudflare-google-parallel.
- Sitio: Cloudflare Pages proyecto elelier, root my-app, output build.
- Contacto productivo **actual**: BuildShip, endpoint https://81ocg9.buildship.run/contact_me.
- Nuevo backend: misma-origin POST /api/contact → Apps Script de Google → pestaña contact_v2 en Leads + dos correos.
- Cuenta de Apps Script confirmada: loya.elier@gmail.com.
- Manual Google: [my-app/google-apps-script/README.md](../my-app/google-apps-script/README.md).

## Requisitos de Preview (no Production)

1. Crear y publicar el Apps Script con Google usando la cuenta confirmada; configurar Script Properties y aceptar permisos Sheets/MailApp. El código público no incluye secretos.
2. En Cloudflare Pages → **Settings → Variables and Secrets → Preview**, configurar:

   | Nombre | Tipo | Valor esperado |
   | --- | --- | --- |
   | CONTACT_APPS_SCRIPT_URL | Secret | URL HTTPS de la web app Apps Script terminada en /exec |
   | CONTACT_SHARED_SECRET | Secret | Mismo valor secreto que CONTACT_API_SHARED_SECRET de Apps Script |
   | TURNSTILE_SECRET_KEY | Secret | Secret de la instancia Turnstile autorizada |
   | REACT_APP_CONTACT_PROVIDER | Variable pública | google |
   | REACT_APP_TURNSTILE_SITE_KEY | Variable pública | Site key público Turnstile |

3. Configurar Turnstile para el hostname real de Preview que muestra Cloudflare; validar que los hostnames autorizados incluyen esa vista. Las claves de prueba de Cloudflare no constituyen una prueba antispam productiva.
4. Generar un **nuevo Preview** después de guardar variables y secrets; sus valores se inyectan durante build y runtime respectivamente.
5. Confirmar que la salida build/_routes.json contiene únicamente la ruta de Function /api/contact. Las páginas y assets estáticos no deben contar como invocaciones.
6. Verificar en Production, **sin enviar otro contacto**, que el bundle de elelier.com aún llama BuildShip y que los visitantes pueden utilizar el formulario habitual.

## Prueba manual E2E sencilla (un único mensaje)

Usar un correo real al que Elier tenga acceso como visitante (distinto de la cuenta interna). Hacer **una sola petición** desde el formulario de Preview:

- Nombre: QA elelier Google
- Correo visitante: una bandeja controlada por Elier.
- Mensaje: QA-ELELIER-GOOGLE-[fecha/hora] — validación de formato y entrega.

Verificar solo:

| Punto | Evidencia aceptable |
| --- | --- |
| Navegador | POST /api/contact devuelve **201** y JSON ok:true con submissionId; UI confirma recepción y limpia los campos |
| Google Sheets | Pestaña contact_v2 tiene fila con mismo ID, fecha UTC, nombre, correo y mensaje en sus propias columnas; estados sent/sent |
| Gmail interno | loya.elier@gmail.com recibe el aviso con asunto UTF-8, nombre, email y texto legibles; Reply-To es el visitante |
| Gmail visitante | Bandeja controlada recibe el acuse con asunto Unicode, saludo y texto legible; Reply-To hola@elelier.com |
| Compatibilidad | BuildShip continúa activo en producción; ningún cambio en pestaña histórica elelier01 |

**Importante:** HTTP 201 demuestra aceptación de Sheets + MailApp, no entrega a las bandejas; por eso se revisan ambos Gmail. HTTP 202 indica contacto registrado pero una notificación falló: no es GO. HTTP 4xx/5xx tampoco es GO. No repetir envíos automáticamente ante una respuesta ambigua.

No se necesita un harness de navegador ni otra plataforma adicional para esta prueba; los casos de error técnicos los cubren Jest y node:test.

## Corte futuro (fuera de este PR)

1. Revisar PR draft, Preview y las cinco evidencias anteriores.
2. Solicitar GO explícito de Elier.
3. **Antes de activar el proveedor**, configurar y verificar en **Production** los tres secrets
   `CONTACT_APPS_SCRIPT_URL`, `CONTACT_SHARED_SECRET`, `TURNSTILE_SECRET_KEY` y la variable
   pública `REACT_APP_TURNSTILE_SITE_KEY`; no asumir que los valores de Preview se heredan.
   Autorizar el hostname `elelier.com` (y `www.elelier.com` si aplica) en la configuración
   de Turnstile y comprobar que el endpoint y la web app de Google corresponden al entorno aprobado.
4. Habilitar `REACT_APP_CONTACT_PROVIDER=google` en **Production** y generar un nuevo despliegue
   controlado. Verificar que el bundle incluye la sitekey y que `/api/contact` tiene sus bindings
   de servidor antes de permitir el envío público.
5. Confirmar una solicitud real en producción y revisar ambas bandejas.
6. Mantener BuildShip disponible como rollback (`REACT_APP_CONTACT_PROVIDER=buildship`) hasta aprobar su retiro por separado.

**No cortar, fusionar ni apagar BuildShip a partir de un test unitario.**

## Consideraciones

- MailApp usa el remitente Gmail del propietario. No depende de configurar envío SMTP desde hola@elelier.com.
- Si Google falla después de registrar un lead, la pestaña conserva internal_mail_status/autoreply_status; revisar fallos manualmente, sin reintentos automáticos que dupliquen correos.
- Los secretos solo viven en Cloudflare/Script Properties; nunca en variables REACT_APP_.
- El Worker legacy workers/lead-worker.js (Supabase/Telegram) queda fuera del cambio.
