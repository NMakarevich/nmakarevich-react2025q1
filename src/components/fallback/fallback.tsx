import './fallback.scss';
import Button from '../ui/button/button.tsx';
import React from 'react';

interface Props {
  error: Error | null;
  resetError: () => void;
}

function Fallback(props: Props): React.ReactNode {
  const { error, resetError } = props;

  return (
    <div className={'error'}>
      <h2 className={'error-title'}>Something went wrong!</h2>
      <p className={'error-message'}>
        <span>Details: </span>
        {error?.message}
      </p>
      <Button title={'Reset Error'} handleClick={resetError} />
    </div>
  );
}

export default Fallback;
