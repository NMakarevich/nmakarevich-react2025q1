import React from 'react';
import { Card } from '../../interfaces.ts';
import './result-item.scss';
import ResultItemCharacter from './result-item-character.tsx';
import ResultItemLocation from './result-item-location.tsx';
import ResultItemEpisode from './result-item-episode.tsx';
import FavouriteCheckbox from '../favourite-checkbox/favourite-checkbox.tsx';

interface Props {
  result: Card;
}

function ResultItem(props: Props): React.ReactNode {
  const { result } = props;

  function selectCard() {
    if ('image' in result && result.image)
      return <ResultItemCharacter result={result} />;
    if ('residents' in result && result.residents)
      return <ResultItemLocation result={result} />;
    if ('air_date' in result && result.air_date)
      return <ResultItemEpisode result={result} />;
  }

  return (
    <div className={'result-item'}>
      {selectCard()}
      <FavouriteCheckbox result={result} />{' '}
    </div>
  );
}

export default ResultItem;
