'use client';

import React, { ReactNode, useEffect, useState } from 'react';
import { FavouritesContext } from './favourites.context.ts';
import { Card, Favourites } from '../../interfaces.ts';
import { useParams } from 'next/navigation';

function FavouritesProvider({
  children,
}: {
  children: ReactNode;
}): React.ReactNode {
  const params = useParams<{ resource: string[] }>();
  const [favouritesObj, setFavouritesObj] = useState<Favourites>({});
  const [resource, setResource] = useState<string>(initParams);

  function initParams() {
    if (params && params.resource) return params.resource[0];
    else return '';
  }

  useEffect(() => {
    if (params && params.resource) {
      const [resource] = params.resource;
      setResource(resource);
    }
  }, [params]);

  function unselectAll() {
    setFavouritesObj({});
  }

  function addToFavourites(resource: string, item: Card) {
    if (Array.isArray(favouritesObj[resource])) {
      setFavouritesObj({
        ...favouritesObj,
        [resource]: [...favouritesObj[resource], item],
      });
    } else setFavouritesObj({ ...favouritesObj, [resource]: [item] });
  }

  function removeFromFavourites(resource: string, id: number) {
    setFavouritesObj({
      ...favouritesObj,
      [resource]: favouritesObj[resource].filter((item) => item.id !== id),
    });
  }

  function getFavouritesIds() {
    if (!favouritesObj[resource]) return [];
    return favouritesObj[resource].map((item) => item.id);
  }

  function getFavourites() {
    return favouritesObj;
  }

  return (
    <FavouritesContext.Provider
      value={{
        getFavouritesIds,
        getFavourites,
        addToFavourites,
        removeFromFavourites,
        unselectAll,
      }}
    >
      {children}
    </FavouritesContext.Provider>
  );
}

export default FavouritesProvider;
