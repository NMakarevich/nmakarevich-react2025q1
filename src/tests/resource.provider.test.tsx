import { describe, expect } from 'vitest';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import ResourceProvider from '../providers/resource/resource.provider.tsx';

describe('ResourceProvider', () => {
  it('should render child', () => {
    render(
      <ResourceProvider>
        <h2>title</h2>
      </ResourceProvider>
    );
    expect(screen.getByText(/title/)).toBeInTheDocument();
  });
});
