import { PostsFeedPost } from '@/domain/post/server';
import { useOptimistic } from 'react';

import { upsertPost } from './utils';

export default (
  posts: Array<PostsFeedPost>
): [Array<PostsFeedPost>, (post: PostsFeedPost) => void] => {
  return useOptimistic<Array<PostsFeedPost>, PostsFeedPost>(
    posts,
    (currentState, optimisticValue) => {
      return upsertPost(optimisticValue, currentState);
    }
  );
};
