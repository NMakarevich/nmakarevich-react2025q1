import React from 'react';
import styles from './not-found.module.scss';
import Link from 'next/link';

function NotFoundPage(): React.ReactElement {
  return (
    <div className={styles['not-found']}>
      <h2 className={styles['not-found_title']}>Page is not Found</h2>
      <Link className={styles['not-found_link']} href={'/'}>
        Back to Home
      </Link>
    </div>
  );
}

export default NotFoundPage;
