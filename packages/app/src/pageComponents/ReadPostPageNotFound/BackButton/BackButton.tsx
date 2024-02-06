'use client';

import { Button } from '@/app/components';

const BackButton = (): React.ReactElement => {
  return (
    <Button
      color="secondary"
      onClick={(): void => {
        window.history.back();
      }}
      size="lg">
      Go Back
    </Button>
  );
};

export default BackButton;
