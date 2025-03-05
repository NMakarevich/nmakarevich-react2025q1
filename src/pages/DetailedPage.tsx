import { ReactNode } from 'react';
import { API_ENDPOINTS } from '../constants.ts';
import { DetailedResponse, SearchParams } from '../interfaces.ts';
import DetailedItem from '../components/detailed-item/detailed-item.tsx';

interface Props {
  params: SearchParams;
}

async function DetailedPage(props: Props): Promise<ReactNode> {
  const { resource, id } = props.params;

  const response = await fetch(`${API_ENDPOINTS[resource]}/${id}`);
  const data: DetailedResponse = await response.json();

  return <DetailedItem params={props.params} data={data} />;
}

export default DetailedPage;
