import { Container } from '@/app/components';

import {
  Section,
  SectionContent,
  SectionTitle,
  Subsection,
  SubsectionContent,
  SubsectionTitle,
} from '../components';

const ContainerDemos = (): React.ReactElement => {
  const sizes = [
    `xs` as const,
    `sm` as const,
    `md` as const,
    `lg` as const,
    `xl` as const,
  ];

  return (
    <Section>
      <SectionTitle>Container</SectionTitle>
      <SectionContent>
        <Subsection>
          <SubsectionTitle>Simple</SubsectionTitle>
          <SubsectionContent>
            {sizes.map((size) => {
              return (
                <Container key={size} className="mb-4" size={size}>
                  <div className="bg-gray-200 p-4 text-center">{size}</div>
                </Container>
              );
            })}
          </SubsectionContent>
        </Subsection>
      </SectionContent>
    </Section>
  );
};

export default ContainerDemos;
