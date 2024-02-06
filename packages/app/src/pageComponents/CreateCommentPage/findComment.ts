import { Post } from '@/domain/post/server';

import { Comment } from './types';

export default (post: Post, commentId: string | undefined): Comment | null => {
  if (!commentId) {
    return null;
  }

  const comment = post.comments.find((c) => {
    return c.id === commentId;
  });

  return comment || null;
};
