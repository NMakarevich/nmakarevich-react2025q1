import React, { useEffect } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router';
import './detailed-item.scss';
import ResponseError from '../response-error/response-error.tsx';
import DetailedItemCharacter from './detailed-item-character.tsx';
import DetailedItemLocation from './detailed-item-location.tsx';
import DetailedItemEpisode from './detailed-item-episode.tsx';
import FavouriteCheckbox from '../favourite-checkbox/favourite-checkbox.tsx';
import { useAppDispatch } from '../../redux/store.ts';
import { deleteDetails, saveDetails } from '../../redux/details.slice.ts';
import { Card } from '../../interfaces.ts';

interface Props {
  data: Card | undefined;
}

function DetailedItem({ data }: Props): React.ReactNode {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { resource } = useParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (data) dispatch(saveDetails(data));
  }, [dispatch, data]);

  function closeDetails() {
    const params = new URLSearchParams(searchParams);
    navigate(`/search/${resource}?${params.toString()}`);
    dispatch(deleteDetails());
  }

  return (
    <div className={'detailed'}>
      <div className={'detailed-item'}>
        <div className={'detailed-close'} onClick={closeDetails}>
          Close
        </div>
        {data && (
          <>
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
          </>
        )}
      </div>
      {!data && (
        <ResponseError status={404} message={'No detailed items found.'} />
      )}
    </div>
  );
}

export default DetailedItem;
