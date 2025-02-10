import { createContext } from 'react';
import { IThemeContext } from '../../interfaces.ts';

export const ThemeContext = createContext<IThemeContext>({
  theme: 'dark',
  setTheme: (theme) => theme,
});
