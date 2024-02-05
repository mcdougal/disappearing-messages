'use client';

import { PostsFeedPost } from '@/domain/post/server';
import { SessionUser } from '@/domain/user/server';
import { useRef, useState } from 'react';

import { PostContent, PostHeader } from './components';
import getOpacity from './getOpacity';
import ReadPostDialog from './ReadPostDialog';
import useOpacityAnimation from './useOpacityAnimation';

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
  const [postDialogOpen, setPostDialogOpen] = useState(false);
  const postRef = useRef<HTMLDivElement>(null);

  useOpacityAnimation(postRef, post);

  return (
    <>
      <div className="border-t border-gray-100 last:border-b">
        <div
          ref={postRef}
          className="pb-4 pl-4 pr-3 pt-2 transition-opacity ease-linear md:py-6"
          style={{
            opacity: getOpacity(
              post.updatedAt,
              post.expiresAt,
              serverRenderedAt
            ),
          }}>
          <PostHeader
            onOpenComments={(): void => {
              setPostDialogOpen(true);
            }}
            post={post}
            sessionUser={sessionUser}
            upsertOptimisticPost={upsertOptimisticPost}
          />
          <PostContent post={post} />
        </div>
      </div>
      <ReadPostDialog
        onClose={(): void => {
          setPostDialogOpen(false);
        }}
        open={postDialogOpen}
        post={post}
        sessionUser={sessionUser}
        upsertOptimisticPost={upsertOptimisticPost}
      />
    </>
  );
};

export default Post;
