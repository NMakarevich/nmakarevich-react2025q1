import './App.scss';
import React, { useContext, useEffect } from 'react';
import Search from './components/search/search.tsx';
import ResultList from './components/result-list/result-list.tsx';
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router';
import Toggle from './components/ui/toggle/toggle.tsx';
import { ThemeContext } from './providers/theme/theme.context.ts';
import { useAppDispatch } from './redux/store.ts';
import { setResource } from './redux/favourites.slice.ts';
import Flyout from './components/flyout/flyout.tsx';

function App(): React.ReactNode {
  const { isSwitched, setIsSwitched } = useContext(ThemeContext);
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();
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

  return (
    <>
      <header className={`app-header ${isSwitched ? 'light' : ''}`}>
        <div className="container">
          <Search />
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
          <ResultList />
        </div>
      </main>
      <div className={`flyout-wrapper ${isSwitched ? 'light' : ''}`}>
        <Flyout />
      </div>
    </>
  );
}

export default App;
