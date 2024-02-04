import { PostsFeedPost } from '@/domain/post/server';
import { usePublicChannel, useSubscribe } from '@/domain/realtime/client';
import { PostUpvotedEventSchema } from '@/domain/realtime/common';
import { useCallback, useState } from 'react';

export default (initialPost: PostsFeedPost): PostsFeedPost => {
  const [post, setPost] = useState(initialPost);

  useSubscribe(
    PostUpvotedEventSchema,
    usePublicChannel(),
    useCallback((eventData) => {
      const updatedPost = eventData?.post;

      setPost((prevPost) => {
        if (
          updatedPost &&
          updatedPost.id === prevPost.id &&
          updatedPost.numUpvotes > prevPost.numUpvotes
        ) {
          return { ...prevPost, ...updatedPost };
        }

        return prevPost;
      });
    }, [])
  );

  return post;
};
