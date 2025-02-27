import { Character } from '../../interfaces.ts';
import React from 'react';
import styles from '../result-item/result-item.module.scss';

interface Props {
  item: Character;
}

function DetailedItemCharacter(props: Props): React.ReactNode {
  const { item } = props;

  return (
    <>
      <img
        className={styles['result-item-image']}
        src={item.image}
        alt={item.name}
      />
      <ul className={styles['result-item_info-list']}>
        <li className={styles['result-item_info-item']}>
          <span className={styles['info-title']}>Name:</span> {item.name}
        </li>
        <li className={styles['result-item_info-item']}>
          <span className={styles['info-title']}>Gender:</span> {item.gender}
        </li>
        <li className={styles['result-item_info-item']}>
          <span className={styles['info-title']}>Type:</span>{' '}
          {item.type || 'unknown'}
        </li>
        <li className={styles['result-item_info-item']}>
          <span className={styles['info-title']}>Status:</span> {item.status}
        </li>
        <li className={styles['result-item_info-item']}>
          <span className={styles['info-title']}>Species:</span>{' '}
          {item.species || 'unknown'}
        </li>
        <li className={styles['result-item_info-item']}>
          <span className={styles['info-title']}>Origin:</span>{' '}
          {item.origin.name}
        </li>
        <li className={styles['result-item_info-item']}>
          <span className={styles['info-title']}>Location:</span>{' '}
          {item.location.name}
        </li>
        <li className={styles['result-item_info-item']}>
          <span className={styles['info-title']}>Episodes:</span>{' '}
          {item.episode.length}
        </li>
      </ul>
    </>
  );
}

export default DetailedItemCharacter;
