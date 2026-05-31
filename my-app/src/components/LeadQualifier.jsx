import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import '../styles/components/LeadQualifier.css';

const initialFormState = {
  name: '',
  email: '',
  companyType: 'pyme',
  problem: '',
  budget: '',
  urgency: '',
  expectedOutcome: '',
  website: '',
};

const buildCalUrl = ({ name, email, clientLeadId, utm, baseUrl }) => {
  const url = new URL(baseUrl || 'https://cal.com/elelier/diagnostico');
  const params = url.searchParams;

  if (name) params.set('name', name);
  if (email) params.set('email', email);
  if (clientLeadId) params.set('client_lead_id', clientLeadId);
  if (utm?.source) params.set('utm_source', utm.source);
  if (utm?.medium) params.set('utm_medium', utm.medium);
  if (utm?.campaign) params.set('utm_campaign', utm.campaign);

  return url.toString();
};

function LeadQualifier({ style }) {
  const { translate } = useLanguage();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialFormState);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [success, setSuccess] = useState(false);
  const [redirecting, setRedirecting] = useState(false);
  const resultRef = useRef(null);
  const calendarOpenedRef = useRef(false);

  useEffect(() => {
    if ((result || error) && resultRef.current) {
      resultRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [result, error]);

  const openCalendar = (leadData, baseUrl) => {
    if (calendarOpenedRef.current) return;
    calendarOpenedRef.current = true;

    const finalUrl = buildCalUrl({
      name: leadData?.name,
      email: leadData?.email,
      clientLeadId: leadData?.clientLeadId,
      utm: leadData?.utm,
      baseUrl,
    });

    window.open(finalUrl, '_blank', 'noopener,noreferrer');
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const trackLead = (data) => {
    if (typeof window === 'undefined') return;
    if (!window.dataLayer || typeof window.dataLayer.push !== 'function') return;

    window.dataLayer.push({
      event: 'lead_submit',
      lead_tier: data.tier,
      lead_score: data.score,
    });
  };

  const submitLead = async (payload) => {
    if (loading || redirecting) return null;

    calendarOpenedRef.current = false;
    setLoading(true);
    setError(false);
    setErrorMessage('');
    setSuccess(false);
    setResult(null);

    const searchParams = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
    const utm = {
      source: searchParams?.get('utm_source') || null,
      medium: searchParams?.get('utm_medium') || null,
      campaign: searchParams?.get('utm_campaign') || null,
      term: searchParams?.get('utm_term') || null,
      content: searchParams?.get('utm_content') || null,
    };

    const trackedPayload = {
      ...payload,
      pageUrl: typeof window !== 'undefined' ? window.location.href : null,
      referrer: typeof document !== 'undefined' ? document.referrer || null : null,
      utm,
      clientLeadId: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
      website: payload.website || '',
    };

    try {
      const response = await fetch('https://leads.elelier.com/api/lead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(trackedPayload),
      });

      if (!response.ok) {
        setErrorMessage(response.status === 429 ? translate('leadTooFast') : translate('leadError'));
        setError(true);
        return null;
      }

      const data = await response.json();
      setResult(data);
      setSuccess(true);

      if (data?.tier && typeof data?.score === 'number') {
        trackLead(data);
      }

      const hasHoneypot = Boolean(trackedPayload.website);
      if (!hasHoneypot) {
        const baseUrl = data?.nextStep?.url || 'https://cal.com/elelier/diagnostico';
        const calUrl = buildCalUrl({
          name: trackedPayload.name,
          email: trackedPayload.email,
          clientLeadId: trackedPayload.clientLeadId,
          utm: trackedPayload.utm,
          baseUrl,
        });

        sessionStorage.setItem('elelierLastDiagnosisCalUrl', calUrl);
        setRedirecting(true);

        if (data?.tier === 'HIGH') {
          openCalendar(trackedPayload, baseUrl);
        }

        navigate('/gracias-diagnostico');
      }

      return data;
    } catch (fetchError) {
      setErrorMessage(translate('leadError'));
      setError(true);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await submitLead(formData);
  };

  return (
    <section id="diagnostico" className="lead-qualifier" style={style}>
      <div className="lead-qualifier__inner">
        <div className="lead-qualifier__header">
          <h2>{translate('leadQualifierTitle')}</h2>
          <p>{translate('leadQualifierSubtitle')}</p>
        </div>

        <form className="lead-qualifier__form" onSubmit={handleSubmit} aria-busy={loading}>
          <div className="lead-qualifier__field" style={{ display: 'none' }} aria-hidden="true">
            <label htmlFor="lead-website">Website</label>
            <input
              id="lead-website"
              name="website"
              type="text"
              value={formData.website}
              onChange={handleChange}
              autoComplete="off"
              tabIndex={-1}
            />
          </div>

          <div className="lead-qualifier__field">
            <label htmlFor="lead-name">{translate('leadNameCompany')}</label>
            <input
              id="lead-name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              autoComplete="organization"
              required
            />
          </div>

          <div className="lead-qualifier__field">
            <label htmlFor="lead-email">{translate('leadEmail')}</label>
            <input
              id="lead-email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              autoComplete="email"
              required
            />
          </div>

          <fieldset className="lead-qualifier__fieldset">
            <legend>{translate('leadProblem')}</legend>
            <label><input type="radio" name="problem" value="validar-idea" checked={formData.problem === 'validar-idea'} onChange={handleChange} required /> {translate('leadValidateIdea')}</label>
            <label><input type="radio" name="problem" value="optimizar-proceso" checked={formData.problem === 'optimizar-proceso'} onChange={handleChange} /> {translate('leadOptimizeProcess')}</label>
            <label><input type="radio" name="problem" value="automatizar-ia" checked={formData.problem === 'automatizar-ia'} onChange={handleChange} /> {translate('leadAutomateAI')}</label>
            <label><input type="radio" name="problem" value="otro" checked={formData.problem === 'otro'} onChange={handleChange} /> {translate('leadOther')}</label>
          </fieldset>

          <fieldset className="lead-qualifier__fieldset">
            <legend>{translate('leadUrgency')}</legend>
            <label><input type="radio" name="urgency" value="30-dias" checked={formData.urgency === '30-dias'} onChange={handleChange} required /> {translate('leadNext30Days')}</label>
            <label><input type="radio" name="urgency" value="trimestre" checked={formData.urgency === 'trimestre'} onChange={handleChange} /> {translate('leadThisQuarter')}</label>
            <label><input type="radio" name="urgency" value="explorando" checked={formData.urgency === 'explorando'} onChange={handleChange} /> {translate('leadExploring')}</label>
          </fieldset>

          <div className="lead-qualifier__field">
            <label htmlFor="lead-budget">{translate('leadBudget')}</label>
            <select
              id="lead-budget"
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              required
            >
              <option value="" disabled>{translate('leadSelectOption')}</option>
              <option value="<1k">{translate('leadBudgetUnder1k')}</option>
              <option value="1-3k">$1k-$3k</option>
              <option value="3-10k">$3k-$10k</option>
              <option value="unknown">{translate('leadBudgetUnknown')}</option>
            </select>
          </div>

          <div className="lead-qualifier__field">
            <label htmlFor="lead-expected-outcome">{translate('leadExpectedOutcome')}</label>
            <select
              id="lead-expected-outcome"
              name="expectedOutcome"
              value={formData.expectedOutcome}
              onChange={handleChange}
              required
            >
              <option value="" disabled>{translate('leadSelectOption')}</option>
              <option value="prototipo">{translate('leadOutcomePrototype')}</option>
              <option value="automatizacion">{translate('leadOutcomeAutomation')}</option>
              <option value="metricas">{translate('leadOutcomeMetrics')}</option>
              <option value="claridad">{translate('leadOutcomeClarity')}</option>
            </select>
          </div>

          <button className="lead-qualifier__submit" type="submit" disabled={loading || redirecting}>
            {redirecting ? translate('leadRedirecting') : loading ? translate('leadAnalyzing') : translate('leadSubmitButton')}
          </button>
        </form>

        <div className="lead-qualifier__feedback" aria-live="polite" ref={resultRef}>
          {error && (
            <p className="lead-qualifier__error" role="alert">
              {errorMessage || translate('leadError')}
            </p>
          )}
          {success && result?.ok && (
            <p className="lead-qualifier__success">{translate('leadSuccessGeneric')}</p>
          )}
        </div>
      </div>
    </section>
  );
}

export default LeadQualifier;
