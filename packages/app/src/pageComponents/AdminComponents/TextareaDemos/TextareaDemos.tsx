import { Textarea } from '@/app/components';

import {
  Section,
  SectionContent,
  SectionTitle,
  Subsection,
  SubsectionContent,
  SubsectionTitle,
} from '../components';

const TextareaDemos = (): React.ReactElement => {
  return (
    <Section>
      <SectionTitle>Textarea</SectionTitle>
      <SectionContent>
        <Subsection>
          <SubsectionTitle>Simple</SubsectionTitle>
          <SubsectionContent className="px-7 py-4">
            <Textarea name="simple" placeholder="Write a message..." />
          </SubsectionContent>
        </Subsection>
      </SectionContent>
    </Section>
  );
};

export default TextareaDemos;
