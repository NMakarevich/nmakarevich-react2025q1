'use client';

import { ReactNode, useCallback, useContext, useEffect, useState } from 'react';
import Input from '../ui/input/input.tsx';
import Button from '../ui/button/button.tsx';
import { LOCAL_STORAGE_KEYS } from '../../constants.ts';
import styles from './search.module.scss';
import useLocalStorage from '../../hooks/local-storage.tsx';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { ResourceContext } from '../../providers/resource/resource.context.ts';

function Search(): ReactNode {
  const { resource } = useParams<{ resource: string }>();
  const router = useRouter();
  const [localStorageSearch, setLocalStorageSearch] = useLocalStorage(
    LOCAL_STORAGE_KEYS.search
  );
  const searchParams = useSearchParams();
  const [search, setSearch] = useState<string>(
    searchParams.get('name') || localStorageSearch
  );
  const { selectedResource } = useContext(ResourceContext);

  const updateURL = useCallback(() => {
    const name = searchParams.get('name');
    if (localStorageSearch && !name) {
      const params = new URLSearchParams(searchParams.toString());
      params.set('name', localStorageSearch);
      router.push(`/search/${resource}?${params.toString()}`);
    }
  }, [localStorageSearch, resource, router, searchParams]);

  useEffect(() => {
    updateURL();
  }, [updateURL]);

  function handleButtonClick() {
    setLocalStorageSearch(search);
    const params = new URLSearchParams(searchParams.toString());
    if (search) params.set('name', search);
    else params.delete('name');
    if (resource !== selectedResource || search !== searchParams.get('name')) {
      params.set('page', '1');
    }
    router.push(`/search/${selectedResource}?${params.toString()}`);
  }

  function getInputValue(value: string) {
    setSearch(value);
  }

  return (
    <>
      <div className={styles.search}>
        <Input
          name={'search'}
          id={'search'}
          type={'text'}
          search={search}
          searchValue={getInputValue}
        />
        <Button title="Search" handleClick={handleButtonClick} />
      </div>
    </>
  );
}

export default Search;
