import { Location } from '../../interfaces.ts';
import React from 'react';
import styles from '../result-item/result-item.module.scss';

interface Props {
  item: Location;
}

function DetailedItemLocation(props: Props): React.ReactNode {
  const { item } = props;

  return (
    <>
      <ul className={styles['result-item_info-list']}>
        <li className={styles['result-item_info-item']}>
          <span className={'info-title'}>Name:</span> {item.name}
        </li>
        <li className={styles['result-item_info-item']}>
          <span className={'info-title'}>Type:</span> {item.type || 'unknown'}
        </li>
        <li className={styles['result-item_info-item']}>
          <span className={'info-title'}>Dimension: </span>
          {item.dimension || 'unknown'}
        </li>
        <li className={styles['result-item_info-item']}>
          <span className={'info-title'}>Residents:</span>{' '}
          {item.residents.length}
        </li>
      </ul>
    </>
  );
}

export default DetailedItemLocation;
