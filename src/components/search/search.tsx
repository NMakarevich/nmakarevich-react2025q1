import { ReactNode, useState } from 'react';
import Input from '../ui/input/input.tsx';
import Button from '../ui/button/button.tsx';
import { LOCAL_STORAGE_KEYS } from '../../constants.ts';
import styles from './search.module.scss';
import useLocalStorage from '../../hooks/local-storage.tsx';
import { useSearchParams } from 'next/navigation';
import { useAppSelector } from '../../redux/store.ts';
import { selectResource } from '../../redux/resources.slice.ts';
import { useRouter } from 'next/router';

function Search(): ReactNode {
  const [localStorageSearch, setLocalStorageSearch] = useLocalStorage(
    LOCAL_STORAGE_KEYS.search
  );
  const [search, setSearch] = useState<string>(localStorageSearch);
  const searchParams = useSearchParams();
  const selectedResource = useAppSelector(selectResource);
  const router = useRouter();
  const [resource] = router.query.resource as string[];

  function handleButtonClick() {
    setLocalStorageSearch(search);
    const params = new URLSearchParams(searchParams);
    if (search) params.set('q', search);
    else params.delete('q');
    if (resource && (resource as string) !== selectedResource) {
      params.set('page', '1');
      router.push(`/search/${selectedResource}?${params.toString()}`);
    } else router.push(`/search/${selectedResource}?${params.toString()}`);
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
