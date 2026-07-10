# Visual-first Landing Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reorganize and enhance the full Elier portfolio landing so users understand the offer through visual evidence, short copy, clear navigation and scalable project detail pages.

**Architecture:** Keep the existing React Router and component system, introduce a single data-driven project model, compose the home from short visual sections, and add a public project catalog/detail route. Preserve current private routes and bilingual behavior.

**Tech Stack:** React 18, React Router 6, CSS, existing Framer Motion/react-swipeable utilities, Jest/React Testing Library, Create React App.

## Global Constraints

- Text must stay concise and evidence-led.
- Project additions must be data-only whenever possible.
- All interactive elements need keyboard and touch support.
- Respect `prefers-reduced-motion`.
- Preserve Spanish and English content paths.
- Reuse local assets before adding new dependencies.

### Task 1: Establish the visual-first content model

**Files:**
- Create: `my-app/src/data/projects.js`
- Modify: `my-app/src/data/sites.js`
- Test: `my-app/src/data/projects.test.js`

**Interfaces:**
- Produces `projectsData`, `getProjects(language)`, and `getProjectById(id, language)`.

- [ ] **Step 1: Write the failing test**

```js
import { getProjects, getProjectById } from './projects';

test('returns localized projects with gallery-safe fields', () => {
  const projects = getProjects('es');
  expect(projects.length).toBeGreaterThan(0);
  expect(projects[0]).toEqual(expect.objectContaining({ id: expect.any(String), gallery: expect.any(Array) }));
  expect(getProjectById(projects[0].id, 'es')).toBe(projects[0]);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- --watchAll=false --runTestsByPath src/data/projects.test.js`
Expected: FAIL because `projects.js` does not exist.

- [ ] **Step 3: Implement the data model**

Create bilingual records for the existing featured sites with `id`, `title`, `category`, `summary`, `featuredImage`, `gallery`, `metrics`, `role`, `stack`, `url`, and `status`. Export selectors that fall back to Spanish for unknown languages and return `null` for unknown ids.

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- --watchAll=false --runTestsByPath src/data/projects.test.js`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add my-app/src/data/projects.js my-app/src/data/sites.js my-app/src/data/projects.test.js
git commit -m "feat: add visual-first project content model"
```

### Task 2: Recompose the home around visual evidence

**Files:**
- Modify: `my-app/src/App.js`
- Modify: `my-app/src/components/HeroBanner.js`
- Create: `my-app/src/components/ResultsStrip.jsx`
- Create: `my-app/src/components/FeaturedProjects.jsx`
- Create: `my-app/src/styles/components/ResultsStrip.css`
- Create: `my-app/src/styles/components/FeaturedProjects.css`
- Test: `my-app/src/components/FeaturedProjects.test.jsx`

**Interfaces:**
- `FeaturedProjects({ projects, language, onSelect })` renders one data-driven card per project.
- `ResultsStrip({ language })` renders concise metric items.

- [ ] **Step 1: Write the failing test**

```jsx
import { render, screen } from '@testing-library/react';
import FeaturedProjects from './FeaturedProjects';

test('shows visual project cards and short summaries', () => {
  render(<FeaturedProjects language="es" projects={[{ id: 'demo', title: 'Demo', summary: 'Una frase', featuredImage: '/demo.jpg', category: 'Web', metrics: ['+20%'] }]} />);
  expect(screen.getByRole('heading', { name: 'Demo' })).toBeInTheDocument();
  expect(screen.getByAltText('Demo')).toBeInTheDocument();
  expect(screen.getByText('Una frase')).toBeInTheDocument();
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- --watchAll=false --runTestsByPath src/components/FeaturedProjects.test.jsx`
Expected: FAIL because the component does not exist.

- [ ] **Step 3: Implement the visual sections and reorder `homeSections`**

Use short heading copy, image-first cards, metrics and one CTA per section. Keep existing sections that already provide real evidence, but move career and long-form content below projects/results. Import the new CSS files and pass the localized project data from `App.js`.

- [ ] **Step 4: Run focused and existing tests**

Run: `npm test -- --watchAll=false --runTestsByPath src/components/FeaturedProjects.test.jsx src/App.test.js`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add my-app/src/App.js my-app/src/components/HeroBanner.js my-app/src/components/ResultsStrip.jsx my-app/src/components/FeaturedProjects.jsx my-app/src/styles/components/ResultsStrip.css my-app/src/styles/components/FeaturedProjects.css my-app/src/components/FeaturedProjects.test.jsx
git commit -m "feat: recompose landing around visual evidence"
```

### Task 3: Make navigation and mobile behavior coherent

**Files:**
- Modify: `my-app/src/components/Navegacion.js`
- Modify: `my-app/src/styles/components/Navegacion.css`
- Modify: `my-app/src/components/FloatingButton.js`
- Test: `my-app/src/components/Navegacion.test.js`

**Interfaces:**
- Navigation exposes four section links and one persistent contact action in both desktop and mobile states.

- [ ] **Step 1: Add tests for menu close and semantic labels**

Assert the menu button has `aria-expanded`, the mobile menu contains the four canonical destinations, and selecting a destination closes the menu.

- [ ] **Step 2: Run the focused test before implementation**

Run: `npm test -- --watchAll=false --runTestsByPath src/components/Navegacion.test.js`
Expected: FAIL for the new assertions.

- [ ] **Step 3: Implement navigation state and responsive layout**

Use a real button label, `aria-expanded`, `aria-controls`, an overlay, body scroll locking while open, escape-to-close, and the canonical anchors `proyectos`, `resultados`, `como-trabajo`, and `contacto`.

- [ ] **Step 4: Run navigation tests**

Run: `npm test -- --watchAll=false --runTestsByPath src/components/Navegacion.test.js`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add my-app/src/components/Navegacion.js my-app/src/styles/components/Navegacion.css my-app/src/components/FloatingButton.js my-app/src/components/Navegacion.test.js
git commit -m "feat: unify desktop and mobile navigation"
```

### Task 4: Add public catalog and project detail pages

**Files:**
- Create: `my-app/src/pages/ProjectsPage.jsx`
- Create: `my-app/src/pages/ProjectDetailPage.jsx`
- Create: `my-app/src/styles/pages/ProjectsPage.css`
- Create: `my-app/src/styles/pages/ProjectDetailPage.css`
- Modify: `my-app/src/App.js`
- Modify: `my-app/src/components/SiteModal.jsx`
- Test: `my-app/src/pages/ProjectDetailPage.test.jsx`

**Interfaces:**
- Route `/sites` renders the public catalog.
- Route `/proyecto/:id` renders a project detail or a localized not-found state.

- [ ] **Step 1: Write the failing route test**

```jsx
test('renders project detail content from the route id', () => {
  renderWithRouter('/proyecto/demo');
  expect(screen.getByRole('heading', { name: 'Demo' })).toBeInTheDocument();
  expect(screen.getByRole('list', { name: /galería/i })).toBeInTheDocument();
});
```

- [ ] **Step 2: Run it to verify failure**

Run: `npm test -- --watchAll=false --runTestsByPath src/pages/ProjectDetailPage.test.jsx`
Expected: FAIL because the route and page do not exist.

- [ ] **Step 3: Implement the catalog/detail routes**

Render the gallery as responsive media with alt text, concise sections, metrics, stack, external link, related projects and a back-to-projects action. Do not invent missing gallery assets; omit empty gallery slots.

- [ ] **Step 4: Run route tests**

Run: `npm test -- --watchAll=false --runTestsByPath src/pages/ProjectDetailPage.test.jsx`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add my-app/src/pages/ProjectsPage.jsx my-app/src/pages/ProjectDetailPage.jsx my-app/src/styles/pages/ProjectsPage.css my-app/src/styles/pages/ProjectDetailPage.css my-app/src/App.js my-app/src/components/SiteModal.jsx my-app/src/pages/ProjectDetailPage.test.jsx
git commit -m "feat: add public project catalog and detail pages"
```

### Task 5: Add purposeful motion, visual QA and asset audit

**Files:**
- Modify: `my-app/src/styles/App.css`
- Modify: `my-app/src/styles/index.css`
- Modify: relevant section CSS files
- Create: `docs/superpowers/asset-audit-2026-07-10.md`

- [ ] **Step 1: Add reduced-motion and reveal styles**

Provide a static fallback, one reveal class, visible focus styles and no animation that affects layout height after load.

- [ ] **Step 2: Audit local and public project assets**

Record which projects have hero, desktop, mobile, flow and outcome imagery; list missing assets with exact suggested shot types.

- [ ] **Step 3: Run verification**

Run: `npm test -- --watchAll=false` and `npm run build`
Expected: all tests pass and the production build exits with code 0.

- [ ] **Step 4: Review desktop and mobile behavior**

Use the browser at desktop and a narrow mobile viewport to verify order, sticky navigation, menu closure, anchor destinations, gallery interactions and no horizontal overflow.

- [ ] **Step 5: Commit**

```bash
git add my-app/src/styles/App.css my-app/src/styles/index.css my-app/src docs/superpowers/asset-audit-2026-07-10.md
git commit -m "chore: verify visual-first landing and asset coverage"
```
