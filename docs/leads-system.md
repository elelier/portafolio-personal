# Sistema de Leads

Este documento detalla la arquitectura, endpoints, configuración y solución de problemas del sistema de captura de leads.

## Arquitectura

El flujo de un lead es el siguiente:

`elelier.com` (Frontend) → `Worker (leads.elelier.com)` → `Supabase (Base de Datos)` → `Telegram (Notificación)`

1.  **Frontend (elelier.com)**: El usuario envía un formulario de contacto.
2.  **Cloudflare Worker (leads.elelier.com)**: Recibe la petición, aplica lógica antispam, y procesa el lead.
3.  **Supabase**: El worker inserta el lead en la base de datos `leads`.
4.  **Telegram**: Si la inserción es exitosa, el worker envía una notificación a un chat de Telegram.

## Endpoints

El worker expone los siguientes endpoints:

-   `GET /health`: Verifica el estado del worker. Devuelve un `200 OK` si está activo.
-   `POST /api/lead`: Endpoint principal para la captura de leads desde el formulario de contacto.
-   `GET /api/admin/leads`: Endpoint protegido para obtener todos los leads en formato JSON. Requiere un token de administrador.

## Secrets y Bindings en Cloudflare

El worker depende de los siguientes secrets y bindings para su funcionamiento:

-   `SUPABASE_URL`: La URL del proyecto de Supabase.
-   `SUPABASE_SERVICE_ROLE_KEY`: La clave de servicio (rol) de Supabase para poder escribir en la base de datos.
-   `TELEGRAM_BOT_TOKEN`: El token del bot de Telegram para enviar notificaciones.
-   `TELEGRAM_CHAT_ID`: El ID del chat de Telegram al que se envían las notificaciones.
-   `ADMIN_TOKEN`: Un token secreto para acceder a endpoints de administración como `/api/admin/leads`.
-   `LEADS_KV`: Binding al KV de Cloudflare para rate-limiting y deduplicación.

## Medidas Antispam

Se implementaron varias estrategias para mitigar el spam:

1.  **Rate Limit**: Limita el número de peticiones que una misma IP puede hacer en un intervalo de tiempo. La información se almacena en `LEADS_KV`.
2.  **Deduplicación**: Evita que se envíen leads con el mismo contenido (basado en un hash del lead) en un corto período. Se utiliza `LEADS_KV` para almacenar los hashes.
3.  **Honeypot**: Se añade un campo oculto en el formulario. Si este campo es llenado (generalmente por un bot), la petición es rechazada.

## Cómo Probar el Sistema (Manualmente)

Para verificar que el sistema funciona correctamente:

1.  **Verificar el estado del worker**:
    -   Abre `https://leads.elelier.com/health` en tu navegador. Deberías ver un `OK`.

2.  **Enviar un lead de prueba**:
    -   Puedes usar una herramienta como `curl` o Postman para enviar una petición POST a `https://leads.elelier.com/api/lead`.
    ```bash
    curl -X POST https://leads.elelier.com/api/lead \
    -H "Content-Type: application/json" \
    -d 
'{'
      "name": "Tester",
      "email": "test@example.com",
      "message": "This is a test lead.",
      "phone": "1234567890",
      "interest": "Web Development"
    }'
    ```
    -   Deberías recibir una respuesta `201 Created`.
    -   Verifica que la notificación llegó al chat de Telegram configurado.
    -   Consulta la tabla `leads` en Supabase para confirmar que el registro fue creado.

3.  **Probar el endpoint de administración**:
    -   Abre `https://leads.elelier.com/api/admin/leads` en tu navegador.
    -   Te pedirá autenticación. Usa el `ADMIN_TOKEN` como contraseña (o envíalo en el header `Authorization`).
    -   Deberías ver un JSON con la lista de todos los leads.

## Troubleshooting (Solución de Problemas)

Posibles errores y cómo solucionarlos:

-   **`401 Unauthorized`**:
    -   **Causa**: Estás intentando acceder a un endpoint protegido (`/api/admin/leads`) sin el `ADMIN_TOKEN` correcto.
    -   **Solución**: Asegúrate de que el `ADMIN_TOKEN` esté bien configurado en los secrets del worker y que lo estás usando correctamente en tu petición.

-   **`429 Too Many Requests`**:
    -   **Causa**: Se ha activado el *rate limiting*. La misma IP o el mismo contenido de lead ha sido enviado demasiadas veces.
    -   **Solución**: Espera un tiempo antes de volver a intentarlo. Si ocurre en producción, monitorea si es un ataque o un error del cliente.

-   **`500 Internal Server Error` con `failed_to_fetch`**:
    -   **Causa**: El worker no pudo conectarse a un servicio externo, usualmente Supabase o Telegram.
    -   **Solución**:
        1.  Verifica que `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, y `TELEGRAM_BOT_TOKEN` están correctamente configurados en los secrets del worker.
        2.  Asegúrate de que los servicios de Supabase y Telegram estén operativos.
        3.  Revisa la conectividad de red de Cloudflare.

-   **Error en la inserción de Supabase por columnas faltantes**:
    -   **Causa**: El objeto JSON enviado al worker no coincide con la estructura de la tabla `leads` en Supabase. Por ejemplo, la tabla espera una columna que no fue incluida en el POST.
    -   **Solución**:
        1.  Compara el JSON que estás enviando con las columnas de la tabla `leads` en Supabase.
        2.  Ajusta el frontend o el cliente que envía la petición para que el JSON incluya todos los campos requeridos (y con los nombres correctos).

## Calendario (HIGH tier)

Cuando el worker clasifica un lead como **HIGH**, el frontend redirige automáticamente a Cal.com con el overlay y parámetros prellenados.

**URL base**

```
https://cal.com/elelier/diagnostico
```

**Parámetros enviados**
- `name`: Nombre del lead
- `email`: Email del lead
- `client_lead_id`: ID generado en frontend (se usa también en Cal)
- `utm_source`: UTM source (si existe)
- `utm_medium`: UTM medium (si existe)
- `utm_campaign`: UTM campaign (si existe)
- `overlayCalendar`: `true`

Los campos en Cal.com están configurados con estos identificadores: `client_lead_id`, `utm_source`, `utm_medium`, `utm_campaign`.

**Cómo probar local**
1. Inicia la app con `npm run dev` en localhost.
2. Abre `http://localhost:3000/?utm_source=test&utm_medium=chat&utm_campaign=qa`.
3. Envía el formulario con valores que fuercen HIGH (ej.: presupuesto `10k+`, urgencia `2w`, companyType `enterprise`, problem `ia`).
4. Debe redirigir a Cal.com con los parámetros en la URL y overlay activo.

**Implementación**
- Frontend: `my-app/src/components/LeadQualifier.jsx` usa `buildCalUrl` y `window.location.assign` para evitar pop-ups.
- Backend/Worker: Retorna `tier` y `nextStep`; si es HIGH, se utiliza la URL base de Cal con los parámetros añadidos en frontend.
