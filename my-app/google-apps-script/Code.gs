// elelier.com contact workflow. Deploy as an Apps Script web app that executes as its owner.
// All credentials, sheet ID and recipient live in Script Properties (never in this file).
var CONTACT_HEADERS_ = [
  'submission_id', 'created_at_utc', 'name', 'email', 'message',
  'internal_mail_status', 'autoreply_status', 'source'
];
var CONTACT_SHEET_ = 'contact_v2';
var CONTACT_BLUE_ = '#2e86c1';
var CONTACT_PHOTO_ = 'https://elelier.com/static/media/profile-picture-elier2.bb22001998419d8c5a87.png';

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
  return value.language === 'es' || value.language === 'en' || value.language === 'pt-br';
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

function contactMessageHtml_(value) {
  return htmlContact_(value).replace(/\r\n|\r|\n/g, '<br>');
}

// Table-based structure and inline styles intentionally support restrictive mail clients.
// All user-supplied content must be escaped before reaching this trusted HTML wrapper.
function contactEmailLayout_(content) {
  return '<!doctype html><html><head><meta charset="UTF-8"></head>' +
    '<body style="margin:0;padding:0;background-color:#f3f6f9;color:#283746;font-family:Arial,Helvetica,sans-serif;">' +
    '<table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" ' +
    'style="background-color:#f3f6f9;"><tr><td align="center" style="padding:24px 12px;">' +
    '<table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" ' +
    'style="max-width:600px;background-color:#ffffff;border:1px solid #dfe8ef;border-radius:12px;">' +
    '<tr><td style="background-color:' + CONTACT_BLUE_ + ';height:6px;font-size:1px;line-height:6px;">&nbsp;</td></tr>' +
    '<tr><td style="padding:30px 28px 20px;font-size:15px;line-height:1.65;">' + content + '</td></tr>' +
    '</table><p style="margin:20px 0 0;font-size:12px;color:#697c8b;line-height:1.5;">' +
    '&copy; ' + new Date().getUTCFullYear() + ' Elier Loya Mata</p></td></tr></table></body></html>';
}

function contactMessageCard_(label, message) {
  return '<table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" ' +
    'style="margin:22px 0;background-color:#f4f8fb;border-left:4px solid ' + CONTACT_BLUE_ + ';">' +
    '<tr><td style="padding:16px 18px;word-break:break-word;">' +
    '<p style="margin:0 0 10px;color:#566a79;font-size:12px;font-weight:bold;letter-spacing:.04em;">' +
    htmlContact_(label) + '</p><p style="margin:0;color:#273b49;font-size:15px;line-height:1.6;">' +
    contactMessageHtml_(message) + '</p></td></tr></table>';
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

function sendOwnerContact_(contact, to, sheetUrl) {
  var name = contact.name.replace(/[\r\n]+/g, ' ');
  var body = 'Nuevo mensaje recibido desde elelier.com\n\nNombre: ' + name +
    '\nCorreo: ' + contact.mail + '\nID: ' + contact.submissionId +
    '\nRecibido (UTC): ' + contact.createdAtUtc +
    '\n\nMensaje:\n' + contact.message + '\n\nVer en Sheets: ' + sheetUrl +
    '\nPortafolio: https://elelier.com/';
  var htmlBody = contactEmailLayout_(
    '<table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%"><tr>' +
    '<td width="82" valign="top" style="padding:0 16px 10px 0;">' +
    '<img src="' + CONTACT_PHOTO_ + '" width="72" height="72" alt="Foto de Elier" ' +
    'style="display:block;width:72px;height:72px;border-radius:50%;border:2px solid #e1edf5;"></td>' +
    '<td valign="middle"><p style="margin:0 0 4px;font-size:12px;font-weight:bold;letter-spacing:.04em;">' +
    '<a href="https://elelier.com/" style="color:' + CONTACT_BLUE_ + ';">ELELIER.COM</a></p>' +
    '<h1 style="margin:0 0 6px;color:' + CONTACT_BLUE_ +
    ';font-size:24px;line-height:1.25;">Nuevo contacto</h1>' +
    '<p style="margin:0;font-size:13px;color:#647789;">Recibiste una solicitud desde tu portafolio.</p>' +
    '</td></tr></table>' +
    '<p style="margin:22px 0 7px;"><strong>Nombre:</strong> ' + htmlContact_(name) + '</p>' +
    '<p style="margin:0 0 7px;"><strong>Correo:</strong> <a style="color:' + CONTACT_BLUE_ +
    ';" href="' + htmlContact_('mailto:' + contact.mail) + '">' + htmlContact_(contact.mail) + '</a></p>' +
    contactMessageCard_('MENSAJE DEL CONTACTO', contact.message) +
    '<p style="margin:0 0 7px;color:#65798b;font-size:12px;"><strong>Recibido (UTC):</strong> ' +
    htmlContact_(contact.createdAtUtc) + '</p>' +
    '<p style="margin:0 0 18px;color:#65798b;font-size:12px;"><strong>ID:</strong> ' +
    htmlContact_(contact.submissionId) + '</p>' +
    '<p style="margin:0;"><a href="' + htmlContact_(sheetUrl) +
    '" style="display:block;background-color:#188038;color:#ffffff;text-align:center;text-decoration:none;' +
    'font-size:16px;font-weight:bold;padding:16px 22px;border-radius:8px;">' +
    '<span aria-hidden="true" style="font-size:21px;vertical-align:middle;margin-right:8px;">&#9638;</span>' +
    'Abrir registro en Google Sheets</a></p>' +
    '<p style="margin:12px 0 0;"><a href="' + htmlContact_('mailto:' + contact.mail) +
    '" style="display:block;background-color:' + CONTACT_BLUE_ +
    ';color:#ffffff;text-align:center;text-decoration:none;font-size:14px;font-weight:bold;' +
    'padding:12px 18px;border-radius:8px;">Responder al contacto</a></p>' +
    '<p style="margin:18px 0 0;font-size:12px;text-align:center;">' +
    '<a href="https://elelier.com/" style="color:' + CONTACT_BLUE_ + ';">elelier.com</a></p>'
  );
  MailApp.sendEmail({
    to: to, subject: 'Nuevo contacto desde elelier.com — ' + name,
    body: body, htmlBody: htmlBody, replyTo: contact.mail, name: 'elelier.com'
  });
}

function sendAutoContact_(contact) {
  var english = contact.language === 'en';
  var portuguese = contact.language === 'pt-br';
  var greeting = portuguese ? 'Olá ' : english ? 'Hi ' : 'Hola ';
  var thanks = english
    ? 'Thanks for reaching out. I received your message and will review it soon.'
    : portuguese ? 'Obrigado por entrar em contato. Recebi sua mensagem e vou responder em breve.'
    : 'Gracias por escribirme. Recibí tu mensaje y revisaré el contexto para responderte.';
  var closing = portuguese ? 'Até breve,\nElier' : english ? 'Talk soon,\nElier' : 'Seguimos en contacto,\nElier';
  var messageLabel = portuguese ? 'SUA MENSAGEM' : english ? 'YOUR MESSAGE' : 'TU MENSAJE';
  var description = portuguese ? 'Conheça meu trabalho e projetos:' : english ? 'Explore my work and projects:' : 'Conoce mi trabajo y proyectos:';
  var body = greeting + contact.name + ':\n\n' + thanks + '\n\n' +
    messageLabel + ':\n' + contact.message + '\n\n' + closing +
    '\n\n' + description + ' https://elelier.com';
  var htmlBody = contactEmailLayout_(
    '<table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%"><tr>' +
    '<td width="82" valign="top" style="padding:0 16px 10px 0;">' +
    '<img src="' + CONTACT_PHOTO_ + '" width="72" height="72" alt="' +
    (english ? 'Photo of Elier' : 'Foto de Elier') + '" ' +
    'style="display:block;width:72px;height:72px;border-radius:50%;border:2px solid #e1edf5;"></td>' +
    '<td valign="middle"><h1 style="margin:0 0 6px;color:' + CONTACT_BLUE_ +
    ';font-size:24px;line-height:1.25;">' + htmlContact_(greeting + contact.name) +
    '</h1><p style="margin:0;font-size:13px;color:#647789;">Elier Loya Mata</p></td></tr></table>' +
    '<p style="margin:22px 0 10px;">' + htmlContact_(thanks) + '</p>' +
    contactMessageCard_(messageLabel, contact.message) +
    '<p style="margin:0 0 22px;">' + contactMessageHtml_(closing) + '</p>' +
    '<p style="margin:0 0 12px;color:#566a79;font-size:13px;">' + htmlContact_(description) + '</p>' +
    '<p style="margin:0 0 18px;"><a href="https://elelier.com" style="color:' + CONTACT_BLUE_ +
    ';font-weight:bold;">elelier.com</a></p>' +
    '<p style="margin:0;font-size:13px;line-height:1.9;">' +
    '<a href="https://linkedin.com/in/elier/" style="color:' + CONTACT_BLUE_ + ';">LinkedIn</a> &nbsp;·&nbsp; ' +
    '<a href="https://github.com/elelier" style="color:' + CONTACT_BLUE_ + ';">GitHub</a> &nbsp;·&nbsp; ' +
    '<a href="https://wa.me/528117801157" style="color:' + CONTACT_BLUE_ + ';">WhatsApp</a>' +
    '</p>'
  );
  MailApp.sendEmail({
    to: contact.mail,
    subject: portuguese ? 'Recebi sua mensagem — Elier' : english ? 'I received your message — Elier' : 'Recibí tu mensaje — Elier',
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
    var receivedAtUtc = new Date().toISOString();
    var newRow = {
      submission_id: contact.submissionId,
      created_at_utc: receivedAtUtc,
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
      contact.createdAtUtc = receivedAtUtc;
      var sheetUrl = 'https://docs.google.com/spreadsheets/d/' + encodeURIComponent(sheetId) +
        '/edit#gid=' + sheet.getSheetId();
      sendOwnerContact_(contact, notify, sheetUrl);
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
