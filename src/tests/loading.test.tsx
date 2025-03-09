import { describe, expect } from 'vitest';
import Loading from '../components/ui/loading/loading.tsx';
import { render } from '@testing-library/react';

describe('Loading', () => {
  it('renders correctly', () => {
    const { container } = render(<Loading />);
    expect(container).toBeDefined();
  });
});
