import { describe, expect } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import Search from '../components/search/search.tsx';
import { BrowserRouter } from 'react-router';

describe('Search', () => {
  it('Should save search term to localStorage', () => {
    const searchTerm = 'rick';
    render(
      <BrowserRouter>
        <Search getRequestUrl={() => {}} />
      </BrowserRouter>
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
    render(
      <BrowserRouter>
        <Search getRequestUrl={() => {}} />
      </BrowserRouter>
    );
    const input: HTMLInputElement = screen.getByRole('textbox');
    const inputValue = input.value;
    expect(inputValue).toEqual(searchTerm);
  });
});
