import { Component } from 'react';
import './response-error.scss';

interface Props {
  status: number;
  message: string;
}

type State = object;

class ResponseError extends Component<Props, State> {
  render() {
    const { status, message } = this.props;
    return (
      <div className={'response-error'}>
        <span className={'response-error_status'}>Status code: {status}</span>
        <p className={'response-error_message'}>{message}</p>
      </div>
    );
  }
}

export default ResponseError;
