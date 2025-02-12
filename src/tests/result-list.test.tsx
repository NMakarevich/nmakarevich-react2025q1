import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import ResultList from '../components/result-list/result-list.tsx';
import { response, location, episode } from './mock.ts';
import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';
import { BrowserRouter } from 'react-router';
import { Provider } from 'react-redux';
import { store } from '../redux/store.ts';

const requestUrl = 'https://rickandmortyapi.com/api/character/';

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
    render(
      <BrowserRouter>
        <Provider store={store}>
          <ResultList requestUrl={requestUrl} />
        </Provider>
      </BrowserRouter>
    );
    const loader = screen.getByText('Loading...');
    expect(loader).toBeTruthy();
  });
  it('Result list render correctly', async () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <ResultList requestUrl={requestUrl} />
        </Provider>
      </BrowserRouter>
    );
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
    render(
      <BrowserRouter>
        <Provider store={store}>
          <ResultList requestUrl={requestUrl} />
        </Provider>
      </BrowserRouter>
    );
    const result = await screen.findByText('There is nothing here');
    expect(result).toBeTruthy();
  });
  it('Should render locations list', async () => {
    server.use(
      http.get(requestUrl, () => {
        return HttpResponse.json(location);
      })
    );
    render(
      <BrowserRouter>
        <Provider store={store}>
          <ResultList requestUrl={requestUrl} />
        </Provider>
      </BrowserRouter>
    );
    const cards = await screen.findAllByText('Dimension:');
    expect(cards.length).toEqual(location.results.length);
  });
  it('Should render episodes list', async () => {
    server.use(
      http.get(requestUrl, () => {
        return HttpResponse.json(episode);
      })
    );
    render(
      <BrowserRouter>
        <Provider store={store}>
          <ResultList requestUrl={requestUrl} />
        </Provider>
      </BrowserRouter>
    );
    const cards = await screen.findAllByText('Episode:');
    expect(cards.length).toEqual(episode.results.length);
  });
});
