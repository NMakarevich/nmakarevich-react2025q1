import { describe, expect, vi } from 'vitest';
import { episode, location, response } from './mock.ts';
import { render, screen } from '@testing-library/react';
import ResultItem from '../components/result-item/result-item.tsx';

vi.mock('next/navigation', async () => ({
  useSearchParams: () => ({
    get: vi.fn(),
  }),
  useParams: () => ({
    resource: ['characters', '1'],
  }),
}));

describe('ResultItem', () => {
  it('Should render correctly', () => {
    const item = response.results[0];
    render(<ResultItem result={item} />);
    const name = 'Rick Sanchez';
    const nameInCard = screen.getByText(name).textContent;
    expect(nameInCard).toEqual('Name: Rick Sanchez');
  });
  it('Should render episodes item', () => {
    const item = episode.results[0];
    render(<ResultItem result={item} />);
    const name = 'Pilot';
    const nameInCard = screen.getByText(name).textContent;
    expect(nameInCard).toEqual('Name: Pilot');
  });
  it('Should render locations item', () => {
    const item = location.results[0];
    render(<ResultItem result={item} />);
    const name = 'Earth (C-137)';
    const nameInCard = screen.getByText(name).textContent;
    expect(nameInCard).toEqual('Name: Earth (C-137)');
  });
});
