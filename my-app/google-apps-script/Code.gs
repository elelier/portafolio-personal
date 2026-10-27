// elelier.com contact workflow. Deploy as an Apps Script web app that executes as its owner.
// All credentials, sheet ID and recipient live in Script Properties (never in this file).
var CONTACT_HEADERS_ = [
  'submission_id', 'created_at_utc', 'name', 'email', 'message',
  'internal_mail_status', 'autoreply_status', 'source'
];
var CONTACT_SHEET_ = 'contact_v2';

function jsonContact_(value) {
  return ContentService.createTextOutput(JSON.stringify(value))
    .setMimeType(ContentService.MimeType.JSON);
}

function validContact_(value) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return false;
  if (typeof value.name !== 'string' || typeof value.mail !== 'string' || typeof value.message !== 'string') return false;
  if (!value.name.trim() || value.name.length > 255 || !value.message.trim() || value.message.length > 500) return false;
  if (value.mail.length > 255 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.mail.trim())) return false;
  if (typeof value.submissionId !== 'string' || !/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value.submissionId)) return false;
  return value.language === 'es' || value.language === 'en';
}

function safeSheetText_(value) {
  var text = String(value);
  return /^\s*[=+\-@]/.test(text) ? "'" + text : text;
}

function htmlContact_(value) {
  return String(value).replace(/[&<>"']/g, function (character) {
    return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[character];
  });
}

function makeContactSheet_(spreadsheet) {
  var sheet = spreadsheet.getSheetByName(CONTACT_SHEET_);
  if (!sheet) {
    sheet = spreadsheet.insertSheet(CONTACT_SHEET_);
    sheet.appendRow(CONTACT_HEADERS_);
  }
  var headers = sheet.getDataRange().getValues()[0];
  if (!headers || headers.length !== CONTACT_HEADERS_.length ||
      CONTACT_HEADERS_.some(function (name) { return headers.indexOf(name) < 0; })) {
    throw new Error('contact_sheet_schema_mismatch');
  }
  return { sheet: sheet, headers: headers };
}

function sendOwnerContact_(contact, to) {
  var name = contact.name.replace(/[\r\n]+/g, ' ');
  var body = 'Nuevo mensaje recibido desde elelier.com\n\nNombre: ' + name +
    '\nCorreo: ' + contact.mail + '\nID: ' + contact.submissionId +
    '\n\nMensaje:\n' + contact.message;
  var htmlBody = '<div style="font-family:Arial,sans-serif;line-height:1.6">' +
    '<h2>Nuevo contacto en elelier.com</h2><p><strong>Nombre:</strong> ' + htmlContact_(name) +
    '</p><p><strong>Correo:</strong> ' + htmlContact_(contact.mail) +
    '</p><p><strong>ID:</strong> ' + htmlContact_(contact.submissionId) +
    '</p><p><strong>Mensaje:</strong></p><pre style="white-space:pre-wrap;font-family:inherit">' +
    htmlContact_(contact.message) + '</pre></div>';
  MailApp.sendEmail({
    to: to, subject: 'Nuevo contacto desde elelier.com — ' + name,
    body: body, htmlBody: htmlBody, replyTo: contact.mail, name: 'elelier.com'
  });
}

function sendAutoContact_(contact) {
  var english = contact.language === 'en';
  var greeting = english ? 'Hi ' : 'Hola ';
  var thanks = english
    ? 'Thanks for reaching out. I received your message and will review it soon.'
    : 'Gracias por escribirme. Recibí tu mensaje y revisaré el contexto para responderte.';
  var closing = english ? 'Talk soon,\nElier' : 'Seguimos en contacto,\nElier';
  var body = greeting + contact.name + ':\n\n' + thanks + '\n\n' + closing;
  var htmlBody = '<div style="font-family:Arial,sans-serif;line-height:1.6">' +
    '<p>' + htmlContact_(greeting + contact.name) + ':</p><p>' +
    htmlContact_(thanks) + '</p><p>' + htmlContact_(closing).replace(/\n/g, '<br>') +
    '</p></div>';
  MailApp.sendEmail({
    to: contact.mail,
    subject: english ? 'I received your message — Elier' : 'Recibí tu mensaje — Elier',
    body: body, htmlBody: htmlBody, replyTo: 'hola@elelier.com', name: 'Elier'
  });
}

function doPost(e) {
  var contact;
  try {
    contact = JSON.parse(e.postData.contents);
  } catch (error) {
    return jsonContact_({ ok: false, stored: false, error: 'invalid_request' });
  }

  var properties = PropertiesService.getScriptProperties();
  var sharedSecret = properties.getProperty('CONTACT_API_SHARED_SECRET');
  var sheetId = properties.getProperty('CONTACT_SPREADSHEET_ID');
  var notify = properties.getProperty('CONTACT_NOTIFY_EMAIL');
  if (!sharedSecret || !sheetId || !notify || !validContact_(contact) ||
      typeof contact.secret !== 'string' || contact.secret !== sharedSecret) {
    return jsonContact_({ ok: false, stored: false, error: 'unauthorized_or_invalid' });
  }

  var lock = LockService.getScriptLock();
  try {
    lock.waitLock(10000);
    var setup = makeContactSheet_(SpreadsheetApp.openById(sheetId));
    var sheet = setup.sheet;
    var headers = setup.headers;
    var rows = sheet.getDataRange().getValues();
    for (var i = 1; i < rows.length; i++) {
      if (rows[i][headers.indexOf('submission_id')] === contact.submissionId) {
        return jsonContact_({
          ok: true, stored: true, duplicate: true, submissionId: contact.submissionId,
          internalMailSent: rows[i][headers.indexOf('internal_mail_status')] === 'sent',
          autoReplySent: rows[i][headers.indexOf('autoreply_status')] === 'sent'
        });
      }
    }

    contact.name = contact.name.trim();
    contact.mail = contact.mail.trim();
    contact.message = contact.message.trim();
    var newRow = {
      submission_id: contact.submissionId,
      created_at_utc: new Date().toISOString(),
      name: safeSheetText_(contact.name),
      email: safeSheetText_(contact.mail),
      message: safeSheetText_(contact.message),
      internal_mail_status: 'pending',
      autoreply_status: 'pending',
      source: 'elelier.com'
    };
    var rowNumber = rows.length + 1;
    sheet.appendRow(headers.map(function (header) { return newRow[header]; }));
    SpreadsheetApp.flush();

    var internalMailSent = false;
    var autoReplySent = false;
    try {
      sendOwnerContact_(contact, notify);
      internalMailSent = true;
    } catch (error) {
      // Persist the failure: the contact is still saved and can be recovered manually.
    }
    sheet.getRange(rowNumber, headers.indexOf('internal_mail_status') + 1)
      .setValue(internalMailSent ? 'sent' : 'failed');
    try {
      sendAutoContact_(contact);
      autoReplySent = true;
    } catch (error) {
      // No automatic retries: avoid duplicate messages with ambiguous Gmail outcomes.
    }
    sheet.getRange(rowNumber, headers.indexOf('autoreply_status') + 1)
      .setValue(autoReplySent ? 'sent' : 'failed');
    SpreadsheetApp.flush();
    return jsonContact_({
      ok: true, stored: true, duplicate: false, submissionId: contact.submissionId,
      internalMailSent: internalMailSent, autoReplySent: autoReplySent
    });
  } catch (error) {
    return jsonContact_({ ok: false, stored: false, error: 'storage_unavailable' });
  } finally {
    try { lock.releaseLock(); } catch (error) {}
  }
}
