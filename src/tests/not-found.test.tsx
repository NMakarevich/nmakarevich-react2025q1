import { describe, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import NotFoundPage from '../../pages/404.tsx';

describe('Not Found page test', () => {
  it('Should render 404', () => {
    render(<NotFoundPage />);
    const title = screen.getByText('Page is not Found');
    expect(title).toBeInTheDocument();
  });
});
