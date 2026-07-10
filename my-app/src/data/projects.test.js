import { getProjectById, getProjects } from './projects';

test('returns localized projects with gallery-safe fields', () => {
  const projects = getProjects('es');

  expect(projects.length).toBeGreaterThan(0);
  expect(projects[0]).toEqual(expect.objectContaining({
    id: expect.any(String),
    gallery: expect.any(Array),
    featuredImage: expect.any(String),
  }));
  expect(getProjectById(projects[0].id, 'es')).toBe(projects[0]);
});

