'use client';

import { PostsFeedPost } from '@/domain/post/server';

import Avatar from '../Avatar';
import Typography from '../Typography';

type Props = {
  comment: PostsFeedPost['comments'][number];
};

const CommentHeader = ({ comment }: Props): React.ReactElement => {
  return (
    <div className="mb-4 flex items-center gap-3">
      <Avatar
        name={comment.author.name}
        size={24}
        src={comment.author.avatarSrc}
      />
      <Typography size="xs">{comment.author.name}</Typography>
    </div>
  );
};

export default CommentHeader;
