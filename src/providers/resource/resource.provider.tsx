'use client';

import React, { ReactNode, useState } from 'react';
import { ResourceContext } from './resource.context.ts';
import { useParams } from 'next/navigation';
import { RESOURCES } from '../../constants.ts';

function ResourceProvider({
  children,
}: {
  children: ReactNode;
}): React.ReactNode {
  const params = useParams<{ resource: string[] }>();
  const resource = params ? params.resource[0] : RESOURCES[0];
  const [selectedResource, setSelectedResource] = useState<string>(resource);

  return (
    <ResourceContext.Provider value={{ selectedResource, setSelectedResource }}>
      {children}
    </ResourceContext.Provider>
  );
}

export default ResourceProvider;
