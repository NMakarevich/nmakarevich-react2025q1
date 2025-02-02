import React, { useState } from 'react';
import Input from '../ui/input/input.tsx';
import Button from '../ui/button/button.tsx';
import { LOCAL_STORAGE_KEYS } from '../../constants.ts';
import Select from '../ui/select/select.tsx';
import './search.scss';

export interface Resource {
  [resource: string]: string;
}

interface Props {
  getRequestUrl: (requestUrl: string) => void;
}

function Search(props: Props): React.ReactNode {
  const [search, setSearch] = useState<string>(getSearchFromLS);
  const [selectedResource, setSelectedResource] = useState<string>(
    getSelectedResourceFromLS
  );
  const [resources, setResources] = useState<Resource>({});

  const { getRequestUrl } = props;

  function getSearchFromLS() {
    return localStorage.getItem(LOCAL_STORAGE_KEYS.search) ?? '';
  }

  function getSelectedResourceFromLS() {
    return localStorage.getItem(LOCAL_STORAGE_KEYS.resource) ?? '';
  }

  function handleButtonClick() {
    localStorage.setItem(LOCAL_STORAGE_KEYS.search, search);
    localStorage.setItem(LOCAL_STORAGE_KEYS.resource, selectedResource);
    const url = resources[selectedResource];
    getRequestUrl(`${url}/?name=${search}`);
  }

  function selectResource(resource: string) {
    setSelectedResource(resource);
  }

  function getInputValue(value: string) {
    setSearch(value);
  }

  function getResources(resources: Resource) {
    if (!selectedResource) setSelectedResource(Object.keys(resources)[0]);
    setResources(resources);
  }

  return (
    <>
      <Select getResources={getResources} handleSelected={selectResource} />
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
