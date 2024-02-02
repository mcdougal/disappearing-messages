export type Section = {
  title: string;
  subsections: Array<Subsection>;
};

export type Subsection = {
  title: string;
  demos: Array<React.ReactNode>;
};
