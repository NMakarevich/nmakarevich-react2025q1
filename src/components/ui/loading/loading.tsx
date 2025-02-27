import React from 'react';
import styles from './loading.module.scss';
import Image from 'next/image';
import image from '../../../../public/rickandmorty.png';

function Loading(): React.ReactNode {
  return (
    <div className={styles.loading}>
      <Image
        className={styles['loading-image']}
        src={image}
        width={300}
        height={480}
        alt="loading"
      />
      <h3 className={styles['loading-title']}>Loading...</h3>
    </div>
  );
}

export default Loading;
