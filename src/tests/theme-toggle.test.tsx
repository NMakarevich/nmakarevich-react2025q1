import { describe, expect } from 'vitest';
import ThemeToggle from '../components/theme-toggle/theme-toggle.tsx';
import { render } from '@testing-library/react';

describe('ThemeToggle', () => {
  it('Should render the component', () => {
    const { container } = render(<ThemeToggle />);
    expect(container).toBeDefined();
  });
});
