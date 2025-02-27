import { ReactNode, useContext, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/store.ts';
import { selectFavourites, unselectAll } from '../../redux/favourites.slice.ts';
import Button from '../ui/button/button.tsx';
import { Card } from '../../interfaces.ts';
import styles from './flyout.module.scss';
import { ThemeContext } from '../../providers/theme/theme.context.ts';

function Flyout(): ReactNode {
  const favourites = useAppSelector(selectFavourites);
  const dispatch = useAppDispatch();
  const [csvString, setCsvString] = useState<string>('');
  const { isSwitched } = useContext(ThemeContext);

  function unselectAllItems() {
    dispatch(unselectAll());
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
    if (favourites) {
      const resources = Object.entries(favourites);
      setCsvString(
        resources
          .map(([resource, items]) => generateTable(resource, items))
          .join('\r\n \r\n')
      );
    }
  }, [favourites]);

  function generateURL() {
    if (!Object.values(favourites).flat().length) return null;
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8' });
    return URL.createObjectURL(blob);
  }

  return (
    <div
      className={`${styles['flyout-wrapper']} ${isSwitched ? styles.light : ''}`}
    >
      <div
        className={`${styles.flyout} ${Object.values(favourites).flat().length ? '' : styles.hidden}`}
      >
        <p className={styles['flyout-info']}>
          Selected {Object.values(favourites).flat().length} items.
        </p>
        <div className={styles['flyout-controls']}>
          <a
            href={generateURL() || ''}
            className={styles['flyout-controls_download']}
            download={`${Object.values(favourites).flat().length}_items.csv`}
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
