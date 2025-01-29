import { Component } from 'react';
import './loading.scss';

type Props = object;
type State = object;

class Loading extends Component<Props, State> {
  render() {
    return (
      <div className="loading">
        <h3>Loading...</h3>
      </div>
    );
  }
}

export default Loading;
