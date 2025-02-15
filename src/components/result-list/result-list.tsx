import React from 'react';
import ResultItem from '../result-item/result-item.tsx';
import './result-list.scss';
import ResponseError from '../response-error/response-error.tsx';
import Loading from '../ui/loading/loading.tsx';
import Pagination from '../pagination/pagination.tsx';
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router';
import { useGetCardsQuery } from '../../redux/api.ts';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';
import { useAppSelector } from '../../redux/store.ts';
import { selectRequestUrl } from '../../redux/resources.slice.ts';

function ResultList(): React.ReactNode {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { resource, id } = useParams();
  const requestUrl = useAppSelector(selectRequestUrl);

  const { isFetching, data, error } = useGetCardsQuery(requestUrl, {
    skip: !requestUrl,
  });

  function closeDetails() {
    if (id && location.pathname.includes(id))
      navigate(`/search/${resource}?${searchParams.toString()}`);
  }

  function parsedError(
    error: FetchBaseQueryError | SerializedError | undefined
  ) {
    if (error && 'status' in error && error.status) {
      const { status, data } = error as {
        status: number;
        data: { error: string };
      };
      return { status, data };
    }
    return null;
  }

  return (
    <>
      {isFetching && <Loading />}
      {!error && data && data.results && data.results.length > 0 ? (
        <>
          <div className={'result'}>
            <Pagination info={data.info} />
            <div className={'result-wrapper'}>
              <div className={'result-list'} onClick={closeDetails}>
                {data.results.map((result) => (
                  <Link
                    to={`/search/${resource}/${result.id}?${searchParams.toString()}`}
                    key={`${resource}-${result.id}`}
                    state={requestUrl}
                  >
                    <ResultItem result={result} />
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <Outlet />
        </>
      ) : (
        error && (
          <ResponseError
            status={parsedError(error)?.status || 0}
            message={parsedError(error)?.data.error || 'Unknown error'}
          />
        )
      )}
    </>
  );
}

export default ResultList;
