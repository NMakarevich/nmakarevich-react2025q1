import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from '../constants.ts';
import { Card, Resources, Response } from '../interfaces.ts';
import { createSelector } from '@reduxjs/toolkit';

export const rickAndMortyApi = createApi({
  reducerPath: 'rickAndMortyApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (build) => ({
    getResources: build.query<Resources, void>({
      query: () => '',
    }),
    getCards: build.query<Response, string>({
      query: (url: string) => url.split(API_URL)[1],
    }),
    getCard: build.query<Card, string>({
      query: (url: string) => url,
    }),
  }),
});

const selectResourcesResult = rickAndMortyApi.endpoints.getResources.select();
export const selectResources = createSelector(
  selectResourcesResult,
  (resources) => resources?.data
);

export const { useGetResourcesQuery, useGetCardsQuery, useGetCardQuery } =
  rickAndMortyApi;
