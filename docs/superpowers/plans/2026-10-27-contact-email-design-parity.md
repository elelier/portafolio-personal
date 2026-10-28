# Contact Email Design Parity Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Bring both Google Apps Script emails to a comparable or better visual standard than BuildShip, in Preview only.

**Architecture:** Keep the existing synchronous Apps Script workflow, add two email-friendly HTML renderers in `Code.gs` with shared helpers for safe content and presentation. Render the owner link using the real sheet ID/GID passed from the existing transaction; no new network calls or data stores.

**Tech Stack:** Google Apps Script (ES5-compatible JavaScript), `MailApp`, Node built-in test runner and VM harness.

**Spec:** `docs/superpowers/specs/2026-10-27-contact-email-design-parity.md`

## Global Constraints

- Only Preview deployment; leave BuildShip, production environment, frontend and Sheet schema unchanged.
- Blue `#2e86c1`; no dead banner or deleted Calendly CTA; links only to verified owned channels.
- Keep plain-text + escaped HTML, Spanish/English, no new dependencies and no unrequested retries.

## Review Focus

- Visitor-provided HTML and newlines must remain visibly readable but never executable.
- English visitors must receive English content, subject and context labels.
- Email clients that strip CSS/images must still show actionable text and links.
- Owner must get the `contact_v2` tab link rather than historical `gid=0`.
- Failed MailApp delivery must not invalidate a stored contact or cause duplicate retries.

---

### Task 1: Visitor and owner mail parity

**Files:**
- Modify: `my-app/google-apps-script/Code.test.cjs`
- Modify: `my-app/google-apps-script/Code.gs`
- Modify: `my-app/google-apps-script/README.md`

**Interfaces:**
- Consumes: existing `contact` data, Script Properties, current `sendAutoContact_` and `sendOwnerContact_` calls.
- Produces: safe HTML plus unchanged plain-text delivery; `sendOwnerContact_(contact,to,sheetUrl)` uses a `contact_v2` link derived from the sheet's GID; `contact.createdAtUtc` is assigned from the same timestamp stored in the row.

- [ ] **Step 1: Write the failing tests** for Spanish and English visitor formatting, safe HTML/newlines, working links, owner reply and sheet-tab CTA, content when images disabled, and plain text.
- [ ] **Step 2: Run** `node --test my-app/google-apps-script/Code.test.cjs`; expect new tests to fail specifically on missing template features.
- [ ] **Step 3: Implement** small shared HTML helpers and the two responsive HTML templates; retain existing persistence and MailApp behavior.
- [ ] **Step 4: Run** `node --test my-app/google-apps-script/Code.test.cjs`; expect all tests to pass.
- [ ] **Step 5: Run broader relevant tests**, inspect `git diff`, update README, commit scoped changes.

### Task 2: Preview deployment and visual QA

**Files:** No additional code changes unless QA finds a demonstrated defect.

**Interfaces:**
- Consumes: version-controlled Apps Script source from Task 1 and current Preview web app.
- Produces: a new Apps Script deployment version that only the existing Cloudflare Preview uses, plus human-visible mail QA evidence.

- [ ] **Step 1:** Update the `elelier-contact-google-preview` Apps Script editor code and select a new version in its current web-app deployment without touching production.
- [ ] **Step 2:** Confirm Preview connects to that deployment; verify BuildShip remains active in production.
- [ ] **Step 3:** With user authorization for another live contact request, submit the Preview form and verify two emails plus Sheet record, including their actual Gmail render.
- [ ] **Step 4:** Report results and keep PR #58 unmerged pending final production GO.
