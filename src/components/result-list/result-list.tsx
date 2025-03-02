import React, { useEffect, useState } from 'react';
import ResultItem from '../result-item/result-item.tsx';
import styles from './result-list.module.scss';
import ResponseError from '../response-error/response-error.tsx';
import Loading from '../ui/loading/loading.tsx';
import Pagination from '../pagination/pagination.tsx';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { DetailedResponse, Response } from '../../interfaces.ts';
import DetailedItem from '../detailed-item/detailed-item.tsx';
import { useAppDispatch } from '../../redux/store.ts';
import { setResults } from '../../redux/results.slice.ts';

interface Props {
  data: Response;
  detailed: DetailedResponse;
}

function ResultList(props: Props): React.ReactNode {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [resource, id] = router.query.resource as string[];
  const { data, detailed } = props;
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (data.results && data.results.length) dispatch(setResults(data.results));
    else dispatch(setResults([]));
  }, [data, dispatch]);

  useEffect(() => {
    const handleRouteChangeStart = () => setLoading(true);
    const handleRouteChangeComplete = () => setLoading(false);

    router.events.on('routeChangeStart', handleRouteChangeStart);
    router.events.on('routeChangeComplete', handleRouteChangeComplete);

    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart);
      router.events.off('routeChangeComplete', handleRouteChangeComplete);
    };
  }, [router]);

  async function closeDetails() {
    if (id && location.pathname.includes(id))
      await router.push(`/search/${resource}?${searchParams.toString()}`);
  }

  return (
    <>
      {data && !data.error && data.results && data.results.length > 0 ? (
        <>
          {loading && <Loading />}
          <div className={styles.result}>
            <Pagination info={data.info} />
            <div className={styles['result-wrapper']}>
              <div className={styles['result-list']} onClick={closeDetails}>
                {data.results.map((result) => (
                  <Link
                    href={`/search/${resource}/${result.id}?${searchParams.toString()}`}
                    key={`${resource}-${result.id}`}
                  >
                    <ResultItem result={result} />
                  </Link>
                ))}
              </div>
            </div>
          </div>
          {id && <DetailedItem detailed={detailed} />}
        </>
      ) : (
        data.error && (
          <ResponseError status={404} message={data.error || 'Unknown error'} />
        )
      )}
    </>
  );
}

export default ResultList;
