import React from 'react';
import { Episode } from '../../interfaces.ts';
import styles from './result-item.module.scss';

interface Props {
  result: Episode;
}

function ResultItemEpisode(props: Props): React.ReactNode {
  const { result } = props;

  return (
    <ul className={styles['result-item_info-list']}>
      <li className={styles['result-item_info-item']}>
        <span className={styles['info-title']}>Name:</span> {result.name}
      </li>
      <li className={'result-item_info-item'}>
        <span className={styles['info-title']}>Episode:</span> {result.episode}
      </li>
    </ul>
  );
}

export default ResultItemEpisode;
