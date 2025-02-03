import { Component } from 'react';
import { Character } from '../../interfaces.ts';

interface Props {
  result: Character;
}

type State = object;

class ResultItemCharacter extends Component<Props, State> {
  render() {
    const { result } = this.props;
    return (
      <div className={'result-item result-item_character'}>
        <img
          className={'result-item-image'}
          src={result.image}
          alt={result.name}
        />
        <ul className={'result-item_info-list'}>
          <li className={'result-item_info-item'}>
            <span className={'info-title'}>Name:</span> {result.name}
          </li>
          <li className={'result-item_info-item'}>
            <span className={'info-title'}>Gender:</span> {result.gender}
          </li>
          <li className={'result-item_info-item'}>
            <span className={'info-title'}>Type:</span>{' '}
            {result.type || 'unknown'}
          </li>
          <li className={'result-item_info-item'}>
            <span className={'info-title'}>Status:</span> {result.status}
          </li>
          <li className={'result-item_info-item'}>
            <span className={'info-title'}>Origin:</span> {result.origin.name}
          </li>
          <li className={'result-item_info-item'}>
            <span className={'info-title'}>Location:</span>{' '}
            {result.location.name}
          </li>
        </ul>
      </div>
    );
  }
}

export default ResultItemCharacter;
