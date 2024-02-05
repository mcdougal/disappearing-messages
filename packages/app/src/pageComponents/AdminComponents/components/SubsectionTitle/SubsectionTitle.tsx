import { Typography } from '@/app/components';

type Props = {
  children: React.ReactNode;
};

const SubsectionTitle = ({ children }: Props): React.ReactElement => {
  return (
    <Typography as="h3" size="xl">
      {children}
    </Typography>
  );
};

export default SubsectionTitle;
