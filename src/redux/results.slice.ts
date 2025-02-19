import { Card } from '../interfaces.ts';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ResultsSlice {
  results: Card[];
}

const initialState: ResultsSlice = {
  results: [],
};

export const resultsSlice = createSlice({
  name: 'results',
  initialState,
  reducers: {
    setResults: (state: ResultsSlice, action: PayloadAction<Card[]>) => {
      state.results = action.payload;
    },
  },
});

export const { setResults } = resultsSlice.actions;

export default resultsSlice.reducer;
