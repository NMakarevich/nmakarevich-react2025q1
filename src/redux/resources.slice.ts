import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store.ts';

interface ResourceSlice {
  resource: string;
  url: string;
}

const initialState: ResourceSlice = {
  resource: '',
  url: '',
};

const resourcesSlice = createSlice({
  name: 'resources',
  initialState,
  reducers: {
    setResource: (
      state: ResourceSlice,
      action: PayloadAction<Partial<ResourceSlice>>
    ) => {
      const { resource, url } = action.payload;
      if (resource && url) {
        state.url = url;
        state.resource = resource;
      }
    },
  },
});

const selectResourceState = (state: RootState) => state.resources;
export const selectResource = createSelector(
  selectResourceState,
  ({ resource }) => resource
);

export const { setResource } = resourcesSlice.actions;

export default resourcesSlice.reducer;
