'use client';

import { SessionUser } from '@/domain/user/server';
import { useRouter } from 'next/navigation';

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
        router.refresh();
        router.back();
      }}
      className="flex sm:h-96">
      <CreatePostFormInner sessionUser={sessionUser} />
    </form>
  );
};

export default CreatePostForm;
