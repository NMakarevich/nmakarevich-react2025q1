import { describe, expect } from 'vitest';
import { episode, location, response } from './mock.ts';
import { screen } from '@testing-library/react';
import ResultItem from '../components/result-item/result-item.tsx';
import { renderWithProviders } from './test-utils.tsx';

vi.mock('react-router', async () => {
  const actual = await vi.importActual('react-router');
  return {
    ...actual,
    useNavigation: vi.fn(() => ({
      location: vi.fn(),
    })),
  };
});

describe('ResultItem', () => {
  it('Should render correctly', () => {
    const item = response.results[0];
    renderWithProviders(<ResultItem result={item} />);
    const name = 'Rick Sanchez';
    const nameInCard = screen.getByText(name).textContent;
    expect(nameInCard).toEqual('Name: Rick Sanchez');
  });
  it('Should render episodes item', () => {
    const item = episode.results[0];
    renderWithProviders(<ResultItem result={item} />);
    const name = 'Pilot';
    const nameInCard = screen.getByText(name).textContent;
    expect(nameInCard).toEqual('Name: Pilot');
  });
  it('Should render locations item', () => {
    const item = location.results[0];
    renderWithProviders(<ResultItem result={item} />);
    const name = 'Earth (C-137)';
    const nameInCard = screen.getByText(name).textContent;
    expect(nameInCard).toEqual('Name: Earth (C-137)');
  });
});
