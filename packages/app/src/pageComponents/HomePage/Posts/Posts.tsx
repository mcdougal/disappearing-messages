'use client';

import { PostsFeedPost } from '@/domain/post/server';
import { SessionUser } from '@/domain/user/server';

import {
  useClearPositionOnScrollToTop,
  useRestoreScrollPosition,
} from '@/app/scrollRestore';

import Post from './Post';
import { getPostKey, useOptimisticPosts } from './utils';

type Props = {
  posts: Array<PostsFeedPost>;
  serverRenderedAt: Date;
  sessionUser: SessionUser;
};

const Posts = ({
  posts,
  serverRenderedAt,
  sessionUser,
}: Props): React.ReactElement => {
  const [optimisticPosts, upsertOptimisticPost] = useOptimisticPosts(posts);

  useRestoreScrollPosition();
  useClearPositionOnScrollToTop();

  return (
    <div className="flex flex-col">
      {optimisticPosts.map((post) => {
        return (
          <Post
            key={getPostKey(post)}
            post={post}
            serverRenderedAt={serverRenderedAt}
            sessionUser={sessionUser}
            upsertOptimisticPost={upsertOptimisticPost}
          />
        );
      })}
    </div>
  );
};

export default Posts;
