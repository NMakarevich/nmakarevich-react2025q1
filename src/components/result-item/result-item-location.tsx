import React from 'react';
import { Location } from '../../interfaces.ts';
import styles from './result-item.module.scss';

interface Props {
  result: Location;
}

function ResultItemLocation(props: Props): React.ReactNode {
  const { result } = props;
  return (
    <ul className={styles['result-item_info-list']}>
      <li className={styles['result-item_info-item']}>
        <span className={styles['info-title']}>Name:</span> {result.name}
      </li>
      <li className={styles['result-item_info-item']}>
        <span className={styles['info-title']}>Dimension: </span>
        {result.dimension || 'unknown'}
      </li>
    </ul>
  );
}

export default ResultItemLocation;
