'use client';

import React, { useContext, useEffect, useState } from 'react';
import Button from '../ui/button/button.tsx';
import { Card } from '../../interfaces.ts';
import styles from './flyout.module.scss';
import { ThemeContext } from '../../providers/theme/theme.context.ts';
import { FavouritesContext } from '../../providers/favourites/favourites.context.ts';

function Flyout(): React.ReactNode {
  const { getFavourites, unselectAll } = useContext(FavouritesContext);
  const [csvString, setCsvString] = useState<string>('');
  const { isSwitched } = useContext(ThemeContext);

  function unselectAllItems() {
    unselectAll();
  }

  function generateTable(resource: string, items: Card[]): string {
    if (!items || !items.length) return '';
    let table = `${resource} \r\n`;
    const headers = `${Object.keys(items[0]).join(';')}`;
    table += `${headers} \r\n`;
    const rows = items
      .map(
        (item) =>
          `${Object.values(item)
            .map((cell) =>
              typeof cell === 'object' ? JSON.stringify(cell) : cell
            )
            .join(';')}`
      )
      .join('\r\n');
    table += rows;
    return table;
  }

  useEffect(() => {
    if (getFavourites()) {
      const resources = Object.entries(getFavourites());
      setCsvString(
        resources
          .map(([resource, items]) => generateTable(resource, items))
          .join('\r\n \r\n')
      );
    }
  }, [getFavourites]);

  function generateURL() {
    if (!Object.values(getFavourites()).flat().length) return null;
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8' });
    return URL.createObjectURL(blob);
  }

  return (
    <div
      className={`${styles['flyout-wrapper']} ${isSwitched ? styles.light : ''}`}
    >
      <div
        className={`${styles.flyout} ${Object.values(getFavourites()).flat().length ? '' : styles.hidden}`}
      >
        <p className={styles['flyout-info']}>
          Selected {Object.values(getFavourites()).flat().length} items.
        </p>
        <div className={styles['flyout-controls']}>
          <a
            href={generateURL() || ''}
            className={styles['flyout-controls_download']}
            download={`${Object.values(getFavourites()).flat().length}_items.csv`}
          >
            Download
          </a>
          <Button title={'Unselect all'} handleClick={unselectAllItems} />
        </div>
      </div>
    </div>
  );
}

export default Flyout;
