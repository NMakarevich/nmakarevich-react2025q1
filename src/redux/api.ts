import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from '../constants.ts';
import { Card, Response } from '../interfaces.ts';

export const rickAndMortyApi = createApi({
  reducerPath: 'rickAndMortyApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (build) => ({
    getCards: build.query<Response, string>({
      query: (url: string) => url.split(API_URL)[1],
    }),
    getCard: build.query<Card, string>({
      query: (url: string) => url,
    }),
  }),
});

export const { useGetCardsQuery, useGetCardQuery } = rickAndMortyApi;
