import './App.scss';
import React, { useEffect, useState } from 'react';
import Search from './components/search/search.tsx';
import ResultList from './components/result-list/result-list.tsx';
import { useLocation, useNavigate, useSearchParams } from 'react-router';

function App(): React.ReactNode {
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

  function getRequestUrl(url: string) {
    setRequestUrl(url);
  }

  return (
    <>
      <header className="app-header">
        <div className="container">
          <Search getRequestUrl={getRequestUrl} />
        </div>
      </header>
      <main className="app-main">
        <div className="container">
          <ResultList requestUrl={requestUrl} />
        </div>
      </main>
      <footer className="footer">
        <div className="container"></div>
      </footer>
    </>
  );
}

export default App;
