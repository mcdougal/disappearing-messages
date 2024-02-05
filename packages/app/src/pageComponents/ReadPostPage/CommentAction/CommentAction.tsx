'use client';

import { Post } from '@/domain/post/server';
import { CreateCommentPageRoute } from '@/domain/routes/common';

import { Button } from '@/app/components';

type Props = {
  post: Post;
};

const CommentAction = ({ post }: Props): React.ReactElement => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white p-4">
      <div className="mx-auto max-w-2xl sm:pb-20">
        <Button
          as="a"
          className="w-full"
          color="secondary"
          href={CreateCommentPageRoute.getPath({ postId: post.id })}
          size="xl">
          Leave a Comment
        </Button>
      </div>
    </div>
  );
};

export default CommentAction;
