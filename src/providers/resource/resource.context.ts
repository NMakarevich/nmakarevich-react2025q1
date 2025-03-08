import { createContext } from 'react';
import { IResourceContext } from '../../interfaces.ts';
import { RESOURCES } from '../../constants.ts';

export const ResourceContext = createContext<IResourceContext>({
  selectedResource: RESOURCES[0],
  setSelectedResource: (resource) => resource,
});
