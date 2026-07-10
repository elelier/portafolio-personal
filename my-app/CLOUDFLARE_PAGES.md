# Cloudflare Pages Production Hosting Runbook

This document reflects the current production hosting state for `elelier.com` after the Cloudflare Pages cutover.

## Current status

- Cloudflare Pages is the primary production hosting platform.
- GitHub Pages remains available only as a historical/manual rollback path and is not the active primary host.
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

## Rollback

Use GitHub Pages rollback only if Cloudflare Pages fails persistently and production recovery cannot be achieved in place.

Manual DNS rollback steps for apex:

1. Restore these four GitHub Pages A records:
   - `185.199.111.153`
   - `185.199.110.153`
   - `185.199.109.153`
   - `185.199.108.153`
2. Keep TXT records, Workers-backed forms/leads, and subdomains intact unless a separate inventory says otherwise.
3. Do not change MX or TXT records without a validated DNS inventory.

## Known non-blocking follow-ups

- Evaluate a `301` redirect from `www` to apex.
- Evaluate a React `404` or placeholder component for closed private routes that currently redirect to home.
- Maintain light monitoring for the first `24h` after cutover.
