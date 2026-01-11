import React, { useMemo, useState } from 'react';
import '../styles/AdminLeads.css';

const STORAGE_KEY = 'ADMIN_TOKEN';
const DEFAULT_TIER = 'ALL';
const DEFAULT_STATUS_FILTER = 'ALL';
const STATUS_OPTIONS = ['NEW', 'CONTACTED', 'WON', 'LOST', 'IGNORE'];

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
  const [isTokenVisible, setIsTokenVisible] = useState(false);
  const [tierFilter, setTierFilter] = useState(DEFAULT_TIER);
  const [companyTypeFilter, setCompanyTypeFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState(DEFAULT_STATUS_FILTER);
  const [leads, setLeads] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [errorDetails, setErrorDetails] = useState('');
  const [copiedEmail, setCopiedEmail] = useState('');
  const [copiedJson, setCopiedJson] = useState('');
  const [statusesMap, setStatusesMap] = useState({});

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

      const id = lead?.client_lead_id || lead?.id || lead?.email || '';
      const leadStatus = String(statusesMap[id] || 'NEW').toUpperCase();
      const statusMatches = statusFilter === DEFAULT_STATUS_FILTER || leadStatus === statusFilter;

      return tierMatches && companyMatches && statusMatches;
    });
  }, [companyTypeFilter, leads, tierFilter, statusesMap, statusFilter]);

  const handleTokenChange = (event) => {
    const nextToken = event.target.value;
    setToken(nextToken);
    sessionStorage.setItem(STORAGE_KEY, nextToken);
  };

  const handlePasteToken = async () => {
    try {
      if (navigator.clipboard?.readText) {
        const text = await navigator.clipboard.readText();
        setToken(text);
        sessionStorage.setItem(STORAGE_KEY, text);
      } else {
        setErrorDetails('La función de pegar no está disponible en este navegador.');
      }
    } catch (err) {
      setErrorDetails('No se pudo pegar el token desde el portapapeles.');
    }
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

      // También cargar statuses del Worker
      try {
        const statusUrl = `https://leads.elelier.com/api/admin/statuses?token=${encodeURIComponent(tokenClean)}`;
        const statusRes = await fetch(statusUrl);
        if (statusRes.ok) {
          const statusJson = await statusRes.json();
          // Acepta tanto array [{clientLeadId, status}] como mapa {id: status}
          const data = statusJson?.data ?? {};
          const map = Array.isArray(data)
            ? data.reduce((acc, it) => {
                const key = it?.clientLeadId ?? it?.id ?? it?.email;
                if (key && it?.status) acc[key] = String(it.status).toUpperCase();
                return acc;
              }, {})
            : Object.entries(data).reduce((acc, [k, v]) => {
                acc[k] = String(v || 'NEW').toUpperCase();
                return acc;
              }, {});
          setStatusesMap(map);
        } else {
          console.warn('Statuses fetch failed:', statusRes.status);
        }
      } catch (e) {
        console.warn('Error fetching statuses', e);
      }
    } catch (fetchError) {
      setErrorDetails('Error de red al cargar los leads.');
      setStatusMessage('');
      setLeads([]);
    }
  };

  const handleStatusChange = async (clientLeadId, nextStatus) => {
    const normalized = String(nextStatus || '').toUpperCase();
    if (!STATUS_OPTIONS.includes(normalized)) {
      setErrorDetails('Status inválido.');
      return;
    }

    const tokenClean = (token || '').trim();
    if (!tokenClean) {
      setErrorDetails('Ingresa un token válido para actualizar el status.');
      return;
    }

    // Optimista
    const prev = statusesMap[clientLeadId];
    setStatusesMap((m) => ({ ...m, [clientLeadId]: normalized }));
    setStatusMessage('Actualizando status...');

    try {
      const url = `https://leads.elelier.com/api/admin/lead-status?token=${encodeURIComponent(tokenClean)}`;
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ clientLeadId, status: normalized })
      });

      if (!res.ok) {
        const t = await res.text();
        throw new Error(`Error ${res.status}: ${t}`);
      }

      setStatusMessage('Status actualizado');
    } catch (err) {
      // Revertir
      setStatusesMap((m) => ({ ...m, [clientLeadId]: prev }));
      setErrorDetails('No se pudo actualizar el status.');
      setStatusMessage('');
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
            type={isTokenVisible ? 'text' : 'password'}
            value={token}
            onChange={handleTokenChange}
            placeholder="Pega tu token"
          />
          <button
            type="button"
            className="admin-leads__token-toggle"
            onClick={() => setIsTokenVisible((prev) => !prev)}
          >
            {isTokenVisible ? 'Ocultar' : 'Mostrar'}
          </button>
          <button
            type="button"
            className="admin-leads__token-paste"
            onClick={handlePasteToken}
          >
            Pegar
          </button>
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
          Status
          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
          >
            <option value="ALL">ALL</option>
            {STATUS_OPTIONS.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
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
            const clientLeadId = lead?.client_lead_id || lead?.id || lead?.email || String(index);
            const currentStatus = String(statusesMap[clientLeadId] || 'NEW').toUpperCase();
            const statusClass = `admin-leads__status-badge admin-leads__status--${currentStatus.toLowerCase()}`;

            return (
              <article className="admin-leads__card" key={lead.email || index}>
                <header>
                  <div>
                    <div className="admin-leads__headline">
                      <h2>{lead.name || 'Sin nombre'}</h2>
                      <span className={tierClassName}>{tierLabel}</span>
                      <span className={statusClass}>{currentStatus}</span>
                    </div>
                    <p className="admin-leads__meta">
                      {formatDate(lead.created_at)} | Score {lead.score ?? 'N/A'}
                    </p>
                    {utmLine ? (
                      <p className="admin-leads__utm">UTM: {utmLine}</p>
                    ) : null}
                  </div>
                  <div className="admin-leads__actions">
                    <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                      <span style={{ fontSize: '0.8rem', color: '#b5b5b5' }}>Status</span>
                      <select
                        className="admin-leads__status-select"
                        value={currentStatus}
                        onChange={(e) => handleStatusChange(clientLeadId, e.target.value)}
                      >
                        {STATUS_OPTIONS.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </label>
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
