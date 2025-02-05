import { Episode } from '../../interfaces.ts';
import React from 'react';

interface Props {
  item: Episode;
}

function DetailedItemEpisode(props: Props): React.ReactNode {
  const { item } = props;

  return (
    <>
      <ul className={'result-item_info-list'}>
        <li className={'result-item_info-item'}>
          <span className={'info-title'}>Name:</span> {item.name}
        </li>
        <li className={'result-item_info-item'}>
          <span className={'info-title'}>Air Date:</span>{' '}
          {item.air_date || 'unknown'}
        </li>
        <li className={'result-item_info-item'}>
          <span className={'info-title'}>Episode:</span> {item.episode}
        </li>
        <li className={'result-item_info-item'}>
          <span className={'info-title'}>Characters: </span>
          {item.characters.length}
        </li>
      </ul>
    </>
  );
}

export default DetailedItemEpisode;
