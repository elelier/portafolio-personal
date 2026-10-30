# Cloudflare Pages Production Hosting Runbook

This document reflects the current production hosting state for `elelier.com` after the Cloudflare Pages cutover.

## Current status

- **Cloudflare Pages is the only approved production hosting platform.**
- GitHub Pages is historical and is **not** an approved rollback destination. See [canonical contact status](../docs/contact-current-state.md).
- Project name: `elelier`
- Root directory: `my-app`
- Build command: `npm run build`
- Build output directory: `build`
- Production branch: `main`
- Node version: `20.19.0`
- Technical URL: `https://elelier.pages.dev/`
- Primary production domain: `https://elelier.com/`

## Production domains

- `elelier.com`: Active
- `www.elelier.com`: Active
- Pending non-blocking follow-up: evaluate a `301` redirect from `www` to apex after full stability is confirmed.

## DNS summary

- Apex uses Cloudflare Pages with CNAME flattening toward `elelier.pages.dev`.
- `www` uses a CNAME toward `elelier.pages.dev`.
- The `google-site-verification` TXT record was preserved during cutover.
- Workers for forms/leads were preserved during cutover.
- No MX records were configured at cutover time.
- Do not paste full TXT values or other sensitive DNS data into this repository.
- Nameservers were not changed during the cutover.

## SPA routing

The Cloudflare Pages `_redirects` contract uses narrowly scoped rules for dynamic and deep React routes. A global catch-all rule is intentionally not used, including:

`/* /index.html 200`

Expected deep-route coverage includes:

- `/proyecto/:token`
- `/cotizacion/:id`
- `/mockup/:id`
- `/admin/leads`
- `/entradas/:slug`

Accepted behavior for closed/private/deep routes is a safe redirect to home or a non-sensitive placeholder state, with no customer or admin data exposure.

## Environment variables

Set these in Cloudflare Pages only if the deployed behavior requires parity with the current app:

- `REACT_APP_GEMINI_API_KEY` (optional)
- `REACT_APP_PASSCODE_ARQIDIA`
- `REACT_APP_PASSCODE_HQCONTROL`
- `REACT_APP_PASSCODE_ANDAMIOS`

Do not paste real secret values into this repository.

### Contacto vigente (Cloudflare + Google)

- El flujo productivo aprobado utiliza `POST /api/contact` en Cloudflare Pages Functions, con validación Turnstile y almacenamiento confirmado por Google Apps Script en la pestaña `contact_v2`.
- La Pages Function exige `REACT_APP_CONTACT_PROVIDER=google`; verificar esa variable por ambiente en Cloudflare, no asumirla de un archivo de repo.
- Variables públicas: `REACT_APP_CONTACT_PROVIDER`, `REACT_APP_TURNSTILE_SITE_KEY`. Secrets servidor: `CONTACT_APPS_SCRIPT_URL`, `CONTACT_SHARED_SECRET`, `TURNSTILE_SECRET_KEY`; **no incluir sus valores** en documentación.
- En Preview y Production existen widgets Turnstile separados. El hostname base de Preview `elelier.pages.dev` fue autorizado durante QA del PR #80; Production no se modificó.
- El archivo [histórico del cutover](../docs/contact-google-cutover.md) **no** autoriza regresar a BuildShip. Ver [estado operativo canónico](../docs/contact-current-state.md).

## Post-cutover validation

- Date: `2026-07-09`
- Validated commit: `9b66a7c`
- Result: `PASS ESTABLE`
- Validated routes/artifacts:
  - `/`
  - `/contacto`
  - `/blog`
  - `/portafolio`
  - `/robots.txt`
  - `/sitemap.xml`
  - `/manifest.json`
  - private/utilitarian deep routes
- No rollback was required.

## Recovery / rollback (Cloudflare only)

Recovery must stay **within Cloudflare Pages**: identify the last verified healthy deployment or revert the affected change, prepare a reviewed branch/PR if code is involved, and require explicit authorization before promoting a new deployment. Verify `/`, the contact form, Turnstile, and the Google storage contract after recovery. Do **not** switch DNS to GitHub Pages or re-enable BuildShip by following an old runbook.

Historical GitHub Pages DNS recovery instructions are retired and **must not be executed**. Do not change MX/TXT records or server secrets without an explicit approved incident plan.

## Known non-blocking follow-ups

- Evaluate a `301` redirect from `www` to apex.
- Evaluate a React `404` or placeholder component for closed private routes that currently redirect to home.
- Maintain light monitoring for the first `24h` after cutover.
