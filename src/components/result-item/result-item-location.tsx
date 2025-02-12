import React from 'react';
import { Location } from '../../interfaces.ts';

interface Props {
  result: Location;
}

function ResultItemLocation(props: Props): React.ReactNode {
  const { result } = props;
  return (
    <ul className={'result-item_info-list'}>
      <li className={'result-item_info-item'}>
        <span className={'info-title'}>Name:</span> {result.name}
      </li>
      <li className={'result-item_info-item'}>
        <span className={'info-title'}>Dimension:</span> {result.dimension}
      </li>
    </ul>
  );
}

export default ResultItemLocation;
