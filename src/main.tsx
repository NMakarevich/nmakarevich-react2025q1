import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import ErrorBoundary from './error-boundary.tsx';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router';
import DetailedItem from './components/detailed-item/detailed-item.tsx';
import NotFoundPage from './pages/NotFound/not-found.tsx';
import Main from './pages/Main/main.tsx';
import { Provider } from 'react-redux';
import { store } from './redux/store.ts';

const root = document.getElementById('root');

if (root)
  createRoot(root).render(
    <StrictMode>
      <ErrorBoundary>
        <BrowserRouter>
          <Provider store={store}>
            <Routes>
              <Route path={'/'} element={<Navigate to={'search'} />} />
              <Route path={'/search'} element={<Main />} />
              <Route path={'/search/:resource'} element={<Main />}>
                <Route index path={':id'} element={<DetailedItem />} />
              </Route>
              <Route path={'*'} element={<NotFoundPage />} />
            </Routes>
          </Provider>
        </BrowserRouter>
      </ErrorBoundary>
    </StrictMode>
  );
