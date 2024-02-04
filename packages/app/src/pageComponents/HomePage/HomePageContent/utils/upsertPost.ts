import { PostsFeedPost } from '@/domain/post/server';

import getPostKey from './getPostKey';

export default (
  post: PostsFeedPost,
  posts: Array<PostsFeedPost>
): Array<PostsFeedPost> => {
  const existingIndex = posts.findIndex((m) => {
    return (
      m.id === post.id ||
      (post.id.startsWith(`optimistic-`) && getPostKey(m) === getPostKey(post))
    );
  });

  const newPosts =
    existingIndex !== -1
      ? [
          ...posts.slice(0, existingIndex),
          { ...posts[existingIndex], ...post },
          ...posts.slice(existingIndex + 1),
        ]
      : [post, ...posts];

  return newPosts.sort((a, b) => {
    return b.postedAt.getTime() - a.postedAt.getTime();
  });
};
