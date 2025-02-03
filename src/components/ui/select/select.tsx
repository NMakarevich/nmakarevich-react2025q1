import React, { useState } from 'react';
import './select.scss';

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
      <div className={'select'}>
        <span className={'select-label'}>Select resource: </span>
        <div className={'select-list'}>
          <span
            className={`select-value ${isOpen ? 'open' : ''}`}
            onClick={toggleSelect}
          >
            {selected || defaultValue}
          </span>
          <ul className={`select-options ${isOpen ? 'open' : ''}`}>
            {options.map((option) => (
              <li
                key={option}
                className={'select-option'}
                onClick={() => handleSelect(option)}
              >
                {option}
              </li>
            ))}
          </ul>
          {isOpen && (
            <div className={'select-overlay'} onClick={toggleSelect}></div>
          )}
        </div>
      </div>
    )
  );
}

export default Select;
