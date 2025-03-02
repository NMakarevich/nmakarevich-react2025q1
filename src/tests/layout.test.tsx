import { describe, expect, vi } from 'vitest';
import Layout from '../../pages/layout.tsx';
import { render, screen } from '@testing-library/react';

vi.mock('next/navigation', async () => ({
  useSearchParams: () => ({
    get: vi.fn(),
  }),
  useParams: () => ({
    resource: ['character', '1'],
  }),
}));

const pushMock = vi.fn((data) => console.log(data));

vi.mock('next/router', () => ({
  useRouter: vi.fn(() => ({
    query: { resource: ['characters', '1'] },
    push: pushMock,
    events: { on: vi.fn(), off: vi.fn(), emit: vi.fn() },
  })),
}));

describe('Layout', () => {
  it('Should render Layout with "Hello"', () => {
    render(
      <Layout>
        <h2>Hello</h2>
      </Layout>
    );
    const title = screen.getByRole('heading', { name: 'Hello' });
    expect(title).toBeDefined();
  });
});
