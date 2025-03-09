import { Route } from '../../.react-router/types/src/routes/+types/detailed.ts';
import DetailedItem from '../components/detailed-item/detailed-item.tsx';
import { API_ENDPOINTS } from '../constants.ts';
import { Card } from '../interfaces.ts';

export async function loader({
  params,
}: Route.LoaderArgs): Promise<Card | undefined> {
  const { resource, id } = params;

  if (!id) return undefined;

  const response = await fetch(`${API_ENDPOINTS[resource]}/${id}`);

  if (!response.ok) return undefined;
  return await response.json();
}

function Detailed({ loaderData }: Route.ComponentProps) {
  return <DetailedItem data={loaderData as unknown as Card | undefined} />;
}

export default Detailed;
