import { describe, expect } from 'vitest';
import { fireEvent, screen } from '@testing-library/react';
import SelectResource from '../components/selectResource/selectResource.tsx';
import { renderWithProviders } from './test-utils.tsx';
import { RESOURCES } from '../constants.ts';

vi.mock('next/router', async () => ({
  useRouter: () => ({
    query: { resource: ['characters'] },
    push: vi.fn(),
  }),
}));

describe('Select test', () => {
  it('Should change selected item', async () => {
    const initialState = {
      resource: 'characters',
      url: 'https://rickandmortyapi.com/api/character',
    };
    const { container } = renderWithProviders(<SelectResource />, {
      preloadedState: { resources: initialState },
    });
    const selectList = screen.getAllByText(RESOURCES[0]);
    fireEvent.click(selectList[0]);
    const secondOption = container.querySelectorAll(
      '[class*=select-option_]'
    )[1];
    fireEvent.click(secondOption);
    const selectValue = container.querySelector('[class*=select-value]');
    expect(selectValue?.textContent).toEqual(RESOURCES[1]);
  });
});
