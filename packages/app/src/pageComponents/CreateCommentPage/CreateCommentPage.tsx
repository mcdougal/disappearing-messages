import { queryPost } from '@/domain/post/server';
import {
  CreateCommentPageRouteParams,
  CreateCommentPageRouteSearchParams,
} from '@/domain/routes/common';
import { getOrCreateUserForSession } from '@/domain/user/server';

import { Container } from '@/app/components';
import { GenerateMetadata, Page } from '@/app/pageUtils';
import { getSessionId } from '@/app/session';

import CloseButton from './CloseButton';
import CreateCommentForm from './CreateCommentForm';
import getExitBehavior from './getExitBehavior';

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
> = async ({ params }) => {
  const { postId } = params;
  const sessionId = getSessionId();
  const sessionUser = await getOrCreateUserForSession({ where: { sessionId } });
  const exitBehavior = getExitBehavior(postId);

  return (
    <>
      <Container className="h-screen sm:pt-36" size="xs">
        <CreateCommentForm postId={postId} sessionUser={sessionUser} />
      </Container>
      <CloseButton exitBehavior={exitBehavior} />
    </>
  );
};

export default CreateCommentPage;
