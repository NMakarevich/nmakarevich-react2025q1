import React from 'react';
import { Episode } from '../../interfaces.ts';

interface Props {
  result: Episode;
}

function ResultItemEpisode(props: Props): React.ReactNode {
  const { result } = props;

  return (
    <ul className={'result-item_info-list'}>
      <li className={'result-item_info-item'}>
        <span className={'info-title'}>Name:</span> {result.name}
      </li>
      <li className={'result-item_info-item'}>
        <span className={'info-title'}>Episode:</span> {result.episode}
      </li>
    </ul>
  );
}

export default ResultItemEpisode;
