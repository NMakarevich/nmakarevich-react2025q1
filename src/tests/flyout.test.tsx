import { describe, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Flyout from '../components/flyout/flyout.tsx';
import { FavouritesContext } from '../providers/favourites/favourites.context.ts';
import { response } from './mock.ts';

describe('Flyout test', () => {
  it('Should displays in screen when 1 card is selected', () => {
    window.URL.createObjectURL = vi.fn();
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
        <Flyout />
      </FavouritesContext.Provider>
    );
    const title = screen.getByText(/Selected/);
    const counter = title.textContent?.split(' ')[1];
    expect(counter).toBeTruthy();
    expect(parseInt(counter as string)).toEqual(1);
  });
});
