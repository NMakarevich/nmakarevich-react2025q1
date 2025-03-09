import { describe, expect } from 'vitest';
import { fireEvent, screen } from '@testing-library/react';
import Search from '../components/search/search.tsx';
import { renderWithProviders } from './test-utils.tsx';
import { MemoryRouter } from 'react-router';

describe('Search', () => {
  it('Should save search term to localStorage', () => {
    const searchTerm = 'rick';
    renderWithProviders(
      <MemoryRouter>
        <Search />
      </MemoryRouter>
    );
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
    renderWithProviders(
      <MemoryRouter>
        <Search />
      </MemoryRouter>
    );
    const input: HTMLInputElement = screen.getByRole('textbox');
    const inputValue = input.value;
    expect(inputValue).toEqual(searchTerm);
  });
});
