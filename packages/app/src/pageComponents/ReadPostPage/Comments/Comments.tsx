import { Post } from '@/domain/post/server';

import { CommentContent, CommentHeader, Typography } from '@/app/components';

type Props = {
  post: Post;
};

const Comments = async ({ post }: Props): Promise<React.ReactElement> => {
  return (
    <>
      {post.comments.length === 0 ? (
        <div className="pl-4 pr-3 md:py-6">
          <Typography color="gray" size="sm">
            No comments
          </Typography>
        </div>
      ) : (
        <>
          {post.comments.map((comment) => {
            return (
              <div
                key={comment.id}
                className="border-t border-gray-100 py-4 pl-4 pr-3 last:border-b md:py-6">
                <CommentHeader comment={comment} />
                <CommentContent comment={comment} />
              </div>
            );
          })}
        </>
      )}
    </>
  );
};

export default Comments;
