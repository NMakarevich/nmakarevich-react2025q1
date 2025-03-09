import React from 'react';
import { Character } from '../../interfaces.ts';
import styles from './result-item.module.scss';

interface Props {
  result: Character;
}

function ResultItemCharacter(props: Props): React.ReactNode {
  const { result } = props;

  return (
    <ul className={styles['result-item_info-list']}>
      <li className={styles['result-item_info-item']}>
        <span className={styles['info-title']}>Name:</span> {result.name}
      </li>
      <li className={styles['result-item_info-item']}>
        <span className={styles['info-title']}>Gender:</span> {result.gender}
      </li>
      <li className={styles['result-item_info-item']}>
        <span className={styles['info-title']}>Status:</span> {result.status}
      </li>
    </ul>
  );
}

export default ResultItemCharacter;
