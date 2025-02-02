import React from 'react';
import { Location } from '../../interfaces.ts';

interface Props {
  result: Location;
}

function ResultItemLocation(props: Props): React.ReactNode {
  const { result } = props;
  return (
    <div className={'result-item result-item_location'}>
      <ul className={'result-item_info-list'}>
        <li className={'result-item_info-item'}>
          <span className={'info-title'}>Name:</span> {result.name}
        </li>
        <li className={'result-item_info-item'}>
          <span className={'info-title'}>Type:</span> {result.type || 'unknown'}
        </li>
        <li className={'result-item_info-item'}>
          <span className={'info-title'}>Dimension:</span> {result.dimension}
        </li>
        <li className={'result-item_info-item'}>
          <span className={'info-title'}>Residents:</span>{' '}
          {result.residents.length}
        </li>
      </ul>
    </div>
  );
}

export default ResultItemLocation;
