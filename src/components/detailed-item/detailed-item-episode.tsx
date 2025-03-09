import { Episode } from '../../interfaces.ts';
import React from 'react';
import styles from '../result-item/result-item.module.scss';

interface Props {
  item: Episode;
}

function DetailedItemEpisode(props: Props): React.ReactNode {
  const { item } = props;

  return (
    <>
      <ul className={styles['result-item_info-list']}>
        <li className={styles['result-item_info-item']}>
          <span className={styles['info-title']}>Name:</span> {item.name}
        </li>
        <li className={styles['result-item_info-item']}>
          <span className={styles['info-title']}>Air Date:</span>{' '}
          {item.air_date || 'unknown'}
        </li>
        <li className={styles['result-item_info-item']}>
          <span className={styles['info-title']}>Episode:</span> {item.episode}
        </li>
        <li className={styles['result-item_info-item']}>
          <span className={styles['info-title']}>Characters: </span>
          {item.characters.length}
        </li>
      </ul>
    </>
  );
}

export default DetailedItemEpisode;
