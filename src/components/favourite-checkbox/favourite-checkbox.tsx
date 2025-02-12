import React, { ChangeEvent, ReactElement, useEffect, useState } from 'react';
import {
  addFavourite,
  removeFavourite,
  selectFavouritesForResource,
} from '../../redux/favourites.slice.ts';
import { useAppDispatch, useAppSelector } from '../../redux/store.ts';
import { useParams } from 'react-router';
import { Character, Episode, Location } from '../../interfaces.ts';
import './favourite-checkbox.scss';

function FavouriteCheckbox(props: {
  result: Character | Location | Episode;
}): ReactElement {
  const { result } = props;
  const { resource } = useParams();
  const dispatch = useAppDispatch();
  const favourites = useAppSelector(selectFavouritesForResource);
  const [isChecked, setIsChecked] = useState(isCheckedInit);

  function isCheckedInit() {
    if (favourites) {
      return favourites.includes(result.id);
    }
    return false;
  }

  useEffect(() => {
    if (favourites) {
      if (favourites.includes(result.id)) setIsChecked(true);
      else setIsChecked(false);
    }
  }, [favourites, result]);

  function toggleFavourite(event: React.MouseEvent<HTMLElement>) {
    event.stopPropagation();
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { target } = event;
    if (resource) {
      if (!target.checked) dispatch(removeFavourite(result));
      else dispatch(addFavourite(result));
    }
    setIsChecked(!isChecked);
  }

  return (
    <input
      className={'result-item_favourite'}
      type={'checkbox'}
      onClick={toggleFavourite}
      checked={isChecked}
      onChange={handleChange}
    />
  );
}

export default FavouriteCheckbox;
