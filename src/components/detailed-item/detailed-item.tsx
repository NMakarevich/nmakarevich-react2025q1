import { ReactNode, useEffect } from 'react';
import ResponseError from '../response-error/response-error.tsx';
import DetailedItemCharacter from './detailed-item-character.tsx';
import DetailedItemLocation from './detailed-item-location.tsx';
import DetailedItemEpisode from './detailed-item-episode.tsx';
import FavouriteCheckbox from '../favourite-checkbox/favourite-checkbox.tsx';
import { useAppDispatch } from '../../redux/store.ts';
import { deleteDetails, saveDetails } from '../../redux/details.slice.ts';
import styles from './detailed-item.module.scss';
import { useRouter } from 'next/router';
import { DetailedResponse } from '../../interfaces.ts';

function DetailedItem(props: { detailed: DetailedResponse }): ReactNode {
  const router = useRouter();
  const [resource] = router.query.resource as string[];

  const dispatch = useAppDispatch();

  const { data, error } = props.detailed;

  useEffect(() => {
    dispatch(saveDetails(data));
  }, [dispatch, data]);

  function getSearchParams() {
    const url = new URL(window.location.href);
    return new URLSearchParams(url.search);
  }

  async function closeDetails() {
    const params = getSearchParams();
    await router.push(`/search/${resource}?${params.toString()}`);
    dispatch(deleteDetails());
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
      {data && (
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
      {error && (
        <ResponseError status={404} message={error || 'Unknown error'} />
      )}
    </div>
  );
}

export default DetailedItem;
