import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import './globals.css';

// eslint-disable-next-line @typescript-eslint/quotes
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: `disappearing.chat`,
  description: `Posts slowly disappear. Upvote or reply to keep them alive.`,
};

type Props = Readonly<{
  children: React.ReactNode;
}>;

const HomePageLayout = ({ children }: Props): React.ReactElement => {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
};

export default HomePageLayout;
