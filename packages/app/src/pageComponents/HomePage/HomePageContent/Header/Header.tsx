'use client';

import { PostsFeedPost } from '@/domain/post/server';
import { SessionUser } from '@/domain/user/server';
import { useState } from 'react';

import { Button } from '@/app/components';

import CreatePostDialog from './CreatePostDialog';

type Props = {
  sessionUser: SessionUser;
  upsertOptimisticPost: (post: PostsFeedPost) => void;
};

const Header = ({
  sessionUser,
  upsertOptimisticPost,
}: Props): React.ReactElement => {
  const [postDialogOpen, setPostDialogOpen] = useState(false);

  return (
    <>
      <div className="sticky flex items-center border-b border-slate-200 px-3 py-3">
        <h1 className="inline-block flex-1 bg-gradient-to-b from-black to-white bg-clip-text text-2xl text-transparent">
          disappearing.chat
        </h1>
        <Button
          color="secondary"
          onClick={(): void => {
            setPostDialogOpen(true);
          }}
          size="md">
          Post
        </Button>
      </div>
      <CreatePostDialog
        onClose={(): void => {
          setPostDialogOpen(false);
        }}
        open={postDialogOpen}
        sessionUser={sessionUser}
        upsertOptimisticPost={upsertOptimisticPost}
      />
    </>
  );
};

export default Header;
