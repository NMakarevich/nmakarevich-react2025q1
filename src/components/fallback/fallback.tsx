import { Component } from 'react';
import './fallback.scss';
import Button from '../ui/button/button.tsx';

interface Props {
  error: Error | null;
  resetError: () => void;
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
        <Button title={'Reset Error'} handleClick={this.props.resetError} />
      </div>
    );
  }
}

export default Fallback;
