import useLocalStorage from './hooks/local-storage.tsx';
import { LOCAL_STORAGE_KEYS, RESOURCES } from './constants.ts';
import { useNavigate } from 'react-router';
import { useEffect } from 'react';

export default function Component() {
  const [searchTerm] = useLocalStorage(LOCAL_STORAGE_KEYS.search);
  const navigate = useNavigate();

  useEffect(() => {
    navigate(
      `/search/${RESOURCES[0]}?page=1${searchTerm ? `&name=${searchTerm}` : ''}`
    );
  }, [navigate, searchTerm]);
}
