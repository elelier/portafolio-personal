# Contacto Cloudflare + Google Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reemplazar BuildShip mediante endpoint Cloudflare y Apps Script, conservando flujo, registros, correos y UI, sin retirar el endpoint productivo antes de QA.

**Architecture:** Cloudflare Pages Function misma-origin valida el formulario, verifica Turnstile y llama a Apps Script con secreto server-to-server. Apps Script escribe en pestaña nueva de Sheets y envía dos correos con MailApp; bandera de build permite probar Preview sin migrar Production.

**Tech Stack:** React 18/CRA 5/Jest, Cloudflare Pages Functions ES modules, Node 20 `node:test`, Google Apps Script/Sheets/MailApp.

**Spec:** [`docs/superpowers/specs/2026-10-27-contact-cloudflare-google.md`](../specs/2026-10-27-contact-cloudflare-google.md)

## Global Constraints

- No apagar BuildShip, no alterar `elelier01`, no merge ni deploy de Production antes de GO explícito.
- Cloudflare Pages: raíz `my-app`, salida `build`, rama Production `main`.
- Contrato legado: `{name,mail,message}` a BuildShip; default `REACT_APP_CONTACT_PROVIDER=buildship`.
- Preview Google: `POST /api/contact`, `contact_v2` y dos correos; secretos solo en Cloudflare/Apps Script.
- Respetar contenido y layout de Contacto ES/EN; no agregar otros proveedores, D1/KV ni alterar `workers/lead-worker.js`.
- Toda lógica con pruebas RED→GREEN; conservar `src/config/hashedPasscodes.js`.

## Review Focus

1. `201` con body JSON inválido del GAS → error, nunca éxito falso (Task 1).
2. GET/POST malformado o body desproporcionado → `405/400/413/415`, sin llamada a Google (Task 1).
3. Reenvío del mismo `submissionId` → una sola fila y sin dos autorespuestas (Task 2).
4. Un `MailApp.sendEmail` falla tras persistencia → registro conservado, estado parcial y UI honesta (Tasks 2 y 3).
5. Build preview/prod sin variables Google → producción sigue BuildShip, Preview Google falla cerrado sin secretos (Tasks 1 y 3).

---

### Task 1: Endpoint Pages Function aislado y seguro

**Files:**
- Create: `my-app/functions/_lib/contact.mjs`
- Create: `my-app/functions/_lib/contact.test.mjs`
- Create: `my-app/functions/api/contact.js`
- Create: `my-app/public/_routes.json`

**Interfaces:**
- Consumes: `Request`, `env.CONTACT_APPS_SCRIPT_URL`, `env.CONTACT_SHARED_SECRET`, `env.TURNSTILE_SECRET_KEY`, `fetch`.
- Produces: `handleContact(request,env,fetchImpl=fetch): Promise<Response>` y `onRequest({request,env})` delegado; contrato JSON exacto según spec.

- [ ] **Step 1: RED** Escribir `node:test` con `handleContact`: POST válido (resultado upstream `{ok:true,stored:true,internalMailSent:true,autoReplySent:true}`), malformado/GET/honeypot/body grande/Turnstile fallido/secrets ausentes/upstream malformado/timeout y parcial; inyectar `fetchImpl` para no llamar a Google.
- [ ] **Step 2: Verify RED** `node --test my-app/functions/_lib/contact.test.mjs`; fallos por export inexistente y comportamiento faltante.
- [ ] **Step 3: GREEN** Implementar `handleContact`, validaciones, verificación Turnstile y forward firmado vía secreto en body; mapear `201/202/4xx/5xx`, sin log de PII ni secretos.
- [ ] **Step 4: GREEN routing** Crear Pages wrapper `onRequest` y `_routes.json` con `{"version":1,"include":["/api/contact"],"exclude":[]}`.
- [ ] **Step 5: Verify GREEN** `node --test my-app/functions/_lib/contact.test.mjs`; confirmar 0 fallos y que `_routes.json` excluye rutas estáticas.
- [ ] **Step 6: Commit** `feat(contact): add isolated cloudflare contact endpoint`.

### Task 2: Google Apps Script con persistencia nombrada y correo

**Files:**
- Create: `my-app/google-apps-script/Code.gs`
- Create: `my-app/google-apps-script/Code.test.cjs`
- Create: `my-app/google-apps-script/README.md`

**Interfaces:**
- Consumes: JSON con `secret,name,mail,message,submissionId,language`, Script Properties `CONTACT_API_SHARED_SECRET`, `CONTACT_SPREADSHEET_ID`, `CONTACT_NOTIFY_EMAIL`.
- Produces: ContentService JSON `{ok,submissionId,stored,internalMailSent,autoReplySent,duplicate}`; hoja `contact_v2` (8 columnas exactas en spec).

- [ ] **Step 1: RED** Construir test harness Node `vm` con stubs `SpreadsheetApp`, `MailApp`, `ContentService`, `PropertiesService`, `LockService`; casos auth rechazada, schema correcto, valores con tildes, escaping HTML, duplicate, correo fallido parcial y correo fijado por property.
- [ ] **Step 2: Verify RED** `node --test my-app/google-apps-script/Code.test.cjs`; fallos esperados por función `doPost` ausente.
- [ ] **Step 3: GREEN** Implementar `doPost(e)`, `LockService.getScriptLock()`, chequeo de UUID, mapeo explícito de cabeceras, `appendRow`, `MailApp.sendEmail` y update de estados por fila. No importar librerías ni añadir OAuth manual.
- [ ] **Step 4: GREEN docs** Instrucciones de crear/publlicar web app como propietario, dar permisos una sola vez y configurar Properties/secret sin incluir valores reales.
- [ ] **Step 5: Verify GREEN** `node --test my-app/google-apps-script/Code.test.cjs` sin fallos; no llamados reales a Gmail.
- [ ] **Step 6: Commit** `feat(contact): add google apps script sheet and mail workflow`.

### Task 3: Selector seguro de proveedor y UI del formulario

**Files:**
- Modify: `my-app/src/components/Contacto.js`
- Modify: `my-app/src/components/Contacto.test.js`
- (If necessary) Create: `my-app/src/components/utils/contactProvider.js`

**Interfaces:**
- Consumes: `process.env.REACT_APP_CONTACT_PROVIDER` con valor `google` únicamente en Preview; Turnstile public site key `REACT_APP_TURNSTILE_SITE_KEY`.
- Produces: BuildShip por defecto con payload exactamente legado; modo Google con `submissionId,website,turnstileToken,language`, éxito `201`, aviso parcial `202` y error fiable; ES/EN.

- [ ] **Step 1: RED** Actualizar Jest para afirmar endpoint/payload original si flag ausente, endpoint relativo para flag Google, token requerido, sin doble submit, feedback 201/202/4xx/5xx, persistencia de datos si falla; cobertura ES/EN.
- [ ] **Step 2: Verify RED** `npm test -- --runInBand --watchAll=false` en `my-app`; fallos propios por nuevo modo inexistente.
- [ ] **Step 3: GREEN** Añadir selector de proveedor, Turnstile y honeypot condicionados a Google; no cambiar diseño ni CTA; fallo cerrado cuando Turnstile no esté listo.
- [ ] **Step 4: Verify GREEN** Repetir tests focales y suite completa con `npm test -- --runInBand --watchAll=false`.
- [ ] **Step 5: Commit** `feat(contact): add preview-ready google provider with buildship fallback`.

### Task 4: Runbook, build, Preview y handoff

**Files:**
- Create: `docs/contact-google-cutover.md`
- Modify (only if necessary): `my-app/.env.example`, `my-app/CLOUDFLARE_PAGES.md`

**Interfaces:**
- Consumes: Tasks 1–3; cuenta Google, web app URL y secrets registrados fuera de Git.
- Produces: pasos reversibles de QA/corte con evidencia y PR draft.

- [ ] **Step 1: RED/documented checks** Definir matriz de QA: en Preview `POST /api/contact` una vez, row id, notificación Gmail, acuse Gmail, 201, feedback, registro sin columnas mezcladas, fallback BuildShip en Production.
- [ ] **Step 2: GREEN/docs** Documentar setup de Cloudflare Preview y Script Properties, cuotas de Gmail, manejo de fallos parciales, restauración `buildship`, y condición de GO.
- [ ] **Step 3: Verify** `node --test my-app/functions/_lib/contact.test.mjs my-app/google-apps-script/Code.test.cjs`, `cd my-app && npm test -- --runInBand --watchAll=false && npm run build`, `git diff --check`, `git status --short`, inspección manual de `build/_routes.json`; conservar hash/estado de `src/config/hashedPasscodes.js`.
- [ ] **Step 4: Commit + PR** `docs(contact): add preview and rollback runbook`; abrir PR **draft**, sin merge, anotar SHA, URL de Preview, tests y límites.
- [ ] **Step 5: QA manual bloqueante** Con permisos y secretos listos, usuario confirma cuenta Google; realizar 1 QA E2E en Preview y verificar los dos correos. Si no es posible, marcar BLOCKED, **no** desconectar BuildShip ni reclamar PASS.
