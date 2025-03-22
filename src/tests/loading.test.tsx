import { describe, expect } from 'vitest';
import { render } from '@testing-library/react';
import Loading from '../../app/search/[...resource]/loading.tsx';

describe('Loading', () => {
  it('renders correctly', () => {
    const { container } = render(<Loading />);
    expect(container).toBeDefined();
  });
});
