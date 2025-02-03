import { useState } from 'react';

function useLocalStorage(key: string) {
  const [localStorageValue, setLocalStorageValue] =
    useState(getFromLocalStorage);

  function getFromLocalStorage(): string {
    const ls = localStorage.getItem(key);
    return ls ?? '';
  }

  function saveToLocalStorage(value: string) {
    setLocalStorageValue(value);
    localStorage.setItem(key, value);
  }

  return [localStorageValue, saveToLocalStorage] as const;
}

export default useLocalStorage;
