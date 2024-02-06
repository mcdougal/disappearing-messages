'use client';

import { Post } from '@/domain/post/server';
import { CreateCommentPageRoute } from '@/domain/routes/common';
import Link from 'next/link';

import { CommentContent, CommentHeader, Typography } from '@/app/components';

type Props = {
  post: Post;
};

const Comments = ({ post }: Props): React.ReactElement => {
  return (
    <>
      {post.comments.length === 0 ? (
        <div className="py-6 pl-4 pr-3">
          <Link
            href={CreateCommentPageRoute.getPath({
              params: { postId: post.id },
              searchParams: {},
            })}>
            <Typography className="block min-h-52" color="gray" size="sm">
              No comments
            </Typography>
          </Link>
        </div>
      ) : (
        <>
          {post.comments.map((comment) => {
            return (
              <div
                key={comment.id}
                className="border-t border-gray-100 py-4 pl-4 pr-3 last:border-b md:pb-6 md:pt-5">
                <CommentHeader comment={comment} postId={post.id} />
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
