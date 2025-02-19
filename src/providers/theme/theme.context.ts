import { createContext } from 'react';
import { IThemeContext } from '../../interfaces.ts';

export const ThemeContext = createContext<IThemeContext>({
  isSwitched: false,
  setIsSwitched: (isSwitched: boolean) => isSwitched,
});
