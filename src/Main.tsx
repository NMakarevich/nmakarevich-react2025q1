import React, { useCallback, useEffect } from 'react';
import ResultList from './components/result-list/result-list.tsx';
import { useAppDispatch } from './redux/store.ts';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import { DetailedResponse, Response } from './interfaces.ts';
import { setResource } from './redux/resources.slice.ts';
import { API_ENDPOINTS, RESOURCES } from './constants.ts';

interface Props {
  data: Response;
  detailed: DetailedResponse;
}

function Main(props: Props): React.ReactNode {
  const { data, detailed } = props;

  const searchParams = useSearchParams();
  const router = useRouter();
  const [resource] = router.query.resource as string[];
  const dispatch = useAppDispatch();

  const navigateToFirstPage = useCallback(() => {
    const params = new URLSearchParams(searchParams);
    params.set('page', '1');
    router.push({
      pathname: `/search/${resource}`,
      query: params.toString(),
    });
  }, [resource, router, searchParams]);

  useEffect(() => {
    if (RESOURCES.includes(resource))
      dispatch(setResource({ resource, url: API_ENDPOINTS[resource] }));
    else {
      const [resource, url] = Object.entries(API_ENDPOINTS)[0];
      dispatch(setResource({ resource, url }));
      navigateToFirstPage();
    }
  }, [dispatch, navigateToFirstPage, resource, router]);

  return <ResultList data={data} detailed={detailed} />;
}

export default Main;
