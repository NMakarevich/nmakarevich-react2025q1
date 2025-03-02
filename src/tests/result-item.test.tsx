import { describe, expect, vi } from 'vitest';
import { response } from './mock.ts';
import { screen } from '@testing-library/react';
import ResultItem from '../components/result-item/result-item.tsx';
import ResultList from '../components/result-list/result-list.tsx';
import { renderWithProviders } from './test-utils.tsx';

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

describe('ResultItem', () => {
  it('Should render correctly', () => {
    const item = response.results[0];
    renderWithProviders(<ResultItem result={item} />);
    const name = 'Rick Sanchez';
    const nameInCard = screen.getByText(name).textContent;
    expect(nameInCard).toEqual('Name: Rick Sanchez');
  });
  it('Should open detailed card', async () => {
    const initialState = {
      resource: 'characters',
      url: 'https://rickandmortyapi.com/api/character',
      resources: null,
    };
    renderWithProviders(
      <ResultList data={response} detailed={{ data: response.results[0] }} />,
      {
        preloadedState: {
          resources: initialState,
        },
      }
    );
    const closeButton = screen.getByText('Close');
    expect(closeButton).toBeDefined();
  });
});
