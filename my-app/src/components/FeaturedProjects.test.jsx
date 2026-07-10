import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import FeaturedProjects from './FeaturedProjects';

jest.mock('../contexts/LanguageContext', () => ({
  useLanguage: () => ({ language: 'es' }),
}));

test('shows visual project cards and short summaries', () => {
  render(
    <MemoryRouter>
      <FeaturedProjects projects={[{
        id: 'demo',
        title: 'Demo',
        summary: 'Una frase',
        featuredImage: '/demo.jpg',
        category: 'Web',
        metrics: ['+20%'],
        featured: true,
      }]} />
    </MemoryRouter>
  );

  expect(screen.getByRole('heading', { name: 'Demo' })).toBeInTheDocument();
  expect(screen.getByAltText('Demo')).toBeInTheDocument();
  expect(screen.getByText('Una frase')).toBeInTheDocument();
});

