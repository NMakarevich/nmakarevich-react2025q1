import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store.ts';

interface ResourceSlice {
  resource: string;
  url: string;
  requestUrl: string;
}

const initialState: ResourceSlice = {
  resource: '',
  url: '',
  requestUrl: '',
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
    setRequestUrl: (state: ResourceSlice, action: PayloadAction<string>) => {
      state.requestUrl = action.payload;
    },
  },
});

const selectResourceState = (state: RootState) => state.resources;
export const selectResource = createSelector(
  selectResourceState,
  ({ resource }) => resource
);
export const selectUrl = createSelector(selectResourceState, ({ url }) => url);
export const selectRequestUrl = createSelector(
  selectResourceState,
  ({ requestUrl }) => requestUrl
);

export const { setResource, setRequestUrl } = resourcesSlice.actions;

export default resourcesSlice.reducer;
