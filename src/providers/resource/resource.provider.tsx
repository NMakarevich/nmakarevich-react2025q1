import React, { ReactNode, useState } from 'react';
import { ResourceContext } from './resource.context.ts';
import { useParams } from 'react-router';
import { RESOURCES } from '../../constants.ts';

function ResourceProvider({
  children,
}: {
  children: ReactNode;
}): React.ReactNode {
  const params = useParams();
  const resource = params.resorce;
  const [selectedResource, setSelectedResource] = useState<string>(
    resource || RESOURCES[0]
  );

  return (
    <ResourceContext.Provider value={{ selectedResource, setSelectedResource }}>
      {children}
    </ResourceContext.Provider>
  );
}

export default ResourceProvider;
