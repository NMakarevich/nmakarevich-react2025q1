import { Links, Meta, Outlet, Scripts, ScrollRestoration } from 'react-router';
import React from 'react';
import { store } from './redux/store.ts';
import { Provider } from 'react-redux';
import ThemeProvider from './providers/theme/theme.provider.tsx';
import ResourceProvider from './providers/resource/resource.provider.tsx';

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" type="image" href="/favicon.png" />
        <link rel="preload" as="image" href="/rickandmorty.png" />
        <title>Rick and Morty API</title>
        <Meta />
        <Links />
      </head>
      <body>
        <Provider store={store}>
          <ResourceProvider>
            <ThemeProvider>{children}</ThemeProvider>
          </ResourceProvider>
        </Provider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function Root() {
  return <Outlet />;
}
