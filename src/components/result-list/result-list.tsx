import { Component } from 'react';
import { Character, Episode, Location } from '../../interfaces.ts';
import ResultItem from '../result-item/result-item.tsx';
import './result-list.scss';

type State = object;

interface Props {
  results: Character[] | Location[] | Episode[];
}

class ResultList extends Component<Props, State> {
  render() {
    const { results } = this.props;
    return (
      <div className={'result-list'}>
        {results &&
          results.length > 0 &&
          results.map((result) => (
            <ResultItem key={result.id} result={result} />
          ))}
      </div>
    );
  }
}

export default ResultList;
