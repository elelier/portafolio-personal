import test from 'node:test';
import assert from 'node:assert/strict';
import { handleContact } from './contact.mjs';

test('accepts saved leads with two notifications', async () => {
  const input = new Request('https://elelier.pages.dev/api/contact', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ name: 'Ana', mail: 'ana@example.com', message: 'Hola', submissionId: 'ba1b535e-df45-4098-9216-d4ea4e78d59c', website: '', turnstileToken: 'qa-token', language: 'es' }) });
  const env = { REACT_APP_CONTACT_PROVIDER: 'google', CONTACT_APPS_SCRIPT_URL: 'https://script.google.com/macros/s/test/exec', CONTACT_SHARED_SECRET: 'secret', TURNSTILE_SECRET_KEY: 'turnstile' };
  const calls = [];
  const response = await handleContact(input, env, async (url, options) => {
    calls.push({ url: String(url), options });
    if (String(url).includes('siteverify')) return Response.json({ success: true });
    return Response.json({ ok: true, stored: true, submissionId: 'ba1b535e-df45-4098-9216-d4ea4e78d59c', internalMailSent: true, autoReplySent: true });
  });
  assert.equal(response.status, 201);
  assert.deepEqual(await response.json(), { ok: true, submissionId: 'ba1b535e-df45-4098-9216-d4ea4e78d59c', notificationStatus: 'sent' });
  assert.equal(calls.length, 2);
  assert.equal(JSON.parse(calls[1].options.body).secret, 'secret');
});

const data = { name: 'Ana Pérez', mail: 'ana@example.com', message: 'Proyecto de automatización', submissionId: 'ba1b535e-df45-4098-9216-d4ea4e78d59c', website: '', turnstileToken: 'qa-token', language: 'es' };
const secrets = { REACT_APP_CONTACT_PROVIDER: 'google', CONTACT_APPS_SCRIPT_URL: 'https://script.google.com/macros/s/test/exec', CONTACT_SHARED_SECRET: 'secret', TURNSTILE_SECRET_KEY: 'turnstile' };
const makeRequest = (payload = data, type = 'application/json') => new Request('https://elelier.pages.dev/api/contact', { method: 'POST', headers: { 'content-type': type }, body: typeof payload === 'string' ? payload : JSON.stringify(payload) });
const accepted = { ok: true, stored: true, submissionId: data.submissionId, internalMailSent: true, autoReplySent: true };
const stub = (upstream = accepted, verify = true) => {
  const calls = [];
  return { calls, fetch: async (url) => { calls.push(String(url)); return Response.json(String(url).includes('siteverify') ? { success: verify } : upstream); } };
};

test('accepts Portuguese locale without changing storage contract', async () => {
  const f = stub();
  const response = await handleContact(makeRequest({ ...data, language: 'pt-br' }), secrets, f.fetch);
  assert.equal(response.status, 201);
  assert.equal(f.calls.length, 2);
});

test('does not expose the Google contact backend until the provider flag is explicitly enabled', async () => {
  for (const provider of [undefined, 'buildship', 'GOOGLE']) {
    const f = stub();
    const env = { ...secrets, REACT_APP_CONTACT_PROVIDER: provider };
    const response = await handleContact(makeRequest(), env, f.fetch);
    assert.equal(response.status, 503);
    assert.deepEqual(await response.json(), { ok: false, error: 'service_unavailable' });
    assert.equal(f.calls.length, 0);
  }
});

test('rejects wrong method, content type, JSON and oversize body without upstream calls', async () => {
  const f = stub();
  assert.equal((await handleContact(new Request('https://elelier.pages.dev/api/contact'), secrets, f.fetch)).status, 405);
  assert.equal((await handleContact(makeRequest(data, 'text/plain'), secrets, f.fetch)).status, 415);
  assert.equal((await handleContact(makeRequest('{'), secrets, f.fetch)).status, 400);
  assert.equal((await handleContact(makeRequest({ ...data, message: 'x'.repeat(5000) }), secrets, f.fetch)).status, 413);
  assert.equal(f.calls.length, 0);
});

test('rejects invalid fields and honeypot before external calls', async () => {
  const f = stub();
  for (const fields of [{ name: ' ' }, { mail: 'invalid' }, { message: '' }, { submissionId: 'bogus' }, { website: 'robot' }]) {
    assert.equal((await handleContact(makeRequest({ ...data, ...fields }), secrets, f.fetch)).status, 400);
  }
  assert.equal(f.calls.length, 0);
});

test('fails closed on missing server secrets and denied Turnstile', async () => {
  const f = stub(accepted, false);
  assert.equal((await handleContact(makeRequest(), { ...secrets, CONTACT_SHARED_SECRET: '' }, f.fetch)).status, 503);
  assert.equal(f.calls.length, 0);
  assert.equal((await handleContact(makeRequest(), secrets, f.fetch)).status, 403);
  assert.equal(f.calls.length, 1);
});

test('uses 202 when Sheets saved the lead but email processing was partial', async () => {
  const f = stub({ ...accepted, autoReplySent: false });
  const result = await handleContact(makeRequest(), secrets, f.fetch);
  assert.equal(result.status, 202);
  assert.deepEqual(await result.json(), { ok: true, submissionId: data.submissionId, notificationStatus: 'partial' });
});

test('upstream error, malformed result and mismatched submission id cannot show success', async () => {
  for (const upstream of [{ ok: false, stored: false }, { ...accepted, submissionId: 'other' }, { ok: true, stored: true }]) {
    const response = await handleContact(makeRequest(), secrets, stub(upstream).fetch);
    assert.equal(response.status, 502);
  }
  const response = await handleContact(makeRequest(), secrets, async (url) => {
    if (String(url).includes('siteverify')) return Response.json({ success: true });
    throw new Error('backend secret error');
  });
  assert.equal(response.status, 502);
  assert.equal(JSON.stringify(await response.json()).includes('backend secret error'), false);
});
