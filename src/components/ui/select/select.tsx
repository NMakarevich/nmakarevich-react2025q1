import React, { useEffect, useState } from 'react';
import { API_URL, LOCAL_STORAGE_KEYS } from '../../../constants.ts';
import './select.scss';
import { Resource } from '../../search/search.tsx';

interface Props {
  getResources: (resource: Resource) => void;
  handleSelected: (value: string) => void;
}

function Select(props: Props): React.ReactNode {
  const [selected, setSelected] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [resources, setResources] = useState<Resource>({});

  const { getResources, handleSelected } = props;

  useEffect(() => {
    loadResources().then(() => {});
  });

  async function loadResources() {
    const res = await fetch(API_URL);
    const data: Resource = await res.json();
    const resources = Object.keys(data);
    setResources(data);
    getResources(data);
    const resource = localStorage.getItem(LOCAL_STORAGE_KEYS.resource);
    if (resource) setSelected(resource);
    else {
      setSelected(resources[0]);
    }
  }

  function handleSelect(value: string) {
    setSelected(value);
    handleSelected(value);
    setIsOpen(false);
  }

  function toggleSelect() {
    setIsOpen(!isOpen);
  }

  return (
    resources && (
      <div className={'select'}>
        <span className={'select-label'}>Select resource: </span>
        <div className={'select-list'}>
          <span
            className={`select-value ${isOpen ? 'open' : ''}`}
            onClick={toggleSelect}
          >
            {selected}
          </span>
          <ul className={`select-options ${isOpen ? 'open' : ''}`}>
            {Object.keys(resources).map((resource) => (
              <li
                key={resource}
                className={'select-option'}
                onClick={() => handleSelect(resource)}
              >
                {resource}
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
