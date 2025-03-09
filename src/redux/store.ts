import { combineReducers, configureStore } from '@reduxjs/toolkit';
import favouritesReducer from './favourites.slice.ts';
import detailsReducer from './details.slice.ts';
import resourcesReducer from './resources.slice.ts';
import resultsReducer from './results.slice.ts';
import { useDispatch, useSelector } from 'react-redux';
import { setupListeners } from '@reduxjs/toolkit/query';

export const store = configureStore({
  reducer: {
    favourites: favouritesReducer,
    details: detailsReducer,
    resources: resourcesReducer,
    results: resultsReducer,
  },
});

setupListeners(store.dispatch);

const rootReducer = combineReducers({
  favourites: favouritesReducer,
  details: detailsReducer,
  resources: resourcesReducer,
  results: resultsReducer,
});

export const setupStore = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
};

export type RootState = ReturnType<typeof store.getState>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
