const allowedOrigins = new Set([
  "https://elelier.com",
  "https://www.elelier.com",
  "http://localhost:3000",
]);

const budgetScores = {
  "<3k": 0,
  "3-5k": 2,
  "5-10k": 4,
  "10k+": 6,
};

const urgencyScores = {
  "2w": 3,
  "1m": 2,
  "3m": 1,
};

const companyTypeScores = {
  freelancer: 1,
  startup: 2,
  pyme: 3,
  enterprise: 4,
};

const problemScores = {
  operacion: 3,
  producto: 3,
  ia: 3,
  web: 2,
};

const midTierQuestions = [
  { id: "primaryMetric", label: "Cual es tu principal metrica a mover?", type: "select", options: ["conversion", "costos", "lead time", "retencion", "otro"] },
  { id: "dataAvailable", label: "Tienes datos disponibles?", type: "select", options: ["si", "no"] },
  { id: "decisionMaker", label: "Quien decide?", type: "select", options: ["yo", "partner", "board", "otro"] },
];

const VALID_STATUSES = new Set(["NEW", "CONTACTED", "WON", "LOST", "IGNORE"]);
const STATUS_KEY_PREFIX = "lead_status:";

function withCorsHeaders(headers = {}, origin = "") {
  const nextHeaders = {
    ...headers,
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Max-Age": "86400",
    "Vary": "Origin",
  };

  if (allowedOrigins.has(origin)) {
    nextHeaders["Access-Control-Allow-Origin"] = origin;
  }

  return nextHeaders;
}

function jsonResponse(payload, status, origin) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: withCorsHeaders({ "Content-Type": "application/json" }, origin),
  });
}

function textResponse(text, status, origin) {
  return new Response(text, {
    status,
    headers: withCorsHeaders({ "Content-Type": "text/plain; charset=utf-8" }, origin),
  });
}

function computeScore(data) {
  const budget = budgetScores[data?.budget] ?? 0;
  const urgency = urgencyScores[data?.urgency] ?? 0;
  const companyType = companyTypeScores[data?.companyType] ?? 0;
  const problem = problemScores[data?.problem] ?? 0;
  return budget + urgency + companyType + problem;
}

function resolveTier(score) {
  if (score >= 12) return "HIGH";
  if (score >= 8) return "MID";
  return "LOW";
}

function buildNextStep(tier) {
  if (tier === "HIGH") {
    return { type: "calendar", url: "https://cal.com/elelier/diagnostico", message: "Listo para llamada." };
  }
  if (tier === "MID") {
    return { type: "questions", questions: midTierQuestions };
  }
  return { type: "resource", url: "https://elelier.com/recursos/diagnostico.pdf", message: "Revisa este recurso antes de avanzar." };
}

function getAdminTokenFromRequest(url, request) {
  // prefer query param ?token=...
  const qp = url.searchParams.get("token");
  if (qp && qp.trim()) return qp.trim();

  // optional: Authorization: Bearer <token>
  const auth = request.headers.get("Authorization") || "";
  const m = auth.match(/^Bearer\s+(.+)$/i);
  if (m?.[1]) return m[1].trim();

  return "";
}

async function supabaseFetch(env, path, options = {}) {
  const base = env.SUPABASE_URL.replace(/\/$/, "");
  const url = `${base}${path}`;
  const headers = {
    "apikey": env.SUPABASE_SERVICE_ROLE_KEY,
    "Authorization": `Bearer ${env.SUPABASE_SERVICE_ROLE_KEY}`,
    ...(options.headers || {}),
  };
  const res = await fetch(url, { ...options, headers });
  return res;
}

async function sendTelegram(env, message) {
  if (!env.TELEGRAM_BOT_TOKEN || !env.TELEGRAM_CHAT_ID) return;
  const url = `https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`;
  await fetch(url, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      chat_id: env.TELEGRAM_CHAT_ID,
      text: message,
      disable_web_page_preview: true,
    }),
  });
}

function formatTelegramLead(payload, tier, score) {
  const name = payload?.name || "(sin nombre)";
  const email = payload?.email || "(sin email)";
  const companyType = payload?.companyType || payload?.company_type || "(sin tipo)";
  const problem = payload?.problem || "(sin reto)";
  const budget = payload?.budget || "(sin budget)";
  const urgency = payload?.urgency || "(sin urgencia)";

  return `Nuevo lead: ${tier} (${score})\n\n👤 ${name} — ${email}\n🏢 Tipo: ${companyType}\n🎯 Reto: ${problem}\n💰 Budget: ${budget}\n⏱️ Urgencia: ${urgency}`;
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const origin = request.headers.get("Origin") || "";

    // Preflight
    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: withCorsHeaders({}, origin) });
    }

    // Health
    if (url.pathname === "/health") {
      return textResponse("ok", 200, origin);
    }

    // ---------- PUBLIC: /api/lead ----------
    if (url.pathname === "/api/lead") {
      if (request.method !== "POST") {
        return textResponse("Method Not Allowed", 405, origin);
      }

      let payload;
      try {
        payload = await request.json();
      } catch {
        return jsonResponse({ ok: false, error: "Invalid JSON payload." }, 400, origin);
      }

      const name = `${payload?.name || ""}`.trim();
      const email = `${payload?.email || ""}`.trim();
      if (!name || !email) {
        return jsonResponse({ ok: false, error: "Name and email are required." }, 400, origin);
      }

      // honeypot
      const website = `${payload?.website || ""}`.trim();
      if (website) {
        return jsonResponse({ ok: false, error: "bot_detected" }, 400, origin);
      }

      const score = computeScore(payload);
      const tier = resolveTier(score);
      const nextStep = buildNextStep(tier);

      // Insert in Supabase
      const row = {
        name,
        email,
        company_type: (payload.companyType || payload.company_type || "").toLowerCase(),
        problem: (payload.problem || "").toLowerCase(),
        budget: payload.budget || null,
        urgency: payload.urgency || null,
        score,
        tier,
        followup_answers: payload.followupAnswers ?? null,
        raw: JSON.stringify(payload),
        source: payload.source || "elelier.com",
        user_agent: request.headers.get("User-Agent") || null,
        ip: request.headers.get("CF-Connecting-IP") || null,
        page_url: payload.pageUrl || null,
        referrer: payload.referrer || request.headers.get("Referer") || null,
        utm: payload.utm ? JSON.stringify(payload.utm) : null,
        client_lead_id: payload.clientLeadId || null,
      };

      const supaRes = await supabaseFetch(env, "/rest/v1/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Prefer": "return=representation",
        },
        body: JSON.stringify(row),
      });

      if (!supaRes.ok) {
        const t = await supaRes.text().catch(() => "");
        return jsonResponse({ ok: false, error: "failed_to_store", details: t }, 500, origin);
      }

      // Telegram only for HIGH
      if (tier === "HIGH") {
        await sendTelegram(env, formatTelegramLead(payload, tier, score));
      }

      return jsonResponse({ ok: true, score, tier, nextStep }, 200, origin);
    }

    // ---------- ADMIN AUTH ----------
    if (url.pathname.startsWith("/api/admin/")) {
      const token = getAdminTokenFromRequest(url, request);
      if (!token || token !== env.ADMIN_TOKEN) {
        return jsonResponse({ ok: false, error: "unauthorized" }, 401, origin);
      }

      // GET /api/admin/leads?limit=50
      if (url.pathname === "/api/admin/leads" && request.method === "GET") {
        const limit = Math.min(parseInt(url.searchParams.get("limit") || "50", 10) || 50, 200);

        const supaRes = await supabaseFetch(
          env,
          `/rest/v1/leads?select=id,created_at,name,email,company_type,problem,budget,urgency,score,tier,source,page_url,referrer,utm,client_lead_id&order=created_at.desc&limit=${limit}`,
          { method: "GET" }
        );

        if (!supaRes.ok) {
          const t = await supaRes.text().catch(() => "");
          return jsonResponse({ ok: false, error: "failed_to_fetch", details: t }, 500, origin);
        }

        const data = await supaRes.json();
        return jsonResponse({ ok: true, data }, 200, origin);
      }

      // GET /api/admin/statuses?ids=a,b,c
      if (url.pathname === "/api/admin/statuses" && request.method === "GET") {
        const idsRaw = url.searchParams.get("ids") || "";
        const ids = idsRaw.split(",").map((s) => s.trim()).filter(Boolean);

        const statuses = {};
        for (const id of ids) {
          const key = `${STATUS_KEY_PREFIX}${id}`;
          const val = await env.LEADS_KV.get(key);
          statuses[id] = val || "NEW";
        }

        return jsonResponse({ ok: true, statuses }, 200, origin);
      }

      // POST /api/admin/lead-status  body: { clientLeadId, status }
      if (url.pathname === "/api/admin/lead-status" && request.method === "POST") {
        let body;
        try {
          body = await request.json();
        } catch {
          return jsonResponse({ ok: false, error: "invalid_json" }, 400, origin);
        }

        const clientLeadId = `${body?.clientLeadId || ""}`.trim();
        const status = `${body?.status || ""}`.trim().toUpperCase();

        if (!clientLeadId) {
          return jsonResponse({ ok: false, error: "clientLeadId_required" }, 400, origin);
        }
        if (!VALID_STATUSES.has(status)) {
          return jsonResponse({ ok: false, error: "invalid_status" }, 400, origin);
        }

        const key = `${STATUS_KEY_PREFIX}${clientLeadId}`;
        await env.LEADS_KV.put(key, status);

        return jsonResponse({ ok: true, clientLeadId, status }, 200, origin);
      }

      return textResponse("Not Found", 404, origin);
    }

    return textResponse("Not Found", 404, origin);
  },
};
