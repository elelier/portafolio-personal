import { trackDirectContactClick, trackStoredContactLead } from './contactAnalytics';

describe('contact analytics privacy and safety', () => {
  const originalGtag = window.gtag;

  afterEach(() => {
    if (originalGtag === undefined) delete window.gtag;
    else window.gtag = originalGtag;
    jest.restoreAllMocks();
  });

  it('sends only allowlisted non-identifying parameters for a stored contact', () => {
    window.gtag = jest.fn();
    expect(trackStoredContactLead('sent', 'es')).toBe(true);
    expect(window.gtag).toHaveBeenCalledWith('event', 'generate_lead', {
      send_to: 'G-J0EFBPH9P1',
      method: 'form',
      form_id: 'contact_main',
      language: 'es',
      notification_status: 'sent'
    });
  });

  it('does not send conversions for unverified notification states', () => {
    window.gtag = jest.fn();
    expect(trackStoredContactLead('failed', 'es')).toBe(false);
    expect(trackStoredContactLead(null, 'en')).toBe(false);
    expect(window.gtag).not.toHaveBeenCalled();
  });

  it('accepts only supported click methods and placements', () => {
    window.gtag = jest.fn();
    expect(trackDirectContactClick('whatsapp', 'contact_fallback', 'pt-br')).toBe(true);
    expect(trackDirectContactClick('phone', 'contact_primary', 'es')).toBe(false);
    expect(trackDirectContactClick('email', 'other', 'es')).toBe(false);
    expect(window.gtag).toHaveBeenCalledTimes(1);
  });

  it('uses a safe language fallback and never forwards arbitrary strings', () => {
    window.gtag = jest.fn();
    trackDirectContactClick('email', 'contact_secondary', 'name@example.com');
    expect(window.gtag.mock.calls[0][2].language).toBe('unknown');
    expect(JSON.stringify(window.gtag.mock.calls)).not.toContain('name@example.com');
  });

  it('never disrupts navigation or successful contact when analytics is missing or throws', () => {
    delete window.gtag;
    expect(trackStoredContactLead('sent', 'es')).toBe(false);
    window.gtag = jest.fn(() => { throw new Error('blocked'); });
    expect(trackDirectContactClick('email', 'contact_secondary', 'es')).toBe(false);
    expect(trackStoredContactLead('partial', 'en')).toBe(false);
  });
});
