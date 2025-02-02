import React, { useEffect, useState } from 'react';
import ResultItem from '../result-item/result-item.tsx';
import './result-list.scss';
import { Character, Response } from '../../interfaces.ts';
import ResponseError from '../response-error/response-error.tsx';
import Loading from '../ui/loading/loading.tsx';

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

  useEffect(() => {
    async function loadData() {
      if (!requestUrl) return;
      setIsLoading(true);
      const resp = await fetch(requestUrl);
      const status = resp.status;
      const data: Response = await resp.json();
      if ('image' in data.results[0] && data.results[0].image) {
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

  return (
    <>
      {isLoading && <Loading />}
      {status > 400 && (
        <ResponseError status={status} message={response.error || ''} />
      )}
      {response.results && response.results.length > 0 && (
        <div className={'result'}>
          <div className={'result-list'}>
            {response.results.map((result) => (
              <ResultItem key={result.id} result={result} />
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default ResultList;
