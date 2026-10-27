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
