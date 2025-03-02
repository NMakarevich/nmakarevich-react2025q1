import React from 'react';
import Main from '../../../src/Main';
import { API_ENDPOINTS, RESOURCES } from '../../../src/constants';
import { DetailedResponse, Response } from '../../../src/interfaces';
import { GetServerSidePropsContext } from 'next';
import NotFoundPage from '../../404';
import { store } from '../../../src/redux/store';
import ThemeProvider from '../../../src/providers/theme/theme.provider';
import styles from '../../../src/App.module.scss';
import SelectResource from '../../../src/components/selectResource/selectResource';
import Search from '../../../src/components/search/search';
import ThemeToggle from '../../../src/components/theme-toggle/theme-toggle';
import Flyout from '../../../src/components/flyout/flyout';
import { Provider } from 'react-redux';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const params = context.params
    ? (context.params.resource as string[])
    : ['', ''];
  const [resource, id] = params;
  if (resource && RESOURCES.includes(resource)) {
    const page = (context.query.page as string) || '1';
    const q = (context.query.q as string) || '';
    const searchParams = new URLSearchParams([['page', page]]);
    if (q) searchParams.append('name', q);
    const url = API_ENDPOINTS[resource];
    const response = await fetch(`${url}?${searchParams.toString()}`);
    const data = await response.json();
    if (id) {
      const responseDetailed = await fetch(`${url}/${id}`);
      const detailed = await responseDetailed.json();
      if (responseDetailed.ok)
        return { props: { data, detailed: { data: detailed }, error: null } };
      else
        return {
          props: { data, detailed: { error: detailed.error }, error: null },
        };
    }
    return { props: { data, detailed: null, error: null } };
  } else
    return { props: { data: {}, detailed: null, error: 'Resource Not Found' } };
}

function Page(props: {
  data: Response;
  detailed: DetailedResponse;
  error: string;
}): React.ReactNode {
  const { data, detailed, error } = props;
  if (error) return <NotFoundPage />;

  return (
    <Provider store={store}>
      <ThemeProvider>
        <header className={`${styles['app-header']}`}>
          <div className={styles.container}>
            <SelectResource />
            <Search />
            <ThemeToggle />
          </div>
        </header>
        <main className={`${styles['app-main']}`}>
          <div className={styles.container}>
            {' '}
            <Main data={data} detailed={detailed} />
          </div>
        </main>
        <Flyout />
      </ThemeProvider>
    </Provider>
  );
}

export default Page;
