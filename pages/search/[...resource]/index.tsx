import React from 'react';
import Main from '../../../src/Main';
import { API_ENDPOINTS, RESOURCES } from '../../../src/constants';
import { DetailedResponse, Response } from '../../../src/interfaces';
import { GetServerSidePropsContext } from 'next';
import NotFoundPage from '../../404';
import Layout from '../../../src/components/layout';

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
    <Layout>
      <Main data={data} detailed={detailed} />
    </Layout>
  );
}

export default Page;
