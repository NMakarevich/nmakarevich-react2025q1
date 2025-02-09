import React, { useEffect, useState } from 'react';
import './input.scss';

interface Props {
  type?: string;
  id: string;
  name: string;
  search: string;
  searchValue: (value: string) => void;
}

function Input(props: Props): React.ReactNode {
  const [inputValue, setInputValue] = useState('');
  const { type, id, name, search, searchValue } = props;

  useEffect(() => {
    setInputValue(search);
  }, [search]);

  function onChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { target } = event;
    setInputValue(target.value);
    searchValue(target.value);
  }

  return (
    <input
      className={'input'}
      type={type}
      name={name}
      id={id}
      value={inputValue}
      onChange={onChange}
    />
  );
}

export default Input;
