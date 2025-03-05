import { describe, expect, vi } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import Pagination from '../components/pagination/pagination.tsx';
import { response } from './mock.ts';
import { RESOURCES } from '../constants.ts';

const pushMock = vi.fn();

vi.mock('next/navigation', () => ({
  useSearchParams: () => ({
    get: vi.fn(),
    toString: vi.fn(),
  }),
  useRouter: vi.fn(() => ({
    push: pushMock,
  })),
}));

describe('Pagination tests', () => {
  it('Should change search params', async () => {
    window.history.pushState(null, '', '/search/characters?page=1');
    render(
      <Pagination
        info={response.info}
        resource={RESOURCES[0]}
        page={'1'}
        name={''}
      />
    );
    const nextButton = screen.getByRole('button', { name: 'Next page' });
    fireEvent.click(nextButton);
    await waitFor(() => {
      expect(pushMock).toHaveBeenCalledWith('/search/characters?page=2');
    });
  });
});
