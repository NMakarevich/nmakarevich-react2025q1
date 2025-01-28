import { Component } from 'react';
import './fallback.scss';

interface Props {
  error: Error | null;
}

type State = object;

class Fallback extends Component<Props, State> {
  render() {
    const { error } = this.props;
    return (
      <div className={'error'}>
        <h2 className={'error-title'}>Something went wrong!</h2>
        <p className={'error-message'}>
          <span>Details: </span>
          {error?.message}
        </p>
      </div>
    );
  }
}

export default Fallback;
