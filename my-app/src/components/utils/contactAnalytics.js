// Contact events contain only fixed, non-identifying values. The contact
// payload and submissionId must never be forwarded to Google Analytics.
const MEASUREMENT_ID = 'G-J0EFBPH9P1';
const LANGUAGES = ['es', 'en', 'pt-br'];

function safeLanguage(language) {
  return LANGUAGES.includes(language) ? language : 'unknown';
}

function emitContactEvent(name, params) {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return false;

  try {
    window.gtag('event', name, { send_to: MEASUREMENT_ID, ...params });
    return true;
  } catch (_error) {
    // Analytics failures must never affect a successful contact submission.
    return false;
  }
}

export function trackStoredContactLead(notificationStatus, language) {
  if (notificationStatus !== 'sent' && notificationStatus !== 'partial') return false;

  return emitContactEvent('generate_lead', {
    method: 'form',
    form_id: 'contact_main',
    language: safeLanguage(language),
    notification_status: notificationStatus
  });
}

export function trackDirectContactClick(method, placement, language) {
  if (!['whatsapp', 'email'].includes(method)) return false;
  if (!['contact_primary', 'contact_secondary', 'contact_fallback'].includes(placement)) return false;

  return emitContactEvent('contact_click', {
    method,
    placement,
    language: safeLanguage(language)
  });
}
