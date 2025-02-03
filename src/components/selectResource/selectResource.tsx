import React, { useEffect, useState } from 'react';
import { API_URL, LOCAL_STORAGE_KEYS } from '../../constants.ts';
import Select from '../ui/select/select.tsx';
import { SelectedResource } from '../search/search.tsx';

export interface Resource {
  [resource: string]: string;
}

interface Props {
  handleSelected: (resource: SelectedResource) => void;
}

function SelectResource(props: Props): React.ReactNode {
  const [resources, setResources] = useState<Resource>({});
  const [selected, setSelected] = useState(getSelectedResourceFromLS());

  const { handleSelected } = props;

  function getSelectedResourceFromLS() {
    return localStorage.getItem(LOCAL_STORAGE_KEYS.resource) ?? '';
  }

  useEffect(() => {
    async function loadResources() {
      const res = await fetch(API_URL);
      const data: Resource = await res.json();
      setResources(data);
      if (selected) handleSelected({ name: selected, url: data[selected] });
      else {
        const [name, url] = Object.entries(data)[0];
        handleSelected({ name, url });
      }
    }
    if (!Object.keys(resources).length) loadResources().then(() => {});
  }, [handleSelected, selected, resources]);

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
