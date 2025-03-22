import { describe, expect, vi } from 'vitest';
import FavouriteCheckbox from '../components/favourite-checkbox/favourite-checkbox.tsx';
import { response } from './mock.ts';
import { fireEvent, render, screen } from '@testing-library/react';
import { FavouritesContext } from '../providers/favourites/favourites.context.ts';

vi.mock('next/navigation', async () => ({
  useParams: () => ({
    resource: ['character'],
  }),
}));

describe('FavouriteCheckbox', () => {
  it('Should be checked', () => {
    render(
      <FavouritesContext.Provider
        value={{
          getFavouritesIds: () => [1],
          getFavourites: () => ({
            resources: [response.results[0]],
          }),
          addToFavourites: () => {},
          removeFromFavourites: () => {},
          unselectAll: () => {},
        }}
      >
        <FavouriteCheckbox result={response.results[0]} />
      </FavouritesContext.Provider>
    );
    const checkbox: HTMLInputElement = screen.getByRole('checkbox');
    expect(checkbox.checked).toBeTruthy();
  });
  it('Should not be checked', () => {
    render(
      <FavouritesContext.Provider
        value={{
          getFavouritesIds: () => [1],
          getFavourites: () => ({
            resources: [response.results[0]],
          }),
          addToFavourites: () => {},
          removeFromFavourites: () => {},
          unselectAll: () => {},
        }}
      >
        <FavouriteCheckbox result={response.results[0]} />
      </FavouritesContext.Provider>
    );
    const checkbox: HTMLInputElement = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    expect(checkbox.checked).toBeFalsy();
  });
});
