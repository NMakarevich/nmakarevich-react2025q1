import './App.scss';
import React, { useEffect, useState } from 'react';
import Search from './components/search/search.tsx';
import ResultList from './components/result-list/result-list.tsx';
import Button from './components/ui/button/button.tsx';
import {
  Outlet,
  useLocation,
  useNavigate,
  useSearchParams,
} from 'react-router';

function App(): React.ReactNode {
  const [error, setError] = useState<boolean>(false);
  const [requestUrl, setRequestUrl] = useState<string>('');

  const [searchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!searchParams.get('page')) {
      const { pathname } = location;
      const params = new URLSearchParams(searchParams);
      params.set('page', '1');
      navigate(`${pathname}?${params.toString()}`);
    }
  });

  useEffect(() => {
    if (location.state) setRequestUrl(location.state);
  }, [location]);

  useEffect(() => {
    if (requestUrl && location.state) {
      const requestPathname = requestUrl.split('?')[0];
      const statePathname = location.state.split('?')[0];
      const requestName = new URLSearchParams(requestUrl.split('?')[1]).get(
        'name'
      );
      const stateName = new URLSearchParams(location.state.split('?')[1]).get(
        'name'
      );
      if (
        requestPathname !== statePathname ||
        (requestName && stateName && requestName !== stateName)
      ) {
        const params = new URLSearchParams(searchParams);
        params.delete('resource');
        params.delete('id');
        params.set('page', '1');
        navigate(`/search?${params.toString()}`);
      }
    }
  }, [requestUrl, location, searchParams, navigate]);

  useEffect(() => {
    if (error) throw new Error('Test error boundary');
  }, [error]);

  function throwError() {
    setError(true);
  }

  function getRequestUrl(url: string) {
    setRequestUrl(url);
  }

  return (
    <>
      <header className="app-header">
        <div className="container">
          <Search getRequestUrl={getRequestUrl} />
          <div className={'error-button'}>
            <Button title={'Error Test'} handleClick={throwError} />
          </div>
        </div>
      </header>
      <main className="app-main">
        <div className="container">
          <ResultList requestUrl={requestUrl} />
          <Outlet />
        </div>
      </main>
      <footer className="footer">
        <div className="container"></div>
      </footer>
    </>
  );
}

export default App;
