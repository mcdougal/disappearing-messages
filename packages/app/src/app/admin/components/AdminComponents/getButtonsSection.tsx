import { CheckCircleIcon } from '@heroicons/react/20/solid';

import { Button } from '@/app/components';

import { Section } from './types';

export default (): Section => {
  return {
    title: `Buttons`,
    subsections: [
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
          <Button
            key="xs"
            color="primary"
            size="xs"
            startIcon={CheckCircleIcon}>
            Button text
          </Button>,
          <Button
            key="sm"
            color="primary"
            size="sm"
            startIcon={CheckCircleIcon}>
            Button text
          </Button>,
          <Button
            key="md"
            color="primary"
            size="md"
            startIcon={CheckCircleIcon}>
            Button text
          </Button>,
          <Button
            key="lg"
            color="primary"
            size="lg"
            startIcon={CheckCircleIcon}>
            Button text
          </Button>,
          <Button
            key="xl"
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
        ],
      },
    ],
  };
};
