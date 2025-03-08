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
  useNavigation,
  useParams,
  useSearchParams,
} from 'react-router';
import { useAppDispatch, useAppSelector } from '../../redux/store.ts';
import { selectRequestUrl } from '../../redux/resources.slice.ts';
import { setResults } from '../../redux/results.slice.ts';
import { Response } from '../../interfaces.ts';

interface Props {
  data: Response;
}

function ResultList({ data }: Props): React.ReactNode {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { resource, id } = useParams();
  const requestUrl = useAppSelector(selectRequestUrl);
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const isFetching = Boolean(navigation.location);

  useEffect(() => {
    if (data && data.results.length) dispatch(setResults(data.results));
    if (data.results.length === 0) dispatch(setResults([]));
  }, [data, dispatch]);

  function closeDetails() {
    if (id && location.pathname.includes(id))
      navigate(`/search/${resource}?${searchParams.toString()}`);
  }

  return (
    <>
      {isFetching && <Loading />}
      {data && data.results && !!data.results.length ? (
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
        data.results &&
        data.results.length === 0 && (
          <ResponseError status={404} message={'There is nothing here'} />
        )
      )}
    </>
  );
}

export default ResultList;
