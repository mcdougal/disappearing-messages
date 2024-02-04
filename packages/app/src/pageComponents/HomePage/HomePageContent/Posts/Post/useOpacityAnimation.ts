import { PostsFeedPost } from '@/domain/post/server';
import ms from 'ms';
import { RefObject, useEffect } from 'react';

import getOpacity from './getOpacity';

export default (
  postRef: RefObject<HTMLDivElement>,
  post: PostsFeedPost
): void => {
  const { expiresAt, postedAt } = post;

  useEffect(() => {
    const interval = setInterval(() => {
      if (postRef.current) {
        postRef.current.style.opacity = getOpacity(
          postedAt,
          expiresAt
        ).toString();
      }
    }, ms(`1 minute`));

    return () => {
      clearInterval(interval);
    };
  }, [postedAt, expiresAt, postRef]);
};
