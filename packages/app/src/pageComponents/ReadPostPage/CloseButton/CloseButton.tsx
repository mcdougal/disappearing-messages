'use client';

import { XMarkIcon } from '@heroicons/react/24/outline';

import { IconButton } from '@/app/components';

const CloseButton = (): React.ReactElement => {
  return (
    <IconButton
      icon={XMarkIcon}
      label="Close"
      onClick={(): void => {
        history.back();
      }}
      size="md"
    />
  );
};

export default CloseButton;
