'use client';

import { HomePageRoute } from '@/domain/routes/common';
import { SessionUser } from '@/domain/user/server';
import { useRouter } from 'next/navigation';

import { clearScrollPosition } from '@/app/scrollRestore';

import createPostFormAction from './createPostFormAction';
import CreatePostFormInner from './CreatePostFormInner';

type Props = {
  sessionUser: SessionUser;
};

const CreatePostForm = async ({
  sessionUser,
}: Props): Promise<React.ReactElement> => {
  const router = useRouter();

  return (
    <form
      action={async (formData) => {
        await createPostFormAction(sessionUser, formData);
        clearScrollPosition(HomePageRoute.getPath({}));
        router.refresh();
        router.back();
      }}
      className="flex sm:h-96">
      <CreatePostFormInner sessionUser={sessionUser} />
    </form>
  );
};

export default CreatePostForm;
