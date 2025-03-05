import { ReactNode, Suspense } from 'react';
import { RESOURCES } from '../../../src/constants';
import { redirect } from 'next/navigation';
import { SearchParams } from '../../../src/interfaces';
import LoadingFallback from './loading';
import ResultsPage from '../../../src/pages/ResultsPage';

async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ resource: string[] }>;
  searchParams: Promise<{ [key: string]: string | undefined }>;
}): Promise<ReactNode> {
  const [resource, id] = (await params).resource;
  const { page, name } = await searchParams;
  if (!RESOURCES.includes(resource)) redirect(`/search/${RESOURCES[0]}?page=1`);

  const searchData: SearchParams = {
    resource,
    id,
    page: page || '1',
    name,
  };

  return (
    <Suspense fallback={<LoadingFallback />}>
      <ResultsPage params={searchData} />
    </Suspense>
  );
}

export default Page;
