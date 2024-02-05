'use client';

import { XMarkIcon } from '@heroicons/react/24/outline';

import { IconButton } from '@/app/components';

const CloseButton = (): React.ReactElement => {
  return (
    <IconButton
      className="absolute right-4 top-4 sm:right-6 sm:top-6"
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
