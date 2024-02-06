'use client';

import { HomePageRoute } from '@/domain/routes/common';
import { SessionUser } from '@/domain/user/server';
import { useRouter } from 'next/navigation';
import { useRef } from 'react';

import { PageBackBehavior } from '@/app/pageUtils';
import { clearScrollPosition } from '@/app/scrollRestore';

import createPostFormAction from './createPostFormAction';
import CreatePostInput from './CreatePostInput';
import DeletionWarning from './DeletionWarning';
import Header from './Header';

type Props = {
  backBehavior: PageBackBehavior;
  sessionUser: SessionUser;
};

const CreatePostForm = ({
  backBehavior,
  sessionUser,
}: Props): React.ReactElement => {
  const router = useRouter();
  const updateCharacterCounterRef = useRef<(text: string) => void>();

  return (
    <form
      action={async (formData) => {
        const status = await createPostFormAction(sessionUser, formData);

        if (status === `success`) {
          clearScrollPosition(HomePageRoute.getPath({}));
          router.refresh();
          router.back();
        }
      }}>
      <Header
        backBehavior={backBehavior}
        updateCharacterCounterRef={updateCharacterCounterRef}
      />
      <div className="mx-auto max-w-2xl pb-40">
        <DeletionWarning />
        <CreatePostInput
          sessionUser={sessionUser}
          updateCharacterCounterRef={updateCharacterCounterRef}
        />
      </div>
    </form>
  );
};

export default CreatePostForm;
