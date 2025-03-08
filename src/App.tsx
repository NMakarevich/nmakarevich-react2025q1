import './App.scss';
import React, { useContext, useEffect } from 'react';
import Search from './components/search/search.tsx';
import ResultList from './components/result-list/result-list.tsx';
import { useNavigate, useParams, useSearchParams } from 'react-router';
import Toggle from './components/ui/toggle/toggle.tsx';
import { ThemeContext } from './providers/theme/theme.context.ts';
import Flyout from './components/flyout/flyout.tsx';
import { ResourceContext } from './providers/resource/resource.context.ts';
import { Response } from './interfaces.ts';
import useLocalStorage from './hooks/local-storage.tsx';
import { LOCAL_STORAGE_KEYS } from './constants.ts';

interface Props {
  data: Response;
}

function App(props: Props): React.ReactNode {
  const { isSwitched, setIsSwitched } = useContext(ThemeContext);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { resource } = useParams();
  const { selectedResource, setSelectedResource } = useContext(ResourceContext);
  const [searchTerm] = useLocalStorage(LOCAL_STORAGE_KEYS.search);

  useEffect(() => {
    if (resource) setSelectedResource(resource);
  }, [setSelectedResource, resource]);

  useEffect(() => {
    if (!searchParams.get('page')) {
      const params = new URLSearchParams(searchParams);
      params.set('page', '1');
      if (searchTerm) params.set('name', searchTerm);
      navigate(`/search/${selectedResource}?${params.toString()}`);
    }
  }, [navigate, searchParams, searchTerm, selectedResource]);

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
          <ResultList data={props.data} />
        </div>
      </main>
      <div className={`flyout-wrapper ${isSwitched ? 'light' : ''}`}>
        <Flyout />
      </div>
    </>
  );
}

export default App;
