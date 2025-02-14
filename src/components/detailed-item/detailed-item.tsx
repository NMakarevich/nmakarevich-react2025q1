import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router';
import { API_URL } from '../../constants.ts';
import Loading from '../ui/loading/loading.tsx';
import './detailed-item.scss';
import ResponseError from '../response-error/response-error.tsx';
import { ResponseDetailed } from '../../interfaces.ts';
import DetailedItemCharacter from './detailed-item-character.tsx';
import DetailedItemLocation from './detailed-item-location.tsx';
import DetailedItemEpisode from './detailed-item-episode.tsx';
import FavouriteCheckbox from '../favourite-checkbox/favourite-checkbox.tsx';
import { useAppDispatch } from '../../redux/store.ts';
import { deleteDetails, saveDetails } from '../../redux/details.slice.ts';

function DetailedItem(): React.ReactNode {
  const [response, setResponse] = useState<ResponseDetailed>({
    data: null,
    error: '',
  });
  const [status, setStatus] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { resource, id } = useParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    async function loadData() {
      if (resource && id) {
        setIsLoading(true);
        const res = await fetch(`${API_URL}/${resource.slice(0, -1)}/${id}`);
        const data = await res.json();
        setResponse(data?.error ? data : { data });
        setStatus(res.status);
        setIsLoading(false);
        if (data) dispatch(saveDetails(data));
      }
    }
    loadData().then(() => {});
  }, [dispatch, id, resource]);

  function closeDetails() {
    const params = new URLSearchParams(searchParams);
    setResponse({ data: null, error: '' });
    navigate(`/search/${resource}?${params.toString()}`);
    dispatch(deleteDetails());
  }

  return (
    <div className={'detailed'}>
      {isLoading && <Loading />}
      {response.data && (
        <div className={'detailed-item'}>
          <div className={'detailed-close'} onClick={closeDetails}>
            Close
          </div>
          {response.data && 'image' in response.data && response.data.image && (
            <div className={'detailed-item-content'}>
              <FavouriteCheckbox result={response.data} />
              <DetailedItemCharacter item={response.data} />
            </div>
          )}
          {response.data &&
            'residents' in response.data &&
            response.data.residents && (
              <div className={'detailed-item-content'}>
                <FavouriteCheckbox result={response.data} />
                <DetailedItemLocation item={response.data} />
              </div>
            )}
          {response.data &&
            'air_date' in response.data &&
            response.data.air_date && (
              <div className={'detailed-item-content'}>
                <FavouriteCheckbox result={response.data} />
                <DetailedItemEpisode item={response.data} />
              </div>
            )}
        </div>
      )}
      {response.error && (
        <ResponseError status={status} message={response.error || ''} />
      )}
    </div>
  );
}

export default DetailedItem;
