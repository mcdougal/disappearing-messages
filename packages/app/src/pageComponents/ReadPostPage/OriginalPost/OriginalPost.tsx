'use client';

import { Post } from '@/domain/post/server';
import { SessionUser } from '@/domain/user/server';
import { useRef } from 'react';

import { PostContent, PostHeader } from '@/app/components';
import { getOpacity, useOpacityAnimation } from '@/app/post';

import useOptimisticPost from './useOptimisticPost';

type Props = {
  post: Post;
  serverRenderedAt: Date;
  sessionUser: SessionUser;
};

const OriginalPost = ({
  post,
  serverRenderedAt,
  sessionUser,
}: Props): React.ReactElement => {
  const [optimisticPost, updateOptimisticPost] = useOptimisticPost(post);
  const postRef = useRef<HTMLDivElement>(null);
  const initialOpacity = getOpacity(
    post.updatedAt,
    post.expiresAt,
    serverRenderedAt
  );

  useOpacityAnimation(postRef, post);

  return (
    <div
      ref={postRef}
      className="mb-6 pl-4 pr-3"
      style={{ opacity: initialOpacity }}>
      <PostHeader
        post={optimisticPost}
        sessionUser={sessionUser}
        upsertOptimisticPost={updateOptimisticPost}
      />
      <PostContent post={optimisticPost} />
    </div>
  );
};

export default OriginalPost;
