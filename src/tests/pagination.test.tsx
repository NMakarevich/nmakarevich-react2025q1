import { describe, expect } from 'vitest';
import { BrowserRouter } from 'react-router';
import { fireEvent, render, screen } from '@testing-library/react';
import Pagination from '../components/pagination/pagination.tsx';
import { response } from './mock.ts';

describe('Pagination tests', () => {
  it('Should change search params', async () => {
    render(
      <BrowserRouter>
        <Pagination info={response.info} />
      </BrowserRouter>
    );
    const currentSearch = window.location.search;
    const nextButton = screen.getByRole('button', { name: 'Next page' });
    fireEvent.click(nextButton);
    const newSearch = window.location.search;
    expect(newSearch).not.toEqual(currentSearch);
  });
});
