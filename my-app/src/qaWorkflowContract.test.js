const fs = require('fs');
const path = require('path');

describe('PR visual QA targets the checked-out commit', () => {
  const workflow = fs.readFileSync(path.resolve(__dirname, '../../.github/workflows/qa-frontend.yml'), 'utf8');
  const visualRunner = fs.readFileSync(path.resolve(__dirname, '../scripts/qa-visual-preview.cjs'), 'utf8');

  it('serves the locally built artifact for both the HTTP smoke and visual QA', () => {
    expect(workflow).toContain('node scripts/serve-built-pages.cjs');
    expect(workflow).toContain('ELELIER_PREVIEW_URL: http://127.0.0.1:4173');
    expect(workflow.match(/ref: \$\{\{ github\.event\.pull_request\.head\.sha \}\}/g)).toHaveLength(2);
    expect(workflow.match(/git rev-parse HEAD/g)).toHaveLength(2);
    expect(workflow).toContain('ELELIER_QA_SHA: ${{ github.event.pull_request.head.sha }}');
    expect(workflow).not.toContain('feat-seo-05-trilingual-route.elelier.pages.dev');
  });

  it('never silently falls back to a branch Preview with an unverified commit', () => {
    expect(visualRunner).not.toContain('feat-seo-05-trilingual-route.elelier.pages.dev');
  });
});
