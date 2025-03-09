import { describe, expect } from 'vitest';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Loading from '../components/ui/loading/loading.tsx';

describe('Loading', () => {
  it('renders correctly', () => {
    render(<Loading />);
    expect(screen.getByText(/Loading/)).toBeInTheDocument();
  });
});
