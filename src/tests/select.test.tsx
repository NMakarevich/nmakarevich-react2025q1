import { describe, expect } from 'vitest';
import { fireEvent, screen } from '@testing-library/react';
import SelectResource from '../components/selectResource/selectResource.tsx';
import { renderWithProviders } from './test-utils.tsx';
import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';

const requestUrl = 'https://rickandmortyapi.com/api/';

const response = {
  characters: 'https://rickandmortyapi.com/api/character',
  locations: 'https://rickandmortyapi.com/api/location',
  episodes: 'https://rickandmortyapi.com/api/episode',
};

const server = setupServer(
  http.get(requestUrl, () => {
    return HttpResponse.json(response);
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('Select test', () => {
  it('Should change selected item', async () => {
    const initialState = {
      resources: {
        characters: 'https://rickandmortyapi.com/api/character',
        locations: 'https://rickandmortyapi.com/api/location',
        episodes: 'https://rickandmortyapi.com/api/episode',
      },
      resource: 'characters',
      url: 'https://rickandmortyapi.com/api/character',
      requestUrl: 'https://rickandmortyapi.com/api/character?page=1',
    };
    const { container } = renderWithProviders(<SelectResource />, {
      preloadedState: { resources: initialState },
    });
    const selectList = screen.getAllByText(Object.keys(response)[0]);
    fireEvent.click(selectList[0]);
    const secondOption = container.querySelectorAll('.select-option')[1];
    fireEvent.click(secondOption);
    const selectValue = container.querySelector('.select-value');
    expect(selectValue?.textContent).toEqual(Object.keys(response)[1]);
  });
});
