import { ReactNode } from 'react';
import App from '../../App.tsx';
import ThemeProvider from '../../providers/theme/theme.provider.tsx';

function Main(): ReactNode {
  return (
    <ThemeProvider>
      <App />
    </ThemeProvider>
  );
}

export default Main;
