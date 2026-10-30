const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const CODE = path.join(__dirname, 'Code.gs');
const HEADERS = ['submission_id', 'created_at_utc', 'name', 'email', 'message', 'internal_mail_status', 'autoreply_status', 'source'];
const ID = 'ba1b535e-df45-4098-9216-d4ea4e78d59c';
const CONTACT = { secret: 'my-secret', submissionId: ID, name: 'Ana Pérez', mail: 'ana@example.com', message: 'Hola, tengo una idea.', language: 'es', source: 'elelier.com' };

function harness({ storedRows = [], failMailTo = '', properties = {} } = {}) {
  const rows = storedRows.map((row) => [...row]);
  const sent = [];
  const config = {
    CONTACT_API_SHARED_SECRET: 'my-secret',
    CONTACT_SPREADSHEET_ID: 'doc-id',
    CONTACT_NOTIFY_EMAIL: 'loya.elier@gmail.com',
    ...properties
  };
  const sheet = {
    appendRow(row) { rows.push([...row]); },
    getDataRange() { return { getValues() { return rows.map((row) => [...row]); } }; },
    getSheetId() { return 27; },
    getRange(row, column) {
      return { setValue(value) { rows[row - 1][column - 1] = value; } };
    }
  };
  const spreadsheet = {
    getSheetByName(name) { assert.equal(name, 'contact_v2'); return rows.length ? sheet : null; },
    insertSheet(name) { assert.equal(name, 'contact_v2'); return sheet; }
  };
  const context = {
    SpreadsheetApp: { openById(value) { assert.equal(value, 'doc-id'); return spreadsheet; }, flush() {} },
    PropertiesService: { getScriptProperties() { return { getProperty(key) { return config[key]; } }; } },
    MailApp: { sendEmail(options) { if (options.to === failMailTo) throw new Error('quota error'); sent.push(options); } },
    LockService: { getScriptLock() { return { waitLock(ms) { assert.equal(ms, 10000); }, releaseLock() {} }; } },
    ContentService: {
      MimeType: { JSON: 'json' },
      createTextOutput(value) { return { getContent() { return value; }, setMimeType(type) { assert.equal(type, 'json'); return this; } }; }
    }
  };
  vm.runInNewContext(fs.readFileSync(CODE, 'utf8'), context, { filename: 'Code.gs' });
  const submit = (input = CONTACT) => JSON.parse(context.doPost({ postData: { contents: JSON.stringify(input) } }).getContent());
  return { rows, sent, submit };
}

test('creates contact_v2 with the right columns and sends two readable emails', () => {
  const app = harness();
  const result = app.submit(CONTACT);
  assert.equal(result.ok, true);
  assert.equal(result.stored, true);
  assert.equal(result.submissionId, ID);
  assert.equal(result.internalMailSent, true);
  assert.equal(result.autoReplySent, true);
  assert.deepEqual(app.rows[0], HEADERS);
  assert.equal(app.rows.length, 2);
  assert.equal(app.rows[1][HEADERS.indexOf('name')], 'Ana Pérez');
  assert.equal(app.rows[1][HEADERS.indexOf('message')], 'Hola, tengo una idea.');
  assert.equal(app.rows[1][HEADERS.indexOf('internal_mail_status')], 'sent');
  assert.equal(app.rows[1][HEADERS.indexOf('autoreply_status')], 'sent');
  assert.equal(app.sent.length, 2);
  assert.equal(app.sent[0].to, 'loya.elier@gmail.com');
  assert.equal(app.sent[0].replyTo, 'ana@example.com');
  assert.equal(app.sent[1].to, 'ana@example.com');
  assert.match(app.sent[1].subject, /Recibí tu mensaje/);
  assert.match(app.sent[1].body, /Ana Pérez/);
  assert.match(app.sent[0].htmlBody, /Hola, tengo una idea/);
});

test('deduplicates the same submission without resending email', () => {
  const app = harness();
  assert.equal(app.submit().duplicate, false);
  const again = app.submit();
  assert.equal(again.duplicate, true);
  assert.equal(app.rows.length, 2);
  assert.equal(app.sent.length, 2);
});

test('rejects unauthorized payloads before writing or sending', () => {
  const app = harness();
  assert.equal(app.submit({ ...CONTACT, secret: 'wrong' }).ok, false);
  assert.equal(app.submit({ ...CONTACT, mail: 'invalid' }).ok, false);
  assert.deepEqual(app.submit(null), { ok: false, stored: false, error: 'unauthorized_or_invalid' });
  assert.equal(app.rows.length, 0);
  assert.equal(app.sent.length, 0);
});

test('keeps a saved lead and reports partial status if one Gmail send fails', () => {
  const app = harness({ failMailTo: 'loya.elier@gmail.com' });
  const result = app.submit();
  assert.equal(result.ok, true);
  assert.equal(result.stored, true);
  assert.equal(result.internalMailSent, false);
  assert.equal(result.autoReplySent, true);
  assert.equal(app.rows[1][HEADERS.indexOf('internal_mail_status')], 'failed');
  assert.equal(app.rows[1][HEADERS.indexOf('autoreply_status')], 'sent');
  assert.equal(app.sent.length, 1);
});

test('escapes HTML in emails and neutralizes Sheet formula inputs', () => {
  const app = harness();
  app.submit({ ...CONTACT, message: ' =HYPERLINK("url") <script>alert(1)</script>' });
  assert.equal(app.rows[1][HEADERS.indexOf('message')].startsWith("'"), true);
  assert.doesNotMatch(app.sent[0].htmlBody, /<script>/);
  assert.match(app.sent[0].htmlBody, /&lt;script&gt;/);
});

test('uses names of columns instead of inherited positional offsets', () => {
  const differentOrder = ['email', 'message', 'name', 'source', 'submission_id', 'autoreply_status', 'created_at_utc', 'internal_mail_status'];
  const app = harness({ storedRows: [differentOrder] });
  app.submit();
  assert.equal(app.rows[1][differentOrder.indexOf('message')], 'Hola, tengo una idea.');
  assert.equal(app.rows[1][differentOrder.indexOf('internal_mail_status')], 'sent');
});

test('acknowledgement preserves the familiar visual identity and useful links without dead CTAs', () => {
  const app = harness();
  app.submit();
  const acknowledgement = app.sent[1];
  assert.match(acknowledgement.htmlBody, /#2e86c1/i);
  assert.match(acknowledgement.htmlBody, /profile-picture-elier2\.bb22001998419d8c5a87\.png/);
  assert.match(acknowledgement.htmlBody, /alt="[^"]*Elier[^"]*"/);
  assert.match(acknowledgement.htmlBody, /Ana Pérez/);
  assert.match(acknowledgement.htmlBody, /Hola, tengo una idea\./);
  assert.match(acknowledgement.htmlBody, /https:\/\/elelier\.com/);
  assert.match(acknowledgement.htmlBody, /https:\/\/linkedin\.com\/in\/elier\//);
  assert.match(acknowledgement.htmlBody, /https:\/\/github\.com\/elelier/);
  assert.match(acknowledgement.htmlBody, /https:\/\/wa\.me\/528117801157/);
  assert.doesNotMatch(acknowledgement.htmlBody, /calendly\.com|mail-banner-1\./i);
  assert.match(acknowledgement.body, /Hola, tengo una idea\./);
});

test('English acknowledgement uses English labels and recaps the original message', () => {
  const app = harness();
  app.submit({ ...CONTACT, name: 'Taylor', language: 'en', message: 'Could we collaborate?' });
  const email = app.sent[1];
  assert.match(email.subject, /I received your message/);
  assert.match(email.htmlBody, /Hi Taylor/);
  assert.match(email.htmlBody, /alt="Photo of Elier"/);
  assert.match(email.htmlBody, /Your message/i);
  assert.match(email.htmlBody, /Could we collaborate\?/);
  assert.doesNotMatch(email.htmlBody, /Gracias por escribirme|Tu mensaje/);
  assert.match(email.body, /Could we collaborate\?/);
});

test('Portuguese acknowledgement preserves contact and localizes the auto reply', () => {
  const app = harness();
  const response = app.submit({ ...CONTACT, language: 'pt-br' });
  assert.equal(response.ok, true);
  assert.equal(response.stored, true);
  assert.equal(app.sent.length, 2);
  assert.match(app.sent[1].subject, /Recebi sua mensagem/);
  assert.match(app.sent[1].body, /Obrigado por entrar em contato/);
  assert.match(app.sent[1].body, /SUA MENSAGEM/);
});

test('owner notification makes replies and the actual contact_v2 tab actionable', () => {
  const app = harness();
  app.submit();
  const email = app.sent[0];
  assert.match(email.htmlBody, /mailto:ana@example\.com/);
  assert.match(email.htmlBody, /https:\/\/docs\.google\.com\/spreadsheets\/d\/doc-id\/edit#gid=27/);
  assert.match(email.htmlBody, /ba1b535e-df45-4098-9216-d4ea4e78d59c/);
  assert.match(email.htmlBody, /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/);
  assert.match(email.htmlBody, /Hola, tengo una idea\./);
  assert.match(email.body, /https:\/\/docs\.google\.com\/spreadsheets\/d\/doc-id\/edit#gid=27/);
  assert.doesNotMatch(email.htmlBody, /mail-banner-1\.|Avanzando con Éxito/);
});

test('owner email uses the visitor visual identity and a prominent accessible Sheets action', () => {
  const app = harness();
  app.submit();
  const email = app.sent[0];
  const html = email.htmlBody;
  assert.match(html, /<img[^>]+profile-picture-elier2\.bb22001998419d8c5a87\.png[^>]+alt="Foto de Elier"/);
  assert.match(html, /<h1[^>]*color:#2e86c1[^>]*>Nuevo contacto<\/h1>/);
  assert.match(html, /href="https:\/\/elelier\.com\/"/);
  assert.match(html, /href="https:\/\/docs\.google\.com\/spreadsheets\/d\/doc-id\/edit#gid=27"[^>]*background-color:#188038/);
  assert.match(html, /&#9638;[^<]*<\/span>/);
  assert.match(html, /font-size:16px;[^\"]*padding:16px 22px/);
  assert.ok(html.indexOf('Abrir registro en Google Sheets') < html.indexOf('Responder al contacto'));
  assert.match(html, /href="mailto:ana@example\.com"[^>]*background-color:#2e86c1/);
  assert.match(email.body, /https:\/\/elelier\.com\//);
});

test('both formatted emails escape malicious HTML and preserve message line breaks', () => {
  const app = harness();
  app.submit({ ...CONTACT, name: 'Ana <X>', message: 'Primera línea\n<script>alert("x")</script> & gracias' });
  for (const email of app.sent) {
    assert.doesNotMatch(email.htmlBody, /<script>|<X>/);
    assert.match(email.htmlBody, /Ana &lt;X&gt;/);
    assert.match(email.htmlBody, /&lt;script&gt;alert\(&quot;x&quot;\)&lt;\/script&gt; &amp; gracias/);
    assert.match(email.htmlBody, /Primera línea<br\s*\/?>(?:\s*)?&lt;script&gt;/);
  }
});
