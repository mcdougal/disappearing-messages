import { PostsFeedPost } from '@/domain/post/server';
import { useOptimistic } from 'react';

import getPostKey from './getPostKey';

export default (
  posts: Array<PostsFeedPost>
): [Array<PostsFeedPost>, (post: PostsFeedPost) => void] => {
  return useOptimistic<Array<PostsFeedPost>, PostsFeedPost>(
    posts,
    (currentPosts, optimisticPost) => {
      const existingIndex = currentPosts.findIndex((m) => {
        return (
          m.id === optimisticPost.id ||
          (optimisticPost.id.startsWith(`optimistic-`) &&
            getPostKey(m) === getPostKey(optimisticPost))
        );
      });

      const newPosts =
        existingIndex !== -1
          ? [
              ...currentPosts.slice(0, existingIndex),
              { ...currentPosts[existingIndex], ...optimisticPost },
              ...currentPosts.slice(existingIndex + 1),
            ]
          : [optimisticPost, ...currentPosts];

      return newPosts.sort((a, b) => {
        return b.postedAt.getTime() - a.postedAt.getTime();
      });
    }
  );
};
