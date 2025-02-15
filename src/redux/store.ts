import { configureStore } from '@reduxjs/toolkit';
import favouritesReducer from './favourites.slice.ts';
import detailsReducer from './details.slice.ts';
import resourcesReducer from './resources.slice.ts';
import { useDispatch, useSelector } from 'react-redux';
import { rickAndMortyApi } from './api.ts';
import { setupListeners } from '@reduxjs/toolkit/query';

export const store = configureStore({
  reducer: {
    favourites: favouritesReducer,
    details: detailsReducer,
    resources: resourcesReducer,
    [rickAndMortyApi.reducerPath]: rickAndMortyApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(rickAndMortyApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
