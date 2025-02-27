import React from 'react';
import Select from '../ui/select/select.tsx';
import { useAppDispatch } from '../../redux/store.ts';
import { setResource } from '../../redux/resources.slice.ts';
import { useRouter } from 'next/router';
import { API_ENDPOINTS, RESOURCES } from '../../constants.ts';

function SelectResource(): React.ReactNode {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const initResource = RESOURCES.includes(router.query.resource as string)
    ? (router.query.resource as string)
    : Object.keys(API_ENDPOINTS)[0];

  function handleSelect(option: string) {
    dispatch(setResource({ resource: option, url: API_ENDPOINTS[option] }));
  }

  return (
    <Select
      options={RESOURCES}
      defaultValue={initResource}
      handleSelected={handleSelect}
    />
  );
}

export default SelectResource;
