import { describe, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import { Params } from 'react-router';
import { episode, location, response } from './mock.ts';
import '@testing-library/jest-dom';
import { renderWithProviders } from './test-utils.tsx';
import DetailedItemLocation from '../components/detailed-item/detailed-item-location.tsx';
import DetailedItemEpisode from '../components/detailed-item/detailed-item-episode.tsx';
import DetailedItemCharacter from '../components/detailed-item/detailed-item-character.tsx';
import { Character } from '../interfaces.ts';

vi.mock('react-router', async () => {
  const actual = await vi.importActual('react-router');
  return {
    ...actual,
    useParams: (): Readonly<Params<string>> => ({
      resource: 'characters',
      id: '1',
    }),
    useNavigation: vi.fn(() => ({
      location: vi.fn(),
    })),
  };
});

describe('Detailed Item', () => {
  it('Should display detailed item', () => {
    renderWithProviders(
      <DetailedItemCharacter item={response.results[0] as Character} />
    );
    const card = screen.getByText('Name:');
    expect(card).toBeTruthy();
  });
  it('Should render location card', async () => {
    renderWithProviders(<DetailedItemLocation item={location.results[0]} />);
    const dimension = await screen.findByText(location.results[0].dimension);
    expect(dimension).toBeInTheDocument();
  });
  it('Should render episode card', async () => {
    renderWithProviders(<DetailedItemEpisode item={episode.results[0]} />);
    const air_date = await screen.findByText(episode.results[0].air_date);
    expect(air_date).toBeInTheDocument();
  });
});
