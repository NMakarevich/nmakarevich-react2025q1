import React from 'react';
import './response-error.scss';

interface Props {
  status: number;
  message: string;
}

function ResponseError(props: Props): React.ReactNode {
  const { status, message } = props;

  return (
    <div className={'response-error'}>
      <span className={'response-error_status'}>Status code: {status}</span>
      <p className={'response-error_message'}>{message}</p>
    </div>
  );
}

export default ResponseError;
