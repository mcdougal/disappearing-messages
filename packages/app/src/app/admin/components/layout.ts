/* eslint-disable filenames/match-exported */
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Components - Admin`,
  description: `Component demos.`,
};

type Props = Readonly<{
  children: React.ReactNode;
}>;

const Layout = ({ children }: Props): React.ReactNode => {
  return children;
};

export default Layout;
