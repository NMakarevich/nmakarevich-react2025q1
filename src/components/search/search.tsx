import React, { useEffect, useState } from 'react';
import Input from '../ui/input/input.tsx';
import Button from '../ui/button/button.tsx';
import { LOCAL_STORAGE_KEYS } from '../../constants.ts';
import './search.scss';
import SelectResource from '../selectResource/selectResource.tsx';
import useLocalStorage from '../../hooks/local-storage.tsx';
import { useNavigate, useParams, useSearchParams } from 'react-router';
import { useAppDispatch, useAppSelector } from '../../redux/store.ts';
import {
  selectResource,
  selectUrl,
  setRequestUrl,
} from '../../redux/resources.slice.ts';

function Search(): React.ReactNode {
  const [localStorageSearch, setLocalStorageSearch] = useLocalStorage(
    LOCAL_STORAGE_KEYS.search
  );
  const [search, setSearch] = useState<string>(localStorageSearch);
  const [isInit, setIsInit] = useState(true);
  const { resource } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const selectedResource = useAppSelector(selectResource);
  const url = useAppSelector(selectUrl);
  const dispatch = useAppDispatch();

  function handleButtonClick() {
    setLocalStorageSearch(search);
    dispatch(setRequestUrl(`${url}${search ? `?name=${search}` : ''}`));
    if (resource !== selectedResource) {
      navigate(`/search/${selectedResource}`);
    }
  }

  useEffect(() => {
    if (url && isInit) {
      const page = searchParams.get('page');
      const params = new URLSearchParams(url.split('?')[1]);
      if (!params.has('page') && page) params.set('page', page);
      if (search) params.set('name', search);
      dispatch(setRequestUrl(`${url}?${params.toString()}`));
      setIsInit(false);
    }
  }, [dispatch, isInit, search, searchParams, url]);

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
