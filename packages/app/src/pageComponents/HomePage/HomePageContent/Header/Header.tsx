'use client';

import { CreatePostPageRoute } from '@/domain/routes/common';
import Link from 'next/link';

import { Button, Typography } from '@/app/components';

const Header = (): React.ReactElement => {
  return (
    <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-200 bg-white px-3 py-3">
      <Typography
        className="inline-block flex-1 bg-gradient-to-b from-black to-white bg-clip-text text-transparent"
        size="2xl">
        disappearing.chat
      </Typography>
      <Link href={CreatePostPageRoute.getPath({})}>
        <Button color="secondary" size="md">
          Post
        </Button>
      </Link>
    </div>
  );
};

export default Header;
