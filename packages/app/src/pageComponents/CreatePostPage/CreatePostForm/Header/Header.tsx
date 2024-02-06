'use client';

import { MutableRefObject } from 'react';
import { useFormStatus } from 'react-dom';

import { BackButton, Button, CharacterCounter } from '@/app/components';
import { PageBackBehavior } from '@/app/pageUtils';

type Props = {
  backBehavior: PageBackBehavior;
  updateCharacterCounterRef: MutableRefObject<
    ((text: string) => void) | undefined
  >;
};

const Header = ({
  backBehavior,
  updateCharacterCounterRef,
}: Props): React.ReactElement => {
  const status = useFormStatus();

  return (
    <div className="sticky top-0 z-10 border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-2xl items-center px-3 py-3">
        <div className="flex flex-1 items-center gap-3">
          <BackButton backBehavior={backBehavior} icon="back" />
          <CharacterCounter
            maxChars={255}
            updateCharacterCounterRef={updateCharacterCounterRef}
          />
        </div>
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
