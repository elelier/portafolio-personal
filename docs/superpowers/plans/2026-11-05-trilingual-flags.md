# Trilingual Flag Selector Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restore circular Mexican and US flags and add a matching Brazilian flag in the existing trilingual settings selector.

**Architecture:** Keep the existing buttons and their routing/focus behavior. Replace purely visual two-letter spans with local flag images; add one small circular Brazil SVG to public assets and reuse the prior PNGs.

**Tech Stack:** React 18, CRA, Jest, CSS, static SVG.

**Spec:** `docs/superpowers/specs/2026-11-05-trilingual-flags-design.md`

## Global Constraints

- Modify only PR #84 branch; no new PR, no merge/deploy/contact submission.
- Preserve ES/EN/PT-BR routes, accessible labels, pressed state and focus return.
- Keep 24 × 24 px flag styling and original 40 × 32 px language buttons.

## Review Focus

- Flag URLs resolve for all three languages, including Brazil.
- Screen readers receive language names, not duplicated image alt text.
- Selected option remains visible in light and dark themes.
- Keyboard selection still closes the menu and returns focus.
- No layout overflow in the narrow settings menu.

---

### Task 1: Local flags in settings menu

**Files:**
- Test: `my-app/src/components/SettingsMenu.test.js`
- Modify: `my-app/src/components/SettingsMenu.js`
- Modify: `my-app/src/styles/components/SettingsMenu.css`
- Create: `my-app/public/assets/files/flag-br.svg`

**Interfaces:** The current selector already accepts `setLanguage('es'|'en'|'pt-br')`. Each button retains `data-settings-language`, `aria-label`, `aria-pressed`, `title`, and its focus-return handler.

- [x] **Step 1: RED.** Test each option renders a decorative image with expected absolute local source path and valid asset; language names remain accessible; selected state and existing focus test survive.
- [x] **Step 2: Run** `npm test -- --runInBand --watchAll=false SettingsMenu.test.js`; observed three expected failures: image missing in each locale.
- [x] **Step 3: GREEN.** Reuse flag-mx.png/flag-us.png; add a circular Brazil SVG; replace visual spans with decorative img, preserve handlers and semantics; keep image at 24 × 24 px.
- [x] **Step 4: Verify** focused Jest test (7/7), full Jest suite (141/141), `npm run build` (PASS), `git diff --check` (PASS), restore only generated `src/config/hashedPasscodes.js`.
- [ ] **Step 5: Commit and update same PR #84 branch**; inspect GitHub Actions before reporting release readiness.
