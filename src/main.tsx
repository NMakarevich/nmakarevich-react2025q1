import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import ErrorBoundary from './error-boundary.tsx';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router';
import DetailedItem from './components/detailed-item/detailed-item.tsx';
import NotFoundPage from './pages/NotFound/not-found.tsx';

const root = document.getElementById('root');

if (root)
  createRoot(root).render(
    <StrictMode>
      <ErrorBoundary>
        <BrowserRouter>
          <Routes>
            <Route path={'/'} element={<Navigate to={'search'} />} />
            <Route path={'/search'} element={<App />} />
            <Route path={'/search/:resource'} element={<App />}>
              <Route index path={':id'} element={<DetailedItem />} />
            </Route>
            <Route path={'*'} element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
      </ErrorBoundary>
    </StrictMode>
  );
