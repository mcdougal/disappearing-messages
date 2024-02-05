'use client';

import { ArrowLeftIcon } from '@heroicons/react/24/outline';

import { IconButton } from '@/app/components';

import { ExitBehavior } from '../types';

type Props = {
  exitBehavior: ExitBehavior;
};

const CloseButton = ({ exitBehavior }: Props): React.ReactElement => {
  const props = {
    icon: ArrowLeftIcon,
    label: `Back`,
    size: `md`,
  } as const;

  return exitBehavior.action === `back` ? (
    <IconButton
      {...props}
      onClick={(): void => {
        history.back();
      }}
    />
  ) : (
    <IconButton {...props} as="a" href={exitBehavior.path} />
  );
};

export default CloseButton;
