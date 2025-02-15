import { describe, expect, vi } from 'vitest';
import { fireEvent, screen } from '@testing-library/react';
import DetailedItem from '../components/detailed-item/detailed-item.tsx';
import { Params } from 'react-router';
import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';
import { episode, location, response } from './mock.ts';
import '@testing-library/jest-dom';
import { renderWithProviders } from './test-utils.tsx';

const requestUrl = 'https://rickandmortyapi.com/api/character/1';

const server = setupServer(
  http.get(requestUrl, () => {
    return HttpResponse.json(response.results[0]);
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

vi.mock('react-router', async (importOriginal) => {
  const actual = (await importOriginal()) as typeof import('react-router');
  return {
    ...actual,
    useParams: (): Readonly<Params<string>> => ({
      resource: 'characters',
      id: '1',
    }),
  };
});

describe('Detailed Item', () => {
  it('Should display loader', () => {
    renderWithProviders(<DetailedItem />);
    const loader = screen.getByText('Loading...');
    expect(loader).toBeTruthy();
  });
  it('Should display detailed item', async () => {
    renderWithProviders(<DetailedItem />);
    const card = await screen.findByText('Name:');
    expect(card).toBeTruthy();
  });
  it('Should close detailed item', async () => {
    window.history.pushState(null, '', '/search/characters/1');
    renderWithProviders(<DetailedItem />);
    const button = await screen.findByText('Close');
    const prevPath = window.location.pathname;
    fireEvent.click(button);
    const currentPath = window.location.pathname;
    expect(prevPath).not.toEqual(currentPath);
  });
  it('Should render location card', async () => {
    server.use(
      http.get(requestUrl, () => {
        return HttpResponse.json(location.results[0]);
      })
    );
    renderWithProviders(<DetailedItem />);
    const dimension = await screen.findByText(location.results[0].dimension);
    expect(dimension).toBeInTheDocument();
  });
  it('Should render episode card', async () => {
    server.use(
      http.get(requestUrl, () => {
        return HttpResponse.json(episode.results[0]);
      })
    );
    renderWithProviders(<DetailedItem />);
    const air_date = await screen.findByText(episode.results[0].air_date);
    expect(air_date).toBeInTheDocument();
  });
});
