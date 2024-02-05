import { queryPost } from '@/domain/post/server';
import {
  ReadPostPageRouteParams,
  ReadPostPageRouteSearchParams,
} from '@/domain/routes/common';
import { getOrCreateUserForSession } from '@/domain/user/server';

import { GenerateMetadata, Page } from '@/app/pageUtils';
import { getSessionId } from '@/app/session';

import CloseButton from './CloseButton';
import CommentAction from './CommentAction';
import Comments from './Comments';
import getExitBehavior from './getExitBehavior';
import OriginalPost from './OriginalPost';

export const dynamic = `force-dynamic`;

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
  const exitBehavior = getExitBehavior();

  if (!post) {
    return <>Not Found</>;
  }

  return (
    <>
      <div className="sticky top-0 z-10 flex bg-white px-2 pb-4 pt-3 sm:p-6">
        <CloseButton exitBehavior={exitBehavior} />
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
