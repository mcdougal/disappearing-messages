import { Post } from '@/domain/post/server';
import { useOptimistic } from 'react';

export default (post: Post): [Post, (post: Post) => void] => {
  return useOptimistic<Post, Post>(post, (currentState, optimisticValue) => {
    return {
      ...currentState,
      ...optimisticValue,
    };
  });
};
