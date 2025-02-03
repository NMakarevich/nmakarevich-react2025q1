import React, { useState } from 'react';
import Input from '../ui/input/input.tsx';
import Button from '../ui/button/button.tsx';
import { LOCAL_STORAGE_KEYS } from '../../constants.ts';
import './search.scss';
import SelectResource from '../selectResource/selectResource.tsx';
import useLocalStorage from '../../hooks/local-storage.tsx';

export interface SelectedResource {
  name: string;
  url: string;
}

interface Props {
  getRequestUrl: (requestUrl: string) => void;
}

function Search(props: Props): React.ReactNode {
  const [localStorageSearch, setLocalStorageSearch] = useLocalStorage(
    LOCAL_STORAGE_KEYS.search
  );
  const [localStorageResource, setLocalStorageResource] = useLocalStorage(
    LOCAL_STORAGE_KEYS.resource
  );
  const [search, setSearch] = useState<string>(localStorageSearch);
  const [resource, setResource] = useState<SelectedResource>({
    name: localStorageResource,
    url: '',
  });

  const { getRequestUrl } = props;

  function handleButtonClick() {
    setLocalStorageSearch(search);
    setLocalStorageResource(resource.name);
    getRequestUrl(`${resource.url}/?name=${search}`);
  }

  function selectResource(selectedResource: SelectedResource) {
    if (!resource.url) getRequestUrl(`${selectedResource.url}/?name=${search}`);
    setResource(selectedResource);
  }

  function getInputValue(value: string) {
    setSearch(value);
  }

  return (
    <>
      <SelectResource handleSelected={selectResource} />
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
