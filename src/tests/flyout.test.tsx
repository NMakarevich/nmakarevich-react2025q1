import { describe, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { renderWithProviders } from './test-utils.tsx';
import Flyout from '../components/flyout/flyout.tsx';
import { response } from './mock.ts';

describe('Flyout test', () => {
  it('Should displays in screen when 1 card is selected', () => {
    window.URL.createObjectURL = vi.fn();
    const initialState = {
      favourites: {
        characters: [response.results[0]],
      },
      resource: 'characters',
    };
    renderWithProviders(<Flyout />, {
      preloadedState: {
        favourites: initialState,
      },
    });
    const title = screen.getByText(/Selected/);
    const counter = title.textContent?.split(' ')[1];
    expect(counter).toBeTruthy();
    expect(parseInt(counter as string)).toEqual(
      initialState.favourites.characters.length
    );
  });
});
