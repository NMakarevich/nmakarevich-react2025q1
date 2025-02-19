import { describe, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Fallback from '../components/fallback/fallback.tsx';
import '@testing-library/jest-dom';

describe('Fallback test', () => {
  it('Should render correctly', () => {
    const error = new Error('test error');
    render(<Fallback error={error} resetError={() => {}} />);
    const message = screen.getByText(/test error/);
    expect(message).toBeInTheDocument();
  });
});
