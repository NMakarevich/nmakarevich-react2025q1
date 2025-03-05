import { createContext } from 'react';
import { IFavourites } from '../../interfaces.ts';

export const FavouritesContext = createContext<IFavourites>({
  getFavouritesIds: () => [],
  getFavourites: () => ({}),
  addToFavourites: () => {},
  removeFromFavourites: () => {},
  unselectAll: () => {},
});
