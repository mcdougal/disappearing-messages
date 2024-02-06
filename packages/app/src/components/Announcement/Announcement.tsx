import Typography from '../Typography';

type Props = {
  children: React.ReactNode;
};

const Announcement = ({ children }: Props): React.ReactElement => {
  return (
    <div className="rounded-lg bg-gray-100 px-4 py-2 text-center">
      <Typography size="sm">{children}</Typography>
    </div>
  );
};

export default Announcement;
