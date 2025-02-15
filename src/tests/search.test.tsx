import { describe, expect } from 'vitest';
import { fireEvent, screen } from '@testing-library/react';
import Search from '../components/search/search.tsx';
import { renderWithProviders } from './test-utils.tsx';

describe('Search', () => {
  it('Should save search term to localStorage', () => {
    const searchTerm = 'rick';
    renderWithProviders(<Search />);
    localStorage.clear();
    const searchInput = screen.getByRole('textbox');
    fireEvent.change(searchInput, { target: { value: searchTerm } });
    const searchButton = screen.getByRole('button');
    fireEvent.click(searchButton);
    const ls = localStorage.getItem('search');
    expect(ls).toEqual(searchTerm);
  });
  it('Should insert search term from localStorage to input', () => {
    const searchTerm = localStorage.getItem('search');
    renderWithProviders(<Search />);
    const input: HTMLInputElement = screen.getByRole('textbox');
    const inputValue = input.value;
    expect(inputValue).toEqual(searchTerm);
  });
});
