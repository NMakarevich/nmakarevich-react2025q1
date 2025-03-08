import React, { useContext } from 'react';
import Select from '../ui/select/select.tsx';
import { RESOURCES } from '../../constants.ts';
import { ResourceContext } from '../../providers/resource/resource.context.ts';

function SelectResource(): React.ReactNode {
  const { selectedResource, setSelectedResource } = useContext(ResourceContext);

  function handleSelect(option: string) {
    setSelectedResource(option);
  }

  return (
    <Select
      options={RESOURCES}
      defaultValue={selectedResource}
      handleSelected={handleSelect}
    />
  );
}

export default SelectResource;
