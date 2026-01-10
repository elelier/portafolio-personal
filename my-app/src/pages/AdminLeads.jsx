import React, { useMemo, useState } from 'react';
import '../styles/AdminLeads.css';

const STORAGE_KEY = 'ADMIN_TOKEN';
const DEFAULT_TIER = 'ALL';

const formatDate = (value) => {
  if (!value) {
    return 'Sin fecha';
  }

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return value;
  }

  return parsed.toLocaleString('es-PE', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  });
};

const copyText = async (text) => {
  if (!text) {
    return;
  }

  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.setAttribute('readonly', '');
  textarea.style.position = 'absolute';
  textarea.style.left = '-9999px';
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  document.body.removeChild(textarea);
};

const normalizeLeads = (payload) => {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (payload && Array.isArray(payload.leads)) {
    return payload.leads;
  }

  return [];
};

const AdminLeads = () => {
  const [token, setToken] = useState(() => sessionStorage.getItem(STORAGE_KEY) || '');
  const [tierFilter, setTierFilter] = useState(DEFAULT_TIER);
  const [companyTypeFilter, setCompanyTypeFilter] = useState('ALL');
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copiedEmail, setCopiedEmail] = useState('');

  const companyTypes = useMemo(() => {
    const types = new Set();
    leads.forEach((lead) => {
      if (lead.company_type) {
        types.add(lead.company_type);
      }
    });

    return ['ALL', ...Array.from(types)];
  }, [leads]);

  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      const tierMatches =
        tierFilter === DEFAULT_TIER ||
        String(lead.tier || '').toUpperCase() === tierFilter;
      const companyMatches =
        companyTypeFilter === 'ALL' || lead.company_type === companyTypeFilter;

      return tierMatches && companyMatches;
    });
  }, [companyTypeFilter, leads, tierFilter]);

  const handleTokenChange = (event) => {
    const nextToken = event.target.value;
    setToken(nextToken);
    sessionStorage.setItem(STORAGE_KEY, nextToken);
  };

  const handleCopyEmail = async (email) => {
    try {
      await copyText(email);
      setCopiedEmail(email);
      setTimeout(() => setCopiedEmail(''), 2000);
    } catch (copyError) {
      setError('No se pudo copiar el email.');
    }
  };

  const fetchLeads = async () => {
    if (!token) {
      setError('Ingresa un token válido para cargar los leads.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch(
        `https://leads.elelier.com/api/admin/leads?token=${encodeURIComponent(
          token
        )}&limit=50`
      );

      if (response.status === 401) {
        setError('Token inválido. Verifica el ADMIN_TOKEN.');
        setLeads([]);
        return;
      }

      if (response.status >= 500) {
        setError('El servidor tuvo un problema. Intenta nuevamente.');
        setLeads([]);
        return;
      }

      if (!response.ok) {
        setError('No se pudieron cargar los leads.');
        setLeads([]);
        return;
      }

      const payload = await response.json();
      setLeads(normalizeLeads(payload));
    } catch (fetchError) {
      setError('No se pudo conectar con el servidor.');
      setLeads([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="admin-leads">
      <header className="admin-leads__header">
        <h1>Inbox de leads</h1>
        <p>Panel interno para revisar los últimos leads registrados.</p>
      </header>

      <section className="admin-leads__controls">
        <label className="admin-leads__field">
          <span>ADMIN_TOKEN</span>
          <input
            type="password"
            value={token}
            onChange={handleTokenChange}
            placeholder="Pega tu token"
          />
        </label>

        <button
          type="button"
          className="admin-leads__button"
          onClick={fetchLeads}
          disabled={loading}
        >
          {loading ? 'Cargando...' : 'Cargar leads'}
        </button>
      </section>

      <section className="admin-leads__filters">
        <label>
          Tier
          <select
            value={tierFilter}
            onChange={(event) => setTierFilter(event.target.value)}
          >
            <option value="ALL">ALL</option>
            <option value="HIGH">HIGH</option>
            <option value="MID">MID</option>
            <option value="LOW">LOW</option>
          </select>
        </label>
        <label>
          Company type
          <select
            value={companyTypeFilter}
            onChange={(event) => setCompanyTypeFilter(event.target.value)}
          >
            {companyTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </label>
      </section>

      {error && <p className="admin-leads__error">{error}</p>}

      <section className="admin-leads__list">
        {filteredLeads.length === 0 && !loading ? (
          <p className="admin-leads__empty">No hay leads para mostrar.</p>
        ) : (
          filteredLeads.map((lead, index) => (
            <article className="admin-leads__card" key={lead.email || index}>
              <header>
                <div>
                  <h2>{lead.name || 'Sin nombre'}</h2>
                  <p className="admin-leads__meta">
                    {formatDate(lead.created_at)} · Tier {lead.tier || 'N/A'} ·
                    Score {lead.score ?? 'N/A'}
                  </p>
                </div>
                <button
                  type="button"
                  className="admin-leads__copy"
                  onClick={() => handleCopyEmail(lead.email)}
                >
                  {copiedEmail === lead.email ? 'Copiado' : 'Copiar email'}
                </button>
              </header>
              <dl>
                <div>
                  <dt>Email</dt>
                  <dd>{lead.email || 'N/A'}</dd>
                </div>
                <div>
                  <dt>Tipo de empresa</dt>
                  <dd>{lead.company_type || 'N/A'}</dd>
                </div>
                <div>
                  <dt>Problema</dt>
                  <dd>{lead.problem || 'N/A'}</dd>
                </div>
                <div>
                  <dt>Presupuesto</dt>
                  <dd>{lead.budget || 'N/A'}</dd>
                </div>
                <div>
                  <dt>Urgencia</dt>
                  <dd>{lead.urgency || 'N/A'}</dd>
                </div>
                <div>
                  <dt>URL</dt>
                  <dd className="admin-leads__url">{lead.page_url || 'N/A'}</dd>
                </div>
              </dl>
            </article>
          ))
        )}
      </section>
    </main>
  );
};

export default AdminLeads;
