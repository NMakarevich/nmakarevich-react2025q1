'use client';

import React, {
  ChangeEvent,
  ReactElement,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useParams } from 'next/navigation';
import { Card } from '../../interfaces.ts';
import styles from './favourite-checkbox.module.scss';
import { FavouritesContext } from '../../providers/favourites/favourites.context.ts';
import { RESOURCES } from '../../constants.ts';

function FavouriteCheckbox(props: { result: Card }): ReactElement {
  const { result } = props;
  const params = useParams<{ resource: string[] }>();
  const resource = params ? params.resource[0] : RESOURCES[0];
  const { getFavouritesIds, addToFavourites, removeFromFavourites } =
    useContext(FavouritesContext);
  const [isChecked, setIsChecked] = useState(isCheckedInit);

  function isCheckedInit() {
    if (getFavouritesIds()) {
      return getFavouritesIds().includes(result.id);
    }
    return false;
  }

  useEffect(() => {
    if (getFavouritesIds()) {
      if (getFavouritesIds().includes(result.id)) setIsChecked(true);
      else setIsChecked(false);
    }
  }, [getFavouritesIds, resource, result]);

  function toggleFavourite(event: React.MouseEvent<HTMLElement>) {
    event.stopPropagation();
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { target } = event;
    if (resource) {
      if (!target.checked) removeFromFavourites(resource[0], result.id);
      else addToFavourites(resource[0], result);
    }
    setIsChecked(!isChecked);
  }

  return (
    <input
      className={styles['result-item_favourite']}
      type={'checkbox'}
      onClick={toggleFavourite}
      checked={isChecked}
      onChange={handleChange}
    />
  );
}

export default FavouriteCheckbox;
