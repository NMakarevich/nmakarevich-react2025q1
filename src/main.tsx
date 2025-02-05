import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import ErrorBoundary from './error-boundary.tsx';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router';
import DetailedItem from './components/detailed-item/detailed-item.tsx';

const root = document.getElementById('root');

if (root)
  createRoot(root).render(
    <StrictMode>
      <ErrorBoundary>
        <BrowserRouter>
          <Routes>
            <Route path={'/'} element={<Navigate to={'search'} />} />
            <Route path={'/search'} element={<App />}>
              <Route index path={'details'} element={<DetailedItem />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ErrorBoundary>
    </StrictMode>
  );
