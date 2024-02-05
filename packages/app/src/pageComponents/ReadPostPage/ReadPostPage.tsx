import { queryPost } from '@/domain/post/server';
import { GenerateMetadata, Page } from '@/domain/routes/client';
import {
  ReadPostPageRouteParams,
  ReadPostPageRouteSearchParams,
} from '@/domain/routes/common';
import { getSessionId } from '@/domain/user/client';
import { getOrCreateUserForSession } from '@/domain/user/server';
import { notFound } from 'next/navigation';

import CloseButton from './CloseButton';
import CommentAction from './CommentAction';
import Comments from './Comments';
import OriginalPost from './OriginalPost';

export const generateMetadata: GenerateMetadata<
  ReadPostPageRouteParams,
  ReadPostPageRouteSearchParams
> = async ({ params }) => {
  const post = await queryPost({ where: { id: params.postId } });

  if (!post) {
    return {
      title: `Post Not Found - disappearing.chat`,
      description: `The post you are looking for does not exist.`,
    };
  }

  const postText = post.text;
  const postTextTruncated =
    postText.length > 100 ? `${postText.slice(0, 100)}...` : postText;

  return {
    title: `${postTextTruncated} - disappearing.chat`,
    description: postText,
  };
};

const ReadPostPage: Page<
  ReadPostPageRouteParams,
  ReadPostPageRouteSearchParams
> = async ({ params }) => {
  const sessionId = getSessionId();
  const sessionUser = await getOrCreateUserForSession({ where: { sessionId } });
  const post = await queryPost({ where: { id: params.postId } });
  const serverRenderedAt = new Date();

  if (!post) {
    notFound();
  }

  return (
    <>
      <div className="sticky top-0 z-10 flex justify-end bg-white px-2 pb-4 pt-3 sm:p-6">
        <CloseButton />
      </div>
      <div className="mx-auto max-w-2xl pb-40 pt-1">
        <OriginalPost
          post={post}
          serverRenderedAt={serverRenderedAt}
          sessionUser={sessionUser}
        />
        <Comments post={post} />
      </div>
      <CommentAction post={post} />
    </>
  );
};

export default ReadPostPage;
