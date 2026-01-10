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

const getTierLabel = (tier) => {
  if (!tier) {
    return 'N/A';
  }

  return String(tier).toUpperCase();
};

const getTierClassName = (tier) => {
  const normalized = String(tier || '').toUpperCase();

  if (normalized === 'HIGH') {
    return 'admin-leads__tier admin-leads__tier--high';
  }

  if (normalized === 'MID') {
    return 'admin-leads__tier admin-leads__tier--mid';
  }

  if (normalized === 'LOW') {
    return 'admin-leads__tier admin-leads__tier--low';
  }

  return 'admin-leads__tier';
};

const getUtmLine = (lead) => {
  const parts = [lead?.utm_source, lead?.utm_medium, lead?.utm_campaign].filter(Boolean);

  return parts.length ? parts.join(' / ') : '';
};

const AdminLeads = () => {
  const [token, setToken] = useState(() => sessionStorage.getItem(STORAGE_KEY) || '');
  const [tierFilter, setTierFilter] = useState(DEFAULT_TIER);
  const [companyTypeFilter, setCompanyTypeFilter] = useState('ALL');
  const [leads, setLeads] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [errorDetails, setErrorDetails] = useState('');
  const [copiedEmail, setCopiedEmail] = useState('');
  const [copiedJson, setCopiedJson] = useState('');

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
      setErrorDetails('No se pudo copiar el email.');
    }
  };

  const handleCopyJson = async (lead, key) => {
    try {
      await copyText(JSON.stringify(lead, null, 2));
      setCopiedJson(key);
      setTimeout(() => setCopiedJson(''), 2000);
    } catch (copyError) {
      setErrorDetails('No se pudo copiar el JSON.');
    }
  };

  const fetchLeads = async () => {
    if (isLoading) {
      return;
    }

    const tokenInput = token;
    const tokenClean = tokenInput.trim();

    if (!tokenClean) {
      setErrorDetails('Ingresa un token valido para cargar los leads.');
      setStatusMessage('');
      return;
    }

    setIsLoading(true);
    setErrorDetails('');
    setStatusMessage('Cargando...');

    try {
      const url = `https://leads.elelier.com/api/admin/leads?token=${encodeURIComponent(
        tokenClean
      )}&limit=50`;
      console.log('Fetching leads URL:', url);

      const response = await fetch(url);
      console.log('Response status:', response.status);

      if (!response.ok) {
        const responseClone = response.clone();
        let body = '';

        try {
          const errorJson = await response.json();
          body = typeof errorJson === 'string' ? errorJson : JSON.stringify(errorJson);
        } catch (parseError) {
          body = await responseClone.text();
        }

        setErrorDetails(`Error ${response.status}: ${body}`);
        setStatusMessage('');
        setLeads([]);
        return;
      }

      const json = await response.json();
      const nextLeads = json?.data || [];
      setLeads(nextLeads);
      setStatusMessage(`Cargados ${nextLeads.length} leads`);
    } catch (fetchError) {
      setErrorDetails('Error de red al cargar los leads.');
      setStatusMessage('');
      setLeads([]);
    } finally {
      setIsLoading(false);
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
          disabled={isLoading}
        >
          {isLoading ? 'Cargando...' : 'Cargar leads'}
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

      {statusMessage && !errorDetails && (
        <p className="admin-leads__status">{statusMessage}</p>
      )}
      {errorDetails && <p className="admin-leads__error">{errorDetails}</p>}

      <section className="admin-leads__list">
        {filteredLeads.length === 0 && !isLoading && !errorDetails ? (
          <p className="admin-leads__empty">No hay leads para mostrar.</p>
        ) : (
          filteredLeads.map((lead, index) => {
            const tierLabel = getTierLabel(lead.tier);
            const tierClassName = getTierClassName(lead.tier);
            const utmLine = getUtmLine(lead);
            const copyKey = lead.email || String(index);

            return (
              <article className="admin-leads__card" key={lead.email || index}>
                <header>
                  <div>
                    <div className="admin-leads__headline">
                      <h2>{lead.name || 'Sin nombre'}</h2>
                      <span className={tierClassName}>{tierLabel}</span>
                    </div>
                    <p className="admin-leads__meta">
                      {formatDate(lead.created_at)} | Score {lead.score ?? 'N/A'}
                    </p>
                    {utmLine ? (
                      <p className="admin-leads__utm">UTM: {utmLine}</p>
                    ) : null}
                  </div>
                  <div className="admin-leads__actions">
                    <button
                      type="button"
                      className="admin-leads__copy"
                      onClick={() => handleCopyEmail(lead.email)}
                    >
                      {copiedEmail === lead.email ? 'Copiado' : 'Copiar email'}
                    </button>
                    <button
                      type="button"
                      className="admin-leads__copy admin-leads__copy--secondary"
                      onClick={() => handleCopyJson(lead, copyKey)}
                    >
                      {copiedJson === copyKey ? 'JSON copiado' : 'Copiar JSON raw'}
                    </button>
                  </div>
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
            );
          })
        )}
      </section>
    </main>
  );
};

export default AdminLeads;
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
>>>>>>> 40a322d5a884c2845ce26643bf0bf3cd637d1f26
