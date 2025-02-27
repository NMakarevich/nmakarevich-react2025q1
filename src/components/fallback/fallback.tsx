import Button from '../ui/button/button.tsx';
import React from 'react';
import styles from './fallback.module.scss';

interface Props {
  error: Error | null;
  resetError: () => void;
}

function Fallback(props: Props): React.ReactNode {
  const { error, resetError } = props;

  return (
    <div className={styles.error}>
      <h2 className={styles['error-title']}>Something went wrong!</h2>
      <p className={styles['error-message']}>
        <span>Details: </span>
        {error?.message}
      </p>
      <Button title={'Reset Error'} handleClick={resetError} />
    </div>
  );
}

export default Fallback;
