# elelier.com — frontera de datos y fuente de verdad

> Reconciliación documental del **29 de octubre de 2026**, desde `main` `8596025ac4e0e66fc24668993023e1a106fdf82b`. Este inventario verifica **código y documentación versionados**, no afirma haber inspeccionado los secretos de Cloudflare, recibido correos nuevos ni consultado la base Supabase live hoy.

## Jerarquía de evidencia

1. **Comportamiento efectivo en Production:** variable/secret del deployment activo, ruta y logs del entorno, recepción de los dos correos y escritura en la hoja cuando corresponda. Requiere verificación con acceso autorizado y fecha.
2. **Comportamiento implementado:** código en `main`, configuración de rutas, tests, migra­ciones y commits. Prueba qué puede ejecutar una versión, **no** qué bandera está activada en el runtime.
3. **Evidencia de QA histórica:** PRs, runbooks, pruebas de bandejas y registros de despliegue; siempre indicar fecha y ambiente.
4. **Propuestas/documentación antigua:** no reemplazan evidencia actual. Mantener el historial, con estado etiquetado.

Si fuentes discrepan, **no decidir por antigüedad del README ni por una conversación**: registrar la discrepancia, el último control comprobado y la acción de verificación.

## Tres flujos que no deben confundirse

| Superficie | Contrato implementado (GitHub) | Destino y propósito | Estado efectivo en octubre |
| --- | --- | --- | --- |
| Formulario principal de `elelier.com` | `my-app/src/components/Contacto.js`; `REACT_APP_CONTACT_PROVIDER === 'google'` elige `POST /api/contact`; en otro caso usa BuildShip `/contact_me` | Conversación/contacto desde el portafolio | **Flag de Cloudflare Production pendiente de lectura directa**. En conversación del 27/oct se aprobó activar Google, pero el valor del deployment no es visible en este repositorio. No declarar a BuildShip ni a Google «activo ahora» sin contrastarlo |
| Alternativa Google del formulario | `my-app/functions/api/contact.js` + `functions/_lib/contact.mjs` + `google-apps-script/Code.gs` | Cloudflare Pages Function valida Turnstile y reenvía a Apps Script; Sheets `contact_v2`, aviso interno y acuse al visitante | PR #58 integrado en `main` (commit `8596025`). QA Preview de 27/oct documentada con HTTP 201, fila y dos bandejas; **no reemplaza smoke en Production** |
| Worker de leads anterior | `workers/lead-worker.js`; rutas `/health`, `/api/lead` y `/api/admin/*` | Un endpoint distinto que inserta en `/rest/v1/leads` mediante backend y notifica HIGH por Telegram | Código versionado, **sin evidencia nueva de si el Worker o sus bindings están desplegados hoy**. No se usa automáticamente por `Contacto.js` |
| Elelier Core DB compartida | Repo `elelier/elelier-core-db`, contrato `submit_signal(payload jsonb)`, `people`/`signals`, y seeds `space_key=elelier`, `app_key=elelier-os` | CRM multi-tenant para consumidores expresamente integrados | **No existe llamada `submit_signal` en el flujo principal `Contacto.js` revisado.** Seed y documentación de Core DB **no prueban** sincronización del formulario del portafolio. No se consultó Supabase live en esta revisión |

### Recorrido funcional que sí acredita el código

```text
Visitante -> Contacto.js
  ├─ flag google -> /api/contact -> Turnstile -> Apps Script -> Sheets + correo interno + acuse
  └─ otro valor/ausente -> BuildShip contact_me

Worker histórico /api/lead -> Supabase REST /leads (+ Telegram HIGH)
                                 [ruta independiente]

Core DB submit_signal -> spaces / apps / links -> people / signals
                         [contrato compartido; no conectado por defecto al formulario]
```

La mera presencia del mismo proveedor **Supabase** en dos flujos no demuestra que compartan proyecto, tabla, esquema o registro de lead.

## Contrato Google y control de errores

- La Function requiere `REACT_APP_CONTACT_PROVIDER=google`, `CONTACT_APPS_SCRIPT_URL`, `CONTACT_SHARED_SECRET` y `TURNSTILE_SECRET_KEY`; sin ellos el código devuelve `503 service_unavailable`.
- Datos aceptados: `name`, `mail`, `message`, `submissionId`, `language`, honeypot `website` vacío y `turnstileToken`. Ver validador en `functions/_lib/contact.mjs`.
- `201`: respuesta de Sheets/Apps Script informa ambos avisos enviados; verificar recepción real por separado. `202`: contacto guardado con correo parcial (no es PASS E2E). `4xx/5xx`: no es GO.
- No repetir un envío tras un resultado ambiguo sin revisar el `submissionId`, porque podría duplicar correos.
- `REACT_APP_*` es visible públicamente en el bundle React; los secretos nunca deben estar allí.

## Datos Core DB: contrato frente a inventario live

- El seed histórico registra `elelier` → `elelier-os` como una relación propia de Core DB. Su `repo_full_name` es `elelier/elelier-os`, **distinto de** `elelier/portafolio-personal`. No reutilizar `elelier-os` para un nuevo consumidor sin validar su identidad y contrato.
- Las referencias a `spaces`, `apps`, `links`, `people` y `signals` son **esquema/capacidad**; no inferir filas de contacto provenientes de este formulario.
- El último canary remoto descrito en Core DB es de **10/jul/2026** y corresponde a OneClicTrip/sandbox. No equivale a lectura live del contacto de elelier.com en octubre.
- Una integración posterior exigiría definir `app_key`, consentimiento/retención, idempotencia, política anti-spam y RPC adecuada en historia independiente. **No está autorizada ni implementada aquí.**

## Evidencia y desviaciones por cerrar

| Tema | Evidencia que tenemos | Qué falta para declarar PASS actual |
| --- | --- | --- |
| Hosting del sitio | `my-app/CLOUDFLARE_PAGES.md` documenta Cloudflare Pages `elelier`, root `my-app`, output `build`; sitio público responde | Confirmar deployment/commit activo y dominio en panel Cloudflare |
| Proveedor actual del formulario | Código y QA histórico Google; autorización conversacional de activación | Leer flag efectivo en Cloudflare Production, identificar build en servicio y observar su ruta sin enviar contactos innecesarios |
| Google Sheets y email | QA Preview del 27/oct en `docs/contact-google-cutover.md` | Evidencia fechada de smoke productivo, si la validación ya se ejecutó; no inventar una nueva recepción |
| Worker `leads.elelier.com` | Código y runbook `docs/leads-system.md` | Verificar route/health/bindings y si tiene consumidor real; mantener separado del formulario |
| Core DB | Seeds, migraciones, `docs/01-current-state.md` y kit de contratos | Consulta read-only al proyecto Supabase correcto y reconciliación de `apps/spaces/links`, sin exponer PII |
| SEO trilingüe | Issues del roadmap SEO #59–#79 y PR draft #80 al momento del inventario | No mezclar objetivos futuros ES/EN/PT-BR ni mediciones no publicadas con esta reconciliación de datos |

## Procedimiento de verificación futura (sin escrituras por defecto)

1. Fijar commit del `main` y deployment Cloudflare Production que sirve el formulario; anotar hora, flag efectivo y ruta real de `fetch`.
2. Confirmar backend activo y observabilidad sin leer secretos ni publicar datos personales.
3. Si existe un smoke autorizado, correlacionar **una sola** submission id con respuesta HTTP, fila Sheets y dos bandejas; registrar resultado y ambiente, no el mensaje ni direcciones personales.
4. Consultar **read-only** en Core DB el proyecto correcto y recuperar claves `spaces/apps/links`; confirmar si existe un consumidor del portafolio antes de proponer cambios.
5. Actualizar este inventario con fecha y pruebas; proponer la próxima iteración mínima. No habilitar dual-write, desactivar BuildShip ni ejecutar migraciones como parte de una auditoría.

## Fuentes versionadas

- [`Contacto.js`](../my-app/src/components/Contacto.js)
- [Function Google](../my-app/functions/_lib/contact.mjs)
- [Runbook del corte anterior](contact-google-cutover.md) — **foto histórica 27/oct**
- [Worker de leads](../workers/lead-worker.js) y [su runbook](leads-system.md) — **arquitectura distinta**
- [Core DB: seed de apps/spaces/links](https://github.com/elelier/elelier-core-db/blob/main/supabase/seeds/001_base_spaces_apps_links.sql)
- [Core DB: integración de consumidores](https://github.com/elelier/elelier-core-db/blob/main/docs/08-consumer-integration-readiness-kit.md)
- [Core DB: frontera con el portafolio](https://github.com/elelier/elelier-core-db/blob/main/docs/elelier-portfolio-contact-boundary.md) — disponible tras integrar el PR hermano

**Fuera de alcance:** código de aplicación, cambios de RLS/SQL, activación de proveedores, edición de secretos, merge, release o deploy.
