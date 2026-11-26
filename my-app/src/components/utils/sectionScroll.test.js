import { getSectionScrollTop } from './generalUtils';

const makeSection = ({ top, height, paddingTop = 32 }) => {
  const section = document.createElement('section');
  section.style.paddingTop = `${paddingTop}px`;
  section.getBoundingClientRect = () => ({ top, bottom: top + height, height, left: 0, right: 0, width: 0, x: 0, y: top });
  document.body.appendChild(section);
  return section;
};

const makeNav = (height) => {
  const nav = document.createElement('nav');
  nav.className = 'navegacion';
  nav.getBoundingClientRect = () => ({ top: 0, bottom: height, height, left: 0, right: 0, width: 0, x: 0, y: 0 });
  document.body.appendChild(nav);
};

describe('getSectionScrollTop', () => {
  const originalInnerHeight = window.innerHeight;

  beforeEach(() => {
    window.innerHeight = 900;
    makeNav(60);
  });

  afterEach(() => {
    window.innerHeight = originalInnerHeight;
    document.body.innerHTML = '';
  });

  it('shows a section that fits on screen edge to edge under the menu', () => {
    const section = makeSection({ top: 2000, height: 840 });
    expect(getSectionScrollTop(section)).toBe(2000 - 60);
  });

  it('lands a taller section on its content, skipping its top padding', () => {
    const section = makeSection({ top: 2000, height: 1400, paddingTop: 32 });
    expect(getSectionScrollTop(section)).toBe(2000 + 32 - 60 - 16);
  });
});
