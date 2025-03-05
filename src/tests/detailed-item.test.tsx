import { describe, expect, vi } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import DetailedItem from '../components/detailed-item/detailed-item.tsx';
import {
  episode,
  location,
  paramsCharacters,
  paramsEpisodes,
  paramsLocations,
  response,
} from './mock.ts';
import '@testing-library/jest-dom';

const pushMock = vi.fn();

vi.mock('next/navigation', () => ({
  useSearchParams: () => ({
    get: vi.fn(),
    toString: vi.fn(),
  }),
  useRouter: () => ({
    push: pushMock,
  }),
  useParams: () => ({
    resource: ['characters'],
  }),
}));

describe('Detailed Item', () => {
  it('Should display detailed item', async () => {
    render(
      <DetailedItem params={paramsCharacters} data={response.results[0]} />
    );
    const card = await screen.findByText('Name:');
    expect(card).toBeTruthy();
  });
  it('Should close detailed item', async () => {
    window.history.pushState(null, '', '/search/characters/1?page=1');
    render(
      <DetailedItem params={paramsCharacters} data={response.results[0]} />
    );
    const button = await screen.findByText('Close');
    fireEvent.click(button);
    await waitFor(() => {
      expect(pushMock).toHaveBeenCalledWith('/search/characters?');
    });
  });
  it('Should render location card', async () => {
    render(
      <DetailedItem params={paramsLocations} data={location.results[0]} />
    );
    const dimension = await screen.findByText(location.results[0].dimension);
    expect(dimension).toBeInTheDocument();
  });
  it('Should render episode card', async () => {
    render(<DetailedItem params={paramsEpisodes} data={episode.results[0]} />);
    const air_date = await screen.findByText(episode.results[0].air_date);
    expect(air_date).toBeInTheDocument();
  });
});
