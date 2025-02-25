import { Link } from 'react-router';
import React from 'react';
import './not-found.scss';

function NotFoundPage(): React.ReactElement {
  return (
    <div className={'not-found'}>
      <h2 className={'not-found_title'}>Page is not Found</h2>
      <Link className={'not-found_link'} to={'/'}>
        Back to Home
      </Link>
    </div>
  );
}

export default NotFoundPage;
