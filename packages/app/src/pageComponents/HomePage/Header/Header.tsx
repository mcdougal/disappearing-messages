import { CreatePostPageRoute } from '@/domain/routes/common';

import { Button, Typography } from '@/app/components';

const Header = (): React.ReactElement => {
  return (
    <div className="sticky top-0 z-10 border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-2xl items-center justify-between px-3 py-3">
        <Typography
          className="inline-block flex-1 bg-gradient-to-b from-black to-white bg-clip-text leading-9 text-transparent"
          size="2xl">
          disappearing.chat
        </Typography>
        <Button
          as="a"
          className="min-w-20"
          color="secondary"
          href={CreatePostPageRoute.getPath({})}
          size="md">
          Post
        </Button>
      </div>
    </div>
  );
};

export default Header;
