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
  {
    id: "primaryMetric",
    label: "Cual es tu principal metrica a mover?",
    type: "select",
    options: ["conversion", "costos", "lead time", "retencion", "otro"],
  },
  {
    id: "dataAvailable",
    label: "Tienes datos disponibles?",
    type: "select",
    options: ["si", "no"],
  },
  {
    id: "decisionMaker",
    label: "Quien decide?",
    type: "select",
    options: ["yo", "partner", "board", "otro"],
  },
];

function withCorsHeaders(headers = {}, origin = "") {
  const nextHeaders = {
    ...headers,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
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
    return {
      type: "calendar",
      url: "https://cal.com/elelier/diagnostico",
      message: "Listo para llamada.",
    };
  }

  if (tier === "MID") {
    return {
      type: "questions",
      questions: midTierQuestions,
    };
  }

  return {
    type: "resource",
    url: "https://elelier.com/recursos/diagnostico.pdf",
    message: "Revisa este recurso antes de avanzar.",
  };
}

async function saveLeadToSupabase({ env, payload, score, tier, request }) {
  const supabaseUrl = env.SUPABASE_URL;
  const supabaseKey = env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    throw new Error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
  }

  const userAgent = request.headers.get("user-agent") || null;
  const ip =
    request.headers.get("cf-connecting-ip") ||
    request.headers.get("x-forwarded-for") ||
    null;

  const body = {
    name: `${payload.name}`.trim(),
    email: `${payload.email}`.trim(),
    company_type: payload.companyType ?? null,
    problem: payload.problem ?? null,
    budget: payload.budget ?? null,
    urgency: payload.urgency ?? null,
    score,
    tier,
    followup_answers: payload.followupAnswers ?? null,
    raw: payload,
    source: payload.source ?? "elelier.com",
    user_agent: userAgent,
    ip,
  };

  const res = await fetch(`${supabaseUrl}/rest/v1/leads`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      apikey: supabaseKey,
      authorization: `Bearer ${supabaseKey}`,
      prefer: "return=minimal",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Supabase insert failed: ${res.status} ${text}`);
  }
}

/** ✅ Telegram helpers */
function formatLeadMessage({ payload, score, tier }) {
  return [
    `🚨 Nuevo lead: ${tier} (${score})`,
    ``,
    `👤 ${payload.name} — ${payload.email}`,
    `🏢 Tipo: ${payload.companyType || "-"}`,
    `🎯 Reto: ${payload.problem || "-"}`,
    `💰 Budget: ${payload.budget || "-"}`,
    `⏱️ Urgencia: ${payload.urgency || "-"}`,
  ].join("\n");
}

async function sendTelegram(env, text) {
  const token = env.TELEGRAM_BOT_TOKEN;
  const chatId = env.TELEGRAM_CHAT_ID;

  // si faltan secrets, no revientes el lead
  if (!token || !chatId) return;

  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      disable_web_page_preview: true,
    }),
  });

  if (!res.ok) {
    const t = await res.text();
    console.error("Telegram send failed:", res.status, t);
  }
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const origin = request.headers.get("Origin") || "";

    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: withCorsHeaders({}, origin),
      });
    }

    if (url.pathname === "/health") {
      return new Response("ok", {
        status: 200,
        headers: withCorsHeaders({ "Content-Type": "text/plain" }, origin),
      });
    }

    if (url.pathname !== "/api/lead") {
      return new Response("Not Found", {
        status: 404,
        headers: withCorsHeaders({ "Content-Type": "text/plain" }, origin),
      });
    }

    if (request.method !== "POST") {
      return new Response("Method Not Allowed", {
        status: 405,
        headers: withCorsHeaders({ "Content-Type": "text/plain" }, origin),
      });
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

    const score = computeScore(payload);
    const tier = resolveTier(score);
    const nextStep = buildNextStep(tier);

    try {
      await saveLeadToSupabase({ env, payload, score, tier, request });
    } catch (e) {
      console.error("Persist lead error:", e);
      return jsonResponse(
        { ok: false, error: "Failed to persist lead. Try later." },
        500,
        origin
      );
    }

    // ✅ Notificar SOLO HIGH (para no spamearte)
    if (tier === "HIGH") {
      const msg = formatLeadMessage({ payload, score, tier });
      await sendTelegram(env, msg);
    }

    return jsonResponse({ ok: true, score, tier, nextStep }, 200, origin);
  },
};
