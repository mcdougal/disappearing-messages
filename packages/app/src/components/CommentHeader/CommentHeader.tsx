'use client';

import { PostsFeedPost } from '@/domain/post/server';
import { CreateCommentPageRoute } from '@/domain/routes/common';
import { ArrowUturnLeftIcon } from '@heroicons/react/24/outline';

import Avatar from '../Avatar';
import IconButton from '../IconButton';
import Typography from '../Typography';

type Props = {
  comment: PostsFeedPost['comments'][number];
  postId: string;
};

const CommentHeader = ({ comment, postId }: Props): React.ReactElement => {
  return (
    <div className="mb-4 flex items-center justify-between gap-3">
      <div className="flex items-center gap-2">
        <Avatar
          name={comment.author.name}
          size={24}
          src={comment.author.avatarSrc}
        />
        <Typography size="xs">{comment.author.name}</Typography>
      </div>
      <IconButton
        as="a"
        href={CreateCommentPageRoute.getPath({
          params: { postId },
          searchParams: { replyTo: comment.id },
        })}
        icon={ArrowUturnLeftIcon}
        label="Reply"
        size="sm"
      />
    </div>
  );
};

export default CommentHeader;
