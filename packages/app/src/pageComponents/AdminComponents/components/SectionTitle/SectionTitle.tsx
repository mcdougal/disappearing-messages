import { Typography } from '@/app/components';

type Props = {
  children: React.ReactNode;
};

const SectionTitle = ({ children }: Props): React.ReactElement => {
  return (
    <Typography as="h2" className="mb-10" size="3xl" weight="bold">
      {children}
    </Typography>
  );
};

export default SectionTitle;
