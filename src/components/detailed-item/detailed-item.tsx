import React, { useEffect } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router';
import Loading from '../ui/loading/loading.tsx';
import './detailed-item.scss';
import ResponseError from '../response-error/response-error.tsx';
import DetailedItemCharacter from './detailed-item-character.tsx';
import DetailedItemLocation from './detailed-item-location.tsx';
import DetailedItemEpisode from './detailed-item-episode.tsx';
import FavouriteCheckbox from '../favourite-checkbox/favourite-checkbox.tsx';
import { useAppDispatch } from '../../redux/store.ts';
import { deleteDetails, saveDetails } from '../../redux/details.slice.ts';
import { useGetCardQuery } from '../../redux/api.ts';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';

function DetailedItem(): React.ReactNode {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { resource, id } = useParams();
  const dispatch = useAppDispatch();
  const { data, isFetching, error } = useGetCardQuery(
    `${resource?.slice(0, -1)}/${id}`,
    {
      skip: !resource && !id,
    }
  );

  useEffect(() => {
    if (data) dispatch(saveDetails(data));
  }, [dispatch, data]);

  function closeDetails() {
    const params = new URLSearchParams(searchParams);
    navigate(`/search/${resource}?${params.toString()}`);
    dispatch(deleteDetails());
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
    <div className={'detailed'}>
      {isFetching && <Loading />}
      {data && (
        <div className={'detailed-item'}>
          <div className={'detailed-close'} onClick={closeDetails}>
            Close
          </div>
          {data && 'image' in data && data.image && (
            <div className={'detailed-item-content'}>
              <FavouriteCheckbox result={data} />
              <DetailedItemCharacter item={data} />
            </div>
          )}
          {data && 'residents' in data && data.residents && (
            <div className={'detailed-item-content'}>
              <FavouriteCheckbox result={data} />
              <DetailedItemLocation item={data} />
            </div>
          )}
          {data && 'air_date' in data && data.air_date && (
            <div className={'detailed-item-content'}>
              <FavouriteCheckbox result={data} />
              <DetailedItemEpisode item={data} />
            </div>
          )}
        </div>
      )}
      {error && (
        <ResponseError
          status={parsedError(error)?.status || 0}
          message={parsedError(error)?.data.error || 'Unknown error'}
        />
      )}
    </div>
  );
}

export default DetailedItem;
