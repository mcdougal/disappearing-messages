'use client';

import { PostsFeedPost } from '@/domain/post/server';
import Image from 'next/image';

type Props = {
  comment: PostsFeedPost['comments'][number];
};

const CommentHeader = ({ comment }: Props): React.ReactElement => {
  return (
    <div className="mb-4 flex items-center gap-3">
      <Image
        alt={`User avatar for ${comment.author.name}`}
        height={24}
        src={comment.author.avatarSrc}
        width={24}
      />
      <span className="text-xs">{comment.author.name}</span>
    </div>
  );
};

export default CommentHeader;
