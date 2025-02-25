import React from 'react';
import { Character } from '../../interfaces.ts';

interface Props {
  result: Character;
}

function ResultItemCharacter(props: Props): React.ReactNode {
  const { result } = props;

  return (
    <ul className={'result-item_info-list'}>
      <li className={'result-item_info-item'}>
        <span className={'info-title'}>Name:</span> {result.name}
      </li>
      <li className={'result-item_info-item'}>
        <span className={'info-title'}>Gender:</span> {result.gender}
      </li>
      <li className={'result-item_info-item'}>
        <span className={'info-title'}>Status:</span> {result.status}
      </li>
    </ul>
  );
}

export default ResultItemCharacter;
