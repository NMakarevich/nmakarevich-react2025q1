import { useState } from 'react';

function useLocalStorage(key: string, defaultValue: string = '') {
  const isClient = typeof window !== 'undefined';
  const [localStorageValue, setLocalStorageValue] =
    useState(getFromLocalStorage);

  function getFromLocalStorage() {
    if (isClient) {
      const ls = localStorage.getItem(key) || defaultValue;
      return ls || defaultValue;
    }
    return defaultValue;
  }

  function saveToLocalStorage(value: string) {
    if (isClient) {
      setLocalStorageValue(value);
      localStorage.setItem(key, value);
    }
  }

  return [localStorageValue, saveToLocalStorage] as const;
}

export default useLocalStorage;
