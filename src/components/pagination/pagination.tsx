import React, { useEffect, useState } from 'react';
import { ResponseInfo } from '../../interfaces.ts';
import Button from '../ui/button/button.tsx';
import './pagination.scss';
import { useNavigate, useParams, useSearchParams } from 'react-router';

interface Props {
  info: ResponseInfo;
}

function Pagination(props: Props): React.ReactNode {
  const { pages, prev, next } = props.info;
  const [searchParams] = useSearchParams();

  const currentPage = searchParams.get('page') || '1';

  const [page, setPage] = useState(parseInt(currentPage, 10));
  const navigate = useNavigate();
  const { resource } = useParams();

  useEffect(() => {
    const urlPage = searchParams.get('page') || '1';
    if (parseInt(urlPage) !== page) setPage(parseInt(urlPage));
  }, [page, searchParams]);

  function prevPage() {
    const params = new URLSearchParams(searchParams);
    if (prev) {
      params.set('page', (page - 1).toString());
      setPage((prev) => prev - 1);
      navigate(`/search/${resource}?${params.toString()}`, { state: prev });
    }
  }

  function nextPage() {
    const params = new URLSearchParams(searchParams);
    if (next) {
      params.set('page', (page + 1).toString());
      setPage((prev) => prev + 1);
      navigate(`/search/${resource}?${params.toString()}`, { state: next });
    }
  }

  return (
    <div className={'pagination'}>
      <Button
        title={'Prev page'}
        handleClick={prevPage}
        disabled={page === 1}
      />
      <span className={'pagination-info'}>{`${page} of ${pages}`}</span>
      <Button
        title={'Next page'}
        handleClick={nextPage}
        disabled={page === pages}
      />
    </div>
  );
}

export default Pagination;
