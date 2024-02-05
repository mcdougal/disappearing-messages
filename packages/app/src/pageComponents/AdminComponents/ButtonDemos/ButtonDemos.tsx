'use client';

import { HomePageRoute } from '@/domain/routes/common';
import { CheckCircleIcon } from '@heroicons/react/20/solid';

import { Button } from '@/app/components';

import {
  Section,
  SectionContent,
  SectionTitle,
  Subsection,
  SubsectionContent,
  SubsectionTitle,
} from '../components';

const ButtonDemos = (): React.ReactElement => {
  const subsections = [
    {
      title: `Primary`,
      demos: [
        <Button key="xs" color="primary" size="xs">
          Button text
        </Button>,
        <Button key="sm" color="primary" size="sm">
          Button text
        </Button>,
        <Button key="md" color="primary" size="md">
          Button text
        </Button>,
        <Button key="lg" color="primary" size="lg">
          Button text
        </Button>,
        <Button key="xl" color="primary" size="xl">
          Button text
        </Button>,
      ],
    },
    {
      title: `Secondary`,
      demos: [
        <Button key="xs" color="secondary" size="xs">
          Button text
        </Button>,
        <Button key="sm" color="secondary" size="sm">
          Button text
        </Button>,
        <Button key="md" color="secondary" size="md">
          Button text
        </Button>,
        <Button key="lg" color="secondary" size="lg">
          Button text
        </Button>,
        <Button key="xl" color="secondary" size="xl">
          Button text
        </Button>,
      ],
    },
    {
      title: `Start icon`,
      demos: [
        <Button key="xs" color="primary" size="xs" startIcon={CheckCircleIcon}>
          Button text
        </Button>,
        <Button key="sm" color="primary" size="sm" startIcon={CheckCircleIcon}>
          Button text
        </Button>,
        <Button key="md" color="primary" size="md" startIcon={CheckCircleIcon}>
          Button text
        </Button>,
        <Button key="lg" color="primary" size="lg" startIcon={CheckCircleIcon}>
          Button text
        </Button>,
        <Button key="xl" color="primary" size="xl" startIcon={CheckCircleIcon}>
          Button text
        </Button>,
        <Button
          key="stretch"
          className="min-w-48"
          color="primary"
          size="xl"
          startIcon={CheckCircleIcon}>
          Button text
        </Button>,
      ],
    },
    {
      title: `End icon`,
      demos: [
        <Button key="xs" color="primary" endIcon={CheckCircleIcon} size="xs">
          Button text
        </Button>,
        <Button key="sm" color="primary" endIcon={CheckCircleIcon} size="sm">
          Button text
        </Button>,
        <Button key="md" color="primary" endIcon={CheckCircleIcon} size="md">
          Button text
        </Button>,
        <Button key="lg" color="primary" endIcon={CheckCircleIcon} size="lg">
          Button text
        </Button>,
        <Button key="xl" color="primary" endIcon={CheckCircleIcon} size="xl">
          Button text
        </Button>,
        <Button
          key="stretch"
          className="min-w-48"
          color="primary"
          endIcon={CheckCircleIcon}
          size="xl">
          Button text
        </Button>,
      ],
    },
    {
      title: `Loading`,
      demos: [
        <Button key="xs" color="primary" loading size="xs">
          Button text
        </Button>,
        <Button key="sm" color="primary" loading size="sm">
          Button text
        </Button>,
        <Button key="md" color="primary" loading size="md">
          Button text
        </Button>,
        <Button key="lg" color="primary" loading size="lg">
          Button text
        </Button>,
        <Button key="xl" color="primary" loading size="xl">
          Button text
        </Button>,
        <Button
          key="stretch"
          className="min-w-48"
          color="primary"
          loading
          size="xl">
          Button text
        </Button>,
      ],
    },
    {
      title: `Link`,
      demos: [
        <Button key="link" as="a" href={HomePageRoute.getPath({})} size="xl">
          Home Page
        </Button>,
      ],
    },
  ];

  return (
    <Section>
      <SectionTitle>Button</SectionTitle>
      <SectionContent>
        {subsections.map((subsection) => {
          return (
            <Subsection key={subsection.title}>
              <SubsectionTitle>{subsection.title}</SubsectionTitle>
              <SubsectionContent className="flex items-center justify-center gap-20">
                {subsection.demos}
              </SubsectionContent>
            </Subsection>
          );
        })}
      </SectionContent>
    </Section>
  );
};

export default ButtonDemos;
