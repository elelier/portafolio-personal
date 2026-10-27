# elelier.com — Google Apps Script de contacto

Este directorio contiene el código fuente del backend Google. **No se publica automáticamente**. BuildShip continúa activo hasta QA aprobado.

## Cuenta autorizada

- Propietario/ejecutor: **loya.elier@gmail.com** (confirmado por Elier).
- Archivo existente: [Leads](https://docs.google.com/spreadsheets/d/14Yu8fWcj7MWrKtQTxsd_UZG8i0eXVn4KKUkXaNWi62k/edit).
- Nueva pestaña creada al primer contacto válido: **contact_v2**. No modifica la pestaña histórica elelier01.
- Envíos: notificación a loya.elier@gmail.com y acuse al correo del visitante.
- MailApp envía como el propietario autorizado; **no** se afirma que el remitente sea hola@elelier.com. Se usa esa dirección únicamente como Reply-To del acuse.

## Preparación (una sola vez)

1. Abrir [script.google.com](https://script.google.com/) desde esa cuenta → **Nuevo proyecto** (ej.: elelier-contact-v2).
2. Reemplazar Code.gs del editor por el contenido versionado aquí.
3. En **Configuración del proyecto → Propiedades de secuencia de comandos**, establecer:

   | Propiedad | Valor |
   | --- | --- |
   | CONTACT_SPREADSHEET_ID | ID del documento Leads indicado arriba |
   | CONTACT_NOTIFY_EMAIL | loya.elier@gmail.com |
   | CONTACT_API_SHARED_SECRET | Cadena fuerte aleatoria, igual a CONTACT_SHARED_SECRET en Cloudflare |

4. Publicar como **Aplicación web**, ejecutar **como yo**, acceso **Cualquier usuario**. El backend exige secreto compartido para procesar una solicitud. Autorizar manualmente permisos de Sheets y MailApp.
5. Copiar la URL terminada en /exec en el secret de **Cloudflare Pages Preview** CONTACT_APPS_SCRIPT_URL.
6. Cambios futuros de Code.gs requieren una **nueva versión del deployment** de Apps Script: el editor y la versión publicada pueden diferir.

## Garantías operativas

- Las filas se escriben usando encabezados nombrados, no las posiciones antiguas de Phone/Message.
- Un submissionId ya guardado no produce filas ni correos duplicados.
- Cada fila conserva internal_mail_status y autoreply_status: pending, sent o failed.
- Si un envío falla, queda el contacto en Sheets. Cloudflare responde 202 y el sitio muestra recepción parcial.
- No hay reintentos automáticos de correos: MailApp puede haber aceptado un envío antes de una interrupción. Revisar manualmente filas pending/failed.
- MailApp confirma aceptación de envío, **no** entrega final al buzón; la prueba E2E verificará ambas bandejas.
- Los emails escapan HTML de usuarios y no incluyen la URL de banner rota de BuildShip.
- El acuse ES/EN conserva la foto de Elier, los tonos azules, el resumen del mensaje y enlaces vigentes (sitio, LinkedIn, GitHub y WhatsApp). No incluye el Calendly eliminado.
- La notificación interna incluye respuesta directa (`Reply-To` y enlace `mailto:`), ID, fecha UTC y el enlace de la pestaña real `contact_v2`, sin depender del `gid=0` histórico.
- Las dos plantillas usan tablas y CSS inline para clientes de correo, HTML escapado y una alternativa de texto; no incorporan píxeles de seguimiento.
- Tras cambiar `Code.gs` en el repositorio, **actualizar también el editor y la versión desplegada** en Apps Script; modificar solo el archivo Git no altera el backend ya publicado.

## Validación local sin correo real

Desde la raíz del repositorio, ejecutar:

    node --test my-app/google-apps-script/Code.test.cjs

El test ejecuta Code.gs con simuladores de Google, sin credenciales. La única prueba real autorizada será en **Cloudflare Preview** después de configurar Apps Script y Turnstile.

Para el ajuste de diseño, repetir una petición de Preview y confirmar visualmente los dos formatos recibidos en Gmail antes de considerar un GO de Production. Mantener BuildShip activo hasta esa decisión separada.
