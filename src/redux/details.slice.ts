import { Character, Episode, Location } from '../interfaces.ts';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface DetailsSlice {
  details: Character | Location | Episode | null;
}

export const initialState: DetailsSlice = {
  details: null,
};

export const detailsSlice = createSlice({
  name: 'details',
  initialState,
  reducers: {
    saveDetails: (
      state: DetailsSlice,
      action: PayloadAction<Character | Location | Episode>
    ) => {
      state.details = action.payload;
    },
    deleteDetails: (state: DetailsSlice) => {
      state.details = null;
    },
  },
});

export const { saveDetails, deleteDetails } = detailsSlice.actions;

export default detailsSlice.reducer;
