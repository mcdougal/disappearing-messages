'use client';

import { SessionUser } from '@/domain/user/server';
import { useRouter } from 'next/navigation';

import createCommentFormAction from './createCommentFormAction';
import CreateCommentFormInner from './CreateCommentFormInner';

type Props = {
  postId: string;
  sessionUser: SessionUser;
};

const CreateCommentForm = ({
  postId,
  sessionUser,
}: Props): React.ReactElement => {
  const router = useRouter();

  return (
    <form
      action={async (formData) => {
        await createCommentFormAction(sessionUser, postId, formData);
        router.refresh();
        router.back();
      }}
      className="flex sm:h-96">
      <CreateCommentFormInner sessionUser={sessionUser} />
    </form>
  );
};

export default CreateCommentForm;
