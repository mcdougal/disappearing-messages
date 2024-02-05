type Props = {
  children: React.ReactNode;
  className?: string;
};

const Subsection = ({ children, className }: Props): React.ReactElement => {
  return <div className={className}>{children}</div>;
};

export default Subsection;
