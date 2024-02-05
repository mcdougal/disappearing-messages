'use client';

import { getExpirationDurationString } from '@/domain/post/common';
import { SessionUser } from '@/domain/user/server';
import { useFormStatus } from 'react-dom';

import { Avatar, Button, Textarea, Typography } from '@/app/components';

type Props = {
  sessionUser: SessionUser;
};

const CreatePostFormInner = ({ sessionUser }: Props): React.ReactElement => {
  const status = useFormStatus();

  return (
    <div className="flex w-full flex-col">
      <div className="flex items-center gap-2 pb-3 pt-5">
        <Avatar name={sessionUser.name} size={32} src={sessionUser.avatarSrc} />
        <Typography size="sm">{sessionUser.name}</Typography>
      </div>
      <div className="flex-1 overflow-y-auto overflow-x-hidden pb-40">
        <Textarea
          autoFocus
          defaultValue=""
          maxLength={255}
          name="text"
          placeholder="What do you want to say?"
          rows={1}
        />
      </div>
      <div className="fixed bottom-0 left-0 right-0 bg-white p-4 sm:static">
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
