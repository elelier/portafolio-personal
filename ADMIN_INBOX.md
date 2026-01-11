# Admin Inbox – Leads

Mini-CRM para gestionar leads generados por el formulario de contacto de elelier.com.

## Endpoints

### GET /api/admin/leads
Retrieves all leads with metadata.

**Query params:**
- `token` (required): Admin token
- `limit` (optional): Max results, default 50, max 200

**Response:**
```json
{
  "ok": true,
  "data": [
    {
      "id": "...",
      "created_at": "...",
      "name": "...",
      "email": "...",
      "company_type": "...",
      "problem": "...",
      "budget": "...",
      "urgency": "...",
      "score": 10,
      "tier": "HIGH",
      "source": "elelier.com",
      "page_url": "...",
      "referrer": "...",
      "utm": {...},
      "client_lead_id": "uuid"
    }
  ]
}
```

### GET /api/admin/statuses
Retrieves statuses for specific leads from KV.

**Query params:**
- `token` (required): Admin token
- `ids` (required): Comma-separated client_lead_ids

**Response:**
```json
{
  "ok": true,
  "statuses": {
    "lead-id-1": "CONTACTED",
    "lead-id-2": "NEW"
  }
}
```

### POST /api/admin/lead-status
Updates status for a single lead in KV.

**Query params:**
- `token` (required): Admin token

**Body:**
```json
{
  "clientLeadId": "uuid",
  "status": "CONTACTED"
}
```

**Response:**
```json
{
  "ok": true,
  "clientLeadId": "uuid",
  "status": "CONTACTED"
}
```

## Status Lifecycle

| Status | Meaning |
|--------|---------|
| **NEW** | Lead sin contacto (default) |
| **CONTACTED** | Se ha iniciado conversación |
| **WON** | Convertido a cliente |
| **LOST** | Descalificado o sin respuesta |
| **IGNORE** | No aplica o spam |

## Storage

| Data | Where | Key |
|------|-------|-----|
| Leads metadata | Supabase (PostgreSQL) | `leads` table |
| Lead statuses | Cloudflare KV | `lead_status:<client_lead_id>` |

## Security

- **Authentication**: Token-based (`?token=ADMIN_TOKEN`)
- **Authorization**: Validates token against `env.ADMIN_TOKEN`
- **Invalid token**: Returns `401 Unauthorized`
- **CORS**: Allowed origins: `https://elelier.com`, `https://www.elelier.com`, `http://localhost:3000`

## Implementation

- **Worker**: `workers/lead-worker.js`
  - Handles all `/api/admin/*` routes
  - Validates tokens via `getAdminTokenFromRequest()`
  - Reads/writes KV for statuses
  - Queries Supabase for leads

- **Frontend**: `my-app/src/pages/AdminLeads.jsx`
  - Loads leads and statuses on mount
  - Optimistic UI updates for status changes
  - Real-time sync with server after POST
  - Filters: Tier, Company type, Status
