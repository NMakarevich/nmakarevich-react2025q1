import { ReactNode } from 'react';
import { API_ENDPOINTS } from '../constants.ts';
import { generateSearchParams } from '../utils.ts';
import ResponseError from '../components/response-error/response-error.tsx';
import { CardsResponse, SearchParams } from '../interfaces.ts';
import ResultList from '../components/result-list/result-list.tsx';
import DetailedPage from './DetailedPage.tsx';

interface Props {
  params: SearchParams;
}

async function ResultsPage(props: Props): Promise<ReactNode> {
  if (!props.params) return null;
  const { resource, id, page, name } = props.params;

  const requestUrl = `${API_ENDPOINTS[resource]}?${generateSearchParams(page, name)}`;
  const response = await fetch(requestUrl, { cache: 'no-store' });

  if (!response.ok) {
    return (
      <ResponseError
        status={404}
        message={(await response.json()).error || 'Unknown error'}
      />
    );
  }

  const data: CardsResponse = await response.json();

  return (
    <>
      <ResultList data={data} params={props.params} />
      {!!id && <DetailedPage params={props.params} />}
    </>
  );
}

export default ResultsPage;
