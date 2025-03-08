import { type RouteConfig, prefix, route } from '@react-router/dev/routes';

export default [
  ...prefix('search', [
    route(':resource', './routes/main.tsx', [
      route(':id', './routes/detailed.tsx'),
    ]),
  ]),
  route('*?', 'catchall.tsx'),
] satisfies RouteConfig;
