import App from '../App.tsx';
import { LoaderFunctionArgs } from 'react-router';

import { Route } from '../../.react-router/types/src/routes/+types/main.ts';
import { Response } from '../interfaces.ts';
import { API_ENDPOINTS } from '../constants.ts';

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
  return <App data={loaderData as unknown as Response} />;
}

export default Main;
