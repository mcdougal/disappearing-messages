import ms from 'ms';
import { RefObject, useEffect } from 'react';

import { getExpirationDurationString } from '@/domain/post/common';
import { PostsFeedPost } from '@/domain/post/server';

import getOpacity from '../getOpacity';

export default (postRef: RefObject<HTMLElement>, post: PostsFeedPost): void => {
  const { expiresAt, updatedAt } = post;

  useEffect(() => {
    const interval = setInterval(
      () => {
        if (postRef.current) {
          postRef.current.style.opacity = getOpacity(
            updatedAt,
            expiresAt
          ).toString();
        }
      },
      Math.max(ms(getExpirationDurationString()) / 1000, ms(`1 second`))
    );

    return () => {
      clearInterval(interval);
    };
  }, [expiresAt, updatedAt, postRef]);
};
