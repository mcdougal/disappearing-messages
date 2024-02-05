'use client';

import { XMarkIcon } from '@heroicons/react/24/outline';

import { IconButton } from '@/app/components';

import { ExitBehavior } from '../types';

type Props = {
  exitBehavior: ExitBehavior;
};

const CloseButton = ({ exitBehavior }: Props): React.ReactElement => {
  const props = {
    className: `absolute right-4 top-4 sm:right-6 sm:top-6`,
    icon: XMarkIcon,
    label: `Close`,
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
