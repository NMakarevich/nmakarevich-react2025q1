import React, { useEffect, useState } from 'react';
import ResultItem from '../result-item/result-item.tsx';
import './result-list.scss';
import { Character, Response } from '../../interfaces.ts';
import ResponseError from '../response-error/response-error.tsx';
import Loading from '../ui/loading/loading.tsx';
import Pagination from '../pagination/pagination.tsx';
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router';

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

  function closeDetails() {
    const params = new URLSearchParams(searchParams);
    if (location.pathname.includes('details')) {
      params.delete('resource');
      params.delete('id');
      navigate(`/search?${params.toString()}`);
    }
  }

  function openDetails(id: string) {
    const params = new URLSearchParams(searchParams);
    if (!location.pathname.includes('details')) {
      params.set('resource', getResourceFromURL() as string);
      params.set('id', id);
      return params;
    }
  }

  useEffect(() => {
    async function loadData() {
      if (!requestUrl) return;
      setIsLoading(true);
      const resp = await fetch(requestUrl);
      const status = resp.status;
      const data: Response = await resp.json();
      if (!data.error && 'image' in data.results[0] && data.results[0].image) {
        const images = data.results.map((item) => (item as Character).image);
        const promises = images.map((image) => {
          return new Promise<HTMLImageElement>((resolve, reject) => {
            const img = new Image();
            img.src = image;
            img.alt = image;
            img.onload = () => resolve(img);
            img.onerror = () => reject();
          });
        });
        await Promise.all(promises);
      }
      setResponse(data);
      setStatus(status);
      setIsLoading(false);
    }
    loadData().then(() => {});
  }, [requestUrl]);

  function getResourceFromURL() {
    return requestUrl
      .split('?')[0]
      .split('/')
      .filter((item) => item)
      .pop();
  }

  return (
    <>
      {isLoading && <Loading />}
      {response.results && response.results.length > 0 ? (
        <div className={'result'}>
          <Pagination info={response.info} />
          <div className={'result-wrapper'}>
            <div className={'result-list'} onClick={closeDetails}>
              {response.results.map((result) => (
                <Link
                  to={`./details?${openDetails(result.id.toString())}`}
                  key={result.id}
                  state={requestUrl}
                >
                  <ResultItem result={result} />
                </Link>
              ))}
            </div>
          </div>
        </div>
      ) : (
        response.error && (
          <ResponseError status={status} message={response.error || ''} />
        )
      )}
    </>
  );
}

export default ResultList;
