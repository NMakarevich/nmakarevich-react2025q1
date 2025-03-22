export interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  created: string;
}

export interface Location {
  id: number;
  name: string;
  type: string;
  dimension: string;
  residents: string[];
  url: string;
  created: string;
}

export interface Episode {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: string[];
  url: string;
  created: string;
}

export interface CardsResponse {
  results: Card[];
  info: ResponseInfo;
  error?: string;
}

export type Card = Character | Location | Episode;

export interface ResponseInfo {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
}

export type DetailedResponse = Card | { error: string };

export interface IThemeContext {
  isSwitched: boolean;
  setIsSwitched: (isSwitched: boolean) => void;
}

export interface ResponseError {
  status: number;
  data: {
    error: string;
  };
}

export interface IResourceContext {
  selectedResource: string;
  setSelectedResource: (resource: string) => void;
}

export interface SearchParams {
  resource: string;
  id: string | undefined;
  page: string;
  name: string | undefined;
}

export type Favourites = { [key: string]: Card[] };

export interface IFavourites {
  getFavouritesIds: () => number[];
  getFavourites: () => Favourites;
  addToFavourites: (resource: string, item: Card) => void;
  removeFromFavourites: (resource: string, id: number) => void;
  unselectAll: () => void;
}
