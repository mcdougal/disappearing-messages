'use client';

import { useFormStatus } from 'react-dom';

import { BackButton, Button } from '@/app/components';
import { PageBackBehavior } from '@/app/pageUtils';

type Props = {
  backBehavior: PageBackBehavior;
};

const Header = ({ backBehavior }: Props): React.ReactElement => {
  const status = useFormStatus();

  return (
    <div className="sticky top-0 z-10 border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-2xl items-center justify-between px-3 py-3">
        <BackButton backBehavior={backBehavior} icon="back" />
        <Button
          className="min-w-20"
          loading={status.pending}
          size="md"
          type="submit">
          Post
        </Button>
      </div>
    </div>
  );
};

export default Header;
