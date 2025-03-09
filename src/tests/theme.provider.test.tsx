import { describe, expect } from 'vitest';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import ThemeProvider from '../providers/theme/theme.provider.tsx';

describe('ResourceProvider', () => {
  it('should render child', () => {
    render(
      <ThemeProvider>
        <h2>title</h2>
      </ThemeProvider>
    );
    expect(screen.getByText(/title/)).toBeInTheDocument();
  });
});
