'use client';

import { Post } from '@/domain/post/server';

import { Button } from '@/app/components';

type Props = {
  post: Post;
};

const CommentAction = ({ post }: Props): React.ReactElement => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white p-4">
      <Button className="w-full" color="secondary" size="xl">
        Leave a Comment
      </Button>
    </div>
  );
};

export default CommentAction;
