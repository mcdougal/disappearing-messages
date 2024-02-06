'use client';

import { PostsFeedPost } from '@/domain/post/server';
import { SessionUser } from '@/domain/user/server';
import { useRef } from 'react';

import { PostContent, PostHeader } from '@/app/components';
import { getOpacity, useOpacityAnimation } from '@/app/post';

type Props = {
  post: PostsFeedPost;
  serverRenderedAt: Date;
  sessionUser: SessionUser;
  upsertOptimisticPost: (post: PostsFeedPost) => void;
};

const Post = ({
  post,
  serverRenderedAt,
  sessionUser,
  upsertOptimisticPost,
}: Props): React.ReactElement => {
  const postRef = useRef<HTMLDivElement>(null);
  const initialOpacity = getOpacity(
    post.updatedAt,
    post.expiresAt,
    serverRenderedAt
  );

  useOpacityAnimation(postRef, post);

  return (
    <div className="border-t border-gray-100 last:border-b">
      <div
        ref={postRef}
        className="pb-4 pl-4 pr-3 pt-2 transition-opacity ease-linear md:py-6"
        style={{ opacity: initialOpacity }}>
        <PostHeader
          post={post}
          sessionUser={sessionUser}
          upsertOptimisticPost={upsertOptimisticPost}
        />
        <PostContent post={post} />
      </div>
    </div>
  );
};

export default Post;
