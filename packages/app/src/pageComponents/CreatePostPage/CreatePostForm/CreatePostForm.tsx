'use client';

import { HomePageRoute } from '@/domain/routes/common';
import { SessionUser } from '@/domain/user/server';
import { useRouter } from 'next/navigation';

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

const CreatePostForm = async ({
  backBehavior,
  sessionUser,
}: Props): Promise<React.ReactElement> => {
  const router = useRouter();

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
      <Header backBehavior={backBehavior} />
      <div className="mx-auto max-w-2xl pb-40">
        <DeletionWarning />
        <CreatePostInput sessionUser={sessionUser} />
      </div>
    </form>
  );
};

export default CreatePostForm;
