'use client';

import { Post } from '@/domain/post/server';
import { SessionUser } from '@/domain/user/server';
import { useRef } from 'react';

import { Avatar, Textarea, Typography } from '@/app/components';

import { Comment } from '../../types';

type Props = {
  post: Post;
  replyingTo: Comment | null;
  sessionUser: SessionUser;
};

const CreateCommentInput = ({
  post,
  replyingTo,
  sessionUser,
}: Props): React.ReactElement => {
  const placeholderRef = useRef<HTMLSpanElement>(null);

  return (
    <div className="px-3 pt-4 sm:pt-8">
      <div className="flex items-center gap-2 pb-3 sm:pb-6">
        <Avatar name={sessionUser.name} size={32} src={sessionUser.avatarSrc} />
        <Typography size="sm">{sessionUser.name}</Typography>
      </div>
      <div className="relative">
        <Typography
          ref={placeholderRef}
          className="absolute whitespace-pre-wrap leading-6 text-gray-400"
          size="lg">
          {replyingTo
            ? `Reply to “${replyingTo.text}”`
            : `Comment on “${post.text}”`}
        </Typography>
        <Textarea
          autoFocus
          defaultValue=""
          maxLength={255}
          name="text"
          onChange={(event) => {
            if (placeholderRef.current) {
              placeholderRef.current.style.display = event.target.value
                ? `none`
                : `block`;
            }
          }}
          rows={2}
        />
      </div>
    </div>
  );
};

export default CreateCommentInput;
