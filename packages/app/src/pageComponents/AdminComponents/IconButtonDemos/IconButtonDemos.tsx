import { HandThumbUpIcon } from '@heroicons/react/24/outline';

import { IconButton } from '@/app/components';

import {
  Section,
  SectionContent,
  SectionTitle,
  Subsection,
  SubsectionContent,
  SubsectionTitle,
} from '../components';

const IconButtonDemos = (): React.ReactElement => {
  const sizes = [
    `xs` as const,
    `sm` as const,
    `md` as const,
    `lg` as const,
    `xl` as const,
  ];

  return (
    <Section>
      <SectionTitle>IconButton</SectionTitle>
      <SectionContent>
        <Subsection>
          <SubsectionTitle>Simple</SubsectionTitle>
          <SubsectionContent className="flex items-center justify-center gap-20">
            {sizes.map((size) => {
              return (
                <IconButton
                  key={size}
                  className="mb-4"
                  icon={HandThumbUpIcon}
                  label="Like"
                  size={size}>
                  <div className="bg-gray-200 p-4 text-center">{size}</div>
                </IconButton>
              );
            })}
          </SubsectionContent>
        </Subsection>
      </SectionContent>
    </Section>
  );
};

export default IconButtonDemos;
