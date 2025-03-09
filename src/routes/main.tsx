import App from '../App.tsx';
import { LoaderFunctionArgs } from 'react-router';

import { Route } from '../../.react-router/types/src/routes/+types/main.ts';
import { Response } from '../interfaces.ts';
import { API_ENDPOINTS } from '../constants.ts';
import { store } from '../redux/store.ts';
import ThemeProvider from '../providers/theme/theme.provider.tsx';
import ResourceProvider from '../providers/resource/resource.provider.tsx';
import { Provider } from 'react-redux';

export async function loader({
  request,
  params,
}: LoaderFunctionArgs): Promise<Response> {
  const resource = params.resource;
  const searchParams = new URL(request.url).searchParams;

  if (!resource)
    return {
      results: [],
      info: { pages: 1, count: 0, next: null, prev: null },
    };

  const response = await fetch(
    `${API_ENDPOINTS[resource]}?${searchParams.toString()}`
  );

  if (!response.ok)
    return {
      results: [],
      info: { pages: 1, count: 0, next: null, prev: null },
    };

  return await response.json();
}

function Main({ loaderData }: Route.ComponentProps) {
  return (
    <Provider store={store}>
      <ResourceProvider>
        <ThemeProvider>
          <App data={loaderData as unknown as Response} />
        </ThemeProvider>
      </ResourceProvider>
    </Provider>
  );
}

export default Main;
