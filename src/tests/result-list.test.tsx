import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import ResultList from '../components/result-list/result-list.tsx';
import { response, location, episode } from './mock.ts';

vi.mock('next/navigation', async () => ({
  useSearchParams: () => ({
    get: vi.fn(),
  }),
  useParams: () => ({
    resource: ['character'],
  }),
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

describe('Result list', () => {
  it('Result list render correctly', async () => {
    render(
      <ResultList
        data={response}
        params={{
          resource: 'characters',
          page: '1',
          id: '',
          name: 'rick',
        }}
      />
    );
    const cards = await screen.findAllByText('Name:');
    expect(cards.length).toEqual(response.results.length);
  });
  it('Should render locations list', async () => {
    render(
      <ResultList
        data={location}
        params={{
          resource: 'locations',
          page: '1',
          id: '',
          name: 'rick',
        }}
      />
    );
    const cards = await screen.findAllByText('Dimension:');
    expect(cards.length).toEqual(location.results.length);
  });
  it('Should render episodes list', async () => {
    render(
      <ResultList
        data={episode}
        params={{
          resource: 'episodes',
          page: '1',
          id: '',
          name: 'rick',
        }}
      />
    );
    const cards = await screen.findAllByText('Episode:');
    expect(cards.length).toEqual(episode.results.length);
  });
});
