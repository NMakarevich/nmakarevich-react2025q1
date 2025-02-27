import React from 'react';
import styles from './response-error.module.scss';

interface Props {
  status: number;
  message: string;
}

function ResponseError(props: Props): React.ReactNode {
  const { status, message } = props;

  return (
    <div className={styles['response-error']}>
      <span className={styles['response-error_status']}>
        Status code: {status}
      </span>
      <p className={styles['response-error_message']}>{message}</p>
    </div>
  );
}

export default ResponseError;
