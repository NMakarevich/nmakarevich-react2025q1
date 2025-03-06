import React from 'react';
import ResultItem from '../result-item/result-item.tsx';
import styles from './result-list.module.scss';
import Pagination from '../pagination/pagination.tsx';
import Link from 'next/link';
import { SearchParams } from '../../interfaces.ts';
import { generateSearchParams } from '../../utils.ts';
import { CardsResponse } from '../../interfaces.ts';

interface Props {
  data: CardsResponse;
  params: SearchParams;
}

function ResultList(props: Props): React.ReactNode {
  const { data } = props;
  const { resource, page, name } = props.params;

  return (
    <>
      {data && data.results && data.results.length > 0 && (
        <>
          <div className={styles.result}>
            <Pagination
              info={data.info}
              resource={resource}
              page={page}
              name={name}
            />
            <div className={styles['result-wrapper']}>
              <div className={styles['result-list']}>
                {data.results.map((result) => (
                  <Link
                    href={`/search/${resource}/${result.id}?${generateSearchParams(page, name)}`}
                    key={`${resource}-${result.id}`}
                  >
                    <ResultItem result={result} />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default ResultList;
