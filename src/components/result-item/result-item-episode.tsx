import React from 'react';
import { Episode } from '../../interfaces.ts';

interface Props {
  result: Episode;
}

function ResultItemEpisode(props: Props): React.ReactNode {
  const { result } = props;

  return (
    <div className={'result-item result-item_episode'}>
      <ul className={'result-item_info-list'}>
        <li className={'result-item_info-item'}>
          <span className={'info-title'}>Name:</span> {result.name}
        </li>
        <li className={'result-item_info-item'}>
          <span className={'info-title'}>Air Date:</span>{' '}
          {result.air_date || 'unknown'}
        </li>
        <li className={'result-item_info-item'}>
          <span className={'info-title'}>Episode:</span> {result.episode}
        </li>
      </ul>
    </div>
  );
}

export default ResultItemEpisode;
