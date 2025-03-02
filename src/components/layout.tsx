import React from 'react';
import { store } from '../redux/store.ts';
import ThemeProvider from '../providers/theme/theme.provider.tsx';
import SelectResource from './selectResource/selectResource.tsx';
import Search from './search/search.tsx';
import ThemeToggle from './theme-toggle/theme-toggle.tsx';
import Flyout from './flyout/flyout.tsx';
import { Provider } from 'react-redux';
import styles from '../../src/App.module.scss';

function Layout({ children }: { children: React.ReactNode }): React.ReactNode {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <header className={`${styles['app-header']}`}>
          <div className={styles.container}>
            <SelectResource />
            <Search />
            <ThemeToggle />
          </div>
        </header>
        <main className={`${styles['app-main']}`}>
          <div className={styles.container}>{children}</div>
        </main>
        <Flyout />
      </ThemeProvider>
    </Provider>
  );
}

export default Layout;
