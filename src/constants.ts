export const LOCAL_STORAGE_KEYS = {
  search: 'search',
  resource: 'resource',
};

export const API_URL = 'https://rickandmortyapi.com/api';

export const API_ENDPOINTS: Record<string, string> = {
  characters: 'https://rickandmortyapi.com/api/character',
  locations: 'https://rickandmortyapi.com/api/location',
  episodes: 'https://rickandmortyapi.com/api/episode',
};

export const RESOURCES = Object.keys(API_ENDPOINTS);
