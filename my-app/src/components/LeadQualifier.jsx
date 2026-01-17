import React, { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import '../styles/components/LeadQualifier.css';

const initialFormState = {
  name: '',
  email: '',
  companyType: '',
  problem: '',
  budget: '',
  urgency: '',
  website: '',
};

const defaultFollowupQuestions = [
  {
    id: 'primaryMetric',
    labelKey: 'leadFollowupMetric',
    type: 'select',
    optionKeys: ['leadFollowupConversion', 'leadFollowupCosts', 'leadFollowupLeadTime', 'leadFollowupRetention', 'leadFollowupOther'],
  },
  {
    id: 'dataAvailable',
    labelKey: 'leadFollowupData',
    type: 'select',
    optionKeys: ['leadFollowupYes', 'leadFollowupNo'],
  },
  {
    id: 'decisionMaker',
    labelKey: 'leadFollowupDecision',
    type: 'select',
    optionKeys: ['leadFollowupMe', 'leadFollowupPartner', 'leadFollowupBoard', 'leadFollowupOther'],
  },
];

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

function LeadQualifier() {
  const { translate } = useLanguage();
  const [formData, setFormData] = useState(initialFormState);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [success, setSuccess] = useState(false);
  const [followupAnswers, setFollowupAnswers] = useState({});
  const [redirecting, setRedirecting] = useState(false);
  const resultRef = useRef(null);
  const calendarOpenedRef = useRef(false);

  const followupQuestions =
    result?.tier === 'MID' && Array.isArray(result?.nextStep?.questions) && result.nextStep.questions.length > 0
      ? result.nextStep.questions
      : result?.tier === 'MID'
        ? defaultFollowupQuestions
        : [];

  useEffect(() => {
    if ((result || error) && resultRef.current) {
      resultRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [result, error]);

  useEffect(() => {
    if (result?.tier !== 'MID') {
      setFollowupAnswers({});
    }
  }, [result]);

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

    console.debug('[Cal.com] Opening with params:', finalUrl);
    window.open(finalUrl, '_blank', 'noopener,noreferrer');
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFollowupChange = (event) => {
    const { name, value } = event.target;
    setFollowupAnswers((prev) => ({ ...prev, [name]: value }));
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
    if (loading) return null;

    if (redirecting) return null;

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
        if (response.status === 429) {
          setErrorMessage(translate('leadTooFast'));
        } else {
          setErrorMessage(translate('leadError'));
        }
        setError(true);
        return null;
      }

      const data = await response.json();
      setResult(data);
      setSuccess(true);
      if (data?.tier && typeof data?.score === 'number') {
        trackLead(data);
      }

      const isHigh = data?.ok && data?.tier === 'HIGH';
      const hasHoneypot = Boolean(trackedPayload.website);

      if (isHigh && !hasHoneypot) {
        if (!trackedPayload.clientLeadId) {
          setErrorMessage('No pudimos generar tu ID, intenta de nuevo.');
          setError(true);
          return data;
        }

        const baseUrl = data?.nextStep?.url || 'https://cal.com/elelier/diagnostico';
        calendarOpenedRef.current = false;
        setRedirecting(true);
        openCalendar(trackedPayload, baseUrl);
        setTimeout(() => setRedirecting(false), 4500);
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

  const handleFollowupSubmit = async (event) => {
    event.preventDefault();

    const answers = followupQuestions.map((question) => ({
      id: question.id,
      label: question.label,
      value: followupAnswers[question.id] || '',
    }));

    await submitLead({
      ...formData,
      followupAnswers: answers,
    });
  };

  const isFollowupReady =
    followupQuestions.length > 0 &&
    followupQuestions.every((question) => Boolean(followupAnswers[question.id]));

  return (
    <section id="diagnostico" className="lead-qualifier">
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
            <label htmlFor="lead-name">{translate('leadName')}</label>
            <input
              id="lead-name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              autoComplete="name"
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

          <div className="lead-qualifier__field">
            <label htmlFor="lead-company-type">{translate('leadCompanyType')}</label>
            <select
              id="lead-company-type"
              name="companyType"
              value={formData.companyType}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                {translate('leadSelectOption')}
              </option>
              <option value="freelancer">{translate('leadFreelancer')}</option>
              <option value="startup">{translate('leadStartup')}</option>
              <option value="pyme">{translate('leadPyme')}</option>
              <option value="enterprise">{translate('leadEnterprise')}</option>
            </select>
          </div>

          <div className="lead-qualifier__field">
            <label htmlFor="lead-problem">{translate('leadProblem')}</label>
            <select
              id="lead-problem"
              name="problem"
              value={formData.problem}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                {translate('leadSelectOption')}</option>
              <option value="operacion">Operacion</option>
              <option value="producto">Producto</option>
              <option value="ia">IA</option>
              <option value="web">Web</option>
            </select>
          </div>

          <div className="lead-qualifier__field">
            <label htmlFor="lead-budget">{translate('leadBudget')}</label>
            <select
              id="lead-budget"
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                {translate('leadSelectOption')}
              </option>
              <option value="<3k">{'<3k'}</option>
              <option value="3-5k">3-5k</option>
              <option value="5-10k">5-10k</option>
              <option value="10k+">10k+</option>
            </select>
          </div>

          <div className="lead-qualifier__field">
            <label htmlFor="lead-urgency">{translate('leadUrgency')}</label>
            <select
              id="lead-urgency"
              name="urgency"
              value={formData.urgency}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                {translate('leadSelectOption')}
              </option>
              <option value="2w">2w</option>
              <option value="1m">1m</option>
              <option value="3m">3m</option>
            </select>
          </div>

          <button className="lead-qualifier__submit" type="submit" disabled={loading || redirecting}>
            {redirecting ? translate('leadCalendarOpened') : loading ? translate('leadAnalyzing') : translate('leadSubmitButton')}
          </button>
        </form>

        <div className="lead-qualifier__feedback" aria-live="polite" ref={resultRef}>
          {error && (
            <p className="lead-qualifier__error" role="alert">
              {errorMessage || translate('leadError')}
            </p>
          )}
          {result?.ok && result.tier === 'HIGH' && (
            <div className="lead-qualifier__next-step">
              <h3>{translate('leadHighTitle')}</h3>
              <p>{translate('leadHighDescription')}</p>
              {result?.nextStep?.url && (
                <a
                  className="lead-qualifier__action"
                  href={result.nextStep.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  {translate('leadHighAction')}
                </a>
              )}
            </div>
          )}
          {result?.ok && result.tier === 'MID' && (
            <div className="lead-qualifier__next-step">
              <h3>{translate('leadMidTitle')}</h3>
              <p>{translate('leadMidDescription')}</p>
              <form className="lead-qualifier__followup-form" onSubmit={handleFollowupSubmit}>
                {followupQuestions.map((question) => (
                  <div className="lead-qualifier__field" key={question.id}>
                    <label htmlFor={`followup-${question.id}`}>
                      {question.labelKey ? translate(question.labelKey) : question.label}
                    </label>
                    {Array.isArray(question.optionKeys || question.options) ? (
                      <select
                        id={`followup-${question.id}`}
                        name={question.id}
                        value={followupAnswers[question.id] || ''}
                        onChange={handleFollowupChange}
                        required
                      >
                        <option value="" disabled>
                          {translate('leadSelectOption')}
                        </option>
                        {(question.optionKeys || question.options).map((option) => (
                          <option key={option} value={translate(option) || option}>
                            {translate(option) || option}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input
                        id={`followup-${question.id}`}
                        name={question.id}
                        type="text"
                        value={followupAnswers[question.id] || ''}
                        onChange={handleFollowupChange}
                        required
                      />
                    )}
                  </div>
                ))}
                <button
                  className="lead-qualifier__submit"
                  type="submit"
                  disabled={loading || redirecting || !isFollowupReady}
                >
                  {loading || redirecting ? translate('leadMidProcessing') : translate('leadMidSubmitButton')}
                </button>
              </form>
            </div>
          )}
          {result?.ok && result.tier === 'LOW' && (
            <div className="lead-qualifier__next-step">
              <h3>{translate('leadLowTitle')}</h3>
              <p>{translate('leadLowDescription')}</p>
              {result?.nextStep?.url && (
                <a
                  className="lead-qualifier__action"
                  href={result.nextStep.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  {translate('leadLowAction')}
                </a>
              )}
            </div>
          )}
          {success && result?.ok && !result?.tier && (
            <p className="lead-qualifier__success">{translate('leadSuccessGeneric')}</p>
          )}
        </div>
      </div>
    </section>
  );
}

export default LeadQualifier;
