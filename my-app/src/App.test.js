const fs = require('fs');
const path = require('path');

describe('App public diagnosis removal', () => {
  const appSource = fs.readFileSync(path.join(__dirname, 'App.js'), 'utf8');

  it('does not import or render LeadQualifier on the public home', () => {
    expect(appSource).not.toContain("import LeadQualifier");
    expect(appSource).not.toContain("Component: LeadQualifier");
    expect(appSource).not.toContain("key: 'diagnostico'");
  });

  it('does not render PruebaSocial on the public home', () => {
    expect(appSource).not.toContain("import PruebaSocial");
    expect(appSource).not.toContain("key: 'prueba-social'");
  });

  it('does not expose the public gracias-agenda route', () => {
    expect(appSource).not.toContain('/gracias-agenda');
  });
});
