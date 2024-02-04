'use client';

import { PostsFeedPost } from '@/domain/post/server';
import { SessionUser } from '@/domain/user/server';

import { getPostKey } from '../utils';

import Post from './Post';

type Props = {
  posts: Array<PostsFeedPost>;
  serverRenderedAt: Date;
  sessionUser: SessionUser;
  upsertOptimisticPost: (post: PostsFeedPost) => void;
};

const Posts = ({
  posts,
  serverRenderedAt,
  sessionUser,
  upsertOptimisticPost,
}: Props): React.ReactElement => {
  return (
    <div className="flex flex-col">
      {posts.map((post) => {
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
