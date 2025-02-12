import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store.ts';
import { Character, Episode, Location } from '../interfaces.ts';

export interface FavouritesState {
  favourites: { [key: string]: (Character | Location | Episode)[] };
  resource: string;
}

const initialState: FavouritesState = {
  favourites: {},
  resource: '',
};

export const favouritesSlice = createSlice({
  name: 'favourites',
  initialState,
  reducers: {
    setResource: (state: FavouritesState, action: PayloadAction<string>) => {
      state.resource = action.payload;
    },
    addFavourite: (
      state: FavouritesState,
      action: PayloadAction<Character | Location | Episode>
    ) => {
      if (Array.isArray(state.favourites[state.resource]))
        state.favourites[state.resource].push(action.payload);
      else state.favourites[state.resource] = [action.payload];
    },
    removeFavourite: (
      state: FavouritesState,
      action: PayloadAction<Character | Location | Episode>
    ) => {
      state.favourites[state.resource] = state.favourites[
        state.resource
      ].filter((item) => item.id !== action.payload.id);
    },
    unselectAll: (state) => {
      state.favourites = {};
    },
  },
});

const selectFavouritesState = (state: RootState) => state.favourites;
const selectFavourites = createSelector(
  selectFavouritesState,
  (state) => state.favourites
);
const selectResource = createSelector(
  selectFavouritesState,
  (state) => state.resource
);
export const selectFavouritesForResource = createSelector(
  selectFavourites,
  selectResource,
  (favourites, resource) => {
    if (favourites[resource])
      return favourites[resource].map((item) => item.id);
    return [];
  }
);

export const { setResource, addFavourite, removeFavourite, unselectAll } =
  favouritesSlice.actions;

export default favouritesSlice.reducer;
