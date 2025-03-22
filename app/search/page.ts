import { redirect } from 'next/navigation';
import { RESOURCES } from '../../src/constants';

function Page() {
  redirect(`/search/${RESOURCES[0]}?page=1`);
}

export default Page;
