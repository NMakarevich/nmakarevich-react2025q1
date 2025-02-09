import React, { useEffect, useState } from 'react';
import { API_URL, LOCAL_STORAGE_KEYS } from '../../constants.ts';
import Select from '../ui/select/select.tsx';
import { SelectedResource } from '../search/search.tsx';
import useLocalStorage from '../../hooks/local-storage.tsx';
import { useNavigate, useParams, useSearchParams } from 'react-router';

export interface Resource {
  [resource: string]: string;
}

interface Props {
  handleSelected: (resource: SelectedResource) => void;
}

function SelectResource(props: Props): React.ReactNode {
  const [resources, setResources] = useState<Resource>({});
  const { resource, id } = useParams();
  const [selectedResource] = useLocalStorage(LOCAL_STORAGE_KEYS.resource);
  const [selected, setSelected] = useState(selectInitialResource);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const { handleSelected } = props;

  function selectInitialResource() {
    if (selectedResource && resource) return resource;
    return selectedResource || resource;
  }

  useEffect(() => {
    async function loadResources() {
      const res = await fetch(API_URL);
      const data: Resource = await res.json();
      setResources(data);
      if (selected) {
        handleSelected({ name: selected, url: data[selected] });
        navigate(
          `/search/${selected}${id ? `/${id}` : ''}?${searchParams.toString()}`
        );
      } else {
        const [name, url] = Object.entries(data)[0];
        handleSelected({ name, url });
        navigate(
          `/search/${name}${id ? `/${id}` : ''}?${searchParams.toString()}`
        );
      }
    }
    if (!Object.keys(resources).length) loadResources().then(() => {});
  }, [handleSelected, selected, resources, navigate, id, searchParams]);

  function handleSelect(option: string) {
    setSelected(option);
    const url = resources[option];
    handleSelected({ name: option, url });
  }

  return (
    <Select
      options={Object.keys(resources)}
      defaultValue={selected || Object.keys(resources)[0]}
      handleSelected={handleSelect}
    />
  );
}

export default SelectResource;
