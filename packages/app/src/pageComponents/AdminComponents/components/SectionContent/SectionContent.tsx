type Props = {
  children: React.ReactNode;
};

const SectionContent = ({ children }: Props): React.ReactElement => {
  return <div className="flex flex-col gap-y-10">{children}</div>;
};

export default SectionContent;
