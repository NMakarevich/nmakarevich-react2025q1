import { Character } from '../../interfaces.ts';
import React from 'react';

interface Props {
  item: Character;
}

function DetailedItemCharacter(props: Props): React.ReactNode {
  const { item } = props;

  return (
    <>
      <img className={'result-item-image'} src={item.image} alt={item.name} />
      <ul className={'result-item_info-list'}>
        <li className={'result-item_info-item'}>
          <span className={'info-title'}>Name:</span> {item.name}
        </li>
        <li className={'result-item_info-item'}>
          <span className={'info-title'}>Gender:</span> {item.gender}
        </li>
        <li className={'result-item_info-item'}>
          <span className={'info-title'}>Type:</span> {item.type || 'unknown'}
        </li>
        <li className={'result-item_info-item'}>
          <span className={'info-title'}>Status:</span> {item.status}
        </li>
        <li className={'result-item_info-item'}>
          <span className={'info-title'}>Species:</span>{' '}
          {item.species || 'unknown'}
        </li>
        <li className={'result-item_info-item'}>
          <span className={'info-title'}>Origin:</span> {item.origin.name}
        </li>
        <li className={'result-item_info-item'}>
          <span className={'info-title'}>Location:</span> {item.location.name}
        </li>
        <li className={'result-item_info-item'}>
          <span className={'info-title'}>Episodes:</span> {item.episode.length}
        </li>
      </ul>
    </>
  );
}

export default DetailedItemCharacter;
