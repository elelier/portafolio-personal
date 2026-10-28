# elelier.com — QA y corte controlado de contacto

**Estado (27 oct 2026):** QA E2E de Preview **PASS** y preflight de infraestructura productiva preparado. **NO-GO para corte** hasta autorización explícita de merge/activación y smoke test controlado. BuildShip sigue en producción.

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

## Evidencia QA Preview (27 oct 2026)

- PR #58: `fa2cd5b728b5b6ecf3bbf17a18b2dac8e39c6ca5` (draft). Plantillas HTML de confirmación y aviso interno aprobadas.
- Una prueba real desde el formulario Preview: respuesta HTTP 201; dos correos recibidos e inspeccionados visualmente (diseños, acentos, enlaces y Reply-To).
- Google Sheets `Leads` → `contact_v2`: `submission_id=5825faf5-69eb-4247-a15b-04bde5898c12`, estados `sent/sent`. No se alteró `elelier01`.
- Validaciones preflight: Node `18/18`, Jest `127/127`, `npm run build` PASS.
- **No repetir** la prueba Preview sin un cambio funcional que lo justifique.

## Preparación productiva (Etapa 1, sin corte)

| Componente | Estado confirmado |
| --- | --- |
| Baseline Cloudflare Production | `main` commit `658ac4d`; deployment ID `d5baaea6-3250-4d20-b252-0453e336c85f` (`https://d5baaea6.elelier.pages.dev`) |
| Google Apps Script | Implementación separada **Production PREP** bajo el mismo proyecto, URL `https://script.google.com/macros/s/AKfycbwPr31QbDh8jwrPAc1xpW8YH-5M7oefQvJK0FJ6LdNrn7z2AY_nReJxp4xkFe3eAyH8/exec`, **fijada en versión 4** |
| Turnstile | Widget separado `elelier-contact-production`, modo Managed, hostname `elelier.com` (incluye `www.elelier.com` según Cloudflare) |
| Cloudflare Production | Secrets `CONTACT_APPS_SCRIPT_URL`, `CONTACT_SHARED_SECRET`, `TURNSTILE_SECRET_KEY` y variable `REACT_APP_TURNSTILE_SITE_KEY` guardados; surten efecto en el **próximo deployment** |
| Flag de frontend | `REACT_APP_CONTACT_PROVIDER` **ausente**, por lo tanto BuildShip sigue siendo predeterminado; **no se activó Google** |
| Restricciones | No se hizo merge, deploy de Pages, envío de contacto productivo, modificación de BuildShip ni cambios en histórico |

**Acoplamiento conocido:** las implementaciones Preview y Production de Apps Script comparten Script Properties y la pestaña `contact_v2` dentro del mismo proyecto. Son URLs/versiones distintas, pero no son proyectos ni bases de datos aislados.

**Gate de servidor (PR #58):** la ruta `/api/contact` responde `503 service_unavailable` y no llama a Turnstile ni a Google, salvo que `REACT_APP_CONTACT_PROVIDER` sea exactamente `google` en el entorno Pages. Cloudflare expone esas variables a Functions en runtime y al build. En Preview el flag sigue habilitado; en Production está ausente y BuildShip permanece predeterminado. Verificar ambos comportamientos después del próximo despliegue antes de cualquier corte.

## Corte futuro (fuera de este PR)

1. Revisar PR draft, Preview y las cinco evidencias anteriores.
2. Solicitar GO explícito de Elier.
3. Verificar nuevamente los cuatro nombres configurados en Cloudflare Production, el deployment Apps Script **v4**, el widget dedicado y que `/api/contact` responde 503 sin flag.
4. Con GO explícito para merge/activación: fusionar PR #58 sin cambios ajenos, confirmar que BuildShip sigue activo; activar `REACT_APP_CONTACT_PROVIDER=google` en Production y generar un nuevo despliegue controlado. Verificar el bundle y los bindings de `/api/contact` antes del smoke test.
5. Confirmar una solicitud real en producción y revisar ambas bandejas.
6. Mantener BuildShip disponible como rollback (`REACT_APP_CONTACT_PROVIDER=buildship`) hasta aprobar su retiro por separado.

**No cortar, fusionar ni apagar BuildShip a partir de un test unitario.**

## Consideraciones

- MailApp usa el remitente Gmail del propietario. No depende de configurar envío SMTP desde hola@elelier.com.
- Si Google falla después de registrar un lead, la pestaña conserva internal_mail_status/autoreply_status; revisar fallos manualmente, sin reintentos automáticos que dupliquen correos.
- Los secretos solo viven en Cloudflare/Script Properties; nunca en variables REACT_APP_.
- El Worker legacy workers/lead-worker.js (Supabase/Telegram) queda fuera del cambio.
