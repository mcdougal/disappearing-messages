'use client';

import { getExpirationDurationString } from '@/domain/post/common';
import { SessionUser } from '@/domain/user/server';
import Image from 'next/image';
import { useFormStatus } from 'react-dom';

import { Button, Textarea, Typography } from '@/app/components';

type Props = {
  sessionUser: SessionUser;
};

const CreatePostFormInner = ({ sessionUser }: Props): React.ReactElement => {
  const status = useFormStatus();

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-2 pb-3 pt-5">
        <Image
          alt={`User avatar for ${sessionUser.name}`}
          height={32}
          src={sessionUser.avatarSrc}
          width={32}
        />
        <Typography size="sm">{sessionUser.name}</Typography>
      </div>
      <div className="flex-1 overflow-y-auto overflow-x-hidden">
        <Textarea
          autoFocus
          defaultValue=""
          maxLength={255}
          name="text"
          placeholder="What do you want to say?"
          rows={1}
        />
      </div>
      <div className="py-4">
        <Typography className="text-gray-500" size="sm">
          Your post will disappear after{` `}
          {getExpirationDurationString()}. Upvotes and comments reset the clock.
        </Typography>
        <Button
          className="mt-4 w-full"
          loading={status.pending}
          size="xl"
          type="submit">
          Post
        </Button>
      </div>
    </div>
  );
};

export default CreatePostFormInner;
