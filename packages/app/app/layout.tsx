/* eslint-disable filenames/match-exported */
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import './globals.css';

// eslint-disable-next-line @typescript-eslint/quotes
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: `Disappearing Messages`,
  description: `Post public messages that disappear.`,
};

interface Props {
  children: React.ReactNode;
}

const RootLayout = ({ children }: Readonly<Props>): React.ReactElement => {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          {children}
        </AppRouterCacheProvider>
      </body>
    </html>
  );
};

export default RootLayout;
