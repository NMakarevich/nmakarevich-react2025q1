import { Card } from '../interfaces.ts';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface DetailsSlice {
  details: Card | null;
}

export const initialState: DetailsSlice = {
  details: null,
};

export const detailsSlice = createSlice({
  name: 'details',
  initialState,
  reducers: {
    saveDetails: (state: DetailsSlice, action: PayloadAction<Card>) => {
      state.details = action.payload;
    },
    deleteDetails: (state: DetailsSlice) => {
      state.details = null;
    },
  },
});

export const { saveDetails, deleteDetails } = detailsSlice.actions;

export default detailsSlice.reducer;
