import { Fragment } from 'react';

import { Prose, Typography } from '@/app/components';

import {
  Section,
  SectionContent,
  SectionTitle,
  Subsection,
  SubsectionContent,
  SubsectionTitle,
} from '../components';

const TypographyDemos = (): React.ReactElement => {
  const sizes = [
    `xs`,
    `sm`,
    `md`,
    `lg`,
    `xl`,
    `2xl`,
    `3xl`,
    `4xl`,
    `5xl`,
    `6xl`,
    `7xl`,
    `8xl`,
    `9xl`,
  ] as const;

  const weights = [`light`, `normal`, `bold`] as const;

  return (
    <Section>
      <SectionTitle>Typography</SectionTitle>
      <SectionContent>
        <Subsection>
          <SubsectionTitle>Variants</SubsectionTitle>
          <SubsectionContent>
            <div className="grid grid-cols-3 justify-items-center gap-2">
              {weights.map((weight) => {
                return (
                  <Typography
                    key={weight}
                    className="justify-self-stretch bg-gray-100 p-1 text-center"
                    size="xl"
                    weight={weight}>
                    {weight}
                  </Typography>
                );
              })}
              {sizes.map((size) => {
                return (
                  <Fragment key={size}>
                    {weights.map((weight) => {
                      return (
                        <Typography key={weight} size={size} weight={weight}>
                          {size}
                        </Typography>
                      );
                    })}
                  </Fragment>
                );
              })}
            </div>
          </SubsectionContent>
        </Subsection>
        <Subsection>
          <SubsectionTitle>Prose</SubsectionTitle>
          <SubsectionContent>
            <Prose key="prose">
              <h1>h1. Heading</h1>
              <h2>h2. Heading</h2>
              <h3>h3. Heading</h3>
              <h4>h4. Heading</h4>
              <p>
                No worries. No cares. Just float and wait for the wind to blow
                you around. It’s so important to do something every day that
                will make you happy. In painting, you have unlimited power. You
                have the ability to move mountains. When things happen - enjoy
                them. They’re little gifts.
              </p>
              <blockquote>
                <p>
                  The shadows are just like the highlights, but we’re going in
                  the opposite direction. Every day I learn. Maybe he has a
                  little friend that lives right over here.
                </p>
              </blockquote>
              <ol>
                <li>First item</li>
                <li>Second item</li>
                <li>Third item</li>
              </ol>
              <ul>
                <li>First item</li>
                <li>Second item</li>
                <li>Third item</li>
              </ul>
            </Prose>
          </SubsectionContent>
        </Subsection>
      </SectionContent>
    </Section>
  );
};

export default TypographyDemos;
