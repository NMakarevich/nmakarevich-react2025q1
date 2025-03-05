'use client';

import { ReactElement } from 'react';
import Toggle from '../ui/toggle/toggle.tsx';

function ThemeToggle(): ReactElement {
  function toggleTheme(isSwitched: boolean) {
    document.documentElement.setAttribute(
      'data-theme',
      isSwitched ? 'light' : ''
    );
  }

  return (
    <Toggle
      option1={'Dark'}
      option2={'Light'}
      onToggle={toggleTheme}
      initState={false}
    />
  );
}

export default ThemeToggle;
