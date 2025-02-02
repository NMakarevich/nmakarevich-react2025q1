import React from 'react';
import { Character, Episode, Location } from '../../interfaces.ts';
import './result-item.scss';
import ResultItemCharacter from './result-item-character.tsx';
import ResultItemLocation from './result-item-location.tsx';
import ResultItemEpisode from './result-item-episode.tsx';

interface Props {
  result: Character | Location | Episode;
}

function ResultItem(props: Props): React.ReactNode {
  const { result } = props;

  if ('image' in result && result.image)
    return <ResultItemCharacter result={result} />;
  if ('dimension' in result && result.dimension)
    return <ResultItemLocation result={result} />;
  if ('air_date' in result && result.air_date)
    return <ResultItemEpisode result={result} />;
}

export default ResultItem;
