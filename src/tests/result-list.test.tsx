import { describe, expect, it } from 'vitest';
import { screen } from '@testing-library/react';
import ResultList from '../components/result-list/result-list.tsx';
import { response, location, episode } from './mock.ts';
import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';
import { renderWithProviders } from './test-utils.tsx';

const requestUrl = 'https://rickandmortyapi.com/api/character?page=1&name=rick';

const server = setupServer(
  http.get(requestUrl, () => {
    return HttpResponse.json(response);
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('Result list', () => {
  it('Should show loader', () => {
    const initialState = {
      resource: 'characters',
      url: 'https://rickandmortyapi.com/api/character',
      requestUrl: requestUrl,
    };
    renderWithProviders(<ResultList />, {
      preloadedState: { resources: initialState },
    });
    const loader = screen.getByText('Loading...');
    expect(loader).toBeTruthy();
  });
  it('Result list render correctly', async () => {
    const initialState = {
      resource: 'characters',
      url: 'https://rickandmortyapi.com/api/character',
      requestUrl: requestUrl,
    };
    renderWithProviders(<ResultList />, {
      preloadedState: { resources: initialState },
    });
    const cards = await screen.findAllByText('Name:');
    expect(cards.length).toEqual(response.results.length);
  });
  it('Should displays "There is nothing here"', async () => {
    server.use(
      http.get(requestUrl, () => {
        return HttpResponse.json(
          { error: 'There is nothing here' },
          { status: 404 }
        );
      })
    );
    const initialState = {
      resource: 'characters',
      url: 'https://rickandmortyapi.com/api/character',
      requestUrl: requestUrl,
    };
    renderWithProviders(<ResultList />, {
      preloadedState: { resources: initialState },
    });
    const result = await screen.findByText('There is nothing here');
    expect(result).toBeTruthy();
  });
  it('Should render locations list', async () => {
    server.use(
      http.get(requestUrl, () => {
        return HttpResponse.json(location);
      })
    );
    const initialState = {
      resource: 'characters',
      url: 'https://rickandmortyapi.com/api/character',
      requestUrl: requestUrl,
    };
    renderWithProviders(<ResultList />, {
      preloadedState: { resources: initialState },
    });
    const cards = await screen.findAllByText('Dimension:');
    expect(cards.length).toEqual(location.results.length);
  });
  it('Should render episodes list', async () => {
    server.use(
      http.get(requestUrl, () => {
        return HttpResponse.json(episode);
      })
    );
    const initialState = {
      resource: 'characters',
      url: 'https://rickandmortyapi.com/api/character',
      requestUrl: requestUrl,
    };
    renderWithProviders(<ResultList />, {
      preloadedState: { resources: initialState },
    });
    const cards = await screen.findAllByText('Episode:');
    expect(cards.length).toEqual(episode.results.length);
  });
});
