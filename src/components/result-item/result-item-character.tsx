import React from 'react';
import { Character } from '../../interfaces.ts';

interface Props {
  result: Character;
}

function ResultItemCharacter(props: Props): React.ReactNode {
  const { result } = props;

  return (
    <div className={'result-item result-item_character'}>
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
    </div>
  );
}

export default ResultItemCharacter;
