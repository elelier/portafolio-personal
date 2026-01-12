# Leads Pipeline

## Flujo por tier
- **HIGH**: Se abre Cal.com en pestaña nueva con datos prellenados (name, email, client_lead_id, utm_source, utm_medium, utm_campaign). Al terminar, Cal puede redirigir a `https://elelier.com/gracias-agenda`.
- **MID**: Se piden preguntas adicionales en la misma página (no se abre Cal automáticamente).
- **LOW**: Se muestra recurso recomendado (no se abre Cal).

## Cal.com (HIGH)
- URL base: `https://cal.com/elelier/diagnostico`
- Parámetros enviados:
  - `name`
  - `email`
  - `client_lead_id`
  - `utm_source` (si existe)
  - `utm_medium` (si existe)
  - `utm_campaign` (si existe)
- Apertura: `window.open` en nueva pestaña (`noopener,noreferrer`). No se usa `overlayCalendar` ni iframe.
- Redirect recomendado en Cal: `https://elelier.com/gracias-agenda`.

## Página de gracias
- Ruta: `/gracias-agenda`
- Copia: "Sesión confirmada" + botón para volver a elelier.com.

## QA checklist
- **Local** (`npm run dev`):
  - Abrir `http://localhost:3000/?utm_source=test&utm_medium=chat&utm_campaign=qa`
  - Enviar lead HIGH (budget `10k+`, urgency `2w`, companyType `enterprise`, problem `ia`/`producto`)
  - Confirmar pestaña nueva de Cal con name/email/client_lead_id prellenados
  - Confirmar mensaje en la página original: "Abrimos el calendario..."
  - Abrir manualmente `/gracias-agenda` y revisar UI
- **Prod**: Repetir prueba en dominio real

## Referencias
- Frontend: `my-app/src/components/LeadQualifier.jsx`
- Ruta de gracias: `my-app/src/pages/GraciasAgenda.jsx`
- Worker: `workers/lead-worker.js` (retorna tier y nextStep.url)
