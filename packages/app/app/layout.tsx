/* eslint-disable filenames/match-exported */
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import './globals.module.scss';

const inter = Inter({ subsets: [`latin`] });

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
      <body className={inter.className}>{children}</body>
    </html>
  );
};

export default RootLayout;
