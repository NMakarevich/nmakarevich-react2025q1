import React, { useEffect } from 'react';
import Select from '../ui/select/select.tsx';
import { useNavigate, useParams, useSearchParams } from 'react-router';
import { useAppDispatch, useAppSelector } from '../../redux/store.ts';
import {
  selectResource,
  selectResources,
  setResource,
} from '../../redux/resources.slice.ts';

function SelectResource(): React.ReactNode {
  const { resource, id } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const resources = useAppSelector(selectResources);
  const dispatch = useAppDispatch();

  const selectedResource = useAppSelector(selectResource);

  useEffect(() => {
    if (resource) dispatch(setResource({ resource, url: '' }));
  }, [dispatch, resource]);

  useEffect(() => {
    if (!resources) return;
    if (!selectedResource) {
      const [resource, url] = Object.entries(resources)[0];
      dispatch(setResource({ resource, url }));
      navigate(
        `/search/${resource}${id ? `/${id}` : ''}?${searchParams.toString()}`
      );
    } else
      dispatch(
        setResource({
          resource: selectedResource,
          url: resources[selectedResource],
        })
      );
  }, [navigate, id, searchParams, resources, dispatch, selectedResource]);

  function handleSelect(option: string) {
    if (!resources) return;
    dispatch(setResource({ resource: option, url: resources[option] }));
  }

  return (
    <Select
      options={Object.keys(resources ? resources : {})}
      defaultValue={
        selectedResource || Object.keys(resources ? resources : {})[0]
      }
      handleSelected={handleSelect}
    />
  );
}

export default SelectResource;
