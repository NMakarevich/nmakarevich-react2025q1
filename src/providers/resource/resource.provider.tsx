'use client';

import { ReactNode, useState } from 'react';
import { ResourceContext } from './resource.context.ts';
import { useParams } from 'next/navigation';

function ResourceProvider({ children }: { children: ReactNode }): ReactNode {
  const [resource] = useParams<{ resource: string[] }>().resource;
  const [selectedResource, setSelectedResource] = useState<string>(resource);

  return (
    <ResourceContext.Provider value={{ selectedResource, setSelectedResource }}>
      {children}
    </ResourceContext.Provider>
  );
}

export default ResourceProvider;
