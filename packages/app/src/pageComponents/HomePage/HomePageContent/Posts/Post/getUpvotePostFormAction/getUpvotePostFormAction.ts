import { getExpiresAt } from '@/domain/post/common';
import { PostsFeedPost } from '@/domain/post/server';

import upvotePost from './upvotePost';

type FormAction = () => Promise<void>;

export default (
  post: PostsFeedPost,
  upsertOptimisticPost: (post: PostsFeedPost) => void
): FormAction => {
  return async (): Promise<void> => {
    const expiresAt = getExpiresAt();

    upsertOptimisticPost({
      ...post,
      expiresAt,
      numUpvotes: post.numUpvotes + 1,
    });

    await upvotePost({
      data: { expiresAt },
      where: { id: post.id },
    });
  };
};
