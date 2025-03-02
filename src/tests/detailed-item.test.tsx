import { describe, expect, vi } from 'vitest';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import DetailedItem from '../components/detailed-item/detailed-item.tsx';
import { episode, location, response } from './mock.ts';
import '@testing-library/jest-dom';
import { renderWithProviders } from './test-utils.tsx';

const pushMock = vi.fn();

vi.mock('next/router', async () => ({
  useRouter: () => ({
    query: { resource: ['characters', '1'] },
    push: pushMock,
  }),
}));

vi.mock('next/navigation', async () => ({
  useSearchParams: () => ({
    get: vi.fn(),
  }),
  useParams: () => ({
    resource: ['character', '1'],
  }),
}));

describe('Detailed Item', () => {
  it('Should display detailed item', async () => {
    renderWithProviders(
      <DetailedItem detailed={{ data: response.results[0] }} />
    );
    const card = await screen.findByText('Name:');
    expect(card).toBeTruthy();
  });
  it('Should close detailed item', async () => {
    window.history.pushState(null, '', '/search/characters/1?page=1');
    renderWithProviders(
      <DetailedItem detailed={{ data: response.results[0] }} />
    );
    const button = await screen.findByText('Close');
    fireEvent.click(button);
    await waitFor(() => {
      expect(pushMock).toHaveBeenCalledWith('/search/characters?page=1');
    });
  });
  it('Should render location card', async () => {
    renderWithProviders(
      <DetailedItem detailed={{ data: location.results[0] }} />
    );
    const dimension = await screen.findByText(location.results[0].dimension);
    expect(dimension).toBeInTheDocument();
  });
  it('Should render episode card', async () => {
    renderWithProviders(
      <DetailedItem detailed={{ data: episode.results[0] }} />
    );
    const air_date = await screen.findByText(episode.results[0].air_date);
    expect(air_date).toBeInTheDocument();
  });
});
