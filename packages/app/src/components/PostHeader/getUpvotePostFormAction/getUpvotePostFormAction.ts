import { getExpiresAt } from '@/domain/post/common';
import { PostsFeedPost } from '@/domain/post/server';
import { HomePageRoute, ReadPostPageRoute } from '@/domain/routes/common';
import { SessionUser } from '@/domain/user/server';
import { revalidatePath } from 'next/cache';

import upvotePost from './upvotePost';

type FormAction = () => Promise<void>;

export default (
  post: PostsFeedPost,
  sessionUser: SessionUser,
  upsertOptimisticPost: (post: PostsFeedPost) => void
): FormAction => {
  return async (): Promise<void> => {
    const updatedAt = new Date();
    const expiresAt = getExpiresAt(updatedAt);

    upsertOptimisticPost({
      ...post,
      expiresAt,
      upvotes: [...post.upvotes, { userId: sessionUser.id }],
    });

    await upvotePost({
      data: {
        postId: post.id,
        expiresAt,
        updatedAt,
        userId: sessionUser.id,
      },
    });

    revalidatePath(HomePageRoute.getPath({}));
    revalidatePath(ReadPostPageRoute.getPath({ postId: post.id }));
  };
};
