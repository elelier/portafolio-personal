# Cloudflare Pages Readiness

This repo is prepared for a Cloudflare Pages build without changing public DNS or removing GitHub Pages.

## Recommended Cloudflare Pages configuration

- Root directory: `my-app`
- Build command: `npm run build`
- Build output directory: `build`
- Production branch: `main`
- Node version: `20.19.0`

## Environment variables

Set these in Cloudflare Pages if you want parity with the current app behavior:

- `REACT_APP_GEMINI_API_KEY` (optional; only if you want to preserve chatbot/AI behavior)
- `REACT_APP_PASSCODE_ARQIDIA`
- `REACT_APP_PASSCODE_HQCONTROL`
- `REACT_APP_PASSCODE_ANDAMIOS`

Do not paste real secret values into this repository.

## Rollback posture

Keep GitHub Pages in place as the rollback path until the Cloudflare Pages production deployment is validated on the real domain. DNS cutover remains out of scope for this change.

## Deep-route rewrite note

The first Cloudflare Pages smoke showed that wildcard prefix rules did not resolve the dynamic deep links. The `_redirects` contract therefore uses explicit rules and named placeholders for the React routes, while leaving prerendered routes and assets untouched.

## Smoke checklist for `*.pages.dev`

1. Load `/` and confirm the home sections render normally.
2. Direct-open `/portafolio`, `/sobre-mi`, `/servicios`, `/contacto`, `/blog`, `/aionlabs`, `/privacy-policy`, and `/terms-of-service`.
3. Direct-open `/proyecto/test-token`, `/cotizacion/test-id`, `/mockup/test-id`, `/admin/leads`, and `/entradas/2408_IA_Transforma_ecommerce` to confirm the SPA shell resolves instead of returning a static 404.
4. Confirm static assets load correctly and no `_redirects` rule rewrites JS, CSS, images, `robots.txt`, or `sitemap.xml`.
5. Confirm `CNAME`, `homepage`, `gh-pages`, and the existing GitHub Pages deploy flow remain unchanged in the repository.

## Out of scope

- DNS cutover to Cloudflare Pages
- Removing GitHub Pages
- Dashboard-side configuration beyond the values listed above
