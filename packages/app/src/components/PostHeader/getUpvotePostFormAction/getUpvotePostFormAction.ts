import { getExpiresAt } from '@/domain/post/common';
import { SessionUser } from '@/domain/user/server';

import { OptimisticUpvote } from '../types';

import upvotePost from './upvotePost';

type FormAction = () => Promise<void>;

export default (
  postId: string,
  sessionUser: SessionUser,
  onOptimisticUpvote: (optimisticUpvote: OptimisticUpvote) => void
): FormAction => {
  return async (): Promise<void> => {
    const updatedAt = new Date();
    const expiresAt = getExpiresAt(updatedAt);

    onOptimisticUpvote({
      expiresAt,
      postId,
      updatedAt,
      userId: sessionUser.id,
    });

    await upvotePost({
      data: {
        postId,
        expiresAt,
        updatedAt,
        userId: sessionUser.id,
      },
    });
  };
};
