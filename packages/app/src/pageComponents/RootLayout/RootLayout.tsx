import { getExpirationDurationString } from '@/domain/post/common';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import './globals.css';

// eslint-disable-next-line @typescript-eslint/quotes
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: `disappearing.chat`,
  description: `👉 Posts are deleted after ${getExpirationDurationString()}. Upvote or
  comment to reset the clock.`,
};

type Props = Readonly<{
  children: React.ReactNode;
}>;

const RootLayout = ({ children }: Props): React.ReactElement => {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
};

export default RootLayout;
