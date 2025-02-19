import { describe, expect } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import Toggle from '../components/ui/toggle/toggle.tsx';

describe('Toggle test', () => {
  it('Should add class "selected"', () => {
    const { container } = render(
      <Toggle
        option1={'Left'}
        option2={'Right'}
        initState={false}
        onToggle={() => {}}
      />
    );
    const right = screen.getByText('Right');
    const indicator = container.querySelector('.toggle-indicator');
    fireEvent.click(right);
    expect(indicator?.classList.contains('selected')).toBeTruthy();
  });
});
