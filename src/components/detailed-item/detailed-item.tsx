import { ReactNode, useEffect } from 'react';
import ResponseError from '../response-error/response-error.tsx';
import DetailedItemCharacter from './detailed-item-character.tsx';
import DetailedItemLocation from './detailed-item-location.tsx';
import DetailedItemEpisode from './detailed-item-episode.tsx';
import FavouriteCheckbox from '../favourite-checkbox/favourite-checkbox.tsx';
import { useAppDispatch } from '../../redux/store.ts';
import { deleteDetails, saveDetails } from '../../redux/details.slice.ts';
import styles from './detailed-item.module.scss';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import { DetailedResponse } from '../../interfaces.ts';

function DetailedItem(props: { detailed: DetailedResponse }): ReactNode {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [resource] = router.query.resource as string[];

  const dispatch = useAppDispatch();

  const { data, error } = props.detailed;

  useEffect(() => {
    dispatch(saveDetails(data));
  }, [dispatch, data]);

  function closeDetails() {
    const params = new URLSearchParams(searchParams);
    router.push(`/search/${resource}?${params.toString()}`);
    dispatch(deleteDetails());
  }

  return (
    <div className={styles.detailed}>
      {data && (
        <div className={styles['detailed-item']}>
          <div className={styles['detailed-close']} onClick={closeDetails}>
            Close
          </div>
          {data && 'image' in data && data.image && (
            <div className={styles['detailed-item-content']}>
              <FavouriteCheckbox result={data} />
              <DetailedItemCharacter item={data} />
            </div>
          )}
          {data && 'residents' in data && data.residents && (
            <div className={styles['detailed-item-content']}>
              <FavouriteCheckbox result={data} />
              <DetailedItemLocation item={data} />
            </div>
          )}
          {data && 'air_date' in data && data.air_date && (
            <div className={styles['detailed-item-content']}>
              <FavouriteCheckbox result={data} />
              <DetailedItemEpisode item={data} />
            </div>
          )}
        </div>
      )}
      {error && (
        <ResponseError status={404} message={error || 'Unknown error'} />
      )}
    </div>
  );
}

export default DetailedItem;
