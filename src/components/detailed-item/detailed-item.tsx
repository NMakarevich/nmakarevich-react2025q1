import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import { API_URL } from '../../constants.ts';
import Loading from '../ui/loading/loading.tsx';
import './detailed-item.scss';
import ResponseError from '../response-error/response-error.tsx';
import { ResponseDetailed } from '../../interfaces.ts';
import DetailedItemCharacter from './detailed-item-character.tsx';
import DetailedItemLocation from './detailed-item-location.tsx';
import DetailedItemEpisode from './detailed-item-episode.tsx';

function DetailedItem(): React.ReactNode {
  const [response, setResponse] = useState<ResponseDetailed>({
    data: null,
    error: '',
  });
  const [status, setStatus] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const [searchParams] = useSearchParams();

  useEffect(() => {
    async function loadData() {
      const resource = searchParams.get('resource');
      const id = searchParams.get('id');
      if (resource && id) {
        setIsLoading(true);
        const res = await fetch(`${API_URL}/${resource}/${id}`);
        const data = await res.json();
        if (data && 'image' in data && data.image) {
          const promise = new Promise((resolve, reject) => {
            const image = new Image();
            image.src = data.image;
            image.alt = data.name;
            image.onload = () => resolve(image);
            image.onerror = () => reject();
          });
          await promise;
        }
        setResponse(data?.error ? data : { data });
        setStatus(res.status);
        setIsLoading(false);
      }
    }
    loadData().then(() => {});
  }, [searchParams]);

  return (
    searchParams.size && (
      <div className={'detailed'}>
        {isLoading ? (
          <Loading />
        ) : !response.error ? (
          <div className={'detailed-item'}>
            {response.data &&
              'image' in response.data &&
              response.data.image && (
                <>
                  <DetailedItemCharacter item={response.data} />
                </>
              )}
            {response.data &&
              'dimension' in response.data &&
              response.data.dimension && (
                <>
                  <DetailedItemLocation item={response.data} />
                </>
              )}
            {response.data &&
              'air_date' in response.data &&
              response.data.air_date && (
                <>
                  <DetailedItemEpisode item={response.data} />
                </>
              )}
          </div>
        ) : (
          <ResponseError status={status} message={response.error || ''} />
        )}
      </div>
    )
  );
}

export default DetailedItem;
