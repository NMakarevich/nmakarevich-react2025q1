import React from 'react';
import { Metadata } from 'next';
import '../src/index.css';
import FavouritesProvider from '../src/providers/favourites/favourites.provider';

export const metadata: Metadata = {
  title: 'Rick and Morty API',
  icons: '/favicon.png',
};

function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): React.ReactNode {
  return (
    <html lang="en">
      <body>
        <div id="root">
          <FavouritesProvider>{children}</FavouritesProvider>
        </div>
      </body>
    </html>
  );
}

export default RootLayout;
