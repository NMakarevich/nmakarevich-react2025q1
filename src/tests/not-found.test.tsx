import { describe, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import NotFoundPage from '../pages/NotFound/not-found.tsx';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router';

describe('Not Found page test', () => {
  it('Should render 404', () => {
    render(
      <BrowserRouter>
        <NotFoundPage />
      </BrowserRouter>
    );
    const title = screen.getByText('Page is not Found');
    expect(title).toBeInTheDocument();
  });
});
