'use client';

import { SessionUser } from '@/domain/user/server';

import { Avatar, Textarea, Typography } from '@/app/components';

type Props = {
  sessionUser: SessionUser;
};

const CreatePostInput = ({ sessionUser }: Props): React.ReactElement => {
  return (
    <div className="px-3 pt-1 sm:pt-4">
      <div className="flex items-center gap-2 pb-3 sm:pb-6">
        <Avatar name={sessionUser.name} size={32} src={sessionUser.avatarSrc} />
        <Typography size="sm">{sessionUser.name}</Typography>
      </div>
      <div className="flex-1 overflow-y-auto overflow-x-hidden">
        <Textarea
          autoFocus
          defaultValue=""
          maxLength={255}
          name="text"
          placeholder="What do you want to say?"
          rows={2}
        />
      </div>
    </div>
  );
};

export default CreatePostInput;
