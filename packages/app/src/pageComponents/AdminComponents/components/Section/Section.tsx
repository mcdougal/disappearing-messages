type Props = {
  children: React.ReactNode;
};

const Section = ({ children }: Props): React.ReactElement => {
  return <div className="mb-24">{children}</div>;
};

export default Section;
