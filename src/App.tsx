import './App.scss';
import React, { useContext, useEffect, useState } from 'react';
import Search from './components/search/search.tsx';
import ResultList from './components/result-list/result-list.tsx';
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router';
import Toggle from './components/ui/toggle/toggle.tsx';
import { ThemeContext } from './providers/theme/theme.context.tsx';
import { useAppDispatch } from './redux/store.ts';
import { setResource } from './redux/favourites.slice.ts';
import Flyout from './components/flyout/flyout.tsx';

function App(): React.ReactNode {
  const [requestUrl, setRequestUrl] = useState<string>('');
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { isSwitched, setIsSwitched } = useContext(ThemeContext);
  const { resource } = useParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (resource) dispatch(setResource(resource));
  }, [dispatch, resource]);

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
      <header className={`app-header ${isSwitched ? 'light' : ''}`}>
        <div className="container">
          <Search getRequestUrl={getRequestUrl} />
          <Toggle
            option1={'Dark'}
            option2={'Light'}
            onToggle={setIsSwitched}
            initState={false}
          />
        </div>
      </header>
      <main className={`app-main  ${isSwitched ? 'light' : ''}`}>
        <div className="container">
          <ResultList requestUrl={requestUrl} />
        </div>
      </main>
      <Flyout />
    </>
  );
}

export default App;
