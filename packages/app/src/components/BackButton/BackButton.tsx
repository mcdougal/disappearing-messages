'use client';

import { ArrowLeftIcon, XMarkIcon } from '@heroicons/react/24/outline';

import { PageBackBehavior } from '@/app/pageUtils';

import IconButton from '../IconButton';

type Props = {
  backBehavior: PageBackBehavior;
  icon: `back` | `close`;
};

const BackButton = ({ backBehavior, icon }: Props): React.ReactElement => {
  const props = {
    edge: `start`,
    icon: icon === `back` ? ArrowLeftIcon : XMarkIcon,
    label: `Back`,
    size: `md`,
  } as const;

  return backBehavior.action === `back` ? (
    <IconButton
      {...props}
      onClick={(): void => {
        history.back();
      }}
    />
  ) : (
    <IconButton {...props} as="a" href={backBehavior.path} />
  );
};

export default BackButton;
