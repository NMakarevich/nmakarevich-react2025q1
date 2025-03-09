import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { LOCAL_STORAGE_KEYS, RESOURCES } from '../../src/constants';
import useLocalStorage from '../../src/hooks/local-storage';

function Page() {
  const router = useRouter();
  const [search] = useLocalStorage(LOCAL_STORAGE_KEYS.search);

  useEffect(() => {
    const params = new URLSearchParams([['page', '1']]);
    if (search) params.set('q', search);
    router.push({
      pathname: `/search/${RESOURCES[0]}`,
      query: params.toString(),
    });
  });
}

export default Page;
