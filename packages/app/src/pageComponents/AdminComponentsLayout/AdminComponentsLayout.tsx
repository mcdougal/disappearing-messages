import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Components - Admin`,
  description: `Component demos.`,
};

type Props = Readonly<{
  children: React.ReactNode;
}>;

const AdminComponentsLayout = ({ children }: Props): React.ReactNode => {
  return children;
};

export default AdminComponentsLayout;
