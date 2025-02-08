import React, { useState } from 'react';
import Input from '../ui/input/input.tsx';
import Button from '../ui/button/button.tsx';
import { LOCAL_STORAGE_KEYS } from '../../constants.ts';
import './search.scss';
import SelectResource from '../selectResource/selectResource.tsx';
import useLocalStorage from '../../hooks/local-storage.tsx';
import { useNavigate, useParams } from 'react-router';

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
  const { resource } = useParams();
  const [search, setSearch] = useState<string>(localStorageSearch);
  const [selectedResource, setSelectedResource] = useState<SelectedResource>({
    name: resource || localStorageResource,
    url: '',
  });
  const navigate = useNavigate();

  const { getRequestUrl } = props;

  function handleButtonClick() {
    setLocalStorageSearch(search);
    setLocalStorageResource(selectedResource.name);
    getRequestUrl(`${selectedResource.url}${search ? `?name=${search}` : ''}`);
    if (resource !== selectedResource.name) {
      navigate(`/search/${selectedResource.name}`);
    }
  }

  function selectResource(res: SelectedResource) {
    if (!selectedResource.url) {
      getRequestUrl(`${res.url}${search ? `?name=${search}` : ''}`);
    }
    setSelectedResource(res);
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
