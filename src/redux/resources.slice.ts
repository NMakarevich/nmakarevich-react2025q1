import {
  createAsyncThunk,
  createSelector,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import { RootState } from './store.ts';
import { API_URL } from '../constants.ts';

interface Resources {
  [resource: string]: string;
}

interface ResourceSlice {
  resource: string;
  url: string;
  requestUrl: string;
  resources: Resources | null;
}

const initialState: ResourceSlice = {
  resource: '',
  url: '',
  requestUrl: '',
  resources: null,
};

export const fetchResources = createAsyncThunk(
  'resources/fetchResources',
  async () => {
    const response = await fetch(API_URL);
    return response.json();
  }
);

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
  extraReducers: (builder) => {
    builder.addCase(fetchResources.fulfilled, (state, action) => {
      state.resources = action.payload;
    });
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
export const selectResources = createSelector(
  selectResourceState,
  ({ resources }) => resources
);

export const { setResource, setRequestUrl } = resourcesSlice.actions;

export default resourcesSlice.reducer;
