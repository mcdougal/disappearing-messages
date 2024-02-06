'use client';

import { Post } from '@/domain/post/server';
import { SessionUser } from '@/domain/user/server';
import { useRouter } from 'next/navigation';

import { PageBackBehavior } from '@/app/pageUtils';

import { Comment } from '../types';

import createCommentFormAction from './createCommentFormAction';
import CreateCommentInput from './CreateCommentInput';
import Header from './Header';

type Props = {
  backBehavior: PageBackBehavior;
  post: Post;
  replyingTo: Comment | null;
  sessionUser: SessionUser;
};

const CreateCommentForm = ({
  backBehavior,
  post,
  replyingTo,
  sessionUser,
}: Props): React.ReactElement => {
  const router = useRouter();

  return (
    <form
      action={async (formData) => {
        const status = await createCommentFormAction(
          sessionUser,
          post.id,
          replyingTo?.id || null,
          formData
        );

        if (status === `success`) {
          router.refresh();
          router.back();
        }
      }}>
      <Header backBehavior={backBehavior} />
      <div className="mx-auto max-w-2xl pb-40">
        <CreateCommentInput
          post={post}
          replyingTo={replyingTo}
          sessionUser={sessionUser}
        />
      </div>
    </form>
  );
};

export default CreateCommentForm;
