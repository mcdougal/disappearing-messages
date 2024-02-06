import { queryPost } from '@/domain/post/server';
import {
  CreateCommentPageRouteParams,
  CreateCommentPageRouteSearchParams,
  ReadPostPageRoute,
} from '@/domain/routes/common';
import { getOrCreateUserForSession } from '@/domain/user/server';
import { notFound } from 'next/navigation';

import { GenerateMetadata, Page, getPageBackBehavior } from '@/app/pageUtils';
import { getSessionId } from '@/app/session';

import CreateCommentForm from './CreateCommentForm';
import findComment from './findComment';

export const dynamic = `force-dynamic`;

export const generateMetadata: GenerateMetadata<
  CreateCommentPageRouteParams,
  CreateCommentPageRouteSearchParams
> = async ({ params }) => {
  const post = await queryPost({ where: { id: params.postId } });

  return {
    title: `Leave a Comment - disappearing.chat`,
    description: `Post: ${post?.text || `Not Found`}`,
  };
};

const CreateCommentPage: Page<
  CreateCommentPageRouteParams,
  CreateCommentPageRouteSearchParams
> = async ({ params, searchParams }) => {
  const sessionId = getSessionId();
  const sessionUser = await getOrCreateUserForSession({ where: { sessionId } });
  const post = await queryPost({ where: { id: params.postId } });
  const backBehavior = getPageBackBehavior(
    ReadPostPageRoute.getPath({ params: { postId: params.postId } })
  );

  if (!post) {
    notFound();
  }

  return (
    <CreateCommentForm
      backBehavior={backBehavior}
      post={post}
      replyingTo={findComment(post, searchParams.replyTo)}
      sessionUser={sessionUser}
    />
  );
};

export default CreateCommentPage;
