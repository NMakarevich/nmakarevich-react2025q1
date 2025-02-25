import React, { useEffect } from 'react';
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
import { useAppDispatch, useAppSelector } from '../../redux/store.ts';
import { selectRequestUrl } from '../../redux/resources.slice.ts';
import { parseError } from '../../utils.ts';
import { setResults } from '../../redux/results.slice.ts';

function ResultList(): React.ReactNode {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { resource, id } = useParams();
  const requestUrl = useAppSelector(selectRequestUrl);
  const dispatch = useAppDispatch();

  const { isFetching, data, error } = useGetCardsQuery(requestUrl, {
    skip: !requestUrl,
  });

  useEffect(() => {
    if (data && !error) dispatch(setResults(data.results));
    if (error) dispatch(setResults([]));
  }, [data, dispatch, error]);

  function closeDetails() {
    if (id && location.pathname.includes(id))
      navigate(`/search/${resource}?${searchParams.toString()}`);
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
            status={parseError(error)?.status || 0}
            message={parseError(error)?.data.error || 'Unknown error'}
          />
        )
      )}
    </>
  );
}

export default ResultList;
