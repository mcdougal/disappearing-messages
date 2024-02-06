'use client';

import { SessionUser } from '@/domain/user/server';
import {
  ArrowUpIcon,
  ChatBubbleOvalLeftIcon,
} from '@heroicons/react/24/outline';

import { saveScrollPosition } from '@/app/scrollRestore';

import Avatar from '../Avatar';
import PostMetadataButton from '../PostMetadataButton';
import Typography from '../Typography';

import getUpvotePostFormAction from './getUpvotePostFormAction';
import { OptimisticUpvote, Post } from './types';

type Props = {
  commentHref: string;
  onOptimisticUpvote: (optimisticUpvote: OptimisticUpvote) => void;
  post: Post;
  sessionUser: SessionUser;
};

const PostHeader = ({
  commentHref,
  onOptimisticUpvote,
  post,
  sessionUser,
}: Props): React.ReactElement => {
  const formAction = getUpvotePostFormAction(
    post.id,
    sessionUser,
    onOptimisticUpvote
  );

  const sessionUserUpvoted = post.upvotes.some((upvote) => {
    return upvote.userId === sessionUser.id;
  });

  const numUpvotes = post.upvotes.length;
  const upvoteLabel = sessionUserUpvoted ? `Upvoted` : `Upvote`;
  const numComments = post.comments.length;
  const numCommentsLabel =
    numComments === 1 ? `1 comment` : `${numComments} comments`;

  return (
    <div className="mb-4 flex items-center gap-3">
      <div className="flex flex-1 items-center gap-2">
        <Avatar name={post.author.name} size={24} src={post.author.avatarSrc} />
        <Typography size="xs">{post.author.name}</Typography>
      </div>
      <PostMetadataButton
        disabled={post.id.startsWith(`optimistic-`)}
        href={commentHref}
        icon={ChatBubbleOvalLeftIcon}
        label={numCommentsLabel}
        onClick={(): void => {
          saveScrollPosition();
        }}
        value={numComments}
      />
      <form action={formAction}>
        <PostMetadataButton
          completed={sessionUserUpvoted}
          disabled={post.id.startsWith(`optimistic-`)}
          icon={ArrowUpIcon}
          label={upvoteLabel}
          type="submit"
          value={numUpvotes}
        />
      </form>
    </div>
  );
};

export default PostHeader;
