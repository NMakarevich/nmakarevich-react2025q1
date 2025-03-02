import React, { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { store } from '../src/redux/store';
import ThemeProvider from '../src/providers/theme/theme.provider';
import SelectResource from '../src/components/selectResource/selectResource';
import Search from '../src/components/search/search';
import Flyout from '../src/components/flyout/flyout';
import styles from '../src/App.module.scss';
import ThemeToggle from '../src/components/theme-toggle/theme-toggle';

function Layout({ children }: { children: ReactNode }): React.ReactNode {
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
