'use client';

import { PostsFeedPost } from '@/domain/post/server';
import { SessionUser } from '@/domain/user/server';
import {
  ArrowUpIcon,
  ChatBubbleOvalLeftIcon,
} from '@heroicons/react/24/outline';
import Image from 'next/image';
import { twMerge } from 'tailwind-merge';

import getUpvotePostFormAction from './getUpvotePostFormAction';

type Props = {
  onOpenComments: (() => void) | null;
  post: PostsFeedPost;
  sessionUser: SessionUser;
  upsertOptimisticPost: (post: PostsFeedPost) => void;
};

const PostHeader = ({
  onOpenComments,
  post,
  sessionUser,
  upsertOptimisticPost,
}: Props): React.ReactElement => {
  const formAction = getUpvotePostFormAction(
    post,
    sessionUser,
    upsertOptimisticPost
  );

  const sessionUserUpvoted = post.upvotes.some((upvote) => {
    return upvote.userId === sessionUser.id;
  });

  const upvoteLabel = sessionUserUpvoted ? `Upvoted` : `Upvote`;
  const numComments = post.comments.length;
  const numCommentsLabel =
    numComments === 1 ? `1 comment` : `${numComments} comments`;

  return (
    <div className="mb-4 flex items-center gap-3">
      <div className="flex flex-1 items-center gap-2">
        <Image
          alt={`User avatar for ${post.author.name}`}
          height={24}
          src={post.author.avatarSrc}
          width={24}
        />
        <span className="text-xs">{post.author.name}</span>
      </div>
      {onOpenComments && (
        <button
          aria-label={numCommentsLabel}
          className="flex items-center gap-2 rounded-full bg-gray-100 px-3 py-2"
          disabled={post.id.startsWith(`optimistic-`)}
          onClick={onOpenComments}
          title={numCommentsLabel}
          type="button">
          <ChatBubbleOvalLeftIcon className="aspect-square w-4" />
          <span className="text-xs">{numComments}</span>
        </button>
      )}
      <form action={formAction}>
        <button
          aria-label={upvoteLabel}
          className={twMerge(
            `flex items-center gap-2 rounded-full px-3 py-2`,
            sessionUserUpvoted
              ? `bg-red-500 text-white`
              : `bg-gray-100 hover:bg-gray-200`
          )}
          disabled={post.id.startsWith(`optimistic-`) || sessionUserUpvoted}
          title={upvoteLabel}
          type="submit">
          <ArrowUpIcon className="aspect-square w-4" />
          <span className="text-xs">{post.upvotes.length}</span>
        </button>
      </form>
    </div>
  );
};

export default PostHeader;
