import { ReactNode, Suspense } from 'react';
import { API_ENDPOINTS, RESOURCES } from '../../../src/constants';
import { redirect } from 'next/navigation';
import { SearchParams } from '../../../src/interfaces';
import LoadingFallback from './loading';
import ResultsPage from '../../../src/pages/ResultsPage';
import { generateSearchParams } from '../../../src/utils.ts';

async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ resource: string[] | undefined[] }>;
  searchParams: Promise<{ [key: string]: string | undefined }>;
}): Promise<ReactNode> {
  const [resource, id] = (await params).resource;
  const { page, name } = await searchParams;
  if (!resource || !RESOURCES.includes(resource))
    redirect(`/search/${RESOURCES[0]}?page=1`);

  const searchData: SearchParams = {
    resource: resource || RESOURCES[0],
    id,
    page: page || '1',
    name,
  };

  const requestUrl = `${API_ENDPOINTS[resource]}?${generateSearchParams('1', name)}`;
  const response = await fetch(requestUrl, { cache: 'no-store' });

  console.log(response);

  return (
    <Suspense fallback={<LoadingFallback />}>
      <ResultsPage params={searchData} />
    </Suspense>
  );
}

export default Page;
