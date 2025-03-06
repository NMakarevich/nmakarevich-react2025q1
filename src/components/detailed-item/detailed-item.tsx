'use client';

import React from 'react';
import ResponseError from '../response-error/response-error.tsx';
import DetailedItemCharacter from './detailed-item-character.tsx';
import DetailedItemLocation from './detailed-item-location.tsx';
import DetailedItemEpisode from './detailed-item-episode.tsx';
import FavouriteCheckbox from '../favourite-checkbox/favourite-checkbox.tsx';
import styles from './detailed-item.module.scss';
import { DetailedResponse, SearchParams } from '../../interfaces.ts';
import { useRouter, useSearchParams } from 'next/navigation';

interface Props {
  params: SearchParams;
  data: DetailedResponse;
}

function DetailedItem(props: Props): React.ReactNode {
  const { data, params } = props;
  const { resource } = params;
  const searchParams = useSearchParams();
  const router = useRouter();

  function closeDetails() {
    const params = new URLSearchParams(searchParams.toString());
    router.push(`/search/${resource}?${params.toString()}`);
  }

  function selectCardComponent() {
    if (data && 'image' in data && data.image)
      return <DetailedItemCharacter item={data} />;
    if (data && 'residents' in data && data.residents)
      return <DetailedItemLocation item={data} />;
    if (data && 'air_date' in data && data.air_date)
      return <DetailedItemEpisode item={data} />;
  }

  return (
    <div className={styles.detailed}>
      {data && !('error' in data) && (
        <div className={styles['detailed-item']}>
          <div className={styles['detailed-close']} onClick={closeDetails}>
            Close
          </div>
          <div className={styles['detailed-item-content']}>
            <FavouriteCheckbox result={data} />
            {selectCardComponent()}
          </div>
        </div>
      )}
      {data && 'error' in data && (
        <ResponseError status={404} message={data.error || 'Unknown error'} />
      )}
    </div>
  );
}

export default DetailedItem;
