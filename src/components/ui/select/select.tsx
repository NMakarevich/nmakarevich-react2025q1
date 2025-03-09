import React, { useState } from 'react';
import styles from './select.module.scss';

interface Props {
  options: string[];
  defaultValue: string;
  handleSelected: (value: string) => void;
}

function Select(props: Props): React.ReactNode {
  const { options, defaultValue, handleSelected } = props;
  const [selected, setSelected] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  function handleSelect(value: string) {
    setSelected(value);
    handleSelected(value);
    setIsOpen(false);
  }

  function toggleSelect() {
    setIsOpen(!isOpen);
  }

  return (
    options && (
      <div className={styles.select}>
        <span className={styles['select-label']}>Select resource: </span>
        <div className={styles['select-list']}>
          <span
            className={`${styles['select-value']} ${isOpen ? styles.open : ''}`}
            onClick={toggleSelect}
          >
            {selected || defaultValue}
          </span>
          <ul
            className={`${styles['select-options']} ${isOpen ? styles.open : ''}`}
          >
            {options.map((option) => (
              <li
                key={option}
                className={styles['select-option']}
                onClick={() => handleSelect(option)}
              >
                {option}
              </li>
            ))}
          </ul>
          {isOpen && (
            <div
              className={styles['select-overlay']}
              onClick={toggleSelect}
            ></div>
          )}
        </div>
      </div>
    )
  );
}

export default Select;
