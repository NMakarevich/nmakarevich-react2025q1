import { Component } from 'react';
import './button.scss';

interface Props {
  title: string;
  handleClick: () => void;
}

type State = object;

class Button extends Component<Props, State> {
  render() {
    return (
      <>
        <button
          className={'button'}
          type="button"
          onClick={this.props.handleClick}
        >
          {this.props.title}
        </button>
      </>
    );
  }
}

export default Button;
