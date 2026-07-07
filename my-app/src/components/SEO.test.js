import React from 'react';
import { buildUrl } from './SEO';

describe('SEO', () => {
  it('builds a canonical URL on elelier.com without query parameters', () => {
    expect(buildUrl('/?utm_source=test&ref=1')).toBe('https://elelier.com/');
    expect(buildUrl('/blog?utm_source=test')).toBe('https://elelier.com/blog');
    expect(buildUrl('contacto?foo=bar')).toBe('https://elelier.com/contacto');
  });
});
