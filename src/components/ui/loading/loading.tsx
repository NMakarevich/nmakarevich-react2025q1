import React from 'react';
import './loading.scss';

function Loading(): React.ReactNode {
  return (
    <div className="loading">
      <div className={'loading-image'}></div>
      <h3 className={'loading-title'}>Loading...</h3>
    </div>
  );
}

export default Loading;
