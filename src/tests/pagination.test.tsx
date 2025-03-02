import { describe, expect, vi } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import Pagination from '../components/pagination/pagination.tsx';
import { response } from './mock.ts';
import { Provider } from 'react-redux';
import { store } from '../redux/store.ts';

const pushMock = vi.fn();

vi.mock('next/navigation', () => ({
  useSearchParams: () => ({
    get: vi.fn(),
  }),
}));

vi.mock('next/router', () => ({
  useRouter: vi.fn(() => ({
    push: pushMock,
    query: { resource: ['characters'] },
  })),
}));

describe('Pagination tests', () => {
  it('Should change search params', async () => {
    window.history.pushState(null, '', '/search/characters?page=1');
    render(
      <Provider store={store}>
        <Pagination info={response.info} />
      </Provider>
    );
    const nextButton = screen.getByRole('button', { name: 'Next page' });
    fireEvent.click(nextButton);
    await waitFor(() => {
      expect(pushMock).toHaveBeenCalledWith('/search/characters?page=2');
    });
  });
});
