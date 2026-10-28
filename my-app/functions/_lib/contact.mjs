function json(payload, status) {
  return Response.json(payload, { status, headers: { 'cache-control': 'no-store' } });
}

const MAX_BODY_BYTES = 4096;
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

async function readBoundedBody(request) {
  const contentLength = Number(request.headers.get('content-length'));
  if (contentLength > MAX_BODY_BYTES) return { tooLarge: true };

  const reader = request.body?.getReader();
  if (!reader) return { value: '' };
  const chunks = [];
  let length = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    length += value.byteLength;
    if (length > MAX_BODY_BYTES) {
      await reader.cancel().catch(() => {});
      return { tooLarge: true };
    }
    chunks.push(value);
  }
  const buffer = new Uint8Array(length);
  let offset = 0;
  for (const chunk of chunks) {
    buffer.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return { value: new TextDecoder().decode(buffer) };
}

function cleanPayload(input) {
  if (!input || typeof input !== 'object' || Array.isArray(input)) return null;
  if (typeof input.name !== 'string' || typeof input.mail !== 'string' || typeof input.message !== 'string') return null;
  const name = input.name.trim();
  const mail = input.mail.trim();
  const message = input.message.trim();
  if (!name || name.length > 255 || !mail || mail.length > 255 || !message || message.length > 500) return null;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail)) return null;
  if (typeof input.submissionId !== 'string' || !UUID.test(input.submissionId)) return null;
  if (input.website !== '' || typeof input.turnstileToken !== 'string' || !input.turnstileToken || input.turnstileToken.length > 2048) return null;
  if (input.language !== 'es' && input.language !== 'en') return null;
  return { name, mail, message, submissionId: input.submissionId, language: input.language };
}

export async function handleContact(request, env, fetchImpl = fetch) {
  if (request.method !== 'POST') return json({ ok: false, error: 'method_not_allowed' }, 405);
  if (!request.headers.get('content-type')?.toLowerCase().startsWith('application/json')) {
    return json({ ok: false, error: 'unsupported_media_type' }, 415);
  }
  if (env?.REACT_APP_CONTACT_PROVIDER !== 'google') {
    return json({ ok: false, error: 'service_unavailable' }, 503);
  }
  if (!env?.CONTACT_APPS_SCRIPT_URL || !env?.CONTACT_SHARED_SECRET || !env?.TURNSTILE_SECRET_KEY) {
    return json({ ok: false, error: 'service_unavailable' }, 503);
  }
  if (!/^https:\/\/script\.google\.com\/macros\/s\/[^/]+\/exec$/.test(env.CONTACT_APPS_SCRIPT_URL)) {
    return json({ ok: false, error: 'service_unavailable' }, 503);
  }

  const bounded = await readBoundedBody(request);
  if (bounded.tooLarge) return json({ ok: false, error: 'payload_too_large' }, 413);
  let input;
  try {
    input = JSON.parse(bounded.value);
  } catch {
    return json({ ok: false, error: 'invalid_json' }, 400);
  }
  const payload = cleanPayload(input);
  if (!payload) return json({ ok: false, error: 'invalid_contact' }, 400);

  try {
    const turnstile = await fetchImpl('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      body: new URLSearchParams({ secret: env.TURNSTILE_SECRET_KEY, response: input.turnstileToken }),
      signal: AbortSignal.timeout(8000)
    });
    const verification = await turnstile.json();
    if (!turnstile.ok || verification.success !== true) return json({ ok: false, error: 'captcha_failed' }, 403);
  } catch {
    return json({ ok: false, error: 'verification_unavailable' }, 503);
  }

  try {
    const response = await fetchImpl(env.CONTACT_APPS_SCRIPT_URL, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ ...payload, secret: env.CONTACT_SHARED_SECRET, source: 'elelier.com' }),
      signal: AbortSignal.timeout(20000)
    });
    if (!response.ok) return json({ ok: false, error: 'backend_failure' }, 502);
    const result = await response.json();
    if (!result || result.ok !== true || result.stored !== true || result.submissionId !== payload.submissionId || typeof result.internalMailSent !== 'boolean' || typeof result.autoReplySent !== 'boolean') {
      return json({ ok: false, error: 'backend_failure' }, 502);
    }
    const notificationStatus = result.internalMailSent && result.autoReplySent ? 'sent' : 'partial';
    return json({ ok: true, submissionId: payload.submissionId, notificationStatus }, notificationStatus === 'sent' ? 201 : 202);
  } catch {
    return json({ ok: false, error: 'backend_failure' }, 502);
  }
}
