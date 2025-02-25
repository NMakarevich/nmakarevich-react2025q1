import { describe, expect } from 'vitest';
import FavouriteCheckbox from '../components/favourite-checkbox/favourite-checkbox.tsx';
import { response } from './mock.ts';
import { renderWithProviders } from './test-utils.tsx';
import { fireEvent, screen } from '@testing-library/react';

describe('FavouriteCheckbox', () => {
  it('Should be checked', () => {
    const initialState = {
      favourites: {
        characters: [response.results[0]],
      },
      resource: 'characters',
    };
    renderWithProviders(<FavouriteCheckbox result={response.results[0]} />, {
      preloadedState: { favourites: initialState },
    });
    const checkbox: HTMLInputElement = screen.getByRole('checkbox');
    expect(checkbox.checked).toBeTruthy();
  });
  it('Should not be checked', () => {
    const initialState = {
      favourites: {
        characters: [response.results[0]],
      },
      resource: 'characters',
    };
    renderWithProviders(<FavouriteCheckbox result={response.results[0]} />, {
      preloadedState: { favourites: initialState },
    });
    const checkbox: HTMLInputElement = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    expect(checkbox.checked).toBeFalsy();
  });
});
