import { queryPost } from '@/domain/post/server';
import { HomePageRoute, ReadPostPageRouteParams } from '@/domain/routes/common';
import { getOrCreateUserForSession } from '@/domain/user/server';
import { notFound } from 'next/navigation';

import { GenerateMetadata, getPageBackBehavior, Page } from '@/app/pageUtils';
import { getSessionId } from '@/app/session';

import ReadPostPageContent from './ReadPostPageContent';

export const dynamic = `force-dynamic`;

export const generateMetadata: GenerateMetadata<
  ReadPostPageRouteParams
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

const ReadPostPage: Page<ReadPostPageRouteParams> = async ({ params }) => {
  const sessionId = getSessionId();
  const sessionUser = await getOrCreateUserForSession({ where: { sessionId } });
  const post = await queryPost({ where: { id: params.postId } });
  const serverRenderedAt = new Date();
  const backBehavior = getPageBackBehavior(HomePageRoute.getPath({}));

  if (!post) {
    return notFound();
  }

  return (
    <ReadPostPageContent
      backBehavior={backBehavior}
      post={post}
      serverRenderedAt={serverRenderedAt}
      sessionUser={sessionUser}
    />
  );
};

export default ReadPostPage;
