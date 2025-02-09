import { describe, expect } from 'vitest';
import { response } from './mock.ts';
import { fireEvent, render, screen } from '@testing-library/react';
import ResultItem from '../components/result-item/result-item.tsx';
import { BrowserRouter } from 'react-router';
import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';
import ResultList from '../components/result-list/result-list.tsx';

const requestUrl = 'https://rickandmortyapi.com/api/character/';

const server = setupServer(
  http.get(requestUrl, () => {
    return HttpResponse.json(response);
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('ResultItem', () => {
  it('Should render correctly', () => {
    const item = response.results[0];
    render(
      <BrowserRouter>
        <ResultItem result={item} />
      </BrowserRouter>
    );
    const name = 'Rick Sanchez';
    const nameInCard = screen.getByText(name).textContent;
    expect(nameInCard).toEqual('Name: Rick Sanchez');
  });
  it('Should open detailed card', async () => {
    const initialPath = window.location.pathname;
    render(
      <BrowserRouter>
        <ResultList requestUrl={requestUrl} />
      </BrowserRouter>
    );
    const cards = await screen.findAllByText('Name:');
    fireEvent.click(cards[0]);
    expect(initialPath === window.location.pathname).toBeFalsy();
  });
});
