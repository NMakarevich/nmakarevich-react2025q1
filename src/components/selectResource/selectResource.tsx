import React, { useEffect } from 'react';
import Select from '../ui/select/select.tsx';
import { useNavigate, useParams, useSearchParams } from 'react-router';
import { useGetResourcesQuery } from '../../redux/api.ts';
import { useAppDispatch, useAppSelector } from '../../redux/store.ts';
import { selectResource, setResource } from '../../redux/resources.slice.ts';

export interface Resource {
  [resource: string]: string;
}

function SelectResource(): React.ReactNode {
  const { resource, id } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { data } = useGetResourcesQuery();
  const dispatch = useAppDispatch();

  const selectedResource = useAppSelector(selectResource);

  useEffect(() => {
    if (resource) dispatch(setResource({ resource, url: '' }));
  }, [dispatch, resource]);

  useEffect(() => {
    if (!data) return;
    if (!selectedResource) {
      const [resource, url] = Object.entries(data)[0];
      dispatch(setResource({ resource, url }));
      navigate(
        `/search/${resource}${id ? `/${id}` : ''}?${searchParams.toString()}`
      );
    } else
      dispatch(
        setResource({ resource: selectedResource, url: data[selectedResource] })
      );
  }, [navigate, id, searchParams, data, dispatch, selectedResource]);

  function handleSelect(option: string) {
    if (!data) return;
    dispatch(setResource({ resource: option, url: data[option] }));
  }

  return (
    data && (
      <Select
        options={Object.keys(data)}
        defaultValue={selectedResource || Object.keys(data)[0]}
        handleSelected={handleSelect}
      />
    )
  );
}

export default SelectResource;
