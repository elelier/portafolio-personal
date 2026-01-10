import React, { useState } from 'react';
import '../styles/components/LeadQualifier.css';

const initialFormState = {
  name: '',
  email: '',
  companyType: '',
  problem: '',
  budget: '',
  urgency: '',
};

function LeadQualifier() {
  const [formData, setFormData] = useState(initialFormState);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (loading) return;

    setLoading(true);
    setError(false);
    setResult(null);

    try {
      const response = await fetch('https://leads.elelier.com/api/lead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        setError(true);
        return;
      }

      const data = await response.json();
      setResult(data);
      setFormData(initialFormState);
    } catch (fetchError) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="diagnostico" className="lead-qualifier">
      <div className="lead-qualifier__inner">
        <div className="lead-qualifier__header">
          <h2>Diagnóstico Express</h2>
          <p>Cuéntame tu reto y te digo el siguiente paso.</p>
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
                Selecciona una opción
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
                Selecciona una opción
              </option>
              <option value="operacion">Operación</option>
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
                Selecciona una opción
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
                Selecciona una opción
              </option>
              <option value="2w">2w</option>
              <option value="1m">1m</option>
              <option value="3m">3m</option>
            </select>
          </div>

          <button className="lead-qualifier__submit" type="submit" disabled={loading}>
            {loading ? 'Analizando...' : 'Enviar diagnóstico'}
          </button>
        </form>

        <div className="lead-qualifier__feedback" aria-live="polite">
          {result?.ok && (
            <p className="lead-qualifier__success">Gracias. Te mostraremos el siguiente paso.</p>
          )}
          {error && (
            <p className="lead-qualifier__error" role="alert">
              Ocurrió un error. Intenta más tarde.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

export default LeadQualifier;
