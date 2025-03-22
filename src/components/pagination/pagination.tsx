'use client';

import React from 'react';
import { ResponseInfo } from '../../interfaces.ts';
import styles from './pagination.module.scss';
import { useRouter, useSearchParams } from 'next/navigation';
import Button from '../ui/button/button.tsx';

interface Props {
  info: ResponseInfo;
  resource: string;
  page: string;
  name: string | undefined;
}

enum DIRECTION {
  prev = -1,
  next = 1,
}

function Pagination(props: Props): React.ReactNode {
  const { pages, prev, next } = props.info;
  const { page, resource, name } = props;
  const router = useRouter();
  const searchParams = useSearchParams();

  function generateSearchParams() {
    const params = new URLSearchParams(searchParams?.toString());
    if (name) params.set('name', name);
    return params;
  }

  function navigate(direction: number) {
    const params = generateSearchParams();
    params.set('page', (parseInt(page) + direction).toString());
    router.push(`/search/${resource}?${params.toString()}`);
  }

  return (
    <div className={styles.pagination}>
      <Button
        title={'Prev page'}
        handleClick={() => navigate(DIRECTION.prev)}
        disabled={!prev}
      />
      <span className={styles['pagination-info']}>{`${page} of ${pages}`}</span>
      <Button
        title={'Next page'}
        handleClick={() => navigate(DIRECTION.next)}
        disabled={!next}
      />
    </div>
  );
}

export default Pagination;
