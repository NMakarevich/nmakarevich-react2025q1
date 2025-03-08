import React, { useContext, useState } from 'react';
import Input from '../ui/input/input.tsx';
import Button from '../ui/button/button.tsx';
import { LOCAL_STORAGE_KEYS } from '../../constants.ts';
import './search.scss';
import SelectResource from '../selectResource/selectResource.tsx';
import useLocalStorage from '../../hooks/local-storage.tsx';
import { useNavigate, useSearchParams } from 'react-router';
import { ResourceContext } from '../../providers/resource/resource.context.ts';

function Search(): React.ReactNode {
  const [localStorageSearch, setLocalStorageSearch] = useLocalStorage(
    LOCAL_STORAGE_KEYS.search
  );
  const [search, setSearch] = useState<string>(localStorageSearch);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { selectedResource } = useContext(ResourceContext);

  function handleButtonClick() {
    setLocalStorageSearch(search);
    if (search) searchParams.set('name', search);
    else searchParams.delete('name');
    searchParams.set('page', '1');
    navigate(`/search/${selectedResource}?${searchParams.toString()}`);
  }

  function getInputValue(value: string) {
    setSearch(value);
  }

  return (
    <>
      <SelectResource />
      <div className={'search'}>
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
