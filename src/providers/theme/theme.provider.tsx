import { ReactNode, useState } from 'react';
import { ThemeContext } from './theme.context.ts';

function ThemeProvider({ children }: { children: ReactNode }) {
  const [isSwitched, setIsSwitched] = useState<boolean>(false);
  return (
    <ThemeContext.Provider
      value={{ isSwitched: isSwitched, setIsSwitched: setIsSwitched }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export default ThemeProvider;
