import { describe, expect, it, vi } from 'vitest';
import { screen } from '@testing-library/react';
import ResultList from '../components/result-list/result-list.tsx';
import { response, location, episode } from './mock.ts';
import { renderWithProviders } from './test-utils.tsx';

const requestUrl = 'https://rickandmortyapi.com/api/character';

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

const initialState = {
  resource: 'characters',
  url: 'https://rickandmortyapi.com/api/character',
  requestUrl: requestUrl,
  resources: {
    characters: 'https://rickandmortyapi.com/api/character',
    locations: 'https://rickandmortyapi.com/api/location',
    episodes: 'https://rickandmortyapi.com/api/episode',
  },
};

describe('Result list', () => {
  // it('Should show loader', async () => {
  //   renderWithProviders(
  //     <ResultList data={response} detailed={{ data: response.results[0] }} />,
  //     {
  //       preloadedState: { resources: initialState },
  //     }
  //   );
  //   const loader = await screen.findByText('Loading...');
  //   expect(loader).toBeTruthy();
  // });
  it('Result list render correctly', async () => {
    renderWithProviders(
      <ResultList data={response} detailed={{ data: response.results[0] }} />,
      {
        preloadedState: { resources: initialState },
      }
    );
    const cards = await screen.findAllByText('Name:');
    expect(cards.length).toEqual(response.results.length);
  });
  it('Should displays "There is nothing here"', async () => {
    renderWithProviders(
      <ResultList
        data={{ ...response, error: 'There is nothing here' }}
        detailed={{ data: response.results[0] }}
      />,
      {
        preloadedState: { resources: initialState },
      }
    );
    const result = await screen.findByText('There is nothing here');
    expect(result).toBeTruthy();
  });
  it('Should render locations list', async () => {
    renderWithProviders(
      <ResultList data={location} detailed={{ data: location.results[0] }} />,
      {
        preloadedState: { resources: initialState },
      }
    );
    const cards = await screen.findAllByText('Dimension:');
    expect(cards.length).toEqual(location.results.length);
  });
  it('Should render episodes list', async () => {
    renderWithProviders(
      <ResultList data={episode} detailed={{ data: episode.results[0] }} />,
      {
        preloadedState: { resources: initialState },
      }
    );
    const cards = await screen.findAllByText('Episode:');
    expect(cards.length).toEqual(episode.results.length);
  });
});
