'use client';

import { PostsFeedPost } from '@/domain/post/server';
import { ReadPostPageRoute } from '@/domain/routes/common';
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

type Props = {
  post: PostsFeedPost;
  sessionUser: SessionUser;
  upsertOptimisticPost: (post: PostsFeedPost) => void;
};

const PostHeader = ({
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
        href={ReadPostPageRoute.getPath({ postId: post.id })}
        icon={ChatBubbleOvalLeftIcon}
        label={numCommentsLabel}
        onClick={saveScrollPosition}
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
