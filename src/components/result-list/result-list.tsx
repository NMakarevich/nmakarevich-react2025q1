import React, { useEffect, useState } from 'react';
import ResultItem from '../result-item/result-item.tsx';
import './result-list.scss';
import { Response } from '../../interfaces.ts';
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

interface Props {
  requestUrl: string;
}

function ResultList(props: Props): React.ReactNode {
  const [response, setResponse] = useState<Response>({
    results: [],
    info: {
      count: 0,
      pages: 0,
      next: null,
      prev: null,
    },
    error: '',
  });
  const [status, setStatus] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { requestUrl } = props;

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { resource, id } = useParams();

  function closeDetails() {
    if (id && location.pathname.includes(id))
      navigate(`/search/${resource}?${searchParams.toString()}`);
  }

  useEffect(() => {
    async function loadData() {
      if (!requestUrl) return;
      setIsLoading(true);
      const page = searchParams.get('page');
      const params = new URLSearchParams(requestUrl.split('?')[1]);
      if (!params.has('page') && page) params.set('page', page);
      const resp = await fetch(
        `${requestUrl.split('?')[0]}?${params.toString()}`
      );
      const status = resp.status;
      const data: Response = await resp.json();
      setResponse(data);
      setStatus(status);
      setIsLoading(false);
    }
    loadData().then(() => {});
  }, [requestUrl, searchParams]);

  return (
    <>
      {isLoading && <Loading />}
      {response.results && response.results.length > 0 ? (
        <>
          <div className={'result'}>
            <Pagination info={response.info} />
            <div className={'result-wrapper'}>
              <div className={'result-list'} onClick={closeDetails}>
                {response.results.map((result) => (
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
        response.error && (
          <ResponseError status={status} message={response.error || ''} />
        )
      )}
    </>
  );
}

export default ResultList;
