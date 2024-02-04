'use client';

import { PostsFeedPost } from '@/domain/post/server';
import { SessionUser } from '@/domain/user/server';
import { ArrowUpIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import { useRef } from 'react';

import getOpacity from './getOpacity';
import getUpvotePostFormAction from './getUpvotePostFormAction';
import PostContent from './PostContent';
import useOpacityAnimation from './useOpacityAnimation';

type Props = {
  post: PostsFeedPost;
  serverRenderedAt: Date;
  sessionUser: SessionUser;
  upsertOptimisticPost: (post: PostsFeedPost) => void;
};

const Post = ({
  post: initialPost,
  serverRenderedAt,
  sessionUser,
  upsertOptimisticPost,
}: Props): React.ReactElement => {
  const post = initialPost;
  const { author, expiresAt, id, text, updatedAt, upvotes } = post;

  const postRef = useRef<HTMLDivElement>(null);
  useOpacityAnimation(postRef, post);

  const formAction = getUpvotePostFormAction(
    post,
    sessionUser,
    upsertOptimisticPost
  );

  return (
    <div className="border-t border-slate-100 last:border-b">
      <div
        ref={postRef}
        className="px-4 pb-4 pt-2 transition-opacity ease-linear md:py-6"
        style={{ opacity: getOpacity(updatedAt, expiresAt, serverRenderedAt) }}>
        <div className="mb-4 flex items-center gap-2">
          <div className="flex flex-1 items-center gap-2">
            <Image
              alt={`User avatar for ${author.name}`}
              height={24}
              src={author.avatarSrc}
              width={24}
            />
            <span className="text-xs">{author.name}</span>
          </div>
          <form action={formAction}>
            <button
              aria-label="Upvote"
              className="flex items-center gap-2 rounded-full bg-slate-100 px-3 py-2 hover:bg-slate-200"
              disabled={id.startsWith(`optimistic-`)}
              title="Upvote"
              type="submit">
              <ArrowUpIcon className="aspect-square w-4" />
              <span className="text-xs">{upvotes.length}</span>
            </button>
          </form>
        </div>
        <PostContent text={text} />
      </div>
    </div>
  );
};

export default Post;
