import React, { useEffect, useState } from 'react';
import { ResponseInfo } from '../../interfaces.ts';
import Button from '../ui/button/button.tsx';
import './pagination.scss';
import { useNavigate, useParams, useSearchParams } from 'react-router';
import { useAppDispatch } from '../../redux/store.ts';
import { setRequestUrl } from '../../redux/resources.slice.ts';

interface Props {
  info: ResponseInfo;
}

function Pagination(props: Props): React.ReactNode {
  const { pages, prev, next } = props.info;
  const [searchParams] = useSearchParams();
  const [page, setPage] = useState(
    parseInt(searchParams.get('page') || '1', 10)
  );
  const navigate = useNavigate();
  const { resource } = useParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const urlPage = searchParams.get('page') || '1';
    if (parseInt(urlPage) !== page) setPage(parseInt(urlPage));
  }, [page, searchParams]);

  function prevPage() {
    const params = new URLSearchParams(searchParams);
    if (prev) {
      params.set('page', (page - 1).toString());
      setPage((prev) => prev - 1);
      dispatch(setRequestUrl(prev));
      navigate(`/search/${resource}?${params.toString()}`);
    }
  }

  function nextPage() {
    const params = new URLSearchParams(searchParams);
    if (next) {
      params.set('page', (page + 1).toString());
      setPage((prev) => prev + 1);
      dispatch(setRequestUrl(next));
      navigate(`/search/${resource}?${params.toString()}`);
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
