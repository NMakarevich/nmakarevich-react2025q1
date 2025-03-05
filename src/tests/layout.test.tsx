import { describe, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Layout from '../../app/search/[...resource]/layout.tsx';
import RootLayout from '../../app/layout.tsx';

vi.mock('next/navigation', async () => {
  const actual = await vi.importActual('next/navigation');
  return {
    ...actual,
    useParams: () => ({
      resource: ['characters'],
    }),
    useRouter: () => ({
      push: vi.fn(),
    }),
    useSearchParams: () => ({
      get: vi.fn(),
    }),
  };
});

describe('Layouts', () => {
  it('renders correctly title', () => {
    render(
      <Layout>
        <h2>Hello</h2>
      </Layout>
    );
    const title = screen.getByRole('heading', { name: /Hello/i });
    expect(title).toBeDefined();
  });
  it('renders correctly title', () => {
    render(
      <RootLayout>
        <h2>Hello</h2>
      </RootLayout>
    );
    const title = screen.getByRole('heading', { name: /Hello/i });
    expect(title).toBeDefined();
  });
});
