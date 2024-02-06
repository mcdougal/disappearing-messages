import { Post } from '@/domain/post/server';
import { useEffect } from 'react';

export default (post: Post): void => {
  const { expiresAt } = post;

  useEffect(() => {
    const interval = setInterval(() => {
      if (expiresAt <= new Date()) {
        window.location.reload();
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [expiresAt]);
};
