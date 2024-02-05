'use client';

import { CreatePostPageRoute } from '@/domain/routes/common';

import { Button, Typography } from '@/app/components';

const Header = (): React.ReactElement => {
  return (
    <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-200 bg-white px-3 py-3">
      <Typography
        className="inline-block flex-1 bg-gradient-to-b from-black to-white bg-clip-text text-transparent"
        size="2xl">
        disappearing.chat
      </Typography>
      <Button
        as="a"
        color="secondary"
        href={CreatePostPageRoute.getPath({})}
        size="md">
        Post
      </Button>
    </div>
  );
};

export default Header;
