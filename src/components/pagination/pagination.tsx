import React, { useEffect, useState } from 'react';
import { ResponseInfo } from '../../interfaces.ts';
import Button from '../ui/button/button.tsx';
import styles from './pagination.module.scss';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';

interface Props {
  info: ResponseInfo;
}

function Pagination(props: Props): React.ReactNode {
  const { pages, prev, next } = props.info;
  const searchParams = useSearchParams();
  const [page, setPage] = useState(
    parseInt(searchParams.get('page') || '1', 10)
  );
  const router = useRouter();
  const [resource] = router.query.resource as string[];

  useEffect(() => {
    const urlPage = searchParams.get('page') || '1';
    if (parseInt(urlPage) !== page) setPage(parseInt(urlPage));
  }, [page, searchParams]);

  function getSearchParams() {
    const url = new URL(window.location.href);
    return new URLSearchParams(url.search);
  }

  async function prevPage() {
    const params = getSearchParams();
    if (prev) {
      params.set('page', (page - 1).toString());
      setPage((prev) => prev - 1);
      await router.push(`/search/${resource as string}?${params.toString()}`);
    }
  }

  async function nextPage() {
    const params = getSearchParams();
    if (next) {
      params.set('page', (page + 1).toString());
      setPage((prev) => prev + 1);
      await router.push(`/search/${resource as string}?${params.toString()}`);
    }
  }

  return (
    <div className={styles.pagination}>
      <Button
        title={'Prev page'}
        handleClick={prevPage}
        disabled={page === 1}
      />
      <span className={styles['pagination-info']}>{`${page} of ${pages}`}</span>
      <Button
        title={'Next page'}
        handleClick={nextPage}
        disabled={page === pages}
      />
    </div>
  );
}

export default Pagination;
