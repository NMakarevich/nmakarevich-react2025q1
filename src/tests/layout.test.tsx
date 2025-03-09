import { describe, expect, vi } from 'vitest';
import Layout from '../components/layout.tsx';
import { render, screen } from '@testing-library/react';

vi.mock('next/navigation', async () => ({
  useSearchParams: () => ({
    get: vi.fn(),
  }),
  useParams: () => ({
    resource: ['character'],
  }),
}));

const emitMock = vi.fn();

vi.mock('next/router', async () => ({
  useRouter: () => ({
    query: { resource: ['characters'] },
    push: vi.fn(),
    events: { on: vi.fn(), off: vi.fn(), emit: emitMock },
  }),
}));

describe('Layout', () => {
  it('renders correctly title', () => {
    render(
      <Layout>
        <h2>Hello</h2>
      </Layout>
    );
    const title = screen.getByRole('heading', { name: /Hello/i });
    expect(title).toBeDefined();
  });
});
