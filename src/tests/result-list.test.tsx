import { describe, expect, it } from 'vitest';
import { screen } from '@testing-library/react';
import ResultList from '../components/result-list/result-list.tsx';
import { response, location, episode } from './mock.ts';
import { renderWithProviders } from './test-utils.tsx';
import { MemoryRouter } from 'react-router';

const requestUrl = 'https://rickandmortyapi.com/api/character?page=1&name=rick';

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

const mockLocation = vi.fn();

vi.mock('react-router', async () => {
  const actual = await vi.importActual('react-router');
  return {
    ...actual,
    useNavigation: vi.fn(() => ({
      location: mockLocation,
    })),
  };
});

describe('Result list', () => {
  it('Should show loader', () => {
    mockLocation.mockReturnValue(true);
    renderWithProviders(
      <MemoryRouter>
        <ResultList data={response} />
      </MemoryRouter>,
      {
        preloadedState: { resources: initialState },
      }
    );
    const loader = screen.getByText('Loading...');
    expect(loader).toBeTruthy();
  });
  it('Result list render correctly', async () => {
    renderWithProviders(
      <MemoryRouter>
        <ResultList data={response} />
      </MemoryRouter>,
      {
        preloadedState: { resources: initialState },
      }
    );
    const cards = await screen.findAllByText('Name:');
    expect(cards.length).toEqual(response.results.length);
  });
  it('Should displays "There is nothing here"', async () => {
    renderWithProviders(
      <MemoryRouter>
        <ResultList
          data={{
            results: [],
            info: { pages: 1, count: 0, prev: null, next: null },
          }}
        />
      </MemoryRouter>,
      {
        preloadedState: { resources: initialState },
      }
    );
    const result = await screen.findByText('There is nothing here');
    expect(result).toBeTruthy();
  });
  it('Should render locations list', async () => {
    renderWithProviders(
      <MemoryRouter>
        <ResultList data={location} />
      </MemoryRouter>,
      {
        preloadedState: { resources: initialState },
      }
    );
    const cards = await screen.findAllByText('Dimension:');
    expect(cards.length).toEqual(location.results.length);
  });
  it('Should render episodes list', async () => {
    renderWithProviders(
      <MemoryRouter>
        <ResultList data={episode} />
      </MemoryRouter>,
      {
        preloadedState: { resources: initialState },
      }
    );
    const cards = await screen.findAllByText('Episode:');
    expect(cards.length).toEqual(episode.results.length);
  });
});
