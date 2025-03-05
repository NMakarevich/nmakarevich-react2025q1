import React, { ReactNode } from 'react';
import styles from '../../../src/App.module.scss';
import Flyout from '../../../src/components/flyout/flyout';
import ThemeToggle from '../../../src/components/theme-toggle/theme-toggle';
import Search from '../../../src/components/search/search';
import SelectResource from '../../../src/components/selectResource/selectResource';
import ResourceProvider from '../../../src/providers/resource/resource.provider';

function Layout({ children }: { children: ReactNode }): React.ReactNode {
  return (
    <>
      <header className={`${styles['app-header']}`}>
        <div className={styles.container}>
          <ResourceProvider>
            <SelectResource />
            <Search />
          </ResourceProvider>
          <ThemeToggle />
        </div>
      </header>
      <main className={`${styles['app-main']}`}>
        <div className={styles.container}>{children}</div>
      </main>
      <Flyout />
    </>
  );
}

export default Layout;
