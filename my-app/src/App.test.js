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

  it('renders the landing sections in the approved narrative order', () => {
    const sectionOrder = [
      "{ key: 'hero', Component: HeroBanner }",
      "{ key: 'soluciones', Component: Soluciones }",
      "{ key: 'casos', Component: CasosEstudio }",
      "{ key: 'testimonios', Component: Testimonios }",
      "{ key: 'servicios', Component: Servicios }",
      "{ key: 'sobre-mi', Component: SobreMi }",
      "{ key: 'portafolio', Component: Portafolio }",
      "{ key: 'contacto', Component: Contacto }"
    ];
    const positions = sectionOrder.map((entry) => appSource.indexOf(entry));

    expect(positions.every((position) => position >= 0)).toBe(true);
    expect(positions).toEqual([...positions].sort((a, b) => a - b));
  });
});
