import { twMerge } from 'tailwind-merge';

type Props = {
  children: React.ReactNode;
  className?: string;
};

const SubsectionContent = ({
  children,
  className,
}: Props): React.ReactElement => {
  return (
    <div
      className={twMerge(
        `rounded-lg border border-gray-900/10 px-4 py-8`,
        className
      )}>
      {children}
    </div>
  );
};

export default SubsectionContent;
