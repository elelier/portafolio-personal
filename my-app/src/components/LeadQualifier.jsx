import React, { useEffect, useRef, useState } from 'react';
import '../styles/components/LeadQualifier.css';

const initialFormState = {
  name: '',
  email: '',
  companyType: '',
  problem: '',
  budget: '',
  urgency: '',
};

const defaultFollowupQuestions = [
  {
    id: 'primaryMetric',
    label: 'Cual es tu principal metrica a mover?',
    type: 'select',
    options: ['conversion', 'costos', 'lead time', 'retencion', 'otro'],
  },
  {
    id: 'dataAvailable',
    label: 'Tienes datos disponibles?',
    type: 'select',
    options: ['si', 'no'],
  },
  {
    id: 'decisionMaker',
    label: 'Quien decide?',
    type: 'select',
    options: ['yo', 'partner', 'board', 'otro'],
  },
];

function LeadQualifier() {
  const [formData, setFormData] = useState(initialFormState);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [followupAnswers, setFollowupAnswers] = useState({});
  const resultRef = useRef(null);

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

    setLoading(true);
    setError(false);
    setSuccess(false);
    setResult(null);

    try {
      const response = await fetch('https://leads.elelier.com/api/lead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        setError(true);
        return null;
      }

      const data = await response.json();
      setResult(data);
      setSuccess(true);
      if (data?.tier && typeof data?.score === 'number') {
        trackLead(data);
      }
      return data;
    } catch (fetchError) {
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
          <h2>Diagnostico Express</h2>
          <p>Cuentame tu reto y te digo el siguiente paso.</p>
        </div>

        <form className="lead-qualifier__form" onSubmit={handleSubmit} aria-busy={loading}>
          <div className="lead-qualifier__field">
            <label htmlFor="lead-name">Nombre</label>
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
            <label htmlFor="lead-email">Email</label>
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
            <label htmlFor="lead-company-type">Tipo de empresa</label>
            <select
              id="lead-company-type"
              name="companyType"
              value={formData.companyType}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                Selecciona una opcion
              </option>
              <option value="freelancer">Freelancer</option>
              <option value="startup">Startup</option>
              <option value="pyme">Pyme</option>
              <option value="enterprise">Enterprise</option>
            </select>
          </div>

          <div className="lead-qualifier__field">
            <label htmlFor="lead-problem">Tipo de reto</label>
            <select
              id="lead-problem"
              name="problem"
              value={formData.problem}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                Selecciona una opcion
              </option>
              <option value="operacion">Operacion</option>
              <option value="producto">Producto</option>
              <option value="ia">IA</option>
              <option value="web">Web</option>
            </select>
          </div>

          <div className="lead-qualifier__field">
            <label htmlFor="lead-budget">Presupuesto</label>
            <select
              id="lead-budget"
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                Selecciona una opcion
              </option>
              <option value="<3k">{'<3k'}</option>
              <option value="3-5k">3-5k</option>
              <option value="5-10k">5-10k</option>
              <option value="10k+">10k+</option>
            </select>
          </div>

          <div className="lead-qualifier__field">
            <label htmlFor="lead-urgency">Urgencia</label>
            <select
              id="lead-urgency"
              name="urgency"
              value={formData.urgency}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                Selecciona una opcion
              </option>
              <option value="2w">2w</option>
              <option value="1m">1m</option>
              <option value="3m">3m</option>
            </select>
          </div>

          <button className="lead-qualifier__submit" type="submit" disabled={loading}>
            {loading ? 'Analizando...' : 'Enviar diagnostico'}
          </button>
        </form>

        <div className="lead-qualifier__feedback" aria-live="polite" ref={resultRef}>
          {error && (
            <p className="lead-qualifier__error" role="alert">
              Ocurrio un error. Intenta mas tarde.
            </p>
          )}
          {result?.ok && result.tier === 'HIGH' && (
            <div className="lead-qualifier__next-step">
              <h3>Listo para llamada</h3>
              <p>Agenda una llamada para revisar el siguiente paso.</p>
              {result?.nextStep?.url && (
                <a
                  className="lead-qualifier__action"
                  href={result.nextStep.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  Agendar llamada
                </a>
              )}
            </div>
          )}
          {result?.ok && result.tier === 'MID' && (
            <div className="lead-qualifier__next-step">
              <h3>Un par de detalles mas</h3>
              <p>Responde estas preguntas para afinar el diagnostico.</p>
              <form className="lead-qualifier__followup-form" onSubmit={handleFollowupSubmit}>
                {followupQuestions.map((question) => (
                  <div className="lead-qualifier__field" key={question.id}>
                    <label htmlFor={`followup-${question.id}`}>{question.label}</label>
                    {Array.isArray(question.options) ? (
                      <select
                        id={`followup-${question.id}`}
                        name={question.id}
                        value={followupAnswers[question.id] || ''}
                        onChange={handleFollowupChange}
                        required
                      >
                        <option value="" disabled>
                          Selecciona una opcion
                        </option>
                        {question.options.map((option) => (
                          <option key={option} value={option}>
                            {option}
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
                  disabled={loading || !isFollowupReady}
                >
                  {loading ? 'Analizando...' : 'Enviar detalles'}
                </button>
              </form>
            </div>
          )}
          {result?.ok && result.tier === 'LOW' && (
            <div className="lead-qualifier__next-step">
              <h3>Recurso recomendado</h3>
              <p>Te dejamos un recurso para avanzar con claridad.</p>
              {result?.nextStep?.url && (
                <a
                  className="lead-qualifier__action"
                  href={result.nextStep.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  Ver recurso
                </a>
              )}
            </div>
          )}
          {success && result?.ok && !result?.tier && (
            <p className="lead-qualifier__success">Gracias. Te mostraremos el siguiente paso.</p>
          )}
        </div>
      </div>
    </section>
  );
}

export default LeadQualifier;
