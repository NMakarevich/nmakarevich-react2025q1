import { useState } from 'react';

function useLocalStorage(key: string, defaultValue: string = '') {
  const [localStorageValue, setLocalStorageValue] =
    useState(getFromLocalStorage);

  function getFromLocalStorage() {
    const ls = localStorage.getItem(key) || defaultValue;
    return ls || defaultValue;
  }

  function saveToLocalStorage(value: string) {
    setLocalStorageValue(value);
    localStorage.setItem(key, value);
  }

  return [localStorageValue, saveToLocalStorage] as const;
}

export default useLocalStorage;
