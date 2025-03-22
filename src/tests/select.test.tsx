import { describe, expect } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import SelectResource from '../components/selectResource/selectResource.tsx';
import { RESOURCES } from '../constants.ts';

describe('Select test', () => {
  it('Should change selected item', async () => {
    const { container } = render(<SelectResource />);
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
